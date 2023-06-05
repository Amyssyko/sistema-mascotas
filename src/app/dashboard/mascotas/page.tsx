"use client"

import Navbar from "@/components/CustomNavbar"
import React from "react"
import Usuario from "@/components/Form/Usuario"
import LayoutDashboard from "@/components/Layout/LayoutDashboard"

function Page() {
	return (
		<LayoutDashboard>
			<div className="w-full items-center justify-between font-mono text-sm lg:flex bg-blue-200">
				<div className="bg-orange-50 w-full">
					<div className="h-screen">
						<h1>Mascotas</h1>
					</div>
				</div>
				<div className="bg-orange-50">
					<Usuario />
				</div>
				<div className="bg-orange-50 w-full">
					<div className="h-screen w-full ">
						<h1>Mascotas</h1>
					</div>
				</div>
			</div>
		</LayoutDashboard>
	)
}

export default Page
