module.exports = {
	images: {
		loader: "imgix",
		path: "http://localhost:3000/",
	},

	// future: {
	// 	webpack5: true,
	// 	strictPostcssConfiguration: true,
	// },

	async headers() {
		return [
			{
				source: "/with-basePath", // becomes /docs/with-basePath
				headers: [
					{
						key: "x-hello",
						value: "world",
					},
				],
			},
			{
				source: "/without-basePath", // is not modified since basePath: false is set
				headers: [
					{
						key: "x-hello",
						value: "world",
					},
				],
				basePath: false,
			},
		]
	},
}
