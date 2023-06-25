"use client"

import { useError } from "@/hooks/useError"
import { ClassNames } from "@emotion/react"
import { Card, Input, Button, Typography, Select, Option, Alert, Textarea } from "@material-tailwind/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
type ID = {
	id?: number | null
}

export const Solicitud: React.FC<ID> = ({ id }) => {
	const router = useRouter()

	const { data: session } = useSession()
	const dni = session?.user.dni

	const [jobType, setJobType] = useState("")
	const [income, setIncome] = useState("")
	const [description, setDescription] = useState("")
	const [personDni, setpersonDni] = useState(dni)
	const { myError, handleError, isErrored, resetError } = useError()

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const isJobType = !jobType
		const isIncome = !income
		const isDescription = !description
		const idPersonDni = !personDni

		const errorMessage =
			isJobType && isIncome && isDescription && idPersonDni
				? "Verifique que todos los campos sean completados."
				: ""

		if (errorMessage) {
			handleError(errorMessage)
			return
		}

		try {
			const response: AxiosResponse = await axios.post(`/api/v2/solicitud`, {
				jobType,
				income,
				description,
				personDni,
			})
			if (response.status === 201) {
				toast.success("Solicitud enviada con éxito", {
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
				window.location.reload()
			}
		} catch (error: Error | AxiosError | any) {
			handleError(error.response.data)
			setJobType("")
			setIncome("")
			setDescription("")
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

	return (
		<Card color="transparent" shadow={false} className="mt-24 mx-auto max-w-lg bg-white shadow-lg ">
			<Typography variant="h4" color="blue-gray" className="mx-auto font-normal">
				Solicitud de Adopción de Mascotas
			</Typography>
			<Typography color="gray" className="mx-auto font-normal mt-8">
				Ingrese la informacion requerida para la adopción de la mascota
			</Typography>
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
						onChange={(e) => setpersonDni(session?.user.dni ? session?.user.dni : e.target.value)}
					/>
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
				<Button type="submit" className="mt-6 mx-auto flex justify-center">
					Enviar
				</Button>
			</form>
		</Card>
	)
}
