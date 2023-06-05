"use client"

import * as React from "react"
import {
	Card,
	Typography,
	Input,
	Button,
	Alert,
} from "@material-tailwind/react"

import { useError } from "@hooks/useError"
import axios, { AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function SignUp() {
	const router = useRouter()
	const { myError, isErrored, handleError, resetError } = useError()

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		resetError()
		const formData = new FormData(event.currentTarget)
		const email = formData.get("email")
		const password = formData.get("password")
		const confirmPassword = formData.get("confirm_password")

		//console.log(email + " " + password + " " + confirmPassword)
		// Validación en el frontend
		const isEmailEmpty = !email
		const isPasswordEmpty = !password
		const doPasswordsMatch = password === confirmPassword

		const errorMessage =
			isEmailEmpty || isPasswordEmpty || !doPasswordsMatch
				? `${isEmailEmpty ? "Ingrese un correo." : ""}
           ${isPasswordEmpty ? "Ingrese una contraseña." : ""}
           ${!doPasswordsMatch ? "Las contraseñas no coinciden." : ""}`
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}

		try {
			const response: AxiosResponse = await axios.post("/api/auth/register", {
				email,
				password,
				confirm_password: confirmPassword,
			})

			//console.log(response.status)
			if (response.status === 201) {
				//console.log("registro creado")
				toast.success("Usuario registrado", {
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
				console.log("pasa")
			}
			router.push("./auth/login")
		} catch (error: any) {
			console.error(`${error.response.data} (${error.response.status})`)
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
		//event.currentTarget.reset()
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
						Ingresa sus credenciales
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
							/>
							<Input
								type="password"
								name="password"
								id="password"
								size="lg"
								label="Password"
								placeholder="********"
							/>
							<Input
								type="password"
								name="confirm_password"
								id="confirm_password"
								size="lg"
								label="Confirmar Contraseña"
								placeholder="********"
							/>
						</div>
						{isErrored && (
							<Alert color="orange" variant="ghost">
								{myError?.message}
							</Alert>
						)}
						<Button type="submit" className="mt-6" fullWidth>
							Ingresar
						</Button>
						<Typography color="gray" className="mt-4 text-center font-normal">
							Already have an account?{" "}
							<a
								href="/auth/register"
								className="font-medium text-blue-500 transition-colors hover:text-blue-700"
							>
								Registrarse
							</a>
						</Typography>
					</form>
				</Card>
			</div>
		</div>
	)
}

{
	/**<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Registro
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField required fullWidth id="email" label="Correo" name="email" autoComplete="email" />
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Contraseña"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="confirm_password"
								label="Confirmar Contraseña"
								type="password"
								id="confirm_password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>

					{isErrored && (
						<Alert severity="warning" sx={{ mt: 2 }}>
							{myError?.message}
						</Alert>
					)}
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Registrarse
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item sm>
							<Link href="/auth/login" variant="body2">
								Tiene una cuenta? Inicie Sesión
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container> */
}
