"use client"
import React from "react"
import {
	Card,
	CardHeader,
	CardBody,
	Input,
	Button,
	Typography,
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
	Select,
	Option,
	Alert,
} from "@material-tailwind/react"
import {
	EnvelopeIcon,
	ExclamationCircleIcon,
	IdentificationIcon,
	LockClosedIcon,
	PhoneIcon,
	UserCircleIcon,
} from "@heroicons/react/24/solid"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useError } from "@/hooks/useError"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

type ID = {
	ID?: number | null
}

const Rol: React.FC<ID> = ({ ID }) => {
	const router = useRouter()
	const { myError, isErrored, handleError, resetError } = useError()

	const [email, setEmail] = React.useState("")
	const [role, setRole] = React.useState("")
	React.useEffect(() => {
		const fetchData = async () => {
			if (ID) {
				try {
					const response: AxiosResponse = await axios.get(`/api/v2/rol/${ID}`)
					const { email, role } = response.data
					setEmail(email)
					setRole(role)
				} catch (error: Error | AxiosError | any) {
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
				}
			}
		}

		fetchData()
	}, [ID])

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			const response = await axios.patch(`/api/v2/rol/${ID}`, {
				email,
				role,
			})

			if (response.status === 200) {
				toast.success("Datos actualizados éxito", {
					duration: 3000,
					position: "bottom-center",

					// Custom Icon
					icon: "🐱",

					// Change colors of success/error/loading icon
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
			}
			router.replace("/dashboard/lista-roles")
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
		router.replace("/dashboard/lista-roles")
	}

	return (
		<Card color="transparent" shadow={false} className="mx-auto my-24">
			<Typography variant="h4" color="blue-gray" className="mx-auto font-normal">
				Registro de Mascotas
			</Typography>
			<Typography color="gray" className="mx-auto font-normal">
				Ingrese los detalles de la mascota
			</Typography>
			<form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
				<div className="mb-4 flex flex-col gap-6">
					<Input
						id="email"
						name="email"
						type="text"
						size="lg"
						label="Email de Usuario"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Select id="role" name="role" label="Rol" value={role || ""} onChange={(e: any) => setRole(e)}>
						<Option value="">Selecciona una opción</Option>
						<Option value="USER">USER</Option>
						<Option value="ADMIN">ADMIN</Option>
						<Option value="SUPERADMIN">SUPERADMIN</Option>
					</Select>
				</div>
				<div>
					{isErrored && (
						<Alert color="orange" variant="ghost" className=" text-xs">
							{myError?.message}
						</Alert>
					)}
				</div>

				<Button type="submit" className="mt-6 mx-auto flex justify-center">
					Actualizar
				</Button>
			</form>
		</Card>
	)
}

export { Rol }
