import { container } from "../assets/mainStyle"

const LoginStyle = theme => ({
	container,
	main: {
		// background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,102,0,1) 50%, rgba(0,51,102,1) 100%)",
		backgroundImage: 'url("https://wallpaperaccess.com/full/545077.jpg")',
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
	},
	line: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
	},
	lineItems: {
		// border: "1px solid black",
		height: "400px",
		width: "700px",
		borderRadius: "10px",
		backgroundColor: "#ffffffe0",
		padding: "20px",
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
	},
})

export default LoginStyle
