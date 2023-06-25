import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

//?metodo get para obtener personas
export async function GET(request: Request, { params }: { params: { id: string } }) {
	const dni = params.id

	//?esquema para validacion
	const schema = Joi.object({
		dni: Joi.string().required().messages({
			"any.required": "ID es requerido",
			"string.base": "ID es tipo numero",
			"string.empty": "ID está vacio",
		}),
	})

	const { error } = schema.validate({ dni })
	if (error) {
		//! Retorna error en la validacion
		return new NextResponse(error.message, { status: 400 })
	}

	//?query base de datos
	const person = await prisma.person.findUnique({ where: { dni } })

	//!si no existe
	if (!person) {
		return new NextResponse(dni ? `No existen usuario con DNI: ${dni}` : `No existen usuario con DNI`, {
			status: 404,
		})
	}

	//! Desectructuracion de datos necesarios
	const { createdAt, updatedAt, ...personWithoutData } = person || {}

	//! Retorna data de persons
	return NextResponse.json(personWithoutData, { status: 200 })
}

//?metodo patch para modificar mascotas perdidas
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	//?se obtiene id por params
	const dni = params.id
	//?se obtiene los datos del frontend
	const json = await request.json()
	//destructuracion de datos
	const { firstName, lastName, phone, address, photo } = json

	//tipo de datos
	const birthDate = new Date(json?.birthDate)
	const userId = Number(json?.userId)

	try {
		if (!verificarCedula(dni)) {
			return new NextResponse(`Cedula no es valida`, { status: 400 })
		}

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
			//! Retorna error en la validacion
			return new NextResponse(error.message, { status: 400 })
		}

		//! Actualizacion de datos por DNI
		const updatedPerson = await prisma.person.update({
			where: { dni },
			data: { userId, firstName, lastName, birthDate, phone, address, photo },
		})
		//! Desectructuracion de datos necesarios

		const { createdAt, updatedAt, ...updatedPersonWithoutData } = updatedPerson
		//! Retorna respuesta, codigo 200

		return NextResponse.json(updatedPersonWithoutData, { status: 200 })
	} catch (error: any) {
		//!id No existe en el registro actual
		if (error.code === "P2025") {
			return new NextResponse(`No existe DNI del registro ha actualizar`, { status: 404 })
		}

		//!petID no existe del registro actual
		if (error.code === "P2003") {
			return new NextResponse(`No existe DNI de mascota perdida`, { status: 404 })
		}

		//!PetId no pertecene del registro actual
		if (error.code === "P2002") {
			return new NextResponse("DNI de usurio no pertenece al registro existente", { status: 404 })
		}
	}
}

//?metodo delete para  eliminar mascotas perdidas
export async function POST(request: Request, { params }: { params: { id: string } }) {
	const dni = params.id
	try {
		const schema = Joi.object({
			dni: Joi.string().required().min(10).max(10).messages({
				"any.required": "Cedula es requerida",
				"string.base": "La cédula solo contiene números",
				"string.empty": "La cédula es contiene solo números",
				"string.min": "La cédula debe tener al menos 10 dígitos",
				"string.max": "La cédula no puede tener más de 10 dígitos",
			}),
		})

		const { error } = schema.validate({ dni })

		if (error) {
			//! Retorna error en la validacion
			return new NextResponse(error.message, { status: 400 })
		}
		await prisma.person.delete({ where: { dni } })

		//! Retorna respuesta, codigo 204
		return new NextResponse(null, { status: 204 })
	} catch (error: any) {
		if (error.code === "P2025") {
			//! Retorna mensaje si no existe DNI del registro
			return new NextResponse("No existe registro de usuario", { status: 404 })
		}

		return new NextResponse(error.message, { status: 500 })
	}
}
