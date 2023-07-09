/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ["images.unsplash.com", "cdn.pixabay.com", "source.unsplash.com"],
	},
}

module.exports = nextConfig
