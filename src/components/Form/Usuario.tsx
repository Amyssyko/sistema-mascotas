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
} from "@material-tailwind/react"
import {
	EnvelopeIcon,
	ExclamationCircleIcon,
	IdentificationIcon,
	LockClosedIcon,
	PhoneIcon,
	UserCircleIcon,
} from "@heroicons/react/24/solid"

interface UsuarioProps {
	id: string | number | undefined
	correo: string | undefined
}

export default function Usuario({ id, correo }: UsuarioProps) {
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		/*	const formData = new FormData(event.currentTarget)
		const dni = formData.get("dni")
		const firstName = formData.get("firstName")
		const lastName = formData.get("lastName")
		const birthDate = formData.get("birthDate")
		const address = formData.get("address")
		const photo = formData.get("photo")
		*/

		console.log(formValues)
	}

	return (
		<Card className="w-full max-w-[32rem] bg-white">
			<CardHeader
				color="blue"
				floated={false}
				shadow={false}
				className="m-0 grid place-items-center rounded-b-none py-6 px-4 text-center"
			>
				<div className="mb-2 rounded-full border border-white/10 bg-white/10 p-6 text-white">
					<UserCircleIcon className="h-10 w-10" />
				</div>
				<Typography variant="h4" color="white">
					Datos de Perfil de Usuario
				</Typography>
			</CardHeader>
			<CardBody>
				<Tabs className="overflow-visible">
					<TabsBody>
						<form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5 text-red-500">
							<div className="my-1">
								<Typography variant="small" color="blue-gray" className="mb-4 font-medium">
									Card Details
								</Typography>
								<div className="my-4 flex items-center gap-4">
									<Input
										type="number"
										inputMode="numeric"
										//required
										id="dni"
										label="Cedula"
										//placeholder="1600821401"
										name="dni"
										autoComplete="dni"
										min="0"
										value={formValues.dni}
										onChange={handleInputChange}
										icon={<IdentificationIcon className="h-5 w-5 text-blue-gray-300" />}
									/>

									<Input
										type="text"
										label="Nombre"
										//required
										id="firstName"
										//placeholder="Lorena"
										name="firstName"
										autoComplete="firstName"
										icon={<ExclamationCircleIcon className="h-5 w-5 text-blue-gray-300" />}
										value={formValues.lastName}
										onChange={handleInputChange}
										//value={formatCardNumber(cardNumber)}
										//onChange={(event) => setCardNumber(event.target.value)}
										//icon={<IdentificationIcon className="h-5 w-5 text-blue-gray-300" />}
									/>
								</div>

								<div className="my-2">
									<div className="my-4 flex items-center gap-4">
										<Input
											name="email"
											label="Email"
											//placeholder="example@email.com"
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
											//placeholder="Rodriguez"
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
											//placeholder="0983374216"
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
										<Input name="photo" label="Subir foto" type="file" id="photo" />
										<Input
											name="address"
											//placeholder="Av. Los Recuerdos"
											label="Dirreción"
											type="text"
											id="address"
											autoComplete="address"
											icon={<ExclamationCircleIcon className="h-5 w-5 text-blue-gray-300" />}
											value={formValues.photo}
											onChange={handleInputChange}
										/>
									</div>
								</div>
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
