import CustomNavbar from "@/components/CustomNavbar"
import Footer from "@/components/Footer"
import { Solicitud } from "@/components/Form/Solicitud"
import React from "react"

export default function Page() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<CustomNavbar />
			<div className="flex-grow">
				<Solicitud />
			</div>
			<Footer />
		</div>
	)
}
