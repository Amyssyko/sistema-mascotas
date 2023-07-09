"use client"
import React from "react"
import {
	Navbar,
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	IconButton,
	Collapse,
} from "@material-tailwind/react"
import {
	Square3Stack3DIcon,
	ChevronDownIcon,
	Bars2Icon,
	UserGroupIcon,
	InboxIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

function ProfileMenu() {
	const { data: session } = useSession()
	const photo = session?.user?.photo

	const [isMenuOpen, setIsMenuOpen] = React.useState(false)

	const closeMenu = () => setIsMenuOpen(false)

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					{photo ? (
						<Avatar
							variant="circular"
							size="sm"
							alt=""
							className="border border-blue-500 p-0.5"
							src={photo}
						/>
					) : (
						<Avatar
							variant="circular"
							size="sm"
							alt=""
							className="border border-blue-500 p-0.5"
							src="https://source.unsplash.com/random?wallpapers"
						/>
					)}
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				<Link href={"/dashboard/editperfil"}>
					<MenuItem onClick={closeMenu} className="flex items-center gap-2 rounded hover:bg-black/20">
						<Typography as="buttom" variant="small" className="font-normal text-black hover:text-blue-700">
							Perfil
						</Typography>
					</MenuItem>
				</Link>
				<Link href={""} onClick={() => signOut()}>
					<MenuItem onClick={closeMenu} className="flex items-center gap-2 rounded hover:bg-black/20 ">
						<Typography as="span" variant="small" className="font-normal text-black hover:text-red-700">
							Cerrar Sesión
						</Typography>
					</MenuItem>
				</Link>
			</MenuList>
		</Menu>
	)
}

const navListItems = [
	{
		label: "Mascotas",
		icon: Square3Stack3DIcon,
		url: "/dashboard/lista-mascotas",
	},
	{
		label: "Peticiones",
		icon: UserGroupIcon,
		url: "/dashboard/lista-peticiones",
	},
	{
		label: "Extraviadas",
		icon: InboxIcon,
		url: "/dashboard/mascotas-perdidas",
	},
	{
		label: "Adopciones",
		icon: InformationCircleIcon,
		url: "/dashboard/lista-adopciones",
	},
]

function NavList() {
	return (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
			{navListItems.map(({ label, icon, url }, key) => (
				<Link key={label} href={url}>
					<Typography as="span" variant="small" color="blue-gray" className="font-normal">
						<MenuItem className="flex items-center gap-2 lg:rounded-full  hover:bg-gray-400">
							{React.createElement(icon, { className: "h-[18px] w-[18px]" })} {label}
						</MenuItem>
					</Typography>
				</Link>
			))}
		</ul>
	)
}

export default function Admin() {
	const [isNavOpen, setIsNavOpen] = React.useState(false)
	const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur)

	React.useEffect(() => {
		window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false))
	}, [])

	return (
		<Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
			<div className="relative mx-auto flex items-center text-blue-gray-900">
				<Link href="/dashboard/lista-adopciones">
					<Typography as="span" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium  hover:text-blue-900">
						Administración de Sistema
					</Typography>
				</Link>
				<div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
					<NavList />
				</div>
				<IconButton
					size="sm"
					color="blue-gray"
					variant="text"
					onClick={toggleIsNavOpen}
					className="ml-auto mr-2 lg:hidden"
				>
					<Bars2Icon className="h-6 w-6" />
				</IconButton>
				<ProfileMenu />
			</div>
			<Collapse open={isNavOpen} className="overflow-scroll">
				<NavList />
			</Collapse>
		</Navbar>
	)
}
