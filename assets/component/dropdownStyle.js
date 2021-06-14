import { primaryColor, primaryBoxShadow, infoColor, infoBoxShadow, successColor, successBoxShadow, warningColor, warningBoxShadow, dangerColor, dangerBoxShadow, roseColor, roseBoxShadow, orangeBoxShadow, orangeP } from "../mainStyle"

const dropdownStyle = theme => ({
	popperClose: {
		pointerEvents: "none",
	},
	pooperNav: {
		[theme.breakpoints.down("sm")]: {
			position: "static !important",
			left: "unset !important",
			top: "unset !important",
			transform: "none !important",
			willChange: "none !important",
			"& > div": {
				boxShadow: "none !important",
				marginLeft: "1.5rem",
				marginRight: "1.5rem",
				transition: "none !important",
				marginTop: "0px !important",
				marginBottom: "5px !important",
				padding: "0px !important",
			},
		},
	},
	dropdown: {
		borderRadius: ".4em",
		border: "0",
		boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
		top: "100%",
		zIndex: "1000",
		minWidth: "100%",
		// minWidth: "160px",
		// padding: "5px 0",
		padding: "5px ",
		margin: "2px 0 0",
		fontSize: "14px",
		textAlign: "left",
		listStyle: "none",
		backgroundColor: "#fff",
		backgroundClip: "padding-box",
		/// สร้างหลายเมนู
		display: "flex",
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	menuList: {
		padding: "0",
		// padding: "50",
	},
	popperResponsive: {
		zIndex: "1200",
		position: "absolute !important",
		[theme.breakpoints.down("sm")]: {
			zIndex: "1640",
			position: "static !important",
			float: "none",
			width: "auto",
			marginTop: "0",
			backgroundColor: "transparent",
			border: "0",
			boxShadow: "none",
			color: "black",
		},
	},
	dropdownItem: {
		fontFamily: "Kanit, sans-serif",
		fontWeight: "bold",
		fontSize: "13px",
		padding: "5px 20px !important",
		margin: "0 5px",
		borderRadius: "2px",
		position: "relative",
		transition: "all 150ms linear",
		display: "block",
		clear: "both",
		fontWeight: "400",
		height: "fit-content",
		color: "#919191",
		whiteSpace: "nowrap",
		minHeight: "unset",
		// zIndex: "1 !important",
		// "&:hover,&:focus": {
		// 	color: "#ffffff",
		// 	backgroundColor: "transparent",
		// 	"&::before": {
		// 		transform: "scaleX(1) ",
		// 	},
		// },
		// "&::before": {
		// 	content: "'' !important",
		// 	position: "absolute",
		// 	backgroundColor: orangeP,
		// 	top: 0,
		// 	left: 0,
		// 	right: 0,
		// 	bottom: 0,
		// 	zIndex: "-1 !important",
		// 	transform: "scaleX(0)",
		// 	transition: "transform 100ms ease-in-out",
		// 	transformOrigin: "left",
		// },
		[theme.breakpoints.down("sm")]: {
			width: "calc(100% - 30px) !important",
		},
	},
	dropdownItemH: {
		fontFamily: "Kanit, sans-serif",
		fontWeight: "bold",
		fontSize: "13px",
		padding: "5px 20px !important",
		margin: "0 5px",
		borderRadius: "2px",
		position: "relative",
		transition: "all 150ms linear",
		display: "block",
		clear: "both",
		fontWeight: "400",
		height: "fit-content",
		color: "#000000",
		whiteSpace: "nowrap",
		minHeight: "unset",
		// zIndex: "1 !important",
		// "&:hover,&:focus": {
		// 	color: "#ffffff",
		// 	backgroundColor: "transparent",
		// 	"&::before": {
		// 		transform: "scaleX(1) ",
		// 	},
		// },
		// "&::before": {
		// 	content: "'' !important",
		// 	position: "absolute",
		// 	backgroundColor: orangeP,
		// 	top: 0,
		// 	left: 0,
		// 	right: 0,
		// 	bottom: 0,
		// 	zIndex: "-1 !important",
		// 	transform: "scaleX(0)",
		// 	transition: "transform 100ms ease-in-out",
		// 	transformOrigin: "left",
		// },
		[theme.breakpoints.down("sm")]: {
			width: "calc(100% - 30px) !important",
		},
	},
	blackHover: {
		"&:hover": {
			boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
			backgroundColor: "#212121",
			color: "#fff",
		},
	},
	primaryHover: {
		"&:hover": {
			backgroundColor: primaryColor,
			color: "#FFFFFF",
			...primaryBoxShadow,
		},
	},
	infoHover: {
		"&:hover": {
			backgroundColor: infoColor,
			color: "#FFFFFF",
			...infoBoxShadow,
		},
	},
	successHover: {
		"&:hover": {
			backgroundColor: successColor,
			color: "#FFFFFF",
			...successBoxShadow,
		},
	},
	warningHover: {
		"&:hover": {
			backgroundColor: warningColor,
			color: "#FFFFFF",
			...warningBoxShadow,
		},
	},
	dangerHover: {
		"&:hover": {
			backgroundColor: dangerColor,
			color: "#FFFFFF",
			...dangerBoxShadow,
		},
	},
	roseHover: {
		"&:hover": {
			backgroundColor: roseColor,
			color: "#FFFFFF",
			...roseBoxShadow,
		},
	},
	orangeHover: {
		"&:hover": {
			backgroundColor: orangeP,
			color: "#FFFFFF",
			...orangeBoxShadow,
		},
	},
	dropdownItemRTL: {
		textAlign: "right",
	},
	dropdownDividerItem: {
		margin: "5px 0",
		backgroundColor: "rgba(0, 0, 0, 0.12)",
		height: "1px",
		overflow: "hidden",
	},
	buttonIcon: {
		width: "20px",
		height: "20px",
	},
	caret: {
		transition: "all 150ms ease-in",
		display: "inline-block",
		width: "0",
		height: "0",
		marginLeft: "4px",
		verticalAlign: "middle",
		borderTop: "4px solid",
		borderRight: "4px solid transparent",
		borderLeft: "4px solid transparent",
	},
	caretActive: {
		transform: "rotate(180deg)",
	},
	caretRTL: {
		marginRight: "4px",
	},
	dropdownHeader: {
		fontFamily: "Kanit, sans-serif",
		display: "block",
		padding: "0.1875rem 1.25rem",
		fontSize: "0.75rem",
		lineHeight: "1.428571",
		color: "#777",
		whiteSpace: "nowrap",
		fontWeight: "inherit",
		marginTop: "10px",
		minHeight: "unset",
		"&:hover,&:focus": {
			backgroundColor: "transparent",
			cursor: "auto",
		},
	},
	noLiPadding: {
		padding: "0",
	},
})

export default dropdownStyle
