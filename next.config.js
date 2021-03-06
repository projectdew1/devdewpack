module.exports = {
	future: {
		webpack5: true,
	},

	images: {
		loader: "imgix",
		path: "http://localhost:3000/",
	},

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
