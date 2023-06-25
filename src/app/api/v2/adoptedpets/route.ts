import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
	function isEmptyObject(obj: any): boolean {
		return Object.keys(obj).length === 0
	}
	const adoptions = await prisma.adoption.findMany({
		include: { person: {}, pet: {} },
	})

	if (isEmptyObject(adoptions)) {
		return new NextResponse("No existen datos de adopciones", { status: 404 })
	}

	const transformedData = adoptions
		.filter((item) => item.petId !== null)
		.map((item) => {
			return {
				petId: item?.petId,
				status: item?.status,
				personDni: item?.personDni,
				firstName: item?.person?.firstName,
				lastName: item?.person?.lastName,
				phone: item?.person?.phone,
				address: item?.person?.address,
				name: item?.pet?.name,
				typePet: item?.pet?.typePet,
				breed: item?.pet?.breed,
				updatedAt: item?.pet?.updatedAt,
			}
		})

	return NextResponse.json(transformedData, { status: 200 })
}
