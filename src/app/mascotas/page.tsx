"use client"
import CustomNavbar from "@/components/CustomNavbar"
import React from "react"
import Footer from "@/components/Footer"
import PhotoPets from "../../components/PhotoPets"

function Page() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<CustomNavbar />
			<div className="flex-grow">
				<PhotoPets />
			</div>
			<Footer />
		</div>
	)
}

export default Page
