"use client"
import React from "react"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { Peticion } from "@/components/Form/Peticion"

function Page() {
	return (
		<LayoutDashboard>
			<Peticion />
		</LayoutDashboard>
	)
}

export default Page
