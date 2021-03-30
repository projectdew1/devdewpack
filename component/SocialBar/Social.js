import React from "react"
import Zoom from "@material-ui/core/Zoom"
import { makeStyles } from "@material-ui/core/styles"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"
import { orangeLogo } from "../../assets/colorProject"
import classNames from "classnames"
import Tooltip from "@material-ui/core/Tooltip"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"

const Social = props => {
	const [check, setCheck] = React.useState(false)
	const useStyles = makeStyles(theme => ({
		root: {
			position: "fixed",
			bottom: "40%",
			left: "-3rem",
			zIndex: 100,
			cursor: "pointer",
		},
		shape: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			height: "5rem",
			width: "5rem",
			borderRadius: "50px",
			boxShadow: "-1px 3px 7px 0px rgb(0 0 0 / 87%)",
			// backgroundColor: "#2d76c3",
			color: "#adadad",
		},
		shapeColor: {
			backgroundColor: orangeLogo,
		},
		icon: {
			marginLeft: "10px",
			fontSize: "35px",
		},
		iconClose: {
			marginLeft: "10px",
			fontSize: "35px",
		},
		small: {
			position: "fixed",
			bottom: "43%",
			left: "-1px",
			borderRadius: "50%",
			height: "30px",
			width: "30px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			transition: "all 500ms cubic-bezier(.6, -.5, .4, 1.5)",
		},
		icon1: {
			backgroundColor: "#009aff",
			boxShadow: "0 0 5px rgba(0, 0, 0, .5)",
			bottom: "50%",
			left: "20px",
			zIndex: 20,
		},
		icon2: {
			backgroundColor: "#3b5998",
			boxShadow: "0 0 5px rgba(0, 0, 0, .5)",
			bottom: "43%",
			left: "50px",
			zIndex: 20,
			transitionDelay: "50ms",
		},
		icon3: {
			backgroundColor: "#00c300",
			boxShadow: "0 0 5px rgba(0, 0, 0, .5)",
			bottom: "36%",
			left: "20px",
			zIndex: 20,
			transitionDelay: "100ms",
		},
		hide: {
			zIndex: "-20",
		},
		showIcon: {
			color: "white",
		},
		hideIcon: {
			color: "transparent",
		},
	}))
	const classes = useStyles()
	const icon1 = classNames({
		[classes.small]: true,
		[classes.hide]: !check,
		[classes.icon1]: check,
		[classes.showIcon]: check,
		[classes.hideIcon]: !check,
	})
	const icon2 = classNames({
		[classes.small]: true,
		[classes.hide]: !check,
		[classes.icon2]: check,
		[classes.showIcon]: check,
		[classes.hideIcon]: !check,
	})
	const icon3 = classNames({
		[classes.small]: true,
		[classes.hide]: !check,
		[classes.icon3]: check,
		[classes.showIcon]: check,
		[classes.hideIcon]: !check,
	})
	const shape = classNames({
		[classes.shape]: true,
		[classes.shapeColor]: check,
	})

	// const { window } = props

	// const trigger = useScrollTrigger({
	// 	target: window ? window() : undefined,
	// 	disableHysteresis: true,
	// 	threshold: 50,
	// })

	return (
		<Zoom in={true}>
			<div className={classes.root} onClick={() => setCheck(!check)}>
				<div className={shape}>{check ? <CloseRoundedIcon className={classes.icon} /> : <ArrowForwardIosIcon className={classes.icon} />}</div>
				<Tooltip title="ติดต่อ สายด่วน" placement="top-end" onClick={() => window.open("tel:0954565550")}>
					<div className={icon1}>
						<i className="fas fa-phone-alt" />
					</div>
				</Tooltip>
				<Tooltip title="ติดต่อ Facebook" placement="right" onClick={() => window.open("tel:0954565550")}>
					<div className={icon2}>
						<i className="fab fa-facebook-square" />
					</div>
				</Tooltip>
				<Tooltip title="ติดต่อ Line official" placement="bottom-end" onClick={() => window.open("tel:0954565550")}>
					<div className={icon3}>
						<i className="fab fa-line" />
					</div>
				</Tooltip>
			</div>
		</Zoom>
	)
}

export default Social
