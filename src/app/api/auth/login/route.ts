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
		//console.log({ email, password })
		const schema = Joi.object({
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "es", "ec"] } })
				.required()
				.messages({
					"string.empty": "Correo es requerido",
					"string.email": "Correo no válido",
				}),
			password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,}$")).messages({
				//"any.required": "Contraseña es requerida",
				"string.empty": "Contraseña es requerida",
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
			//rejectOnNotFound: false,
		})

		//console.log(data)
		if (data && (await bcrypt.compare(password, data.password))) {
			//Desectroctura los datos
			const { person, password, createdAt, updatedAt, ...userWithoutPerson } = data

			const { ...userWithPerson } = {
				...userWithoutPerson,
				...(person || {}), // Si la persona existe, la incluye en el objeto combinado
			}
			const { createdAt: created, updatedAt: updated, ...dataFinal } = userWithPerson
			console.log(dataFinal)
			//console.log(userWithPerson)
			//console.log(userWithoutPerson)

			const accessToken = signJwtAccessToken(dataFinal)
			//console.log(accessToken)
			const result = { ...dataFinal, accessToken }
			console.log(result)
			return new Response(JSON.stringify(result), { status: 201 })
		} else {
			//console.log("401")
			return new Response(JSON.stringify("Credenciales inválidas"), { status: 401 })
		}
	} catch (error: any) {
		console.log("Error Api Login")
		console.error(error)

		return new NextResponse(error.message, { status: 500 })
	}
}
