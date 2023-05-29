import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import { NextRequest } from "next/server"

interface DataForm {
	email?: string
	password?: string
}

interface User {
	id?: number
	email?: string
	role?: string
	dni?: string
	firstName?: string
	lastName?: string
	birthDate?: string
	phone?: string
	address?: string
	photo?: string
	randomKey?: string
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

				console.log(res)
				const user = await res.json()
				console.log(user)
				const { id, email, rol, dni, firstName, lastName, birthDate, phone, address, photo } = user
				if (res.ok && user) {
					console.log({
						id,
						email,
						rol,
						dni,
						firstName,
						lastName,
						birthDate,
						phone,
						address,
						photo,
					})
					return {
						id,
						email,
						rol,
						dni,
						firstName,
						lastName,
						birthDate,
						phone,
						address,
						photo,
						randomKey: "Hey cool",
					} as User
					// Any object returned will be saved in `user` property of the JWT
				}

				return null
			},
		}),
	],
	secret: process.env.SECRET_KEY,
	callbacks: {
		session: ({ session, token }: any) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
				},
			}
		},
		jwt: async ({ token, user }: any) => {
			if (user) {
				return {
					...token,
					id: user.id,
					randomKey: token.randomKey,
				}
			}
			return token
		},
	},
})

export { handler as GET, handler as POST }
