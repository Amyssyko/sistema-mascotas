"use client"

import { useError } from "@/hooks/useError"
import { ClassNames } from "@emotion/react"
import { Card, Input, Button, Typography, Select, Option, Alert, Textarea } from "@material-tailwind/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import styles from "../../../types"
type ID = {
	id?: number | null
}

export const Peticion: React.FC<ID> = ({ id }) => {
	const { data: session } = useSession()
	const [persons, setPersons] = useState([])
	const [pets, setPets] = useState([])
	const [petId, setPetId] = useState("")
	const [jobType, setJobType] = useState("")
	const [income, setIncome] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState("")
	const [personDni, setpersonDni] = useState(session?.user?.dni)

	const { myError, handleError, isErrored, resetError } = useError()

	const router = useRouter()

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/v2/pets")
				setPets(response.data)
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

		fetchPets()
	}, [])

	useEffect(() => {
		const fetchPersons = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/v2/persons")
				setPersons(response.data)
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

		fetchPersons()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				try {
					const response: AxiosResponse = await axios.get(`/api/v2/adoptions/${id}`)
					const { petId, jobType, income, description, status, personDni } = response.data
					setPetId(petId)
					setJobType(jobType)
					setIncome(income)
					setDescription(description)
					setStatus(status)
					setpersonDni(personDni)
				} catch (error: Error | AxiosError | any) {
					console.error(`${error.response.data} (${error.response.status})`)
					if (error.response.data && error.response.status) {
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
		const isJobType = !jobType
		const isIncome = !income
		const isDescription = !description
		const IsStatus = !status
		const idPersonDni = !personDni

		const errorMessage =
			isPetId && isJobType && isIncome && isDescription && IsStatus && idPersonDni
				? "Verifique que todos los campos sean completados."
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}

		try {
			const response: AxiosResponse = await axios.post(`/api/v2/adoptions`, {
				petId,
				jobType,
				income,
				description,
				status,
				personDni,
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
				router.replace("/dashboard/lista-peticiones")
			}
		} catch (error: Error | AxiosError | any) {
			handleError(error.response.data)
			setPetId("")
			setJobType("")
			setIncome("")
			setDescription("")
			setStatus("")
			setpersonDni("")
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
			const response: AxiosResponse = await axios.patch(`/api/v2/adoptions/${id} `, {
				petId,
				jobType,
				income,
				description,
				status,
				personDni,
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
				router.replace("/dashboard/lista-peticiones")
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
			router.replace("/dashboard/lista-peticiones")
		}
	}

	const handleDelete = async () => {
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
		<Card color="transparent" shadow={false} className="my-4 mx-auto">
			<Typography variant="h4" color="blue-gray" className="mx-auto text-center font-normal">
				Registro de Peticion de Adopción de Mascotas
			</Typography>
			<Typography color="gray" className="mx-auto font-normal">
				Ingrese la informacion requerida para la adopción de la mascota
			</Typography>
			<form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
				<div className="mb-4 flex flex-col gap-6">
					<label htmlFor="petId" className="-mb-6 ">
						Mascota
					</label>
					<select
						id="petId"
						name="personDpetIdni"
						className="border border-gray-400  text-gray-700 px-4 py-2 rounded-md"
						value={petId}
						onChange={(e) => setPetId(e?.target?.value)}
					>
						<option value="">Selecciona una opción</option>
						{pets &&
							pets.map(({ name, id }) => (
								<option key={id} value={id}>
									{name}
								</option>
							))}
					</select>
					<Input
						id="jobType"
						name="jobType"
						type="text"
						size="lg"
						label="Tipo de Trabajo"
						value={jobType}
						onChange={(e) => setJobType(e.target.value)}
					/>
					<label htmlFor="personDni" className="-mb-6 -mt-2 ">
						Usuario
					</label>
					<select
						id="personDni"
						name="personDni"
						className="border border-gray-400  text-gray-700 px-4 py-2 rounded-md"
						value={personDni}
						onChange={(e) => setpersonDni(e?.target?.value)}
					>
						<option value="">Selecciona una opción</option>
						{persons &&
							persons.map(({ dni, firstName, lastName }) => (
								<option key={dni} value={dni}>
									{firstName + " " + lastName}
								</option>
							))}
					</select>
					<Input
						id="incomme"
						name="income"
						type="number"
						size="lg"
						min={0}
						max={30000}
						label="Ingresos Mensuales"
						value={income}
						onChange={(e) => setIncome(e.target.value)}
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
						onChange={(e: any) => setStatus(e)}
					>
						<Option value="">Selecciona una opción</Option>
						<Option value="Recibida">Recibida</Option>
						<Option value="Tramitando">Tramitando</Option>
						<Option value="Completa">Completa</Option>
						<Option value="Rechazado">Rechazado</Option>
					</Select>
					<Textarea
						id="description"
						name="description"
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
