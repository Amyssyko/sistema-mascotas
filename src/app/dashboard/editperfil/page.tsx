"use client"
import Usuario from "@/components/Form/Usuario"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { number } from "joi"
import { useSession } from "next-auth/react"
import React from "react"

interface UsuarioProps {
	id: string | number | undefined
	correo: string | undefined
}

function Page() {
	const { data: session } = useSession()

	const id = session?.user?.id
	const correo = session?.user?.email
	return (
		<LayoutDashboard>
			<Usuario id={id} correo={correo} />
		</LayoutDashboard>
	)
}

export default Page
