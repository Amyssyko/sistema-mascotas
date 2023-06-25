"use client"
import React from "react"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { Perdido } from "@/components/Form/Perdido"

export default function Page({ params }: { params: { id: string } }) {
	const id = Number(params.id)
	return (
		<LayoutDashboard>
			<Perdido id={id} />
		</LayoutDashboard>
	)
}
