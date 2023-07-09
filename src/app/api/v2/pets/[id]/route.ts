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

	const pet = await prisma.pet.findUnique({
		where: { id },
	})

	if (!pet) {
		return new NextResponse(`No existen datos de mascota ID: ${id}`, { status: 404 })
	}

	const { createdAt, updatedAt, ...petWithoutData } = pet || {}

	return NextResponse.json(petWithoutData, { status: 200 })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id)
	const json = await request.json()
	const { name, typePet, breed, photo, description } = json
	const age = Number(json.age)
	const month = Number(json.month)
	try {
		const schema = Joi.object({
			id: Joi.number().required().messages({
				"any.required": "ID es requerido",
				"number.base": "ID es tipo numero",
				"number.empty": "ID está vacio",
			}),
			name: Joi.string().required().messages({
				"any.required": "Nombre mascota requerido",
				"string.base": "Nombre mascota tiene que ser solo letras",
				"string.empty": "Nombre mascota está vacio",
			}),
			typePet: Joi.string().required().messages({
				"any.required": "Tipo mascota requerido",
				"string.base": "Tipo mascota tiene que ser solo letras",
				"string.empty": "Tipo mascota está vacio",
			}),
			age: Joi.number().required().min(0).max(30).messages({
				"any.required": "Edad año de mascota es requerida",
				"number.base": "Edad año de mascota solo contiene números",
				"number.empty": "Edad año de mascota está vacio",
				"number.min": "Edad año de mascota no puede tener menos de 0 años",
				"number.max": "Edad año de mascota no puede tener más de 30 años",
			}),
			month: Joi.number().required().min(0).max(11).messages({
				"any.required": "Edad Mes/es de mascota es requerida",
				"number.base": "Edad Mes/es de mascota solo contiene números",
				"number.empty": "Edad Mes/es de mascota está vacio",
				"number.min": "Edad Mes/es de mascota no puede tener menos de 0 meses",
				"number.max": "Edad Mes/es de mascota no puede tener más 11 meses",
			}),
			breed: Joi.string().required().messages({
				"any.required": "Raza de mascota es requerido",
				"string.base": "Raza de mascota tiene que contener solo letras",
				"string.empty": "Raza de mascota está vacio",
			}),
			photo: Joi.string().required().messages({
				"any.required": "Selecione una foto es requerida",
				"string.base": "La foto debe valido",
				"string.empty": "Selecione una foto",
			}),
			description: Joi.string().required().messages({
				"any.required": "Descripción es requerido",
				"string.base": "Descripción es tiene que ser solo letras",
				"string.empty": "Descripción está vacio",
			}),
		})
		const { error } = schema.validate({ id, name, typePet, age, month, breed, photo, description })
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}
		const updatedPet = await prisma.pet.update({
			where: { id },
			data: { name, typePet, age, month, breed, photo, description },
		})
		const { createdAt, updatedAt, ...petWithoutData } = updatedPet

		return NextResponse.json(petWithoutData, { status: 200 })
	} catch (error: any) {
		if (error.code === "P2025") {
			return new NextResponse(`No existe ID para actualizar`, { status: 404 })
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
			return new NextResponse(error.message, { status: 400 })
		}
		await prisma.pet.delete({
			where: { id },
		})

		return new NextResponse(null, { status: 204 })
	} catch (error: any) {
		if (error.code === "P2025") {
			return new NextResponse("No existe registro de mascota", { status: 404 })
		}

		return new NextResponse(error.message, { status: 500 })
	}
}
