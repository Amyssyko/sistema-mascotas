"use client"

import * as React from "react"

import { useError } from "@hooks/useError"
import axios, { AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react"

export default function SignInSide() {
	const router = useRouter()

	const { myError, isErrored, handleError, resetError } = useError()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		resetError()
		const formData = new FormData(event.currentTarget)
		const email = formData.get("email")
		const password = formData.get("password")

		// Validación en el frontend
		const isEmailEmpty = !email
		const isPasswordEmpty = !password

		const errorMessage =
			isEmailEmpty || isPasswordEmpty
				? `${isEmailEmpty ? "Por favor, ingrese un correo." : ""}
			 ${isPasswordEmpty ? "Por favor, ingrese una contraseña." : ""}`
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}

		try {
			const response: AxiosResponse = await axios.post("/api/auth/login", {
				email,
				password,
			})

			//console.log(response.status)
			if (response.status === 201) {
				toast.success("Iniciando Sesión", {
					duration: 1000,
					position: "top-center",
					icon: "✅",
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
				router.push("/dashboard")
			}
		} catch (error: any) {
			//console.log(error.response.data)
			//console.log(error.response.status)

			if (error.response && error.response.status) {
				toast.error(error.response.data, {
					duration: 3000,
					position: "top-left",

					// Custom Icon
					icon: "❌",

					// Change colors of success/error/loading icon
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
				handleError(error.response.data)
			}
			router.refresh()
		}
	}

	return (
		<Card className="my-auto mx-auto flex justify-center items-center" color="transparent" shadow={true}>
			<Typography variant="h4" color="white">
				Inicio de Sesión
			</Typography>
			<Typography color="gray" className="mt-1 font-normal">
				Ingresa sus credenciales
			</Typography>
			<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
				<div className="mb-4 flex flex-col gap-6  ">
					<Input size="lg" label="Email" type="text" color="white" placeholder="example@example.com" />
					<Input type="password" size="lg" label="Password" />
				</div>

				<Button className="mt-6" fullWidth>
					Ingresar
				</Button>
				<Typography color="gray" className="mt-4 text-center font-normal">
					Already have an account?{" "}
					<a href="#" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
						Sign In
					</a>
				</Typography>
			</form>
		</Card>
	)
}
