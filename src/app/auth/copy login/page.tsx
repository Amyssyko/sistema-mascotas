"use client"
import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { Alert } from "@mui/material"
import { useError } from "@hooks/useError"
import axios, { AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="#202020" href="#">
				Sistema de Adopción de Mascotas
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

// TODO remove, this demo shouldn't need to reset the theme.

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
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Correo"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Contraseña"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						{isErrored && (
							<Alert severity="warning" sx={{ mt: 2 }}>
								{myError?.message}
							</Alert>
						)}
						<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Recuerdame" />

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Olvidaste la contraseña?
								</Link>
							</Grid>
							<Grid item xs>
								<Link href="/auth/register" variant="body2">
									{"No te haz registrado? Registrate!"}
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}
