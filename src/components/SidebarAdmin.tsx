import { signOut } from "next-auth/react"
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

export default function SidebarAdmin() {
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
								<ComputerDesktopIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								Mascotas
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							<ListItem>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Registrar
							</ListItem>
							<ListItem>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Lista
							</ListItem>
							<ListItem>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Reportes
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
								<UserGroupIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								Usuarios
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							<ListItem>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Informacion
							</ListItem>
							<ListItem>
								<ListItemPrefix>
									<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
								</ListItemPrefix>
								Roles
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
