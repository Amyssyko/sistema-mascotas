"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

const SigninButton = () => {
	const { data: session } = useSession()

	if (session && session.user) {
		return (
			<div className="grid grid-cols-1 gap-1 gap-x-4 mx-5">
				<span className="text-gray-900 text-xs">Email: {session?.user.email}</span>
				{session.user.name ? <p className="text-sky-900 text-xs">Nombre: {session?.user.name}</p> : null}
				<button
					onClick={() => signOut()}
					className=" col-span-1 mr-auto w-auto text-xs bg-red-800 rounded-md ml-1 py-2 px-4 shadow-md"
				>
					Cerrar Sesión
				</button>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 gap-1 gap-x-4 mx-5">
			<button
				onClick={() => signIn()}
				className="col-span-1 mr-auto w-auto text-sm shadow-sm border rounded-lg bg-green-600 hover:bg-green-700 text-white"
			>
				Iniciar Sesión
			</button>
		</div>
	)
}

export default SigninButton
