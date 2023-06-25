"use client"
import React from "react"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { Rol } from "@/components/Form/Rol"

function Page({ params }: { params: { id: string } }) {
	const id = Number(params.id)
	return (
		<LayoutDashboard>
			<Rol ID={id} />
		</LayoutDashboard>
	)
}

export default Page
