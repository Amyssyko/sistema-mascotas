"use client"
import React from "react"
import { Navbar, Typography, Button, IconButton, Card, Collapse, Avatar } from "@material-tailwind/react"
import { SignIn } from "./Bottom/SignIn"
import Link from "next/link"

export default function CustomNavbar() {
	const [openNav, setOpenNav] = React.useState(false)

	React.useEffect(() => {
		window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false))
	}, [])

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6  dark:text-black">
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<Link href="/" className="flex items-center">
					Inicio
				</Link>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<Link href="/mascotas" className="flex items-center">
					Mascotas
				</Link>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<Link href="/informacion" className="flex items-center">
					Información
				</Link>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<Link href="/solicitar" className="flex items-center">
					Solicitar Adopción
				</Link>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<SignIn />
			</Typography>
		</ul>
	)

	return (
		<Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-gradient-to-bl from-rose-100 to-teal-100">
			<div className="flex items-center justify-between text-blue-gray-900">
				<div className="flex items-center justify-center flex-col ">
					{/**<Avatar src="https://source.unsplash.com/random?wallpapers" alt="avatar" variant="circular" /> */}

					<Link href="/">
						<Typography className="mr-4 cursor-pointer py-1.5 text-sky-900 text-center w-auto mx-auto">
							<svg
								fill="currentColor"
								strokeWidth="0"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								height="4em"
								width="4em"
								className=" text-pink-200 dark:text-deep-purple-400 hover:animate-spin mx-auto"
							>
								<path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path>
								<path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path>
							</svg>
							Mi Mascota Feliz
						</Typography>
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<div className="mr-4 hidden lg:block">{navList}</div>

					<IconButton
						variant="text"
						className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
						ripple={false}
						onClick={() => setOpenNav(!openNav)}
					>
						{openNav ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="h-6 w-6"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</IconButton>
				</div>
			</div>
			<Collapse open={openNav}>
				{navList}
				{/**<Button variant="gradient" size="sm" fullWidth className="mb-2">
					<span>Buy Now</span>
				</Button> */}
			</Collapse>
		</Navbar>
	)
}
