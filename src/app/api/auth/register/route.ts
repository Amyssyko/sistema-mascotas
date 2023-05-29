"use server"

import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import Joi from "joi"
import prisma from "@/lib/prisma"

interface RequestBody {
	email: string
	password: string
	confirm_password: string
}

export async function POST(request: Request) {
	const json: RequestBody = await request.json()
	console.log(`backend ${JSON.stringify(json)}`)
	try {
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
			confirm_password: Joi.string().valid(Joi.ref("password")).required().messages({
				"any.only": "Las contraseñas no coinciden",
			}),
		})

		const { error } = schema.validate(json)
		if (error) {
			console.log(error)
			return new NextResponse(error.message, { status: 400 })
		}

		const driver = await prisma.user.create({
			data: { email: json.email, password: await bcrypt.hash(json.password, 10) },
		})

		const { password, ...result } = driver
		console.log(result)
		return new NextResponse(JSON.stringify(result), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		})
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse(`Ya existe usuario registrado`, {
				status: 409,
			})
		}
		if (error.code === "P2000") {
			return new NextResponse("Verifique los la información ingresada", {
				status: 400,
			})
		}
		return new NextResponse(error.message, { status: 500 })
	}
}
