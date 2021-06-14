import React from "react"
import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

import IconButton from "@material-ui/core/IconButton"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"

import Menu from "@material-ui/icons/Menu"

import styles from "../../assets/component/headerStyle.js"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Tooltip from "@material-ui/core/Tooltip"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import { Apps, CloudDownload } from "@material-ui/icons"

import { useRouter } from "next/router"

const useStyles = makeStyles(styles)

export default function Header(props) {
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const { Links, sticky, fixed, appColor } = props

	const classes = useStyles()
	const appBarClasses = classNames({
		[classes.appBar]: false,
		[classes["appColor" + appColor]]: true,
		[classes.absolute]: false,
		[classes.fixed]: fixed,
		[classes.sticky]: sticky,
	})

	const router = useRouter()

	React.useEffect(() => {
		window.addEventListener("scroll", headerColorChange)

		return () => {
			window.removeEventListener("scroll", headerColorChange)
		}
	})

	const headerColorChange = () => {
		const windowsScrollTop = window.pageYOffset
		if (windowsScrollTop > props.height) {
			document.body.getElementsByTagName("header")[0].classList.remove(classes["appColor" + appColor])
			document.body.getElementsByTagName("header")[0].classList.add(classes.appColorC)
		} else {
			document.body.getElementsByTagName("header")[0].classList.add(classes["appColor" + appColor])
			document.body.getElementsByTagName("header")[0].classList.remove(classes.appColorC)
		}
	}

	return (
		<AppBar className={appBarClasses}>
			<Toolbar className={classes.container}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => router.push("/")}>
					<img className={classes.logo} src={"/logokms.png"} />
					<label className={classes.labelLogo}>บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด</label>
				</div>
				<Hidden smDown implementation="js">
					{Links}
				</Hidden>
				<Hidden mdUp>
					<IconButton
						style={{
							color: "black",
						}}
						size={"medium"}
						color="inherit"
						aria-label="open drawer"
						onClick={() => setMobileOpen(!mobileOpen)}
					>
						<Menu />
					</IconButton>
				</Hidden>
			</Toolbar>
			<Hidden mdUp implementation="js">
				<Drawer
					variant="temporary"
					anchor={"right"}
					open={mobileOpen}
					classes={{
						paper: classes.drawerPaper,
					}}
					onClose={() => setMobileOpen(!mobileOpen)}
				>
					<div className={classes.appResponsive}>{Links}</div>
				</Drawer>
			</Hidden>
		</AppBar>
	)
}

Header.defaultProps = {
	sticky: false,
	fixed: false,
	appColor: "white",
}

Header.propTypes = {
	height: PropTypes.number.isRequired,
}
