import { Hono } from '@hono/hono'

import { repo as users } from '~entities/user/repo.ts'

import { RegisterPage } from './page.tsx'

export const app = new Hono()
	.get('/', (c) => c.html(<RegisterPage />))
	.post('/', async (c) => {
		const body = await c.req.parseBody()
		const email = String(body['email'] ?? '').trim()
		const password = String(body['password'] ?? '').trim()

		if (!email || !password) {
			return c.html(<RegisterPage error='Email and password required.' />, 400)
		}

		const user = users.findOne({ email })
		if (user) return c.html(<RegisterPage error='Email already in use.' />, 409)

		return c.redirect('/')
	})
