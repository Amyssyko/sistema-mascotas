"use client"

import { useError } from "@/hooks/useError"
import { Card, Input, Button, Typography, Select, Option, Alert, Textarea } from "@material-tailwind/react"
import axios, { AxiosError, AxiosResponse } from "axios"

import { useRouter } from "next/navigation"
import React, { useEffect, useState, ChangeEvent } from "react"
import { toast } from "react-hot-toast"
type ID = {
	id?: number | null
}
export const Perdido: React.FC<ID> = ({ id }) => {
	const [lostPets, setLostPets] = useState([])
	const [petId, setPetId] = useState("")
	const [lostLocation, setLostLocation] = useState("")
	const [status, setStatus] = useState("")
	const [description, setDescription] = useState("")

	const { myError, handleError, isErrored, resetError } = useError()

	const router = useRouter()

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setPetId(event.target.value)
		console.log(petId)
	}

	const handleSelectStatus = (event: any) => {
		if (!event) return
		setStatus(event)
	}

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/v2/pets")
				setLostPets(response.data)
			} catch (error) {
				console.error("Error fetching pets:", error)
			}
		}

		fetchPets()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				try {
					const response: AxiosResponse = await axios.get(`/api/v2/lostpets/${id}`)
					const { petId, lostLocation, description, status } = response.data
					setPetId(petId)
					setLostLocation(lostLocation)
					setStatus(status)
					setDescription(description)
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
	}, [id])

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const isPetId = !petId
		const isLostLocation = !lostLocation
		const isStatus = !status
		const isDescription = !description

		const errorMessage =
			isPetId && isLostLocation && isStatus && isDescription
				? "Verifique que todos los campos sean completados."
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}

		try {
			const response: AxiosResponse = await axios.post(`/api/v2/lostpets`, {
				petId,
				lostLocation,
				description,
				status,
			})
			if (response.status === 201) {
				toast.success("Mascota registrada con éxito", {
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
		} catch (error: Error | AxiosError | any) {
			handleError(error.response.data)
			setPetId("")
			setLostLocation("")
			setDescription("")
			setStatus("")
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
		router.refresh()
	}

	const handleUpdate = async () => {
		try {
			const response: AxiosResponse = await axios.patch(`/api/v2/lostpets/${id} `, {
				petId,
				lostLocation,
				description,
				status,
			})
			if (response.status === 200) {
				toast.success("Registro Actualizado", {
					duration: 4000,
					position: "top-right",
					icon: "✅",
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
				router.replace("/dashboard/mascotas-perdidas")
			}
		} catch (error: Error | AxiosError | any) {
			console.log(error)
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
			router.replace("/dashboard/mascotas-perdidas")
		}
	}

	const handleDelete = async () => {
		try {
			const response: AxiosResponse = await axios.post(`/api/v2/pets/${id} `)
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
				router.replace("/dashboard/mascotas-perdidas")
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
			router.replace("/dashboard/mascotas-perdidas")
		}
	}

	return (
		<Card color="transparent" shadow={false} className="mt-24">
			<Typography variant="h4" color="blue-gray" className="mx-auto font-normal">
				Registro de Mascotas Perdidas
			</Typography>
			<Typography color="gray" className="mx-auto font-normal">
				Ingrese los detalles de la mascota perdida
			</Typography>
			<form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
				<div className="mb-4 flex flex-col gap-6">
					<label className="-mb-6"> Mascota</label>
					<select
						className="border border-gray-400 hover:bg-white hover:text-gray-400 text-gray-700 px-4 py-2 rounded-md"
						value={petId}
						onChange={handleSelectChange}
					>
						<option value="">Selecione una Mascota</option>
						{lostPets.map((pet: any) => (
							<option key={pet.id} value={pet.id}>
								{pet.name}
							</option>
						))}
					</select>

					<Input
						id="lostLocation"
						name="lostLocation"
						type="text"
						size="lg"
						label="Lugar"
						value={lostLocation}
						onChange={(e) => setLostLocation(e.target.value)}
					/>
					<Select
						id="status"
						name="status"
						label="Estado"
						animate={{
							mount: { y: 0 },
							unmount: { y: 25 },
						}}
						value={status}
						onChange={handleSelectStatus}
					>
						<Option>Seleccione estado</Option>
						<Option value="Perdido">Perdido</Option>
						<Option value="Encontrado">Encontrado</Option>
					</Select>
					<Textarea
						id="description"
						name="description"
						size="md"
						label="Descripción"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					{/**<Input id="photo" name="photo" type="file" size="lg" label="Foto" onChange={handleFileChange} /> */}
				</div>
				<div>
					{isErrored && (
						<Alert color="orange" variant="ghost" className=" text-xs">
							{myError?.message}
						</Alert>
					)}
				</div>
				{id ? (
					<div className="mt-6 flex justify-center">
						<Button onClick={handleUpdate} className="mr-2" color="green">
							Actualizar
						</Button>
						{/**<Button onClick={handleDelete} className="ml-2" color="red">
							Eliminar
						</Button> */}
					</div>
				) : (
					<Button type="submit" className="mt-6 mx-auto flex justify-center">
						Guardar
					</Button>
				)}
			</form>
		</Card>
	)
}
