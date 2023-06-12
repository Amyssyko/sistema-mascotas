import { Spinner } from "@material-tailwind/react"
import * as React from "react"

function Loading() {
	return (
		<div className="w-full h-screen bg-white dark:bg-gray-800 flex flex-col justify-items-center items-center justify-center">
			<Spinner className="h-14 w-14 mb-4" color="blue" />
			<h1 className=" animate-pulse  text-black dark:text-white text-5xl font-extrabold">Cargando...</h1>
		</div>
	)
}

export default Loading
