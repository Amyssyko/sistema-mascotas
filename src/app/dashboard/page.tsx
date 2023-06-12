"use client"

import { UsuarioCardData } from "@/components/Cards/UsuarioCardData"
import Admin from "@/components/Navbar/Admin"
import { useSession } from "next-auth/react"
import Link from "next/link"
import * as React from "react"
import Loading from "@/components/Loading"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import SigninButton from "@/components/SigninButton"
import { useRouter } from "next/navigation"
import NoAdmin from "@/components/NoAdmin"

function Page() {
	const { data: session } = useSession()
	const [isClicked, setisClicked] = React.useState(false)

	const router = useRouter()

	if (session === undefined) {
		return <Loading />
	}
	if (!session?.user.role || session?.user.role === "USER") {
		setTimeout(() => {
			router.replace("/")
		}, 2000)
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
				<div>
					<UsuarioCardData bool={isClicked} />
				</div>
			</LayoutDashboard>
		</div>
	)
}

export default Page
