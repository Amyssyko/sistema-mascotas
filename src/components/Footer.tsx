"use client"
import { Avatar, Typography } from "@material-tailwind/react"

function Footer() {
	return (
		<footer className="mx-auto my-auto w-full  bg-white p-4">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<Avatar src="https://source.unsplash.com/random?wallpapers" alt="logo-ct" className="w-12" />
				<ul className="flex flex-wrap justify-center gap-y-2 gap-x-8 md:justify-end">
					<li>
						<Typography
							as="a"
							href="/Inicio"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Inicio
						</Typography>
					</li>
					<li>
						<Typography
							as="a"
							href="#"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							License
						</Typography>
					</li>
					<li>
						<Typography
							as="a"
							href="#"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Contribute
						</Typography>
					</li>
					<li>
						<Typography
							as="a"
							href="#"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Contact Us
						</Typography>
					</li>
				</ul>
			</div>
			<hr className="my-auto mx-auto border-blue-gray-50" />
			<Typography color="blue-gray" className="text-center font-normal">
				{`© ${new Date().getFullYear()} Mi mascota Feliz - UTC`}
			</Typography>
		</footer>
	)
}

export default Footer