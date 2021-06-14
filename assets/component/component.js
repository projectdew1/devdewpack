import { container } from "../mainStyle"
import { orangeP, orangeLogo } from "../colorProject"

const componentsStyle = theme => ({
	container,
	brand: {
		color: "#FFFFFF",
		textAlign: "left",
		WebkitTouchCallout: "none" /* iOS Safari */,
		WebkitUserSelect: "none" /* Safari */,
		KhtmlUserSelect: "none" /* Konqueror HTML */,
		MozUserSelect: "none" /* Old versions of Firefox */,
		MsUserSelect: "none" /* Internet Explorer/Edge */,
		userSelect: "none" /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */,
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

	"@keyframes textIn": {
		"0%": {
			opacity: 0,
			transform: "translate3d(0,100%,0)",
		},
		"100%": {
			opacity: 1,
			transform: "translate3d(0,0,0)",
		},
	},

	noneselct: {
		WebkitTouchCallout: "none" /* iOS Safari */,
		WebkitUserSelect: "none" /* Safari */,
		KhtmlUserSelect: "none" /* Konqueror HTML */,
		MozUserSelect: "none" /* Old versions of Firefox */,
		MsUserSelect: "none" /* Internet Explorer/Edge */,
		userSelect: "none" /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */,
	},

	bg: {
		backgroundImage: "linear-gradient(rgb(1, 53, 105), rgb(0, 102, 206) 47%, rgb(0, 28, 56))",
		height: "100vh !important",
		maxHeight: "1000px",
		overflowX: "hidden",
		position: "relative",
		backgroundPosition: "center top",
		backgroundSize: "cover",
		display: "flex",
		alignItems: "center",
		// "&::after": {
		// 	backgroundImage: "url(/wave.svg)",
		// 	backgroundRepeat: "no-repeat, repeat",
		// 	backgroundSize: "contain",
		// 	backgroundPosition: "center bottom",
		// 	position: "absolute",
		// 	bottom: 0,
		// 	left: 0,
		// 	zIndex: " 2",
		// 	content: "'' !important ",
		// 	pointerEvent: "none",
		// 	inset: "0px",
		// },
	},
	bord: {
		backgroundImage: "url(/bg-1920.png)",
		backgroundRepeat: "no-repeat, repeat",
		backgroundSize: "contain",
		backgroundPosition: "center bottom",
		position: "absolute",
		zIndex: " 2",
		content: "'' !important ",
		pointerEvent: "none",
		inset: "0px",
	},
	wave: {
		position: "absolute",
		bottom: 0,
		left: 0,
	},
	bordBander: {
		width: "100%",
		marginTop: "96px",
		top: "96px",
		height: "calc(100vh - 96px)",
	},
	gridBander: {
		display: "flex",
		height: "100%",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column-reverse",
			height: "auto",
		},
	},
	gridItemsTextImage: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	gridText: {
		fontFamily: "Kanit, sans-serif",
		width: "100%",
		textAlign: "left",
	},
	Text1: {
		color: "#ffffff",
		fontSize: "2.4em",
		textAlign: "left",
		letterSpacing: "1.1px",
		fontWeight: "800",
		marginRight: 0,
		marginLeft: 0,
		marginBottom: 0,
		animation: `$textIn 500ms ${theme.transitions.easing.easeInOut}`,

		[theme.breakpoints.down("xs")]: {
			textAlign: "center",
			fontSize: "1.8em",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "2.0em",
		},
	},
	Text2: {
		color: "#ffffff",
		fontSize: "2em",
		textAlign: "left",
		letterSpacing: "1.1px",
		fontWeight: "300",
		margin: 0,
		animation: `$textIn 700ms ${theme.transitions.easing.easeInOut}`,

		[theme.breakpoints.down("xs")]: {
			textAlign: "center",
			fontSize: "1.2em",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "1.6em",
		},
	},
	Text3: {
		color: "#ffffff",
		fontSize: "1.6em",
		textAlign: "left",
		letterSpacing: "1.1px",
		fontWeight: "200",
		textShadow: "rgb(0 187 255) 0px 0px 5px",
		WebkitTextStroke: "1px rgb(78, 189, 229)",
		margin: 0,
		animation: `$textIn 900ms ${theme.transitions.easing.easeInOut}`,

		[theme.breakpoints.down("xs")]: {
			textAlign: "center",
			fontSize: "0.8em",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "1em",
		},
	},
	buttonShow: {
		backgroundColor: orangeLogo,
		boxShadow: "rgb(0 0 0 / 16%) 0px 3px 6px 0px",
		color: "rgb(255, 255, 255)",
		fontFamily: "Kanit, sans-serif",
		fontSize: "1.4em",
		fontWeight: "200",
		lineHeight: "1.4em",
		display: "block",
		cursor: "pointer",
		padding: "7px 48px",
		borderRadius: "86px",
		marginTop: "18px",
		width: "fit-content",
		animation: `$pulse 500ms ${theme.transitions.easing.easeInOut} infinite`,
		marginTop: "20px",
	},
	"@keyframes pulse": {
		"0%": {
			MozBoxShadow: "0 0 0 0 rgba(255,102,0, 0.8)",
			boxShadow: "0 0 0 0 rgba(255,102,0, 0.8)",
		},
		"70%": {
			MozBoxShadow: "0 0 0 10px rgba(255,102,0, 0)",
			boxShadow: "0 0 0 10px rgba(255,102,0, 0)",
		},
		"100%": {
			MozBoxShadow: "0 0 0 0 rgba(255,102,0, 0)",
			boxShadow: "0 0 0 0 rgba(255,102,0, 0)",
		},
	},

	gridImage: {
		fontFamily: "Kanit, sans-serif",
		width: "100%",
	},

	image1: {
		height: "auto",
		maxWidth: "100%",
		position: "relative",
		zIndex: 100,
		animation: `$itemsIn 600ms ${theme.transitions.easing.easeInOut}`,
	},
	centerBtn: {
		animation: `$textIn 1100ms ${theme.transitions.easing.easeInOut}`,

		[theme.breakpoints.down("xs")]: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	},

	bgZone2: {
		backgroundColor: "#ffffff",
		minHeight: "55vh !important",
		overflowX: "hidden",
		position: "relative",
	},

	expain: {
		// marginTop: "-10px",
		zIndex: "-2",
	},

	// ********************** react slick *******************//

	line_title: {
		position: "relative",
		width: "100%",
		paddingBottom: "10px",
		cursor: "pointer",
		"&::before,&::after": {
			content: "'' !important",
			position: "absolute",
			bottom: 0,
			left: 0,
			height: "4px",
			borderRadius: "2px",
		},
		"&::before": {
			width: "100%",
			background: "#f2f2f2",
		},
		"&::after": {
			width: "10%",
			background: orangeLogo,
			transition: "all 0.4s ease-in-out 0.2s",
			WebkitTransition: "all 0.4s ease-in-out 0.2s",
		},
		"&:hover": {
			color: orangeLogo,
			"&::after": {
				width: "70%",
				background: orangeLogo,
			},
		},
	},

	itemImage: {
		margin: "0 15px 60px",
		width: "auto",
		height: "300px",
		display: "flex",
		display: "-webkit-flex",
		alignItems: "flex-end",
		WebkitAlignItems: "flex-end",
		background: "#343434 no-repeat center center / cover",
		borderRadius: "16px",
		overflow: "hidden",
		position: "relative",
		transition: "all 0.4s ease-in-out",
		WebkitTransition: "all 0.4s ease-in-out",
		cursor: "pointer",
		"&::after": {
			content: "'' !important",
			display: "block",
			position: "absolute",
			height: "100%",
			width: "100%",
			left: 0,
			top: 0,
			backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
		},
		"& div": {
			padding: "0 24px 12px",
			color: "#fff",
			position: "relative",
			zIndex: "1",
			overflow: "hidden",
			transform: "translateY(calc(100% - 54px))",
			WebkitTransform: "translateY(calc(100% - 54px))",
			transition: "all 0.4s ease-in-out",
			WebkitTransition: "all 0.4s ease-in-out",
		},
		"& p": {
			opacity: 0,
			WebkitTransform: "translateY(32px)",
			transform: "translateY(32px)",
			transition: "all 0.4s ease-in-out 0.2s",
			WebkitTransition: "all 0.4s ease-in-out 0.2s",
		},
		"&:hover": {
			// width: "500px",
			boxShadow: "12px 30px 30px rgba(0, 0, 0, 0.25)",
			WebkitBoxShadow: "12px 30px 30px rgba(0, 0, 0, 0.25)",
			"& div": {
				transform: "none",
				WebkitTransform: "none",
			},
			"& p": {
				opacity: 1,
				WebkitTransform: "translateY(0)",
				transform: "translateY(0)",
			},
		},
		[theme.breakpoints.down("md")]: {
			margin: "0 12px 60px",
			// width: "240px",
			height: "230px",
			"& h3": {
				margin: "0 0 8px",
				fontSize: "20px",
				lineHeight: "28px",
			},
			"& div": {
				transform: "translateY(calc(100% - 42px))",
				WebkitTransform: "translateY(calc(100% - 42px))",
			},
		},
		[theme.breakpoints.down("xs")]: {
			margin: "0 10px 40px",
			// width: "240px",
			height: "160px",
			"& h3": {
				margin: "0 0 8px",
				fontSize: "16px",
				lineHeight: "24px",
			},
			"& div": {
				padding: "0 14px 5px",
				transform: "translateY(calc(100% - 30px))",
				WebkitTransform: "translateY(calc(100% - 30px))",
			},
		},
	},

	// ********************** react slick *******************//

	// ********************** why use me *******************//

	Gridy: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},

	// ********************** why use me *******************//
})

export default componentsStyle
