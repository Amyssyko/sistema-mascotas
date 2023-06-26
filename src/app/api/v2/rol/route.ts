"use server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"

export async function GET(request: Request) {
	function isEmptyObject(obj: any): boolean {
		return Object.keys(obj).length === 0
	}
	const user = await prisma.user.findMany({})

	if (isEmptyObject(user)) {
		return new NextResponse("No existen datos de Usuarios", { status: 404 })
	}

	return NextResponse.json(user, { status: 200 })
}

export async function PATCH(request: Request) {
	const json = await request.json()
	const { email, role } = json
	const id = Number(json.id)

	try {
		const schema = Joi.object({
			id: Joi.number().required().messages({
				"any.required": "ID es requerido",
				"number.base": "ID es tipo numero",
				"number.empty": "ID está vacio",
			}),
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "es", "ec"] } })
				.required()
				.messages({
					"string.empty": "El correo es requerido",
					"string.email": "El correo no es válido",
				}),
			role: Joi.string().required().messages({
				"any.required": "Nombre requerido",
				"string.base": "Nombre tiene que ser solo letras",
				"string.empty": "Nombre está vacio",
			}),
		})

		const { error } = schema.validate({ id, email, role })
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}

		const user = await prisma.user.update({
			where: { id },
			data: {
				email,
				role,
			},
		})

		return NextResponse.json(user, { status: 200 })
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse(`Ya existe Usuario "${json.dni}"`, {
				status: 409,
			})
		}
		if (error.code === "P2000") {
			return new NextResponse("Verifique los la información ingresada", {
				status: 400,
			})
		}
		if (error.code === "P2025") {
			return new NextResponse(`No existe Usuario que actualizar"`, {
				status: 409,
			})
		}
		return NextResponse.json(error.message, { status: 500 })
	}
}
