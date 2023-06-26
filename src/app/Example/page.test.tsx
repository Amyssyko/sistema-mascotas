import * as React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Page from "./page"

test("render", () => {
	const title = {
		content: "Testing",
		important: true,
	}

	const component = render(<Page title={title} />)
	console.log(component)
	component.getByText("Hola Mundo, como estan")
})
