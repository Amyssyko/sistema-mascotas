import prisma from "@/lib/prisma"
import Joi from "joi"
import { NextResponse } from "next/server"
import * as bcrypt from "bcrypt"

interface RequestBody {
	email: string
	password: string
}

export async function POST(request: Request) {
	try {
		const { email, password }: RequestBody = await request.json()
		console.log({ email, password })
		const schema = Joi.object({
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "es"] } })
				.required()
				.messages({
					"string.empty": "Correo es requerido",
					//"any.required": "Correo es requerido",
					"string.email": "Correo no válido",
				}),
			password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,}$")).messages({
				//"any.required": "Contraseña es requerida",
				"string.empty": "Contraseña es requerida",
				"string.pattern.base":
					"La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula",
			}),
		})

		const { error } = schema.validate({ email, password })
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}
		const data = await prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				person: true,
			},
			//rejectOnNotFound: false,
		})

		//console.log(data)
		if (data && (await bcrypt.compare(password, data.password))) {
			const { person, ...userWithoutPerson } = data
			const userWithPerson = {
				...userWithoutPerson,
				...(person || {}), // Si la persona existe, la incluye en el objeto combinado
			}
			console.log(userWithPerson)
			return new Response(JSON.stringify(userWithPerson), { status: 201 })
		} else {
			console.log("401")
			return new Response(JSON.stringify("Credenciales inválidas"), { status: 401 })
		}
	} catch (error: any) {
		console.log(error)

		return new NextResponse(error.message, { status: 500 })
	}
}
