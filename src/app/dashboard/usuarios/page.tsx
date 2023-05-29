import FormUsuario from "@/components/FormUsuario"
import Layout from "@/layout/layout"
import React from "react"

function Page({ note }: any) {
	return (
		<Layout>
			<h1>{note}</h1>
			<FormUsuario />
		</Layout>
	)
}

export default Page
