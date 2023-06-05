import React, { useEffect, useState } from "react"
import Admin from "../Navbar/Admin"
import SidebarAdmin from "../SidebarAdmin"
import Footer from "../Footer"

function LayoutDashboard({ children }: { children: React.ReactNode }) {
	const [availableHeight, setAvailableHeight] = useState(0)
	const [isMobile, setIsMobile] = useState(false)
	const [sidebarOpen, setSidebarOpen] = useState(false)

	useEffect(() => {
		const calculateAvailableHeight = () => {
			const windowHeight = window.innerHeight
			const headerHeight = document.getElementById("header")?.offsetHeight || 0
			const footerHeight = document.getElementById("footer")?.offsetHeight || 0

			const availableHeight = windowHeight - headerHeight - footerHeight
			setAvailableHeight(availableHeight)
		}

		const handleResize = () => {
			const windowWidth = window.innerWidth
			setIsMobile(windowWidth <= 768)
			calculateAvailableHeight()
		}

		calculateAvailableHeight()

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	return (
		<div className="w-full h-screen bg-orange-50 flex flex-col">
			{!isMobile && <SidebarAdmin />}
			<Admin />
			<div
				className={`ml-${isMobile ? "0" : "64"} border-red-600 border bg-blue-800 flex-1 overflow-hidden`}
				style={{ height: `${availableHeight}px` }}
			>
				{children}
			</div>
			<Footer />
			{isMobile && (
				<div
					className={`fixed inset-0 bg-black opacity-50 transition-opacity z-40 ${
						sidebarOpen ? "block" : "hidden"
					}`}
					onClick={toggleSidebar}
				></div>
			)}
			{isMobile && (
				<div
					className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform transition-transform z-50 ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<SidebarAdmin />
				</div>
			)}
			{isMobile && (
				<button
					className={`fixed top-2 right-2 p-2 bg-blue-500 text-white rounded-md z-50 ${
						sidebarOpen ? "hidden" : "block"
					}`}
					onClick={toggleSidebar}
				>
					Open Sidebar
				</button>
			)}
		</div>
	)
}

export default LayoutDashboard
