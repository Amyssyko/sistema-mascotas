"use client"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
	Card,
	CardHeader,
	Typography,
	Button,
	CardBody,
	Avatar,
	IconButton,
	Tooltip,
} from "@material-tailwind/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const TABLE_HEAD = [
	"Nombre Mascota",
	"Tipo de Mascota",
	"Raza",
	"Ultima Actualiación",
	"Estado",
	"Cedula",
	"Nombre",
	"Apellido",
	"Celular",
	"Dirreción",
]

export default function Page() {
	const { data: session } = useSession()
	const rol = session?.user.role
	const [pets, setPets] = useState([])

	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/v2/adoptedpets")
				const data = await response.json()
				setPets(data)
			} catch (error: Error | AxiosError | any) {
				console.error(`${error?.response?.data} (${error?.response?.status})`)
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
		fetchData()
	}, [])

	const handleDelete = async ({ id }: { id: Number }) => {
		try {
			const response: AxiosResponse = await axios.post(`/api/v2/adoptions/${id} `)
			if (response.status === 204) {
				toast.success("Registro Eliminado", {
					duration: 4000,
					position: "top-right",

					// Custom Icon
					icon: "✅",

					// Change colors of success/error/loading icon
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
				window.location.reload()
			}
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
			window.location.reload()
		}
	}

	return (
		<LayoutDashboard>
			<Card className="h-full w-full">
				<CardHeader floated={false} shadow={false} className="rounded-none">
					<div className="mb-8 flex items-center justify-center gap-8">
						<div>
							<Typography variant="h5" color="blue-gray" className="text-center">
								Lista de Adopciones de Mascotas
							</Typography>
							<Typography color="gray" className="mt-1 font-normal">
								Informacion de todas las solicitudes registradas
							</Typography>
						</div>
					</div>
				</CardHeader>
				<CardBody className="overflow-scroll px-0">
					<table className="mt-4 w-full min-w-max table-auto text-left">
						<thead>
							<tr>
								{TABLE_HEAD.map((head) => (
									<th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
										<Typography
											variant="small"
											color="blue-gray"
											className=" leading-none opacity-70 font-bold"
										>
											{head}
										</Typography>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{pets &&
								pets.map(
									(
										{
											name,
											id,
											typePet,
											breed,
											status,
											firstName,
											lastName,
											phone,
											address,
											personDni,
											updatedAt,
										},
										index
									) => {
										const isLast = index === pets.length - 1
										const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

										return (
											<tr key={id}>
												<td className={classes}>
													<div className="flex items-center gap-3">
														<div className="flex flex-col">
															<Typography variant="small" color="blue-gray" className="font-normal ">
																{name}
															</Typography>
														</div>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{typePet}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{breed}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{updatedAt.slice(0, 10)}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{status}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{personDni}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{firstName}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{lastName}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{phone}
														</Typography>
													</div>
												</td>
												<td className={classes}>
													<div className="flex flex-col">
														<Typography variant="small" color="blue-gray" className="font-normal">
															{address}
														</Typography>
													</div>
												</td>
											</tr>
										)
									}
								)}
						</tbody>
					</table>
				</CardBody>
			</Card>
		</LayoutDashboard>
	)
}
