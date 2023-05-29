"use client"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined"
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	FormControl,
	FormHelperText,
	Grid,
	Input,
	InputLabel,
	Link,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material"
import React, { SelectHTMLAttributes } from "react"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

interface FormUser {
	dni: String
	firstName: String
	lastName: String
	birthDate: Date
	phone: number
	address: String
	photo?: String
	rol?: string
}

function FormUsuario() {
	const [tipoRol, setTipoRol] = React.useState("")

	const handleChange = (event: any) => {
		setTipoRol(event.target.value)
		console.log(tipoRol)
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const dni = formData.get("dni")
		const firstName = formData.get("firstName")
		const lastName = formData.get("lastName")
		const birthDate = formData.get("birthDate")
		const address = formData.get("address")
		const photo = formData.get("photo")
		const rol = tipoRol
		//sigue errores y api
		console.log({ dni, firstName, lastName, birthDate, address, photo, rol })
	}

	const ROLES = ["admin", "user", "superadmin"]
	return (
		<Container
			component="main"
			sx={{
				marginRight: "15%",
				marginLeft: "15%",
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<PersonAddAltOutlinedIcon sx={{ m: 2, bgcolor: "primary", fontSize: 50 }}>
					<LockOutlinedIcon />
				</PersonAddAltOutlinedIcon>
				<Typography component="h1" variant="h5">
					Registro de Usuarios
				</Typography>
				<Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={2} sm={5}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Cedula
							</InputLabel>
							<TextField
								sx={{ top: 12 }}
								required
								fullWidth
								id="dni"
								label="Cedula"
								placeholder="1600821401"
								name="dni"
								autoComplete="dni"
							/>
						</Grid>
						<Grid item xs={2} sm={5}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Nombre
							</InputLabel>
							<TextField
								sx={{ top: 12 }}
								required
								fullWidth
								id="firstName"
								label="Nombre"
								placeholder="Lorena"
								name="firstName"
								autoComplete="firstName"
							/>
						</Grid>
						<Grid item xs={2} sm={5}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Cumpleaños
							</InputLabel>
							<TextField
								sx={{ top: 12 }}
								required
								fullWidth
								name="birthDate"
								//label="Cumpleaños"
								type="date"
								id="birthDate"
								autoComplete="birthDate"
							/>
						</Grid>
						<Grid item xs={2} sm={5}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Apellido
							</InputLabel>
							<TextField
								sx={{ top: 12 }}
								required
								fullWidth
								name="lastName"
								label="Apellido"
								placeholder="Rodriguez"
								type="text"
								id="lastName"
								autoComplete="lastName"
							/>
						</Grid>
						<Grid item xs={2} sm={5}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Telefono
							</InputLabel>
							<TextField
								sx={{ top: 12 }}
								required
								fullWidth
								name="phone"
								placeholder="0983374216"
								label="Telefono"
								type="tel"
								id="phone"
								autoComplete="phone"
							/>
						</Grid>
						<Grid item xs={2} sm={5}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Dirreción
							</InputLabel>
							<TextField
								sx={{ top: 12 }}
								required
								fullWidth
								name="address"
								placeholder="Av. Los Recuerdos"
								label="Dirreción"
								type="text"
								id="address"
								autoComplete="address"
							/>
						</Grid>
						<Grid item xs={2} sm={5} sx={{ m: 0, minWidth: 80, marginTop: 0.1 }}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Foto
							</InputLabel>

							<Button size="large" variant="outlined" component="label" endIcon={<AddPhotoAlternateIcon />}>
								Upload File
								<input type="file" hidden />
							</Button>
						</Grid>

						<Grid item xs={2} sm={5}>
							<InputLabel
								sx={{
									display: "flex",
									justifyContent: "left",
									fontWeight: 700,
								}}
							>
								Tipo Usuario
							</InputLabel>
							<FormControl fullWidth sx={{ m: 0, minWidth: 80, top: 12 }}>
								<InputLabel id="rol">Rol</InputLabel>
								<Select labelId="rol" id="rol" value={tipoRol} label="Tipo Usuario" onChange={handleChange}>
									{ROLES.map((item, index) => (
										<MenuItem key={index} value={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					<Button type="submit" fullWidth variant="contained" className="bg-blue-700" sx={{ mt: 3, mb: 2 }}>
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

export default FormUsuario
