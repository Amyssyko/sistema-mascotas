import { Carousel, IconButton, Typography } from "@material-tailwind/react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export default function PhotoPets() {
	const photo = [
		{
			id: 1,
			url: "https://cdn.pixabay.com/photo/2016/06/14/00/14/cat-1455468_1280.jpg",
			name: "Gatito Juguetón",
			description: "Un adorable gatito jugando con una bola de estambre.",
		},
		{
			id: 2,
			url: "https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673_1280.jpg",
			name: "Gatito Curioso",
			description: "Un curioso gatito explorando su entorno.",
		},
		{
			id: 3,
			url: "https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089_1280.jpg",
			name: "Gatito Durmiendo",
			description: "Un lindo gatito durmiendo plácidamente.",
		},
		{
			id: 4,
			url: "https://cdn.pixabay.com/photo/2018/01/09/11/04/dog-3071334_1280.jpg",
			name: "Perrito Feliz",
			description: "Un perro feliz jugando en el parque.",
		},
		{
			id: 5,
			url: "https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730_1280.jpg",
			name: "Gato Majestuoso",
			description: "Un gato de raza Maine Coon posando con elegancia.",
		},
		{
			id: 6,
			url: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
			name: "Cachorro Juguetón",
			description: "Un adorable cachorro jugando con una pelota.",
		},
	]

	return (
		<Carousel
			transition={{ duration: 2 }}
			className="rounded-xl max-w-screen-md mx-auto"
			prevArrow={({ handlePrev }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handlePrev}
					className="!absolute top-2/4 -translate-y-2/4 left-4"
				>
					<ArrowLeftIcon strokeWidth={2} className="w-6 h-6" />
				</IconButton>
			)}
			nextArrow={({ handleNext }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handleNext}
					className="!absolute top-2/4 -translate-y-2/4 !right-4"
				>
					<ArrowRightIcon strokeWidth={2} className="w-6 h-6" />
				</IconButton>
			)}
		>
			{photo.map(({ id, url, name, description }) => (
				<div key={id.toString()} className="relative h-full w-full">
					<Image
						className="h-full w-full object-cover "
						width={900}
						height={900}
						key={id}
						src={url}
						quality={100}
						priority={true}
						alt=" "
					/>

					<div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
						<Typography variant="h1" color="white" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
							{name}
						</Typography>
						<Typography variant="lead" color="white" className="mb-12 opacity-80">
							{description}
						</Typography>
					</div>
				</div>
			))}
		</Carousel>
	)
}
