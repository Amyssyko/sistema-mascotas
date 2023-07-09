"use client"
import React from "react"
import LayoutHome from "@/components/Layout/LayoutHome"
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import Image from "next/image"

function Page() {
	return (
		<LayoutHome>
			<section className="px-4 py-8 min-h-screen">
				<div className="mx-auto max-w-3xl  mb-12">
					<Typography className="text-center text-light-blue-800 mb-12" variant="h3">
						Mi Mascota Feliz
					</Typography>
					<Typography className="text-justify text-lg font-medium text-black">
						Fue creada en una colaboración entre Alexis, Maria, Patricia y David, cuatro amantes de los
						animales que compartían una pasión común por rescatar y ayudar a los animales en situación de
						abandono.
					</Typography>
				</div>

				<div className="grid gap-12 text-center md:grid-cols-2 lg:grid-cols-2 justify-items-center max-w-5xl mx-auto">
					<Card className="mt-6 w-80">
						<CardHeader color="blue-gray" className="h-56 rounded-full">
							<Image
								className="h-full w-full object-cover object-center "
								height={0}
								width={0}
								sizes="100vw"
								src="https://cdn.pixabay.com/photo/2015/11/06/11/32/girl-1026246_1280.jpg"
								alt="Maria"
							/>
						</CardHeader>
						<CardBody>
							<Typography variant="h5" color="blue-gray" className="mb-2">
								Maria
							</Typography>
							<Typography className="text-justify text-sm">
								Amante de la fotografía, se aseguró de capturar imágenes hermosas y emotivas de los animales
								rescatados. Las fotos fueron cuidadosamente seleccionadas y editadas para resaltar la belleza
								de cada animal y transmitir su historia única.
							</Typography>
						</CardBody>
					</Card>

					<Card className="mt-6 w-80">
						<CardHeader color="blue-gray" className="h-56 rounded-full">
							<Image
								className="h-full w-full object-cover object-center "
								height={0}
								width={0}
								sizes="100vw"
								src="https://cdn.pixabay.com/photo/2015/11/06/11/32/girl-1026246_1280.jpg"
								alt="Maria"
							/>
						</CardHeader>
						<CardBody>
							<Typography variant="h5" color="blue-gray" className="mb-2">
								Patricia
							</Typography>
							<Typography className="text-justify text-sm">
								Una apasionada redactora, se encargó de crear los contenidos de la página. Escribió historias
								conmovedoras sobre los animales rescatados, describiendo sus personalidades, necesidades y
								deseos.
							</Typography>
						</CardBody>
					</Card>

					<Card className="mt-6 w-80">
						<CardHeader color="blue-gray" className="h-56 rounded-full">
							<Image
								className="h-full w-full object-cover object-center "
								height={0}
								width={0}
								sizes="100vw"
								src="https://cdn.pixabay.com/photo/2015/11/06/11/32/girl-1026246_1280.jpg"
								alt="Maria"
							/>
						</CardHeader>
						<CardBody>
							<Typography variant="h5" color="blue-gray" className="mb-2">
								David
							</Typography>
							<Typography className="text-justify text-sm">
								Apasionado por los animales y experto en diseño web, fue una pieza fundamental en la creación
								de la página de adopción de mascotas Mi Mascota Feliz.
							</Typography>
						</CardBody>
					</Card>

					<Card className="mt-6 w-80">
						<CardHeader color="blue-gray" className="h-56 rounded-full">
							<Image
								className="h-full w-full object-cover object-center "
								height={0}
								width={0}
								sizes="100vw"
								src="https://cdn.pixabay.com/photo/2015/11/06/11/32/girl-1026246_1280.jpg"
								alt="Maria"
							/>
						</CardHeader>
						<CardBody>
							<Typography variant="h5" color="blue-gray" className="mb-2">
								Alexis
							</Typography>
							<Typography className="text-justify text-sm">
								Un experto en marketing digital, se encargó de promover la página en las redes sociales y
								establecer alianzas con organizaciones y veterinarias locales.
							</Typography>
						</CardBody>
					</Card>
				</div>
			</section>
			<section className="px-4 mx-auto my-8">
				<div className="mx-auto max-w-7xl  mb-12">
					<Typography className=" text-lg font-medium text-black">
						<strong>Mi Mascota Feliz</strong> se enorgullece de haber logrado cientos de adopciones exitosas.
						La página se ha convertido en una comunidad en línea donde los adoptantes comparten sus
						experiencias, brindan consejos y apoyo mutuo. Además, el equipo organiza eventos de adopción y
						campañas de esterilización para generar un impacto aún mayor en la comunidad.
					</Typography>
				</div>
			</section>
		</LayoutHome>
	)
}

export default Page
