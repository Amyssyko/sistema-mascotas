"use client"

import { useError } from "@/hooks/useError"
import { Card, Input, Checkbox, Button, Typography, Select, Option, Alert } from "@material-tailwind/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
type ID = {
	id?: number | null
}
export const Mascota: React.FC<ID> = ({ id }) => {
	const [name, setName] = useState("")
	const [typePet, setTypePet] = useState("")
	const [age, setAge] = useState("")
	const [month, setMonth] = useState("")
	const [breed, setBreed] = useState("")
	const [description, setDescription] = useState("")

	const { myError, handleError, isErrored, resetError } = useError()

	const selectChange = (event: any) => {
		const value = event?.target?.value
		setTypePet(event)
	}

	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				try {
					const response: AxiosResponse = await axios.get(`/api/v2/pets/${id}`)
					const { name, typePet, age, month, breed, photo, description } = response.data
					setName(name)
					setTypePet(typePet)
					setAge(age)
					setMonth(month)
					setBreed(breed)
					setDescription(description)
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
				}
			}
		}

		fetchData()
	}, [id])

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const isName = !name
		const isTypePet = !typePet
		const isAge = !age
		const isMonth = !month
		const isBreed = !breed
		const isDescription = !description
		//const isPhoto = !photo

		const errorMessage =
			isName && isTypePet && isAge && isMonth && isMonth && isBreed && isDescription
				? "Verifique que todos los campos sean completados."
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}

		try {
			const response: AxiosResponse = await axios.post(`/api/v2/pets/${id} `, {
				name,
				typePet,
				age,
				month,
				breed,
				description,
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
				setName("")
				setAge("")
				setBreed("")
				setMonth("")
				setTypePet("")
				setDescription("")
			}
		} catch (error: Error | AxiosError | any) {
			handleError(error.response.data)
			setName("")
			setAge("")
			setBreed("")
			setMonth("")
			setTypePet("")
			setDescription("")
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
			const response: AxiosResponse = await axios.patch(`/api/v2/pets/${id} `, {
				name,
				typePet,
				age,
				month,
				breed,
				description,
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
				router.replace("/dashboard/lista-mascotas")
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
			router.replace("/dashboard/mascotas")
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
				router.replace("/dashboard/mascotas")
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
			router.replace("/dashboard/mascotas")
		}
	}

	return (
		<Card color="transparent" shadow={false} className="mx-auto my-4">
			<Typography variant="h4" color="blue-gray" className="mx-auto font-normal">
				Registro de Mascotas
			</Typography>
			<Typography color="gray" className="mx-auto font-normal">
				Ingrese los detalles de la mascota
			</Typography>
			<form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
				<div className="mb-4 flex flex-col gap-6">
					<Input
						id="name"
						name="name"
						type="text"
						size="lg"
						label="Nombre Mascota"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Select
						id="typePet"
						name="typePet"
						label="Tipo Mascota"
						animate={{
							mount: { y: 0 },
							unmount: { y: 25 },
						}}
						value={typePet || ""}
						onChange={selectChange}
					>
						<Option value="">Selecciona una opción</Option>
						<Option value="Gato">Gato</Option>
						<Option value="Perro">Perro</Option>
					</Select>
					<Input
						id="age"
						name="age"
						type="number"
						size="lg"
						min={0}
						max={30}
						label="Años"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
					<Input
						id="month"
						name="month"
						type="number"
						size="lg"
						min={0}
						max={11}
						label="Meses"
						value={month}
						onChange={(e) => setMonth(e.target.value)}
					/>
					<Input
						id="breed"
						name="breed"
						type="text"
						size="lg"
						label="Raza"
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
					/>
					<Input
						id="description"
						name="description"
						type="text"
						size="lg"
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
