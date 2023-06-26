import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

//?metodo get para obtener personas
export async function GET(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id)

	//?esquema para validacion
	const schema = Joi.object({
		id: Joi.number().required().messages({
			"any.required": "ID es requerido",
			"number.base": "ID es tipo numero",
			"number.empty": "ID está vacio",
		}),
	})

	const { error } = schema.validate({ id })
	if (error) {
		//! Retorna error en la validacion
		return new NextResponse(error.message, { status: 400 })
	}

	//?query base de datos
	const user = await prisma.user.findUnique({ where: { id } })

	//!si no existe
	if (!user) {
		return new NextResponse(id ? `No existen post con ID: ${id}` : `No existen post con ID`, {
			status: 404,
		})
	}

	//! Retorna data de persons
	return NextResponse.json(user, { status: 200 })
}

//?metodo patch para modificar adopcion
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id)
	//?se obtiene id por params

	const json = await request.json()
	//destructuracion de datos

	const { email, role } = json

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
			//! Retorna error en la validacion
			return new NextResponse(error.message, { status: 400 })
		}

		//! Actualizacion de datos por id
		const user = await prisma.user.update({
			where: { id },
			data: { email, role },
		})

		//! Retorna respuesta, codigo 200

		return NextResponse.json(user, { status: 200 })
	} catch (error: any) {
		//!id No existe en el registro actual
		if (error.code === "P2025") {
			return new NextResponse(`No existe ID del Usuario`, { status: 404 })
		}

		//!petID no existe del registro actual
		if (error.code === "P2003") {
			return new NextResponse(`No existe ID de usuario`, { status: 404 })
		}

		//!PetId no pertecene del registro actual
		if (error.code === "P2002") {
			return new NextResponse("ID no pertenece al Usuario existente", { status: 404 })
		}
	}
}

//?metodo delete para eliminar adopcion
export async function POST(request: Request, { params }: { params: { id: string | number } }) {
	const id = Number(params.id)
	try {
		const schema = Joi.object({
			id: Joi.number().required().messages({
				"any.required": "ID post es requerida",
				"number.base": "ID post solo contiene números",
				"number.empty": "ID post está vacio",
			}),
		})

		const { error } = schema.validate({ id })

		if (error) {
			//! Retorna error en la validacion
			return new NextResponse(error.message, { status: 400 })
		}
		await prisma.person.delete({ where: { userId: id } })
		await prisma.user.delete({ where: { id } })

		//! Retorna respuesta, codigo 204
		return new NextResponse(null, { status: 204 })
	} catch (error: any) {
		if (error.code === "P2025") {
			//! Retorna mensaje si no existe id del registro
			return new NextResponse("No existe ID Usuario", { status: 404 })
		}

		return new NextResponse(error.message, { status: 500 })
	}
}
