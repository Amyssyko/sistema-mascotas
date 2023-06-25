import { signOut } from "next-auth/react"
import { FaSolidDog } from "solid-icons/fa"
import React from "react"
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
	Accordion,
	AccordionHeader,
	AccordionBody,
	Alert,
	Avatar,
} from "@material-tailwind/react"
import {
	PresentationChartBarIcon,
	ShoppingBagIcon,
	ComputerDesktopIcon,
	UserCircleIcon,
	Cog6ToothIcon,
	InboxIcon,
	PowerIcon,
	UserGroupIcon,
} from "@heroicons/react/24/solid"
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import { LogOut } from "./Bottom/LogOut"
import { useRouter } from "next/navigation"

export default function SidebarAdmin() {
	const router = useRouter()
	const { data } = useSession()

	const [open, setOpen] = React.useState(0)
	const [openAlert, setOpenAlert] = React.useState(true)

	const handleOpen = (value: any) => {
		setOpen(open === value ? 0 : value)
	}

	return (
		<Card className="fixed top-14 left-2 h-[calc(100vh-11rem)] w-60 sm:w-60 md:w-60 lg:w-60 xl:w-60 2xl:w-60 p-2 shadow-xl shadow-blue-gray-900/5">
			<div className="mb-2 flex items-center gap-4 p-4">
				<Avatar src="https://source.unsplash.com/random?wallpapers" alt="brand" className="h-8 w-8" />
				<Typography variant="h5" color="gray">
					{data?.user.firstName && data?.user.lastName
						? `${data?.user.firstName} ${data?.user.lastName}`
						: "Bienvenido"}
				</Typography>
			</div>
			<List>
				<Accordion
					open={open === 1}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 1}>
						<AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
							<ListItemPrefix>
								<svg
									fill="currentColor"
									strokeWidth="0"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
									height="1em"
									width="1em"
								>
									<path d="m309.6 158.5 23.1-138.7C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80h-69.3l-5.1 30.5-112-64zM416 256.1V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h205.8L416 256.1zM464 80a16 16 0 1 0-32 0 16 16 0 1 0 32 0z"></path>
								</svg>
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								Mascotas
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/mascotas")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Registro Mascotas
							</ListItem>
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/lista-mascotas")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Lista de Mascotas
							</ListItem>
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/perdido")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Registro Mascotas Perdidas
							</ListItem>
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/mascotas-perdidas")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Lista Mascotas Perdidas
							</ListItem>
						</List>
					</AccordionBody>
				</Accordion>

				<Accordion
					open={open === 2}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 2}>
						<AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
							<ListItemPrefix>
								<svg
									fill="currentColor"
									strokeWidth="0"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									height="1em"
									width="1em"
								>
									<path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path>
									<path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path>
								</svg>
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								Adopciones
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/peticiones")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Registro Peticiones
							</ListItem>
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/lista-peticiones")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Lista de Peticiones
							</ListItem>
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/lista-adopciones")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Lista de Adopciones
							</ListItem>
						</List>
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 3}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 3}>
						<AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
							<ListItemPrefix>
								<UserGroupIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								Administrador
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/rol")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Roles
							</ListItem>
							<ListItem
								className="text-xs hover:bg-blue-800 rounded-md shadow-xl bg-blue-300 focus:bg-purple-600"
								onClick={() => {
									router.replace("/dashboard/lista-roles")
								}}
							>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Lista de Administradores
							</ListItem>
						</List>
					</AccordionBody>
				</Accordion>
				<hr className="my-2 border-blue-gray-50" />
				<ListItem>
					<ListItemPrefix>
						<InboxIcon className="h-5 w-5" />
					</ListItemPrefix>
					Inbox
					<ListItemSuffix>
						<Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
					</ListItemSuffix>
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<UserCircleIcon className="h-5 w-5" />
					</ListItemPrefix>
					Profile
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					Settings
				</ListItem>
				<ListItem onClick={() => signOut()}>
					<ListItemPrefix>
						<PowerIcon className="h-5 w-5" />
					</ListItemPrefix>
					Cerrar Sesion
				</ListItem>
			</List>
			{/* */}
		</Card>
	)
}
