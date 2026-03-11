import { Context, Hono } from '@hono/hono'

import { render } from '~shared/lib/render.tsx'

import { create } from './lib.ts'
import { UserList } from './list.tsx'
import { UserListPage } from './page.tsx'
import { ValidationError } from '~core/middleware/error.ts'

export const app = new Hono()
	.get('/', (c: Context) => {
		return render(c, {
			page: () => <UserListPage users={[]} />,
			fragments: { '#users-list': () => <UserList users={[]} /> },
		})
	})
	.post('/', async (c: Context) => {
		const form = await c.req.formData()
		const name = form.get('name')?.toString()
		const email = form.get('email')?.toString()
		const password = form.get('password')?.toString()

		if (!name || !email || !password) {
			throw new ValidationError('Username, email and password required.')
		}

		await create({ name, email, password })

		return c.html(<UserList users={[]} />)
	})
