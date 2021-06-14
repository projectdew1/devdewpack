import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// nodejs library to set properties for components
import PropTypes from "prop-types"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Paper from "@material-ui/core/Paper"
import Grow from "@material-ui/core/Grow"
import Divider from "@material-ui/core/Divider"
import Icon from "@material-ui/core/Icon"
import Popper from "@material-ui/core/Popper"
import { useRouter } from "next/router"
import Link from "next/link"

// core components
import Button from "@material-ui/core/Button"

import styles from "../../assets/component/dropdownStyle"

import { useSelector } from "react-redux"

const useStyles = makeStyles(styles)

export default function Dropdown(props) {
	const router = useRouter()
	const [anchorEl, setAnchorEl] = React.useState(null)

	const value = useSelector(state => state.data)

	const handleMouseEnter = e => {
		if (window.matchMedia("(min-width: 960px)").matches) {
			setAnchorEl(e.currentTarget)
		}
	}
	const handleMouseLeave = e => {
		if (window.matchMedia("(min-width: 960px)").matches) {
			setAnchorEl(null)
		}
	}
	const handleClick = event => {
		// console.log(value)
		if (window.matchMedia("(min-width: 960px)").matches) {
			router.push("/shop")
		} else {
			if (anchorEl && anchorEl.contains(event.target)) {
				setAnchorEl(null)
			} else {
				setAnchorEl(event.currentTarget)
			}
		}
	}
	const handleClose = param => {
		setAnchorEl(null)
		// if (props && props.onClick) {
		// 	props.onClick(param)
		// }
	}
	const handleCloseAway = event => {
		if (anchorEl.contains(event.target)) {
			return
		}
		setAnchorEl(null)
	}
	const classes = useStyles()
	const { buttonText, buttonIcon, dropdownList, buttonProps, dropup, dropdownHeader, caret, hoverColor, left, rtlActive, noLiPadding, navDropdown } = props
	const caretClasses = classNames({
		[classes.caret]: true,
		[classes.caretActive]: Boolean(anchorEl),
		[classes.caretRTL]: rtlActive,
	})
	const dropdownItem = classNames({
		[classes.dropdownItem]: true,
		[classes[hoverColor + "Hover"]]: true,
		[classes.noLiPadding]: noLiPadding,
		[classes.dropdownItemRTL]: rtlActive,
	})
	const dropdownItemH = classNames({
		[classes.dropdownItemH]: true,
		[classes[hoverColor + "Hover"]]: true,
		[classes.noLiPadding]: noLiPadding,
		[classes.dropdownItemRTL]: rtlActive,
	})
	let icon = null
	switch (typeof buttonIcon) {
		case "object":
			icon = <props.buttonIcon className={classes.buttonIcon} />
			break
		case "string":
			icon = <Icon className={classes.buttonIcon}>{props.buttonIcon}</Icon>
			break
		default:
			icon = null
			break
	}
	return (
		<div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
			<div style={{ cursor: "pointer" }}>
				<div style={{ display: "flex", alignItems: "center" }} aria-label="Notifications" aria-owns={anchorEl ? "menu-list" : null} aria-haspopup="true" {...buttonProps} onClick={handleClick}>
					{icon}
					{buttonText !== undefined ? buttonText : null}
					{" "}
					{caret ? <b className={caretClasses} /> : null}
				</div>
			</div>
			<Popper
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				transition
				disablePortal
				placement={dropup ? (left ? "top-start" : "top") : left ? "bottom-start" : "bottom"}
				className={classNames({
					[classes.popperClose]: !anchorEl,
					[classes.popperResponsive]: true,
					[classes.pooperNav]: Boolean(anchorEl) && navDropdown,
				})}
			>
				{() => (
					<Grow in={Boolean(anchorEl)} id="menu-list" style={dropup ? { transformOrigin: "0 100% 0" } : { transformOrigin: "0 0 0" }}>
						<Paper className={classes.dropdown}>
							{/* <ClickAwayListener onClickAway={handleCloseAway}>
								<MenuList role="menu" className={classes.menuList}>
									{dropdownHeader !== undefined ? (
										<MenuItem onClick={() => handleClose(dropdownHeader)} className={classes.dropdownHeader}>
											{dropdownHeader}
										</MenuItem>
									) : null}
									{dropdownList.map((prop, key) => {
										if (prop.divider) {
											return <Divider key={key} onClick={() => handleClose("divider")} className={classes.dropdownDividerItem} />
										}
										return (
											<MenuItem key={key} onClick={() => handleClose(prop)} className={dropdownItem}>
												{prop}
											</MenuItem>
										)
									})}
								</MenuList>
							</ClickAwayListener> */}
							{value.headerLink.map((row, index) => {
								return (
									<ClickAwayListener onClickAway={handleCloseAway} key={index}>
										<MenuList key={index} role="menu" className={classes.menuList} style={value.headerLink.length - 1 !== index ? { borderRight: "1px solid rgba(0, 0, 0, 0.12)" } : null}>
											{/* <MenuItem key={index} onClick={() => handleClose(row.group)} className={dropdownItemH}>
												{row.group}
											</MenuItem> */}
											{row.list.map((value, key) => {
												return (
													<Link key={key} href={`/category/${value.name}`}>
														<MenuItem key={key} onClick={() => handleClose(value.name)} className={dropdownItem}>
															{value.name}
														</MenuItem>
													</Link>
												)
											})}
										</MenuList>
									</ClickAwayListener>
								)
							})}
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	)
}

Dropdown.defaultProps = {
	caret: true,
	hoverColor: "orange",
}

Dropdown.propTypes = {
	hoverColor: PropTypes.oneOf(["black", "primary", "info", "success", "warning", "danger", "rose", "orange"]),
	buttonText: PropTypes.node,
	buttonIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	dropdownList: PropTypes.array,
	buttonProps: PropTypes.object,
	dropup: PropTypes.bool,
	dropdownHeader: PropTypes.node,
	rtlActive: PropTypes.bool,
	caret: PropTypes.bool,
	left: PropTypes.bool,
	noLiPadding: PropTypes.bool,
	navDropdown: PropTypes.bool,
	// function that retuns the selected item
	onClick: PropTypes.func,
}
