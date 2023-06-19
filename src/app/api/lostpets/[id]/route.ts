import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

type Pet = {
	id: string | number
	name: string
	type: string
	breed: string
	photo?: string
	description: string
	createdAt?: Date
	updatedAt?: Date
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id)

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

	const lostPets = await prisma.pet.findUnique({ where: { id } })

	if (!lostPets) {
		return new NextResponse("No existen mascota perdida", { status: 404 })
	}
	//! Desectructuracion de datos necesarios
	const { createdAt, updatedAt, ...lostPetsWithoutData } = lostPets || {}
	//! Retorna data de lostPets
	return NextResponse.json(lostPetsWithoutData, { status: 200 })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id)
	const json = await request.json()
	const { description, location, status } = json
	const petId = Number(json.petId)
	try {
		const schema = Joi.object({
			id: Joi.number().required().messages({
				"any.required": "ID es requerido",
				"number.base": "ID es tipo numero",
				"number.empty": "ID está vacio",
			}),
			description: Joi.string().required().messages({
				"any.required": "Descripción es requerida",
				"string.base": "Descripción solo contiene letras",
				"string.empty": "Descripción está vacio",
			}),
			location: Joi.string().required().messages({
				"any.required": "Lugar es requerido",
				"string.base": "Lugar solo contiene letras",
				"string.empty": "Lugar está vacio",
			}),
			petId: Joi.number().required().messages({
				"any.required": "Mascota es requerida",
				"number.base": "Mascota es ID contiene solo números",
				"number.empty": "Mascota está vacio",
			}),
			status: Joi.string().required().messages({
				"any.required": "Estado de mascota es requerido",
				"string.base": "Raza de mascota tiene que contener solo letras",
				"string.empty": "Raza de mascota está vacio",
			}),
		})
		const { error } = schema.validate({ petId, id, description, location, status })
		if (error) {
			//! Retorna error en la validacion
			return new NextResponse(error.message, { status: 400 })
		}
		//! Actualizacion de datos por ID
		const updatedPet = await prisma.lostPet.update({
			where: { id },
			data: { petId, description, location, status },
		})
		//! Desectructuracion de datos necesarios
		const { createdAt, updatedAt, ...petWithoutData } = updatedPet
		//! Retorna respuesta, codigo 200
		return NextResponse.json(petWithoutData, { status: 200 })
	} catch (error: any) {
		console.log(error)
		//!id No existe en el registro actual
		if (error.code === "P2025") {
			return new NextResponse(`No existe ID del registro ha actualizar`, { status: 404 })
		}
		//!petID no existe del registro actual
		if (error.code === "P2003") {
			return new NextResponse(`No existe ID de mascota perdida`, { status: 404 })
		}
		//!PetId no pertecene del registro actual
		if (error.code === "P2002") {
			return new NextResponse("ID de mascota no pertenece al registro existente", { status: 404 })
		}
	}
}

//Delete fix
export async function POST(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id)

	try {
		const schema = Joi.object({
			id: Joi.number().required().messages({
				"any.required": "ID es requerido",
				"number.base": "ID debe solo son números",
				"number.empty": "ID está vacio",
			}),
		})

		const { error } = schema.validate({ id })
		if (error) {
			//! Retorna error en la validacion de id si no es numero

			return new NextResponse(error.message, { status: 400 })
		}
		await prisma.lostPet.delete({ where: { id } })
		//! Retorna respuesta, codigo 204
		return new NextResponse(null, { status: 204 })
	} catch (error: any) {
		if (error.code === "P2025") {
			//! Retorna mensaje si no existe ID del registro
			return new NextResponse("No existe registro de mascota perdida", { status: 404 })
		}
		return new NextResponse(error.message, { status: 500 })
	}
}
