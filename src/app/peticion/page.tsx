import Navbar from "@/components/Navbar"
import React from "react"

function Page() {
	return (
		<>
			<Navbar />
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
					<h1>Peticion</h1>
				</div>
			</main>
		</>
	)
}

export default Page
