import { Typography, Card } from "@material-tailwind/react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loading from "../Loading"

export function PetsCard() {
	const [pets, setPets] = useState([])

	useEffect(() => {
		try {
			const getPets = async () => {
				const pets = await axios.get("http://localhost:3000/api/v2/solicitud")
				setPets(pets.data)
			}
			getPets()
		} catch (error: any) {
			console.error(error)
		}
	}, [])

	return (
		<div className="mx-auto px-4">
			<div className="my-2">
				<Typography variant="h2" className="text-light-blue-800 text-center">
					Mascotas en Adopción
				</Typography>
				<Typography variant="small" className="text-black text-center text-xl">
					Mascotas disponibles
				</Typography>
			</div>
			<ul className="list-none mx-0 p-0 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{pets &&
					pets.map(
						({
							id,
							name,
							typePet,
							age,
							month,
							breed,
							photo,
						}: {
							id: number
							name: string
							typePet: string
							age: number
							month: number
							breed: string
							photo: string
						}) => (
							<Link key={id} href={`mascotas/${id}`}>
								<li className="text-black mx-2  my-6">
									<Card className="mb-12 overflow-hidden relative w-full">
										<Image
											alt={name}
											className="w-auto h-72 object-cover object-center shadow-2xl shadow-blue-gray-900/50"
											src={photo}
											height={0}
											width={0}
											sizes="100vw"
											priority={true}
										/>

										<div className="absolute left-2">
											<Typography variant="h6" color="blue-gray" className="text-deep-orange-500">
												{typePet}
											</Typography>
										</div>
										<figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-1rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-0">
											<div>
												<Typography variant="h6" color="blue-gray" className="text-xs">
													Para Adopción
												</Typography>
												<Typography color="blue-gray" className="mt-2 font-normal text-xs ">
													{age <= 1 ? `${age} año` : `${age} años`}{" "}
													{month <= 1 ? `${month} mes` : `${month} meses`}
												</Typography>
											</div>
											<div>
												<Typography variant="h6" color="blue-gray" className="text-xs">
													{`${breed}`}
												</Typography>
												<Typography variant="h6" color="blue-gray" className="mt-2 text-xs">
													{`${name}`}
												</Typography>
											</div>
										</figcaption>
									</Card>
								</li>
							</Link>
						)
					)}
			</ul>
		</div>
	)
}
