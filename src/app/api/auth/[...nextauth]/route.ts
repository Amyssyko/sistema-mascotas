import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

interface DataForm {
	email?: string
	password?: string
}

interface User {
	id?: string | number | undefined
	email?: string
	role?: string
	dni?: string
	firstName?: string
	lastName?: string
	birthDate?: string
	phone?: string
	address?: string
	photo?: string
}
const handler = NextAuth({
	pages: {
		signIn: "/auth/login",
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")

			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "Email", type: "text", placeholder: "email@example.com" },
				password: { label: "Contraseña", type: "password" },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied

				const res = await fetch("http://localhost:3000/api/auth/login", {
					method: "POST",
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				})
				if (!res.ok) {
					return null
				}
				const user = await res.json()
				const { id, email, role, dni, firstName, lastName, birthDate, phone, address, photo } = user
				if (res.ok && user) {
					return {
						id,
						email,
						role,
						dni,
						firstName,
						lastName,
						birthDate,
						phone,
						address,
						photo,
					}
				}
				return null
			},
		}),
	],

	callbacks: {
		jwt: async ({ token, user }: any) => {
			if (user) {
				return {
					...token,
					...user,
				}
			}
			return token
		},
		session: ({ session, token }: any) => {
			session.user = token as any
			return session
		},
	},
})

export { handler as GET, handler as POST }
