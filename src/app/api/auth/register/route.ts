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

	try {
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
				"string.empty": "Contraseña está vacia",
				"string.pattern.base":
					"La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula",
			}),
			confirm_password: Joi.string().required().valid(Joi.ref("password")).messages({
				"string.empty": "La confirmación de contraseña es requerida",
				"any.only": "Las contraseñas no coinciden",
			}),
		})

		const { error } = schema.validate(json)
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}

		const usuario = await prisma.user.create({
			data: { email: json.email, password: await bcrypt.hash(json.password, 10) },
		})

		const { password, ...result } = usuario

		return NextResponse.json(result, { status: 201 })
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse(`Ya existe usuario registrado`, {
				status: 409,
			})
		}
		return new NextResponse(error.message, { status: 500 })
	}
}
