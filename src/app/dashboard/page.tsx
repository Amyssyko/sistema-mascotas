"use client"

import { useSession } from "next-auth/react"
import * as React from "react"
import Loading from "@/components/Loading"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import SigninButton from "@/components/SigninButton"
import { useRouter } from "next/navigation"
import NoAdmin from "@/components/NoAdmin"

function Page() {
	const { data: session } = useSession()
	console.log(session?.user.role)
	const router = useRouter()

	if (session?.user === undefined) {
		return <Loading />
	}
	if (!session?.user.role || session?.user.role === "USER") {
		setTimeout(() => {
			router.replace("/")
		}, 2000)
		//? Si no es administrador muestra mensaje "Sin privilegios"
		//? Envia al inicio
		return <NoAdmin />
	}
	return (
		<div>
			<LayoutDashboard>
				<SigninButton />
				<h1>hola</h1>
				<section>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti optio corrupti quis
						quam nesciunt explicabo libero facilis autem porro repudiandae cum delectus repellat perferendis,
						atque accusantium voluptas sunt veniam!
					</p>
				</section>
			</LayoutDashboard>
		</div>
	)
}

export default Page
