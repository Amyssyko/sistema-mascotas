import CustomNavbar from "@/components/CustomNavbar"
import Footer from "@/components/Footer"
import SigninButton from "@/components/SigninButton"

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<CustomNavbar />
			<div className="flex-grow ">
				<SigninButton />
			</div>
			<Footer />
		</div>
	)
}
