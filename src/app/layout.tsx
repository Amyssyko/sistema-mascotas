import "./globals.css"
import { Montserrat } from "next/font/google"
import React from "react"
import { Toaster } from "react-hot-toast"
import Providers from "@/components/Providers"

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body className={montserrat.className}>
				<Providers>
					<div>{children}</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	)
}
