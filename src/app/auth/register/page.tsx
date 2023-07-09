"use client"

import * as React from "react"
import { Card, Typography, Input, Button, Alert } from "@material-tailwind/react"

import { useError } from "@hooks/useError"
import axios, { AxiosResponse, AxiosError } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function SignUp() {
	const router = useRouter()

	const [formValues, setFormValues] = React.useState({
		email: "",
		password: "",
		confirm_password: "",
	})
	const { myError, isErrored, handleError, resetError } = useError()

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormValues((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		//resetError()
		const { email, password, confirm_password } = formValues
		//const formData = new FormData(event.currentTarget)
		//const email = formData.get("email")
		//const password = formData.get("password")
		//const confirmPassword = formData.get("confirm_password")

		const isEmailEmpty = !email
		const isPasswordEmpty = !password
		const isconfirmPassword = !confirm_password
		const doPasswordsMatch = password === confirm_password

		const errorMessage =
			isEmailEmpty && isPasswordEmpty && doPasswordsMatch
				? "Verifique que todos los campos sean completados."
				: isEmailEmpty
				? "Correo requerido"
				: isPasswordEmpty
				? "Contraseña requerida"
				: isconfirmPassword
				? "Contraseña de confirmacion requerida"
				: !doPasswordsMatch
				? "Contraseña no coinciden"
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}

		try {
			const response: AxiosResponse = await axios.post("/api/auth/register", {
				email,
				password,
				confirm_password,
			})

			if (response.status === 201) {
				toast.success("Usuario registrado con éxito", {
					duration: 3000,
					position: "top-left",

					// Custom Icon
					icon: "✅",

					// Change colors of success/error/loading icon
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
			}
			router.replace("/auth/login")
		} catch (error: Error | AxiosError | any) {
			console.error(error)
			handleError(error.response.data)
			setFormValues({
				email: "",
				password: "",
				confirm_password: "",
			})

			console.error(`${error.response.data} (${error.response.status})`)
			if (error.response && error.response.status) {
				toast.error(error.response.data, {
					duration: 3000,
					position: "top-left",
					icon: "❌",
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
			}

			router.refresh()
			//resetError()
		}
	}

	return (
		<div className="bg-white w-full">
			<div className="mx-auto h-screen">
				<Card
					className="my-auto pt-48 mx-auto flex justify-center items-center"
					color="transparent"
					shadow={false}
				>
					<Typography variant="h3" color="blue">
						Registro
					</Typography>
					<Typography color="gray" className="mt-1 font-normal">
						Ingrese sus credenciales
					</Typography>
					<form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
						<div className="mb-4 flex flex-col gap-6  ">
							<Input
								size="lg"
								name="email"
								id="email"
								label="Email"
								type="text"
								placeholder="example@example.com"
								value={formValues.email}
								onChange={handleInputChange}
							/>
							<Input
								type="password"
								name="password"
								id="password"
								size="lg"
								label="Contraseña"
								placeholder="********"
								value={formValues.password}
								onChange={handleInputChange}
							/>
							<Input
								type="password"
								name="confirm_password"
								id="confirm_password"
								size="lg"
								label="Confirmar Contraseña"
								placeholder="********"
								value={formValues.confirm_password}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							{isErrored && (
								<Alert color="orange" variant="ghost" className=" text-sm">
									{myError?.message}
								</Alert>
							)}
						</div>
						<Button type="submit" className="mt-6" fullWidth>
							Registrarse
						</Button>
						<Typography color="gray" className="mt-4 text-center font-normal">
							Ya tienes una cuenta?
							<a
								href="/auth/login"
								className="font-medium text-blue-500 transition-colors hover:text-blue-700 ml-1"
							>
								Iniciar Sesión
							</a>
						</Typography>
					</form>
				</Card>
			</div>
		</div>
	)
}
