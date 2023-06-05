import NextAuth from "next-auth"

declare module "next-auth" {
	interface Session {
		user: {
			id?: number | string
			email?: string
			accessToken?: string
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
	}
}
