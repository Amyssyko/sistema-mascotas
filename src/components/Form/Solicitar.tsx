"use client"
import { useError } from "@/hooks/useError"
import { Card, Input, Button, Typography, Alert, Textarea } from "@material-tailwind/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
type ID = {
	id?: number | null
}

export const Solicitar: React.FC<ID> = ({ id }) => {
	const { data: session } = useSession()

	const router = useRouter()

	const [pets, setPets] = useState({
		id: "",
		name: "",
		typePet: "",
		age: "",
		month: "",
		breed: "",
		photo: "",
		description: "",
	})

	const [petId, setPetId] = useState(id)
	const [jobType, setJobType] = useState("")
	const [income, setIncome] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState("Recibida")
	const [personDni, setpersonDni] = useState(session?.user?.dni)

	const { myError, handleError, isErrored, resetError } = useError()

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/api/v2/pets/${id}`)

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
					icon: "✅",
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},
				})
				router.push("/")
			}
		} catch (error: Error | AxiosError | any) {
			handleError(error.response.data)
			setJobType("")
			setIncome("")
			setDescription("")
			setStatus("")
			//setpersonDni("")
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

	return (
		<Card color="transparent" shadow={false} className="my-4 mx-auto">
			<Typography variant="h4" color="blue-gray" className="mx-auto text-center font-normal">
				{`Solicitud de Adopción de ${pets.name}`}
			</Typography>
			<Typography color="gray" className="mx-auto font-normal">
				Ingrese la informacion requerida para la adopción
			</Typography>

			<Card className="my-2 overflow-hidden w-24 mx-auto border rounded">
				<Image
					alt={pets.name}
					className="h-[auto] w-full object-cover object-center"
					src={pets.photo}
					height={0}
					width={0}
					sizes="100vw"
				/>
			</Card>
			<form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
				<div className="mb-4 flex flex-col gap-6">
					<Input
						id="jobType"
						name="jobType"
						type="text"
						size="lg"
						label="Tipo de Trabajo"
						value={jobType}
						onChange={(e) => setJobType(e.target.value)}
					/>
					<Input
						id="personDni"
						name="personDni"
						type="text"
						size="lg"
						label="Cedula"
						value={personDni}
						onChange={(e) => setpersonDni(e.target.value)}
					/>
					<Input
						id="incomme"
						name="income"
						type="number"
						size="lg"
						step="0.01"
						min={0}
						max={30000}
						label="Ingresos Mensuales"
						value={income}
						onChange={(e) => setIncome(e.target.value)}
					/>

					<Textarea
						id="description"
						name="description"
						size="lg"
						label="Descripción"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					{isErrored && (
						<Alert color="orange" variant="ghost" className=" text-xs">
							{myError?.message}
						</Alert>
					)}
				</div>

				<Button type="submit" className="mt-6 mx-auto flex justify-center">
					Enviar
				</Button>
			</form>
		</Card>
	)
}
