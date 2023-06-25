"use server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Joi from "joi"
import { verificarCedula } from "udv-ec"

export async function GET(request: Request) {
	function isEmptyObject(obj: any): boolean {
		return Object.keys(obj).length === 0
	}
	const posts = await prisma.post.findMany({
		include: { Pet: {} },
	})

	if (isEmptyObject(posts)) {
		return new NextResponse("No existen datos de posts", { status: 404 })
	}

	const combinedPosts = posts.map(({ Pet, ...rest }) => ({
		...rest,
		...Pet,
		createdAt: undefined,
		updatedAt: undefined,
	}))
	return NextResponse.json(combinedPosts, { status: 200 })
}

export async function POST(request: Request) {
	//?se obtiene los datos del frontend

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
			return new NextResponse(error.message, { status: 400 })
		}

		const adoption = await prisma.post.create({
			data: { description, isActived, userId, petId },
		})

		return NextResponse.json(adoption, { status: 201 })
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse("Ya existe post", { status: 409 })
		}

		return NextResponse.json(error.message, { status: 500 })
	}
}
