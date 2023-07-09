import React from "react"
import Client from "@/components/Navbar/Client"
import Footer from "@/components/Footer"
function LayoutHome({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Client />
			<div className="flex-grow">{children}</div>
			<Footer />
		</div>
	)
}

export default LayoutHome
