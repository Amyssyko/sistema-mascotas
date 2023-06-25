import React from "react"
import { number } from "joi"
import { Mascota } from "@/components/Form/Mascota"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"

export default function Page({ params }: { params: { id: string } }) {
	const id = Number(params.id)

	return (
		<LayoutDashboard>
			<h1>{id}</h1>
			<Mascota id={id} />
		</LayoutDashboard>
	)
}
