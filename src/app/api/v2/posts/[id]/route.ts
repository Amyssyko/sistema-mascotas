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
	const post = await prisma.post.findUnique({ where: { id }, include: { Pet: {} } })

	//!si no existe
	if (!post) {
		return new NextResponse(id ? `No existen post con ID: ${id}` : `No existen post con ID`, {
			status: 404,
		})
	}
	const { Pet, ...rest } = post
	const data = { ...Pet, ...rest, createdAt: undefined, updatedAt: undefined }

	//! Retorna data de persons
	return NextResponse.json(data, { status: 200 })
}

//?metodo patch para modificar adopcion
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id)
	//?se obtiene id por params

	const json = await request.json()
	//destructuracion de datos

	const { description, isActived } = json
	//tipo de datos
	const userId = Number(json.userId)
	const petId = Number(json.petId)

	try {
		const schema = Joi.object({
			petId: Joi.number().messages({
				"any.required": "Mascota es requerido",
				"number.base": "Mascota es tipo numero",
				"number.empty": "Mascota está vacio",
			}),
			isActived: Joi.boolean().required().messages({
				"any.required": "Status de post es requerida",
				"boolean.base": "Status de post es de tipo boolean",
				"boolean.empty": "Status de post está vacio",
			}),
			description: Joi.string().required().messages({
				"any.required": "Descripción requerido",
				"string.base": "Descripción tiene que ser solo letras",
				"string.empty": "Descripción está vacio",
			}),
			userId: Joi.number().required().messages({
				"any.required": "ID usuario es requerido",
				"number.base": "ID usuario debe ser solo números",
				"number.empty": "ID usuario está vacio",
			}),
		})
		const { error } = schema.validate({ description, isActived, userId, petId })

		if (error) {
			//! Retorna error en la validacion
			return new NextResponse(error.message, { status: 400 })
		}

		//! Actualizacion de datos por id
		const post = await prisma.post.update({
			where: { id },
			data: { description, isActived, userId, petId },
		})

		//! Retorna respuesta, codigo 200

		return NextResponse.json(post, { status: 200 })
	} catch (error: any) {
		//!id No existe en el registro actual
		if (error.code === "P2025") {
			return new NextResponse(`No existe ID del post`, { status: 404 })
		}

		//!petID no existe del registro actual
		if (error.code === "P2003") {
			return new NextResponse(`No existe ID de usuario`, { status: 404 })
		}

		//!PetId no pertecene del registro actual
		if (error.code === "P2002") {
			return new NextResponse("Mascota no pertenece al post existente", { status: 404 })
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
		await prisma.adoption.delete({ where: { id } })

		//! Retorna respuesta, codigo 204
		return new NextResponse(null, { status: 204 })
	} catch (error: any) {
		if (error.code === "P2025") {
			//! Retorna mensaje si no existe id del registro
			return new NextResponse("No existe ID de post", { status: 404 })
		}

		return new NextResponse(error.message, { status: 500 })
	}
}
