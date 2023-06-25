"use client"

import { Avatar, Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

const SigninButton = () => {
	const { data: session } = useSession()

	if (session && session.user) {
		return (
			<Card className="w-56 mx-auto mt-24">
				<CardHeader floated={false} className="h-36 flex items-center justify-center">
					<Avatar
						src="https://source.unsplash.com/random?wallpapers"
						variant="rounded"
						alt="avatar"
						size="xxl"
					/>
				</CardHeader>
				<CardBody className="text-center ">
					<Typography variant="h4" color="blue-gray" className=" text-lg text-center">
						{session?.user?.firstName && session?.user?.lastName
							? `${session?.user.firstName} ${session?.user.lastName}`
							: "Usuario"}
					</Typography>
					<Typography color="red" className=" text-xs uppercase text-center" textGradient>
						{session?.user.role}
					</Typography>
					<Typography variant="lead" color="light-blue" className=" text-xs text-center" textGradient>
						{session?.user.email}
					</Typography>
					<Typography variant="lead" color="light-blue" className=" text-xs  text-center" textGradient>
						{session?.user?.phone ? `0${session?.user.phone}` : ""}
					</Typography>
					<Button
						size="sm"
						className="text-sm shadow-sm border rounded-md bg-red-500 hover:bg-red-700 text-white"
						onClick={() => signOut()}
					>
						Cerrar Sesión
					</Button>
				</CardBody>
			</Card>
		)
	}

	return (
		<Card className="w-auto my-auto">
			<Button
				onClick={() => signIn()}
				className="col-span-1 mx-auto w-auto shadow-md text-sm  border rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
			>
				Iniciar Sesión
			</Button>
		</Card>
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
