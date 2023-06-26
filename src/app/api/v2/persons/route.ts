"use server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

export async function GET(request: Request) {
	function isEmptyObject(obj: any): boolean {
		return Object.keys(obj).length === 0
	}
	const users = await prisma.person.findMany({
		include: { user: {} },
	})

	if (isEmptyObject(users)) {
		return new NextResponse("No existen datos de usuarios", { status: 404 })
	}

	const combinedUsers = users.map(({ createdAt, updatedAt, user, ...rest }) => ({
		...rest,
		...user,
		id: undefined,
		createdAt: undefined,
		updatedAt: undefined,
	}))

	return NextResponse.json(combinedUsers, { status: 200 })
}

export async function POST(request: Request) {
	const json = await request.json()

	const { userId, dni, firstName, lastName, phone, address, photo } = json
	const id = Number(userId)
	const birthDate = new Date(json.birthDate)

	try {
		const schema = Joi.object({
			userId: Joi.number().required().messages({
				"any.required": "ID es requerido",
				"number.base": "ID es tipo numero",
				"number.empty": "ID está vacio",
			}),
			dni: Joi.string().required().min(10).max(10).messages({
				"any.required": "Cedula es requerida",
				"string.base": "La cédula solo contiene números",
				"string.empty": "La cédula está vacio",
				"string.min": "La cédula debe tener al menos 10 dígitos",
				"string.max": "La cédula no puede tener más de 10 dígitos",
			}),
			birthDate: Joi.date().required().max("now").messages({
				"any.required": "La fecha es requerida",
				"date.base": "La fecha debe ser una válida",
				"date.empty": "La fecha no puede estar vacía",
				"date.max": "La fecha no puede ser posterior a la fecha actual",
			}),
			firstName: Joi.string().required().messages({
				"any.required": "Nombre requerido",
				"string.base": "Nombre tiene que ser solo letras",
				"string.empty": "Nombre está vacio",
			}),
			lastName: Joi.string().required().messages({
				"any.required": "Apellido requerido",
				"string.base": "Apellido tiene que ser solo letras",
				"string.empty": "Apellido está vacio",
			}),
			phone: Joi.string().required().min(10).max(10).messages({
				"any.required": "El telefono es requerido",
				"string.base": "El telefono debe ser solo números",
				"string.empty": "El telefono está vacio",
				"string.min": "El telefono debe tener al menos 10 dígitos",
				"string.max": "El telefono no puede tener más de 10 dígitos",
			}),
			address: Joi.string().required().messages({
				"any.required": "La dirreción requerido",
				"string.base": "La dirreción tiene que ser solo letras",
				"string.empty": "La dirreción está vacio",
			}),
			photo: Joi.string().required().messages({
				"any.required": "Selecione una foto es requerida",
				"string.base": "La descripcion debe usar caracteres válidos",
				"string.empty": "Selecione una foto",
			}),
		})
		const { error } = schema.validate({ dni, firstName, lastName, birthDate, phone, address, photo, userId })
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}

		const usuario = await prisma.person.create({
			data: { dni, firstName, lastName, birthDate, phone, address, photo, userId: id },
		})

		const { createdAt, updatedAt, ...usuarioWithoutData } = usuario

		return NextResponse.json(usuarioWithoutData, { status: 201 })
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse("Ya existe registro", {
				status: 409,
			})
		}

		return NextResponse.json(error.message, { status: 500 })
	}
}

export async function PATCH(request: Request) {
	const json = await request.json()
	const { dni, firstName, lastName, phone, address, photo } = json
	const userId = Number(json.userId)
	const birthDate = new Date(json?.birthDate)

	try {
		const schema = Joi.object({
			userId: Joi.number().required().messages({
				"any.required": "ID es requerido",
				"number.base": "ID es tipo numero",
				"number.empty": "ID está vacio",
			}),
			dni: Joi.string().required().min(10).max(10).messages({
				"any.required": "Cedula es requerida",
				"string.base": "La cédula solo contiene números",
				"string.empty": "La cédula es contiene solo números",
				"string.min": "La cédula debe tener al menos 10 dígitos",
				"string.max": "La cédula no puede tener más de 10 dígitos",
			}),
			birthDate: Joi.date().required().max("now").messages({
				"any.required": "La fecha es requerida",
				"date.base": "La fecha debe ser una válida",
				"date.empty": "La fecha no puede estar vacía",
				"date.max": "La fecha no puede ser posterior a la fecha actual",
			}),
			firstName: Joi.string().required().messages({
				"any.required": "Nombre requerido",
				"string.base": "Nombre tiene que ser solo letras",
				"string.empty": "Nombre está vacio",
			}),
			lastName: Joi.string().required().messages({
				"any.required": "Apellido requerido",
				"string.base": "Apellido tiene que ser solo letras",
				"string.empty": "Apellido está vacio",
			}),
			phone: Joi.string().required().min(10).max(10).messages({
				"any.required": "El telefono es requerido",
				"string.base": "El telefono debe ser solo números",
				"string.empty": "El telefono está vacio",
				"string.min": "El telefono debe tener al menos 10 dígitos",
				"string.max": "El telefono no puede tener más de 10 dígitos",
			}),
			address: Joi.string().required().messages({
				"any.required": "La calle requerida",
				"string.base": "La calle no tiene formato correcto",
				"string.empty": "La calle está vacio",
			}),
			photo: Joi.string().required().messages({
				"any.required": "La descripcion es requerida",
				"string.base": "La descripcion debe usar caracteres válidos",
				"string.empty": "La descripcion está vacio",
			}),
		})

		const { error } = schema.validate({ userId, dni, firstName, lastName, birthDate, phone, address, photo })
		if (error) {
			return new NextResponse(error.message, { status: 400 })
		}

		if (!verificarCedula(dni)) {
			return new NextResponse(`Cedula no es valida`, { status: 400 })
		}
		const usuario = await prisma.person.update({
			where: { userId },
			data: {
				dni,
				firstName,
				lastName,
				birthDate,
				phone,
				address,
				photo,
			},
		})

		const { createdAt, updatedAt, ...userwithoutData } = usuario

		return NextResponse.json(userwithoutData, { status: 200 })
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
		if (error.code === "P2025") {
			return new NextResponse(`No existe usuario que actualizar"`, {
				status: 409,
			})
		}
		return NextResponse.json(error.message, { status: 500 })
	}
}
