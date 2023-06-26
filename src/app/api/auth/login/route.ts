import prisma from "@/lib/prisma"
import Joi from "joi"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { signJwtAccessToken } from "@/lib/jwt"
interface RequestBody {
	email: string
	password: string
}

export async function POST(request: Request) {
	try {
		const { email, password }: RequestBody = await request.json()

		const schema = Joi.object({
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "es", "ec"] } })
				.required()
				.messages({
					"string.empty": "El correo es requerido",
					"string.email": "El correo no es válido",
				}),
			password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,}$")).messages({
				"any.required": "Contraseña es requerida",
				"string.empty": "Contraseña está vacio",
			}),
		})

		const { error } = schema.validate({ email, password })
		if (error) {
			return new NextResponse(error.details[0].message, { status: 401 })
		}
		const data = await prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				person: true,
			},
		})

		if (data && (await bcrypt.compare(password, data.password))) {
			//Desectroctura los datos
			const { person, password, createdAt, updatedAt, ...userWithoutPerson } = data

			const { ...userWithPerson } = {
				...userWithoutPerson,
				...(person || {}),
			}
			const { createdAt: created, updatedAt: updated, ...dataFinal } = userWithPerson

			const accessToken = signJwtAccessToken(dataFinal)
			const result = { ...dataFinal, accessToken }

			return new Response(JSON.stringify(result), { status: 201 })
		} else {
			return new Response(JSON.stringify("Credenciales inválidas"), { status: 401 })
		}
	} catch (error: any) {
		console.error(error)

		return new NextResponse(error.message, { status: 500 })
	}
}
