import { orangeP, orangeLogo } from "../colorProject"
const scrollTopStyle = {
	shape: {
		display: "flex",
		// border: "1px solid black",
		borderRadius: "20px",
		padding: "0.2rem",
		boxShadow: "-1px 3px 7px 0px rgb(0 0 0 / 87%)",
		color: "gray",
		"&:hover,&:focus": {
			backgroundColor: orangeLogo,
			color: "white",
		},
	},
}

export default scrollTopStyle
