"use client"
import React from "react"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { Peticion } from "@/components/Form/Peticion"

export default function Page({ params }: { params: { id: string } }) {
	const id = Number(params.id)
	return (
		<LayoutDashboard>
			<Peticion id={id} />
		</LayoutDashboard>
	)
}
