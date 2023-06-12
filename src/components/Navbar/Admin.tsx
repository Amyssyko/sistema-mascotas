"use client"
import React from "react"
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	Card,
	IconButton,
	Collapse,
} from "@material-tailwind/react"
import {
	UserCircleIcon,
	Square3Stack3DIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	InboxArrowDownIcon,
	PowerIcon,
	Bars2Icon,
	UserGroupIcon,
	InboxIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

// profile menu component
const profileMenuItems = [
	{
		label: "Mi Perfil",
		icon: UserCircleIcon,
		link: "/dashboard/perfil",
	},
	{
		label: "Editar Perfil",
		icon: Cog6ToothIcon,
		link: "/dashboard/editperfil",
	},
	{
		label: "Peticiones",
		icon: InboxArrowDownIcon,
		link: "/dashboard/peticiones",
	},

	{
		label: "Cerrar Sesión",
		icon: PowerIcon,
		link: "/dashboard/cerrar",
	},
]

function ProfileMenu() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)
	const [isClicked, setisClicked] = React.useState(false)
	const closeMenu = () => setIsMenuOpen(false)

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					<Avatar
						variant="circular"
						size="sm"
						alt="candice wu"
						className="border border-blue-500 p-0.5"
						src="https://source.unsplash.com/random?wallpapers"
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{profileMenuItems.map(({ label, icon, link }, key) => {
					const isLastItem = key === profileMenuItems.length - 1
					return (
						<Link href={link} key={key}>
							<MenuItem
								key={label}
								onClick={closeMenu}
								className={`flex items-center gap-2 rounded ${
									isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
								}`}
							>
								{React.createElement(icon, {
									className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
									strokeWidth: 2,
								})}
								<Typography
									as="span"
									variant="small"
									className="font-normal"
									color={isLastItem ? "red" : "inherit"}
								>
									{label}
								</Typography>
							</MenuItem>
						</Link>
					)
				})}
			</MenuList>
		</Menu>
	)
}

const navListItems = [
	{
		label: "Mascotas",
		icon: Square3Stack3DIcon,
		url: "dashboard/mascotas",
	},
	{
		label: "Registro",
		icon: UserGroupIcon,
		url: "dashboard/registro",
	},
	{
		label: "Peticiones",
		icon: InboxIcon,
		url: "dashboard/peticion",
	},
	{
		label: "Informacion",
		icon: InformationCircleIcon,
		url: "dashboard/informacion",
	},
]

function NavList() {
	return (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
			{navListItems.map(({ label, icon, url }, key) => (
				<Typography key={label} as="a" href={url} variant="small" color="blue-gray" className="font-normal">
					<MenuItem className="flex items-center gap-2 lg:rounded-full">
						{React.createElement(icon, { className: "h-[18px] w-[18px]" })} {label}
					</MenuItem>
				</Typography>
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
				<Typography as="a" href="#" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
					Administración de Sistema
				</Typography>
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
