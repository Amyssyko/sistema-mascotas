"use client"

import React from "react"
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Typography,
	makeStyles,
	useTheme,
	useMediaQuery,
} from "@material-ui/core"
import Link from "next/link"
import DrawerComponent from "./Drawer"

const useStyles = makeStyles((theme) => ({
	navlinks: {
		marginLeft: theme.spacing(5),
		display: "flex",
	},
	logo: {
		flexGrow: "1",
		cursor: "pointer",
	},
	link: {
		textDecoration: "none",
		color: "white",
		fontSize: "20px",
		marginLeft: theme.spacing(20),
		"&:hover": {
			color: "yellow",
			borderBottom: "1px solid white",
		},
	},
}))

function Navbar() {
	const classes = useStyles()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))

	return (
		<AppBar position="static">
			<CssBaseline />
			<Toolbar>
				<Typography variant="h4" className={classes.logo}>
					🐶🐱 Mascota Feliz
				</Typography>
				{isMobile ? (
					<DrawerComponent />
				) : (
					<div className={classes.navlinks}>
						<Link href="/" className={classes.link}>
							Inicio
						</Link>
						<Link href="/mascotas" className={classes.link}>
							Mascotas
						</Link>
						<Link href="/peticion" className={classes.link}>
							Peticion
						</Link>
						<Link href="/contacto" className={classes.link}>
							Contacto
						</Link>
						<Link href="/auth/login" className={classes.link}>
							Login
						</Link>
					</div>
				)}
			</Toolbar>
		</AppBar>
	)
}
export default Navbar
