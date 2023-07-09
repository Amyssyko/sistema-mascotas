"use client"
import LayoutHome from "@/components/Layout/LayoutHome"
import Loading from "@/components/Loading"
import { Card, Typography } from "@material-tailwind/react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
	const { data: session } = useSession()
	const router = useRouter()

	return (
		<LayoutHome>
			<div>
				<div className="mx-auto max-w-screen-lg  py-12 px-6">
					<Typography variant="h2" color="blue" className="mb-2 text-center">
						{`¡Bienvenidos a "Mi mascota feliz"!`}
					</Typography>
					<Card className="mb-12 overflow-hidden">
						<Image
							alt="nature"
							className="h-[auto] w-full object-cover object-center"
							src="https://cdn.pixabay.com/photo/2017/04/11/15/55/animals-2222007_1280.jpg"
							height={0}
							width={0}
							sizes="100vw"
						/>
					</Card>

					<Typography color="black" className="font-normal text-justify">
						En <strong>Mi mascota feliz</strong> nos apasiona la adopción de mascotas y estamos comprometidos
						en ayudarte a encontrar a tu compañero peludo perfecto. Aquí encontrarás información útil sobre la
						adopción de mascotas, consejos de cuidado y bienestar, historias inspiradoras de adopción y mucho
						más.
					</Typography>
					<Typography variant="h4" color="blue-gray" className="mb-2 mt-4 text-justify">
						{`¿Por qué adoptar una mascota?`}
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						La adopción de mascotas es una experiencia gratificante tanto para ti como para tu nuevo amigo de
						cuatro patas. Al adoptar, le brindas una segunda oportunidad a un animal que necesita un hogar
						amoroso. Estas mascotas a menudo han pasado por situaciones difíciles y están ansiosas por
						encontrar un hogar estable donde puedan recibir el amor y el cuidado que merecen.
					</Typography>
					{/**	<Card className="mb-12 overflow-hidden relative max-w-xl mx-auto">
						<Image
							alt="nature"
							className="h-[auto]  w-full object-cover object-center shadow-2xl shadow-blue-gray-900/50"
							src="https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016_1280.jpg"
							height={0}
							width={0}
							sizes="100vw"
						/>
						<figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-0">
							<div>
								<Typography variant="h5" color="blue-gray">
									Rescatado
								</Typography>
								<Typography color="gray" className="mt-2 font-normal">
									7 Julio 2023
								</Typography>
							</div>
							<Typography variant="h5" color="blue-gray">
								Nombre: Joaquin
							</Typography>
						</figcaption>
					</Card> */}
					<Typography variant="h4" color="blue-gray" className="mb-2 mt-4 text-justify">
						{`Beneficios de la adopción de mascotas`}
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						<strong>Amor incondicional: </strong> Las mascotas adoptadas tienen una gratitud infinita hacia
						sus nuevos dueños y te brindarán amor incondicional a diario.
					</Typography>
					<Card className="mb-12 overflow-hidden relative max-w-xl mx-auto">
						<Image
							alt="nature"
							className="h-[auto] w-full object-cover object-center shadow-2xl shadow-blue-gray-900/50"
							src="https://cdn.pixabay.com/photo/2020/11/06/19/12/kid-5718703_1280.jpg"
							height={0}
							width={0}
							sizes="100vw"
						/>
						<figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-1 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-0">
							<div>
								<Typography variant="h5" color="blue-gray">
									Adoptado
								</Typography>
								<Typography color="gray" className="mt-2 font-normal">
									11 Julio 2023
								</Typography>
							</div>
							<Typography variant="h5" color="blue-gray">
								Nombre: Gustavo
							</Typography>
						</figcaption>
					</Card>

					<Typography color="black" className="font-normal text-justify">
						<strong>Compañerismo: </strong>Una mascota adoptada se convertirá en tu compañero leal y fiel,
						brindándote alegría y compañía en todos los momentos de la vida.
					</Typography>

					<Card className="mb-12 overflow-hidden relative max-w-xl mx-auto">
						<Image
							alt="nature"
							className="h-[auto] w-full object-cover object-center shadow-2xl shadow-blue-gray-900/50"
							src="https://cdn.pixabay.com/photo/2015/07/30/11/05/dog-867238_1280.jpg"
							height={0}
							width={0}
							sizes="100vw"
						/>
						<figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-1 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-0">
							<div>
								<Typography variant="h5" color="blue-gray">
									Adoptado
								</Typography>
								<Typography color="gray" className="mt-2 font-normal">
									10 Julio 2023
								</Typography>
							</div>
							<Typography variant="h5" color="blue-gray">
								Nombre: Alex
							</Typography>
						</figcaption>
					</Card>
					<Typography color="black" className="font-normal text-justify">
						<strong>Reducción del estrés:</strong> Está comprobado que tener una mascota reduce los niveles de
						estrés y promueve el bienestar emocional.
					</Typography>
					<Card className="mb-12 overflow-hidden relative max-w-xl mx-auto">
						<Image
							alt="nature"
							className="h-[auto] w-full object-cover object-center shadow-2xl shadow-blue-gray-900/50"
							src="https://cdn.pixabay.com/photo/2019/02/25/17/51/animals-4020199_1280.jpg"
							height={0}
							width={0}
							sizes="100vw"
						/>
						<figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-1 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-0">
							<div>
								<Typography variant="h6" color="blue-gray">
									Rescatados
								</Typography>
								<Typography color="gray" className="mt-2 font-normal">
									12 Julio 2023
								</Typography>
							</div>
							<Typography variant="h6" color="blue-gray">
								Nombres: Lucas, Manchas y Felipe
							</Typography>
						</figcaption>
					</Card>

					<Typography variant="h4" color="blue-gray" className="mb-2 text-justify">
						{`¿Cómo adoptar una mascota?`}
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						En <strong>Mi mascota feliz</strong> te facilitamos el proceso de adopción, con tan solo llenar la
						solicitud con tus datos para la adopción de mascotas para asegurarnos de que encuentres el animal
						adecuado para ti y tu estilo de vida.
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						<strong>1. Solicita una adopción:</strong> Una vez que hayas encontrado a tu compañero ideal,
						simplemente llena nuestro formulario de solicitud de adopción y nos pondremos en contacto contigo
						para continuar el proceso.
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						<strong>2. Conoce a tu mascota:</strong> Programaremos una cita para que conozcas a tu mascota
						potencialmente adoptable. Podrás interactuar y asegurarte de que hay una conexión especial antes
						de tomar la decisión final.
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						<strong>3. ¡Bienvenido a tu hogar!:</strong> Después de una evaluación final, estarás listo para
						llevar a tu nueva mascota a casa. Te brindaremos consejos de adaptación y te apoyaremos en cada
						paso del camino.
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						Únete a <strong>Mi mascota feliz</strong> y sé parte de la hermosa experiencia de adoptar una
						mascota. Juntos, podemos hacer que muchas más mascotas encuentren el amor y la felicidad que
						merecen.
					</Typography>
					<Typography color="black" className="font-normal text-justify">
						No esperes más,
						<Link href={"/mascotas"} className="font-medium text-pink-200 hover:text-pink-700">
							¡haz clic aquí
						</Link>
						para comenzar tu aventura de adopción y darle a una mascota la oportunidad de tener una vida feliz
						y amorosa a tu lado. ¡Te esperamos en <strong>Mi mascota feliz</strong>.
					</Typography>

					<Card className="mb-12 overflow-hidden relative max-w-3xl mx-auto">
						<Image
							alt="nature"
							className="h-[auto] w-full object-cover object-center shadow-2xl shadow-blue-gray-900/50"
							src="https://cdn.pixabay.com/photo/2017/04/06/14/16/australian-shepherd-2208371_1280.jpg"
							height={0}
							width={0}
							sizes="100vw"
						/>
						<figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-1 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-0">
							<div>
								<Typography variant="h5" color="blue-gray">
									Adoptados
								</Typography>
								<Typography color="gray" className="mt-2 font-normal">
									10 Julio 2023
								</Typography>
							</div>
							<Typography variant="h5" color="blue-gray">
								Nombre: Maykel, Mat y Ralf
							</Typography>
						</figcaption>
					</Card>
				</div>
			</div>
		</LayoutHome>
	)
}
