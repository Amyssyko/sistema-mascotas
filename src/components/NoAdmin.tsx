import React from "react"

function NoAdmin() {
	return (
		<div className="w-full h-screen bg-white dark:bg-gray-800 flex flex-col justify-items-center items-center justify-center">
			<h1 className=" animate-pulse animate-bounce text-red-800 dark:text-red-800 font-semibold text-3xl">
				No tiene privilegios
			</h1>
		</div>
	)
}

export default NoAdmin
