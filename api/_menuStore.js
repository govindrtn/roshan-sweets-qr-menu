import fs from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_REPOSITORY = 'govindrtn/roshan-sweets-qr-menu'
const DEFAULT_BRANCH = 'main'
const DEFAULT_FILE_PATH = 'public/menu-prices.json'
const USER_AGENT = 'roshan-sweets-menu-admin'

function getGitHubConfig() {
  return {
    branch: process.env.GITHUB_BRANCH || DEFAULT_BRANCH,
    filePath: process.env.GITHUB_PRICE_FILE || DEFAULT_FILE_PATH,
    repository: process.env.GITHUB_REPOSITORY || DEFAULT_REPOSITORY,
    token: process.env.MENU_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '',
  }
}

function githubApiUrl(config) {
  return `https://api.github.com/repos/${config.repository}/contents/${config.filePath}`
}

function githubHeaders(config) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': USER_AGENT,
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (config.token) {
    headers.Authorization = `Bearer ${config.token}`
  }

  return headers
}

async function getGitHubFile(config) {
  const response = await fetch(
    `${githubApiUrl(config)}?ref=${encodeURIComponent(config.branch)}`,
    { headers: githubHeaders(config) },
  )

  if (!response.ok) {
    throw new Error(`GitHub read failed with status ${response.status}`)
  }

  return response.json()
}

function decodeGitHubJson(file) {
  const encodedContent = String(file.content || '').replaceAll('\n', '')
  const decodedContent = Buffer.from(encodedContent, 'base64').toString('utf8')

  return JSON.parse(decodedContent)
}

async function readLocalPriceFile() {
  const filePath = path.join(process.cwd(), DEFAULT_FILE_PATH)
  const content = await fs.readFile(filePath, 'utf8')

  return JSON.parse(content)
}

export async function readMenuPrices() {
  const config = getGitHubConfig()

  try {
    const file = await getGitHubFile(config)

    return {
      ...decodeGitHubJson(file),
      source: 'github',
    }
  } catch {
    return {
      ...(await readLocalPriceFile()),
      source: 'local',
    }
  }
}

export async function saveMenuPrices(prices) {
  const config = getGitHubConfig()

  if (!config.token) {
    const error = new Error('MENU_GITHUB_TOKEN is not configured')
    error.code = 'MISSING_GITHUB_TOKEN'
    throw error
  }

  const currentFile = await getGitHubFile(config)
  const nextData = {
    updatedAt: new Date().toISOString(),
    prices,
  }
  const content = Buffer.from(`${JSON.stringify(nextData, null, 2)}\n`).toString(
    'base64',
  )

  const response = await fetch(githubApiUrl(config), {
    method: 'PUT',
    headers: githubHeaders(config),
    body: JSON.stringify({
      branch: config.branch,
      content,
      message: 'Update menu prices from admin',
      sha: currentFile.sha,
    }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(result.message || 'GitHub update failed')
    error.code = 'GITHUB_UPDATE_FAILED'
    error.status = response.status
    throw error
  }

  return {
    ...nextData,
    commitUrl: result.commit?.html_url || null,
    source: 'github',
  }
}
