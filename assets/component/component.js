import { container } from "../mainStyle"
import { orangeP } from "../colorProject"

const componentsStyle = theme => ({
	container,
	brand: {
		color: "#FFFFFF",
		textAlign: "left",
	},
	title: {
		fontSize: "4.0rem",
		fontWeight: "800",
		display: "inline-block",
		position: "relative",
		color: orangeP,
	},
	subtitle: {
		fontSize: "1.313rem",
		maxWidth: "510px",
		margin: "10px 0 0",
		color: orangeP,
	},
	main: {
		background: "#FFFFFF",
		position: "relative",
		zIndex: "3",
	},
	mainRaised: {
		margin: "-60px 30px 0px",
		borderRadius: "6px",
		boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
		"@media (max-width: 830px)": {
			marginLeft: "10px",
			marginRight: "10px",
		},
	},
	link: {
		textDecoration: "none",
	},
	textCenter: {
		textAlign: "center",
	},

	animatedItemIn: {
		animation: `$itemsIn 2000ms ${theme.transitions.easing.easeInOut}`,
	},
	"@keyframes itemsIn": {
		"0%": {
			opacity: 0,
			transform: "translateX(-200%)",
		},
		"100%": {
			opacity: 1,
			transform: "translateX(0)",
		},
	},

	animatedItemOut: {
		animation: `$itemsOut 2000ms ${theme.transitions.easing.easeInOut}`,
	},
	"@keyframes itemsOut": {
		"0%": {
			opacity: 1,
			transform: "translateX(0)",
		},
		"100%": {
			opacity: 1,
			transform: "translateX(-200%)",
		},
	},
})

export default componentsStyle
