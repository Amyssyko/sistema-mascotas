import "./globals.css"
import { Montserrat } from "next/font/google"
import React from "react"
import { Toaster } from "react-hot-toast"
import Providers from "@/components/Providers"

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" })

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Mi Mascota Feliz",
	description: "Pagina para adoptar a tu mascota",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body className={montserrat.className}>
				<Providers>
					<div className=" bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 dark:bg-deep-orange-100">
						{children}
					</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	)
}
