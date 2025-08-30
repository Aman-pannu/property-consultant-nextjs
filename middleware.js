const ADMIN_PATHS = ['/admin', '/api/leads', '/api/leads/export']

export function middleware(req) {
  const url = req.nextUrl
  const path = url.pathname
  const match = ADMIN_PATHS.some(p => path === p || path.startsWith(p + '/'))
  if (!match) return
  const basicAuth = req.headers.get('authorization')
  const u = process.env.BASIC_AUTH_USER
  const p = process.env.BASIC_AUTH_PASS

  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(' ')
    if (scheme === 'Basic') {
      const buff = Buffer.from(encoded, 'base64').toString('utf-8')
      const [user, pass] = buff.split(':')
      if (user === u && pass === p) return
    }
  }
  return new Response('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
  })
}

export const config = {
  matcher: ['/admin/:path*','/api/leads/:path*']
}
