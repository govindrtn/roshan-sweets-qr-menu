export function sendJson(res, statusCode, payload, extraHeaders = {}) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  for (const [name, value] of Object.entries(extraHeaders)) {
    res.setHeader(name, value)
  }

  res.end(JSON.stringify(payload))
}

export function sendMethodNotAllowed(res, methods) {
  sendJson(
    res,
    405,
    { ok: false, message: 'Method not allowed' },
    { Allow: methods.join(', ') },
  )
}

export async function readJson(req) {
  if (Buffer.isBuffer(req.body)) {
    const rawBody = req.body.toString('utf8').trim()

    return rawBody ? JSON.parse(rawBody) : {}
  }

  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  if (typeof req.body === 'string') {
    return req.body.trim() ? JSON.parse(req.body) : {}
  }

  const chunks = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8').trim()
  return rawBody ? JSON.parse(rawBody) : {}
}
