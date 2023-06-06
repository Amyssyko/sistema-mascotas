import { Button, Card } from "@material-tailwind/react"
import { signIn } from "next-auth/react"
import React from "react"

function SignIn() {
	return (
		<Card className="w-auto my-auto">
			<Button
				onClick={() => signIn()}
				size="sm"
				className="mx-auto w-auto shadow-md text-xs  border rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
			>
				Iniciar Sesión
			</Button>
		</Card>
	)
}

export { SignIn }
