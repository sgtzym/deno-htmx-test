import { Hono } from '@hono/hono'
import { deleteCookie, setCookie } from '@hono/hono/cookie'

import { repo as users } from '~entities/user/repo.ts'
import { verifyPassword } from '~shared/lib/crypto.ts'

import { sessionCookie } from './auth.ts'
import { SigninPage } from './page.tsx'

export const app = new Hono()
	.get('/signin', (c) => c.html(<SigninPage />))
	.post('/signin', async (c) => {
		const body = await c.req.parseBody()
		const email = String(body['email'] ?? '').trim()
		const password = String(body['password'] ?? '').trim()

		if (!email || !password) {
			return c.html(<SigninPage error='Email and password required.' />, 400)
		}

		const user = users.findOne({ email })
		if (!user || !(await verifyPassword(password, user.password))) {
			return c.html(<SigninPage error='Invalid credentials.' />, 401)
		}

		setCookie(c, sessionCookie, String(user.id), {
			httpOnly: true,
			sameSite: 'Strict',
			path: '/',
		})

		return c.redirect('/')
	})
	.get('/signout', (c) => {
		deleteCookie(c, sessionCookie, { path: '/' })
		return c.redirect('/signin')
	})
