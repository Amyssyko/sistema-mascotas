"use client"
import React from "react"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { Mascota } from "@/components/Form/Mascota"

function Page() {
	return (
		<LayoutDashboard>
			<h1>Mascotas</h1>
			<Mascota />
		</LayoutDashboard>
	)
}

export default Page
