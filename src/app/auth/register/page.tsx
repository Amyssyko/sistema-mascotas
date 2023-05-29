"use client"

import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Alert } from "@mui/material"
import { useError } from "@hooks/useError"
import axios, { AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function SignUp() {
	const router = useRouter()
	const { myError, isErrored, handleError, resetError } = useError()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		resetError()
		const formData = new FormData(event.currentTarget)
		const email = formData.get("email")
		const password = formData.get("password")
		const confirmPassword = formData.get("confirm_password")

		// Validación en el frontend
		const isEmailEmpty = !email
		const isPasswordEmpty = !password
		const doPasswordsMatch = password === confirmPassword

		const errorMessage =
			isEmailEmpty || isPasswordEmpty || !doPasswordsMatch
				? `${isEmailEmpty ? "Por favor, ingrese un correo." : ""}
           ${isPasswordEmpty ? "Por favor, ingrese una contraseña." : ""}
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

			console.log(response.status)
			if (response.status === 201) {
				console.log("registro creado")
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
			console.log(error.response.data)
			console.log(error.response.status)

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
		<Container component="main" maxWidth="xs">
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
		</Container>
	)
}
