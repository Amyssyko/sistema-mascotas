import React from "react"
import Dashboard from "../components/Dashboard"
import Copyright from "@/components/Copyright"
function Layout({ children }) {
	return (
		<div>
			<Dashboard>{children}</Dashboard>
		</div>
	)
}

export default Layout
