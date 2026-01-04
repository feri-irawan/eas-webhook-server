import crypto from 'crypto'
import express from 'express'
import bodyParser from 'body-parser'
import safeCompare from 'safe-compare'
import { clients } from './clients'
import type { BuildWebhookPayload, SubmitWebhookPayload } from './types'

const app = express()
app.use(bodyParser.text({ type: '*/*' }))
app.post('/webhook', async (req, res) => {
  const expoSignature = req.headers['expo-signature']
  // process.env.SECRET_WEBHOOK_KEY has to match SECRET value set with `eas webhook:create` command
  const hmac = crypto.createHmac('sha1', process.env.SECRET_WEBHOOK_KEY!)
  hmac.update(req.body)
  const hash = `sha1=${hmac.digest('hex')}`
  if (!safeCompare(expoSignature as string, hash)) {
    res.status(500).send("Signatures didn't match!")
  } else {
    const payload = JSON.parse(req.body)

    if (payload.submissionDetailsPageUrl) {
      await Promise.all(
        clients.map((client) =>
          client.triggerSubmit(payload as SubmitWebhookPayload)
        )
      )
    } else if (payload.buildDetailsPageUrl) {
      await Promise.all(
        clients.map((client) =>
          client.triggerBuild(payload as BuildWebhookPayload)
        )
      )
    } else {
      res.status(400).send('Unknown payload type')
      return
    }

    res.send('OK!')
  }
})

if (process.env.NODE_ENV === 'development') {
  app.listen(8080, () => console.log('Listening on port 8080'))
}

export default app
