"use client"
import React, { useState } from "react"
import { Drawer, IconButton, List, ListItem, ListItemText, makeStyles } from "@material-ui/core"
import Link from "next/link"
import MenuIcon from "@mui/icons-material/Menu"

const useStyles = makeStyles(({}) => ({
	link: {
		textDecoration: "none",
		color: "blue",
		fontSize: "20px",
	},
	icon: {
		color: "white",
	},
}))

function DrawerComponent() {
	const classes = useStyles()
	const [openDrawer, sehrefpenDrawer] = useState(false)
	return (
		<>
			<Drawer open={openDrawer} onClose={() => sehrefpenDrawer(false)}>
				<List>
					<ListItem onClick={() => sehrefpenDrawer(false)}>
						<ListItemText>
							<Link href="/">Inicio</Link>
						</ListItemText>
					</ListItem>
					<ListItem onClick={() => sehrefpenDrawer(false)}>
						<ListItemText>
							<Link href="/mascotas">About</Link>
						</ListItemText>
					</ListItem>
					<ListItem onClick={() => sehrefpenDrawer(false)}>
						<ListItemText>
							<Link href="/peticion">Contact</Link>
						</ListItemText>
					</ListItem>
					<ListItem onClick={() => sehrefpenDrawer(false)}>
						<ListItemText>
							<Link href="/contacto">Faq</Link>
						</ListItemText>
					</ListItem>
					<ListItem onClick={() => sehrefpenDrawer(false)}>
						<ListItemText>
							<Link href="/auth/login">Faq</Link>
						</ListItemText>
					</ListItem>
				</List>
			</Drawer>
			<IconButton onClick={() => sehrefpenDrawer(!openDrawer)}>
				<MenuIcon />
			</IconButton>
		</>
	)
}
export default DrawerComponent
