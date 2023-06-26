"use server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

export async function POST(request: Request) {
	//?se obtiene los datos del frontend

	const json = await request.json()

	//destructuracion de datos

	const { jobType, income, description, personDni } = json
	//tipo de datos

	try {
		const schema = Joi.object({
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
		const { error } = schema.validate({ jobType, income, description, personDni })
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}
		if (!verificarCedula(personDni)) {
			return new NextResponse(`Cedula no es valida`, { status: 400 })
		}
		const adoption = await prisma.adoption.create({
			data: { jobType, income, description, personDni },
		})

		const { createdAt, updatedAt, ...adoptionWithoutData } = adoption

		return NextResponse.json(adoptionWithoutData, { status: 201 })
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse("Ya existe registro", {
				status: 409,
			})
		}

		return NextResponse.json(error.message, { status: 500 })
	}
}
