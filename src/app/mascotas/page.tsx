"use client"
import React from "react"
import { PetsCard } from "@/components/Cards/PetsCard"
import LayoutHome from "@/components/Layout/LayoutHome"

function Page() {
	return (
		<LayoutHome>
			<PetsCard />
		</LayoutHome>
	)
}

export default Page
