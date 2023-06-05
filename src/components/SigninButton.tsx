"use client"

import { Avatar, Card, CardBody, CardFooter, CardHeader, Tooltip, Typography } from "@material-tailwind/react"
import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

const SigninButton = () => {
	const { data: session } = useSession()

	//console.log(session)

	if (session && session.user) {
		return (
			<Card className="w-56">
				<CardHeader floated={false} className="h-36 flex items-center justify-center">
					<Avatar
						src="https://source.unsplash.com/random?wallpapers"
						variant="rounded"
						alt="avatar"
						size="xxl"
					/>
				</CardHeader>
				<CardBody className="text-center ">
					<Typography variant="h4" color="blue-gray" className=" text-lg">
						{`${session?.user.firstName} ${session?.user.lastName}`}
					</Typography>
					<Typography color="red" className=" text-xs uppercase" textGradient>
						{session?.user.role}
					</Typography>
					<Typography variant="lead" color="light-blue" className=" text-xs text-left" textGradient>
						{`${session?.user.email}`}
					</Typography>
					<Typography variant="lead" color="light-blue" className=" text-xs text-left" textGradient>
						{`0${session?.user.phone}`}
					</Typography>
				</CardBody>
			</Card>
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

{
	/**<div className="grid grid-cols-1 gap-1 gap-x-4 mx-5">
				{session && session.user?.id ? <p className="text-sky-900 text-xs">ID: {session?.user.id}</p> : ""}
				{session && session.user?.dni ? <p className="text-sky-900 text-xs">DNI: {session?.user.dni}</p> : ""}
				{session && session.user?.email ? (
					<p className="text-sky-900 text-xs">Email: {session?.user.email}</p>
				) : (
					""
				)}
				{session && session.user?.firstName ? (
					<p className="text-sky-900 text-xs">Nombre: {session?.user.firstName}</p>
				) : (
					""
				)}
				{session && session.user?.lastName ? (
					<p className="text-sky-900 text-xs">Apellido: {session?.user.lastName}</p>
				) : (
					""
				)}
				{session && session.user?.phone ? (
					<p className="text-sky-900 text-xs">Celular: {`0${session?.user.phone}`}</p>
				) : (
					""
				)}

				{session?.user.photo ? <p className="text-sky-900 text-xs">Foto: {session?.user.photo}</p> : null}
				<button
					onClick={() => signOut()}
					className=" col-span-1 mr-auto w-auto text-xs bg-red-800 rounded-md ml-1 py-2 px-4 shadow-md"
				>
					Cerrar Sesión
				</button>
			</div> */
}
