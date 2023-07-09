"use client"
import React from "react"
import LayoutHome from "@/components/Layout/LayoutHome"
import { Solicitar } from "@/components/Form/Solicitar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"

export default function Page({ params }: { params: { id: string } }) {
	const id = Number(params.id)
	const { data: session } = useSession()
	const router = useRouter()

	if (session?.user === undefined) {
		router.replace("/auth/login")
		return <Loading />
	}

	if (session?.user.dni === undefined) {
		router.replace("/perfil")
		return <Loading />
	}
	return (
		<LayoutHome>
			<Solicitar id={id} />
		</LayoutHome>
	)
}
