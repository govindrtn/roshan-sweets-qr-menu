import crypto from 'node:crypto'

const DEFAULT_ADMIN_USERNAME = '@admin-govind-maithil'
const DEFAULT_PASSWORD_HASH =
  'd2ac21582174c8c026f57f6282ee4830ae35a667d4f0a86242040b73b92ec981'

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  )
}

function getExpectedPasswordHash() {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH
  }

  if (process.env.ADMIN_PASSWORD) {
    return sha256(process.env.ADMIN_PASSWORD)
  }

  return DEFAULT_PASSWORD_HASH
}

export function verifyCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME
  const submittedUsername = String(username || '').trim()
  const submittedPassword = String(password || '')

  if (!safeEqual(submittedUsername, expectedUsername)) {
    return false
  }

  return safeEqual(sha256(submittedPassword), getExpectedPasswordHash())
}

export function getBasicCredentials(req) {
  const header = req.headers.authorization || ''

  if (!header.startsWith('Basic ')) {
    return null
  }

  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8')
    const separatorIndex = decoded.indexOf(':')

    if (separatorIndex === -1) {
      return null
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    }
  } catch {
    return null
  }
}

export function isAdminRequest(req) {
  const credentials = getBasicCredentials(req)

  return (
    credentials &&
    verifyCredentials(credentials.username, credentials.password)
  )
}
