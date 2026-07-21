import { verifyCredentials } from '../_adminAuth.js'
import { readJson, sendJson, sendMethodNotAllowed } from '../_http.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendMethodNotAllowed(res, ['POST'])
    return
  }

  try {
    const { username, password } = await readJson(req)

    if (!verifyCredentials(username, password)) {
      sendJson(res, 401, {
        ok: false,
        message: 'Invalid username or password',
      })
      return
    }

    sendJson(res, 200, { ok: true })
  } catch {
    sendJson(res, 400, {
      ok: false,
      message: 'Invalid login request',
    })
  }
}
