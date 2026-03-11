import { Shell } from '~shared/layout/shell.tsx'

interface RegisterPageProps {
	error?: string
}

export const RegisterPage = ({ error }: RegisterPageProps) => (
	<Shell title='Register'>
		<main class='min-h-screen flex items-center justify-center p-6'>
			<div class='card w-full max-w-sm shadow-xl bg-base-100'>
				<div class='card-body gap-4'>
					<h1 class='card-title text-2xl'>Register Account</h1>

					{error && (
						<div role='alert' class='alert alert-error'>
							<span>{error}</span>
						</div>
					)}

					<form method='post' action='/register' class='flex flex-col gap-4'>
						<label class='form-control'>
							<div class='label'>
								<span class='label-text'>Email</span>
							</div>
							<input
								type='email'
								name='email'
								class='input w-full'
								required
								autofocus />
						</label>

						<label class='form-control'>
							<div class='label'>
								<span class='label-text'>Password</span>
							</div>
							<input type='password' name='password' class='input w-full' required />
						</label>

						<button type='submit' class='btn btn-primary'>Register</button>
					</form>
				</div>
			</div>
		</main>
	</Shell>
)
