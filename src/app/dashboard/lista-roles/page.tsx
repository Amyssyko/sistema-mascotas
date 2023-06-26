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

const TABLE_HEAD = ["ID", "Email", "Contraseña", "Role", "Creado", "Actualizado", "Editar", "Eliminar"]

export default function Page() {
	const { data: session } = useSession()
	const rol = session?.user.role
	const [roles, setRoles] = useState([])

	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/v2/rol")
				const data = await response.json()
				setRoles(data)
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
			const response: AxiosResponse = await axios.post(`/api/v2/rol/${id} `)
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
					<div className="mb-8 flex items-center justify-between gap-8">
						<div className="mx-auto text-center">
							<Typography variant="h5" color="blue-gray">
								Lista de Administradores e Usuario
							</Typography>
							<Typography color="gray" className="mt-1 font-normal">
								Informacion de todos los usuarios registrados en el sistema
							</Typography>
						</div>
						<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
							<Button className="flex items-center gap-3" color="blue" size="sm">
								<svg
									fill="currentColor"
									strokeWidth="0"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
									height="1em"
									width="1em"
								>
									<path d="m309.6 158.5 23.1-138.7C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80h-69.3l-5.1 30.5-112-64zM416 256.1V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h205.8L416 256.1zM464 80a16 16 0 1 0-32 0 16 16 0 1 0 32 0z"></path>
								</svg>
								<Link href="/dashboard/peticiones">Nueva Peticion</Link>
							</Button>
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
							{roles.map(({ id, email, password, role, createdAt, updatedAt }, index) => {
								const isLast = index === roles.length - 1
								const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

								return (
									<tr key={id}>
										<td className={classes}>
											<div className="flex items-center gap-3">
												<div className="flex flex-col">
													<Typography variant="small" color="blue-gray" className="font-normal ">
														{id}
													</Typography>
												</div>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography variant="small" color="blue-gray" className="font-normal">
													{email}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography variant="small" color="blue-gray" className="font-normal">
													{password}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography variant="small" color="blue-gray" className="font-normal">
													{role}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography variant="small" color="blue-gray" className="font-normal">
													{createdAt?.slice(0, 10)}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography variant="small" color="blue-gray" className="font-normal">
													{updatedAt?.slice(0, 10)}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<Button color="green" size="sm" onClick={() => router.replace(`/dashboard/rol/${id}`)}>
												<Tooltip content="Editar Marcota">
													<IconButton variant="text" color="blue-gray">
														<PencilIcon className="h-4 w-4" />
													</IconButton>
												</Tooltip>
											</Button>
										</td>
										<td className={classes}>
											<Button
												disabled={rol !== "SUPERADMIN"}
												onClick={() => handleDelete({ id })}
												size="sm"
												color="red"
											>
												<Tooltip content="Eliminar Marcota">
													<IconButton variant="text" color="blue-gray">
														<TrashIcon className="h-4 w-4" />
													</IconButton>
												</Tooltip>
											</Button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</CardBody>
			</Card>
		</LayoutDashboard>
	)
}
