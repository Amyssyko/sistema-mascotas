"use client"
import Usuario from "@/components/Form/Usuario"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { number } from "joi"
import { useSession } from "next-auth/react"
import React from "react"

interface UsuarioProps {
	id: string | number | undefined
	correo: string | undefined
	dni: string | undefined
}

function Page() {
	const { data: session } = useSession()

	const id = session?.user?.id
	const correo = session?.user?.email
	const dni = session?.user?.dni

	return (
		<LayoutDashboard>
			<Usuario id={id} correo={correo} cedula={dni} />
		</LayoutDashboard>
	)
}

export default Page
