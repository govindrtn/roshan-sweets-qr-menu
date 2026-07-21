import { isAdminRequest } from '../_adminAuth.js'
import { readJson, sendJson, sendMethodNotAllowed } from '../_http.js'
import { readMenuPrices, saveMenuPrices } from '../_menuStore.js'

const MAX_ITEMS = 200
const MAX_PRICE_LENGTH = 80

function cleanPrice(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function normalizePrices(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Prices payload is required')
  }

  const entries = Object.entries(payload)

  if (entries.length > MAX_ITEMS) {
    throw new Error('Too many menu items')
  }

  return entries.reduce((normalized, [id, value]) => {
    if (!/^\d+$/.test(id) || !value || typeof value !== 'object') {
      throw new Error('Invalid menu item data')
    }

    const hi = cleanPrice(value.hi)
    const en = cleanPrice(value.en)

    if (hi.length > MAX_PRICE_LENGTH || en.length > MAX_PRICE_LENGTH) {
      throw new Error('Price text is too long')
    }

    normalized[id] = { hi, en }
    return normalized
  }, {})
}

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    sendMethodNotAllowed(res, ['GET', 'POST'])
    return
  }

  if (!isAdminRequest(req)) {
    sendJson(res, 401, {
      ok: false,
      message: 'Admin login required',
    })
    return
  }

  if (req.method === 'GET') {
    const menuPrices = await readMenuPrices()
    sendJson(res, 200, menuPrices, {
      'Cache-Control': 'no-store, max-age=0',
    })
    return
  }

  try {
    const { prices } = await readJson(req)
    const normalizedPrices = normalizePrices(prices)
    const savedPrices = await saveMenuPrices(normalizedPrices)

    sendJson(res, 200, {
      ok: true,
      ...savedPrices,
    })
  } catch (error) {
    const statusCode = error.code === 'MISSING_GITHUB_TOKEN' ? 503 : 400

    sendJson(res, statusCode, {
      ok: false,
      code: error.code || 'INVALID_PRICE_UPDATE',
      message: error.message || 'Menu prices could not be saved',
    })
  }
}
