import * as React from "react"

function Loading() {
	return (
		<div className="border border-blue-300 shadow rounded-md p-4 h-screen mx-auto">
			<div className="animate-pulse flex space-x-4 w-full">
				<div className="rounded-full bg-slate-700 h-10 w-10"></div>
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 bg-slate-700 rounded"></div>
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<h1 className="animate-pulse text-3xl font-bold text-blue-900">Cargando Página...</h1>
							<div className="h-2 bg-slate-700 rounded col-span-2"></div>
							<div className="h-2 bg-slate-700 rounded col-span-1"></div>
						</div>
						<div className="h-2 bg-slate-700 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loading
