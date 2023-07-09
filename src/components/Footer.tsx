"use client"
import { Avatar, Typography } from "@material-tailwind/react"
import { useSession } from "next-auth/react"

function Footer() {
	const { data: session } = useSession()
	return (
		<footer className="mx-auto my-auto w-full bg-white  p-4 border-gray-400 border-t">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<svg
					fill="currentColor"
					strokeWidth="0"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512"
					height="2em"
					width="5em"
					className="font-extrabold animate-bounce text-teal-500 dark:text-light-blue-800"
				>
					<path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64 11 0 21.8-1.4 32-4v228c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7S50.5 94 68 96.2l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5c-10 3.5-20.8 5.5-32 5.5-28.4 0-54-12.4-71.6-32-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128V10.7C352 4.8 356.7.1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2v.1l12.8 17 27.2 36.3L416 64h64l4.8-6.4L512 21.3l12.8-17v-.1c2-2.6 5.1-4.2 8.4-4.2h.2c5.9.1 10.6 4.8 10.6 10.7V128c0 17.3-4.6 33.6-12.6 47.6-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0-32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"></path>
				</svg>
				{/**<Avatar src="https://source.unsplash.com/random?wallpapers" alt="logo-ct" className="w-12" /> */}
				<ul className="flex flex-wrap justify-center gap-y-2 gap-x-8 md:justify-end dark:text-black">
					<li>
						<Typography
							as="a"
							href="/"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Inicio
						</Typography>
					</li>
					<li>
						<Typography
							as="a"
							href="/mascotas"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Mascotas
						</Typography>
					</li>
					<li>
						<Typography
							as="a"
							href="/contacto"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Contacto
						</Typography>
					</li>
					{session?.user && session?.user.role !== "USER" ? (
						<li>
							<Typography
								as="a"
								href="/dashboard/lista-adopciones"
								color="blue-gray"
								className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
							>
								Dashboard
							</Typography>
						</li>
					) : (
						""
					)}
				</ul>
			</div>
			<hr className="my-auto mx-auto border-blue-gray-50 " />
			<Typography color="blue-gray" className="text-center font-normal dark:text-black">
				{`© ${new Date().getFullYear()} Mi Mascota Feliz - UTC`}
			</Typography>
		</footer>
	)
}

export default Footer
