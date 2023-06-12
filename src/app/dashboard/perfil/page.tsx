"use client"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import React from "react"
import Usuario from "@/components/Form/Usuario"
import { useSession } from "next-auth/react"

interface Props {
	dni: string | undefined
}

function Page() {
	return (
		<LayoutDashboard>
			<h1>perfil</h1>
		</LayoutDashboard>
	)
}

export default Page
