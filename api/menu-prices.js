import { sendJson, sendMethodNotAllowed } from './_http.js'
import { readMenuPrices } from './_menuStore.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    sendMethodNotAllowed(res, ['GET'])
    return
  }

  try {
    const menuPrices = await readMenuPrices()

    sendJson(res, 200, menuPrices, {
      'Cache-Control': 'no-store, max-age=0',
    })
  } catch {
    sendJson(res, 500, {
      ok: false,
      message: 'Menu prices could not be loaded',
    })
  }
}
