import CustomNavbar from "@/components/CustomNavbar"
import Footer from "@/components/Footer"
import SigninButton from "@/components/SigninButton"

export const metadata = {
	title: "Mi Mascota Feliz",
	description: "Pagina para adoptar a tu mascota",
}

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<CustomNavbar />
			<div className="flex flex-grow items-center justify-between font-mono text-sm bg-gray-800">
				<h1>Inicio</h1>
				<SigninButton />
			</div>
			<Footer />
		</div>
	)
}
