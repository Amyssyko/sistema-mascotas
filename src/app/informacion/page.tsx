import CustomNavbar from "@/components/CustomNavbar"
import React from "react"
import Footer from "@/components/Footer"

function Page() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<CustomNavbar />
			<div className="flex-grow">
				<section className="px-4 max-w-screen-xl mx-auto my-8">
					<div className="mx-auto max-w-3xl text-center">
						<h3 className="mb-6 text-3xl font-bold">Testimonials</h3>
						<p className="mb-6 pb-2 text-neutral-500 dark:text-neutral-300 md:mb-12">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure
							provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur
							veniam.
						</p>
					</div>

					<div className="grid gap-12 text-center md:grid-cols-2">
						<div className="mb-6 md:mb-0">
							<div className="mb-6 flex justify-center">
								<img
									src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(22).jpg"
									className="w-24 rounded-full shadow-lg dark:shadow-black/30"
								/>
							</div>
							<p className="my-4 text-xl text-neutral-500 dark:text-neutral-300">
								Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing elit sed ut perspiciatis unde
								omnis.
							</p>
							<p className="italic">- Anna Morian</p>
						</div>
						<div className="mb-0">
							<div className="mb-6 flex justify-center">
								<img
									src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(19).jpg"
									className="w-24 rounded-full shadow-lg dark:shadow-black/30"
								/>
							</div>
							<p className="my-4 text-xl text-neutral-500 dark:text-neutral-300">
								Neque cupiditate assumenda in maiores repudiandae mollitia architecto elit sed adipiscing elit
							</p>
							<p className="italic">- Teresa May</p>
						</div>
						<div className="mb-0">
							<div className="mb-6 flex justify-center">
								<img
									src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(19).jpg"
									className="w-24 rounded-full shadow-lg dark:shadow-black/30"
								/>
							</div>
							<p className="my-4 text-xl text-neutral-500 dark:text-neutral-300">
								Neque cupiditate assumenda in maiores repudiandae mollitia architecto elit sed adipiscing elit
							</p>
							<p className="italic">- Teresa May</p>
						</div>
						<div className="mb-0">
							<div className="mb-6 flex justify-center">
								<img
									src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(19).jpg"
									className="w-24 rounded-full shadow-lg dark:shadow-black/30"
								/>
							</div>
							<p className="my-4 text-xl text-neutral-500 dark:text-neutral-300">
								Neque cupiditate assumenda in maiores repudiandae mollitia architecto elit sed adipiscing elit
							</p>
							<p className="italic">- Teresa May</p>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</div>
	)
}

export default Page
