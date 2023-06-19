"use server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

type Pets = {
	pet?: Pet[]
}
type RequestUser = {
	userId?: number
	email?: string
}

interface Pet {
	id: string | number
	name: string
	type: string
	breed: string
	photo?: string
	description: string
}

export async function GET(request: Request) {
	function isEmptyObject(obj: any): boolean {
		return Object.keys(obj).length === 0
	}
	const lostpets = await prisma.lostPet.findMany({})

	if (isEmptyObject(lostpets)) {
		//! Retorna mensaje si no existe datos
		return new NextResponse("No existen datos de mascotas perdidas", { status: 404 })
	}

	//! Desectructuracion de datos necesarios usando map
	const combinedLostPets = lostpets.map(({ createdAt, updatedAt, ...rest }) => ({
		...rest,
		createdAt: undefined,
		updatedAt: undefined,
	}))

	return NextResponse.json(combinedLostPets, { status: 200 })
}

export async function POST(request: Request) {
	const json = await request.json()
	const { description, location, status } = json
	const petId = Number(json.petId)

	try {
		const schema = Joi.object({
			/**id: Joi.number().required().messages({
				"any.required": "ID es requerido",
				"number.base": "ID es tipo numero",
				"number.empty": "ID está vacio",
			}), */
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
		const { error } = schema.validate({ description, location, status, petId })
		if (error) {
			//! Retorna error en la validacion

			return new NextResponse(error.message, { status: 400 })
		}
		//! Crea registro
		const pet = await prisma.lostPet.create({
			data: { description, location, status, petId },
		})
		//! Desectructuracion de datos necesarios

		const { createdAt, updatedAt, ...petWithoutData } = pet
		//! Retorna data actualizada de lostPets
		return NextResponse.json(petWithoutData, { status: 201 })
	} catch (error: any) {
		if (error.code === "P2002") {
			//!id Si existe  ID en el registro actual
			return new NextResponse("Ya existe registro de mascota perdida", { status: 409 })
		}

		return new NextResponse(error.message, { status: 500 })
	}
}
