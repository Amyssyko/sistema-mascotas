"use server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

type Person = {
	person?: FormUser[]
}
type RequestUser = {
	userId?: number
	email?: string
}

type FormUser = {
	dni: string
	firstName: string
	lastName: string
	birthDate: Date
	phone: number
	address: string
	photo: string
	userId?: number
}

export async function GET(request: Request) {
	function isEmptyObject(obj: any): boolean {
		return Object.keys(obj).length === 0
	}

	const users = await prisma.person.findMany()
	if (isEmptyObject(users)) {
		return new NextResponse("No existen datos de usuarios", { status: 201 })
	}
	return new NextResponse(JSON.stringify(users), { status: 200 })
}

export async function POST(request: Request) {
	const json = await request.json()

	try {
		if (!verificarCedula(json.dni)) {
			return new NextResponse(`${json.dni} no es valida`, { status: 400 })
		}

		const schema = Joi.object({
			dni: Joi.string().required().min(10),
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			birthDate: Joi.string().required(),
			phone: Joi.string().required(),
			address: Joi.string().required(),
			photo: Joi.string().required(),
			userId: Joi.string().required(),
		})

		const { error } = schema.validate(json)
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}

		const driver = await prisma.person.create({
			data: json,
		})

		return new NextResponse(JSON.stringify(driver), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		})
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse(`Ya existe cedula "${json.dni}"`, {
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
