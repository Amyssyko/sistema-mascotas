"use client"
import { signIn } from "next-auth/react"
import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { useError } from "@hooks/useError"
import axios, { AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Alert, Card, Input, Typography } from "@material-tailwind/react"

export default function SignInSide() {
	const router = useRouter()

	const { myError, isErrored, handleError, resetError } = useError()

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		resetError()
		const formData = new FormData(event.currentTarget)
		const email = formData.get("email")
		const password = formData.get("password")
		//console.log(email + " " + password)
		// Validación en el frontend
		const isEmailEmpty = !email
		const isPasswordEmpty = !password

		const errorMessage =
			isEmailEmpty || isPasswordEmpty
				? `${isEmailEmpty ? "Ingrese un correo." : ""}
			 ${isPasswordEmpty ? "Ingrese una contraseña." : ""}`
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}
		//console.log(email + " " + password)

		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
			callbackUrl: "/",
		})

		if (result?.error === "CredentialsSignin") {
			console.error("Credenciales Invalidas (401)")
			handleError("Credenciales Invalidas")
		}
		if (result?.url) {
			//console.log("usuario ingreso")
			router.push("/")
		}
	}

	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Card className="mt-48 mx-auto flex justify-center items-center" color="transparent" shadow={true}>
						<Typography variant="h3" color="blue">
							Inicio de Sesión
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
				</Box>
			</Grid>
		</Grid>
	)
}
