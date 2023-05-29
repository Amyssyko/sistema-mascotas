import { render, screen } from "@testing-library/react"
import * as React from "react"
import "@testing-library/jest-dom"
import Home from "@/app/page"

describe("Pagina Inicial", () => {
	it("Deberia renderizar propiedades", () => {
		render(<Home />)
		const header = screen.getByRole("heading")
		const headerText = "Ini"
		expect(header).toHaveTextContent(headerText)
	})
})
