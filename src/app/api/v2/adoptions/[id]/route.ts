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
	const adoption = await prisma.adoption.findUnique({ where: { id } })

	//!si no existe
	if (!adoption) {
		return new NextResponse(id ? `No existen usuario con id: ${id}` : `No existen usuario con id`, {
			status: 404,
		})
	}

	//! Desectructuracion de datos necesarios
	const { createdAt, updatedAt, ...adoptionWithoutData } = adoption || {}

	//! Retorna data de persons
	return NextResponse.json(adoptionWithoutData, { status: 200 })
}

//?metodo patch para modificar adopcion
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	//?se obtiene id por params
	const id = Number(params.id)
	//?se obtiene los datos del frontend
	const json = await request.json()
	//destructuracion de datos
	const { jobType, income, description, status, personDni } = json

	//tipo de datos
	const petId = Number(json.petId)

	try {
		const schema = Joi.object({
			petId: Joi.number().messages({
				"any.required": "Mascota es requerido",
				"number.base": "Mascota es tipo numero",
				"number.empty": "Mascota está vacio",
			}),
			personDni: Joi.string().required().min(10).max(10).messages({
				"any.required": "Cedula es requerida",
				"string.base": "La cédula solo contiene números",
				"string.empty": "La cédula está vacio",
				"string.min": "La cédula debe tener al menos 10 dígitos",
				"string.max": "La cédula no puede tener más de 10 dígitos",
			}),
			description: Joi.string().required().messages({
				"any.required": "Descripción requerido",
				"string.base": "Descripción tiene que ser solo letras",
				"string.empty": "Descripción está vacio",
			}),
			status: Joi.string().required().messages({
				"any.required": "Estado es requerido",
				"string.base": "Estado tiene que ser solo letras",
				"string.empty": "Estado es está vacio",
			}),
			income: Joi.number().required().min(100).max(100000).messages({
				"any.required": "Ingresos es requerido",
				"number.base": "Ingresos debe ser solo números",
				"number.empty": "Ingresos está vacio",
				"number.min": "Ingresos debe tener al menos 100 dolores",
				"number.max": "Ingresos no puede tener más de 100000 dolares",
			}),
			jobType: Joi.string().required().messages({
				"any.required": "Tipo de trabajo requerido",
				"string.base": "Tipo de trabajo tiene que ser solo letras",
				"string.empty": "Tipo de trabajo está vacio",
			}),
		})
		const { error } = schema.validate({ jobType, income, description, status, personDni, petId })

		if (error) {
			//! Retorna error en la validacion
			return new NextResponse(error.message, { status: 400 })
		}

		if (!verificarCedula(personDni)) {
			return new NextResponse(`Cedula no es valida`, { status: 400 })
		}

		//! Actualizacion de datos por id
		const adoption = await prisma.adoption.update({
			where: { id },
			data: { jobType, income, description, status, personDni, petId },
		})
		//! Desectructuracion de datos necesarios

		const { createdAt, updatedAt, ...adoptionWithoutData } = adoption
		//! Retorna respuesta, codigo 200

		return NextResponse.json(adoptionWithoutData, { status: 200 })
	} catch (error: any) {
		//!id No existe en el registro actual
		if (error.code === "P2025") {
			return new NextResponse(`No existe ID del registro adopción`, { status: 404 })
		}

		//!petID no existe del registro actual
		if (error.code === "P2003") {
			return new NextResponse(`No existe ID de mascota`, { status: 404 })
		}

		//!PetId no pertecene del registro actual
		if (error.code === "P2002") {
			return new NextResponse("DNI de usurio no pertenece al registro existente", { status: 404 })
		}
	}
}

//?metodo delete para eliminar adopcion
export async function POST(request: Request, { params }: { params: { id: string | number } }) {
	const id = Number(params.id)
	try {
		const schema = Joi.object({
			id: Joi.number().required().messages({
				"any.required": "ID Adopcion es requerida",
				"number.base": "ID Adopcion solo contiene números",
				"number.empty": "ID Adopcion está vacio",
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
			return new NextResponse("No existe registro de usuario", { status: 404 })
		}

		return new NextResponse(error.message, { status: 500 })
	}
}
