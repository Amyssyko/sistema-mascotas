"use client"
import React, { useEffect } from "react"
import {
	Card,
	CardHeader,
	CardBody,
	Input,
	Button,
	Typography,
	Tabs,
	TabsBody,
	Alert,
} from "@material-tailwind/react"
import {
	EnvelopeIcon,
	ExclamationCircleIcon,
	IdentificationIcon,
	PhoneIcon,
	UserCircleIcon,
	PhotoIcon,
} from "@heroicons/react/24/solid"
import axios from "axios"
import { useError } from "@/hooks/useError"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { data } from "autoprefixer"
import Image from "next/image"

interface UsuarioProps {
	id: string | number | undefined
	correo: string | undefined
	cedula: string | undefined
}

export default function Usuario({ id, correo, cedula }: UsuarioProps) {
	const router = useRouter()
	const { myError, isErrored, handleError, resetError } = useError()

	const [formValues, setFormValues] = React.useState({
		dni: "",
		firstName: "",
		lastName: "",
		email: correo,
		birthDate: "",
		phone: "",
		address: "",
		photo: "",
		userId: id,
	})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormValues((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	useEffect(() => {
		if (cedula) {
			try {
				const dataUsuario = async () => {
					const data = await axios.get(`http://localhost:3000/api/v2/persons/${cedula}`)
					setFormValues({
						dni: data.data.dni,
						firstName: data.data.firstName,
						lastName: data.data.lastName,
						email: data.data.email,
						birthDate: data.data.birthDate.slice(0, 10),
						phone: data.data.phone,
						address: data.data.address,
						photo: data.data.photo,
						userId: data.data.userId,
					})
				}
				dataUsuario()
			} catch (error) {
				console.log(error)
				console.error(error)
			}
		}
	}, [cedula])

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const { dni, firstName, lastName, email, birthDate, phone, address, photo, userId } = formValues

		try {
			if (cedula !== undefined || cedula) {
				const response = await axios.patch("/api/v2/persons", {
					dni,
					firstName,
					lastName,
					birthDate,
					phone,
					address,
					photo,
					userId,
				})

				if (response.status === 200) {
					toast.success("Datos actualizados éxito", {
						duration: 3000,
						position: "bottom-center",
						icon: "🐱",
						iconTheme: {
							primary: "#000",
							secondary: "#fff",
						},
					})
				}
				router.refresh()
				signOut()
			} else {
				const response = await axios.post("/api/v2/persons", {
					dni,
					firstName,
					lastName,
					email,
					birthDate,
					phone,
					address,
					photo,
					userId,
				})

				if (response.status === 201) {
					toast.success("Datos actualizados éxito", {
						duration: 3000,
						position: "bottom-center",
						icon: "🐱",
						iconTheme: {
							primary: "#000",
							secondary: "#fff",
						},
					})
				}
				router.refresh()
				signOut()
			}
		} catch (error: any) {
			handleError(error.response.data)

			console.error(`${error.response.data} (${error.response.status})`)
			if (error.response && error.response.status) {
				toast.error(error.response.data, {
					duration: 3000,
					position: "bottom-center",
					icon: "❌",
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
			}
		}
		router.refresh()
	}

	return (
		<Card className="w-full max-w-[42rem] bg-white mx-auto my-6">
			<CardHeader
				color="blue"
				floated={false}
				shadow={false}
				className="m-0 grid place-items-center rounded-b-none py-2 px-4 text-center"
			>
				{formValues.photo.length !== 0 ? (
					<Card className="my-2 overflow-hidden w-24 mx-auto border rounded">
						<Image
							alt={formValues.firstName}
							className="h-[auto] w-full object-cover object-center"
							src={formValues.photo}
							height={0}
							width={0}
							sizes="100vw"
						/>
					</Card>
				) : (
					<UserCircleIcon className="h-10 w-10" />
				)}
				<Typography variant="h4" color="white">
					{formValues?.firstName
						? `Datos de Perfil de ${formValues.firstName} ${formValues.lastName}`
						: `Datos de Perfil de Usuario `}
				</Typography>
			</CardHeader>
			<CardBody>
				<Tabs className="overflow-visible">
					<TabsBody>
						<form onSubmit={onSubmit} className="mt-4 flex flex-col gap-5 text-red-500">
							<div className="my-2">
								<Typography
									variant="small"
									color="blue-gray"
									className="mb-6 font-semibold text-xl text-center "
								>
									Detalles Usuario
								</Typography>
								<div className="my-2">
									<div className="my-4 flex items-center gap-4">
										{cedula ? (
											<Input
												type="number"
												inputMode="numeric"
												id="dni"
												disabled
												label="Cedula"
												name="dni"
												autoComplete="dni"
												min="0"
												value={formValues.dni}
												onChange={handleInputChange}
												icon={<IdentificationIcon className="h-5 w-5 text-blue-gray-300" />}
											/>
										) : (
											<Input
												type="number"
												inputMode="numeric"
												id="dni"
												label="Cedula"
												name="dni"
												autoComplete="dni"
												min="0"
												value={formValues.dni}
												onChange={handleInputChange}
												icon={<IdentificationIcon className="h-5 w-5 text-blue-gray-300" />}
											/>
										)}

										<Input
											type="text"
											label="Nombre"
											id="firstName"
											name="firstName"
											autoComplete="firstName"
											icon={<ExclamationCircleIcon className="h-5 w-5 text-blue-gray-300" />}
											value={formValues.firstName}
											onChange={handleInputChange}
										/>
									</div>
								</div>

								<div className="my-2">
									<div className="my-4 flex items-center gap-4">
										<Input
											disabled
											name="email"
											label="Email"
											type="text"
											id="email"
											autoComplete="email"
											containerProps={{ className: "min-w-[72px]" }}
											icon={<EnvelopeIcon className="h-5 w-5 text-blue-gray-300" />}
											value={formValues.email}
											onChange={handleInputChange}
										/>

										<Input
											name="lastName"
											label="Apellido"
											type="text"
											id="lastName"
											autoComplete="lastName"
											containerProps={{ className: "min-w-[72px]" }}
											icon={<ExclamationCircleIcon className="h-5 w-5 text-blue-gray-300" />}
											value={formValues.lastName}
											onChange={handleInputChange}
										/>
									</div>
								</div>

								<div className="my-2">
									<div className="my-4 flex items-center gap-4">
										<Input
											name="birthDate"
											label="Cumpleaños"
											type="date"
											id="birthDate"
											autoComplete="birthDate"
											containerProps={{ className: "min-w-[72px]" }}
											value={formValues.birthDate}
											onChange={handleInputChange}
										/>

										<Input
											name="phone"
											label="Telefono"
											type="tel"
											id="phone"
											autoComplete="phone"
											icon={<PhoneIcon className="h-5 w-5 text-blue-gray-300" />}
											value={formValues.phone}
											onChange={handleInputChange}
										/>
									</div>
								</div>

								<div className="my-2">
									<div className="my-4 flex items-center gap-4">
										<Input
											name="photo"
											label="Subir foto"
											type="text"
											id="photo"
											value={formValues.photo}
											icon={<PhotoIcon className="h-5 w-5 text-blue-gray-300" />}
											onChange={handleInputChange}
										/>
										<Input
											name="address"
											label="Dirreción"
											type="text"
											id="address"
											autoComplete="address"
											icon={<ExclamationCircleIcon className="h-5 w-5 text-blue-gray-300" />}
											value={formValues.address}
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>
							<div>
								{isErrored && (
									<Alert color="orange" variant="ghost" className=" text-sm">
										{myError?.message}
									</Alert>
								)}
							</div>
							<Button type="submit" size="lg" className=" mx-auto">
								Actualizar
							</Button>
						</form>
					</TabsBody>
				</Tabs>
			</CardBody>
		</Card>
	)
}
