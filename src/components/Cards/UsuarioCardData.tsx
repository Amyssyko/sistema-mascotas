"use client"
import * as React from "react"
import { Drawer, Button, Typography, IconButton, Input, Textarea, Avatar } from "@material-tailwind/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
interface Props {
	bool: boolean
}
export function UsuarioCardData({ bool }: Props) {
	const [open, setOpen] = React.useState(false)
	const openDrawer = () => setOpen(true)
	const closeDrawer = () => setOpen(false)
	return (
		<React.Fragment>
			<Button
				onClick={openDrawer}
				variant="text"
				color="blue-gray"
				className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
			>
				Mi Perfil
			</Button>
			<Drawer open={open} onClose={closeDrawer}>
				<div className="mb-2 flex items-center justify-between p-4">
					<Typography variant="h5" color="blue-gray">
						Contact Us
					</Typography>
					<IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
						<XMarkIcon strokeWidth={2} className="h-5 w-5" />
					</IconButton>
				</div>
				<form className="flex flex-col gap-6 p-4">
					<Input type="email" label="Email" />
					<Input label="Subject" />
					<Textarea rows={6} label="Message" />
					<Button>Send Message</Button>
				</form>
			</Drawer>
		</React.Fragment>
	)
}
