/*eslint-disable*/
import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Tooltip from "@material-ui/core/Tooltip"
import Icon from "@material-ui/core/Icon"

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

// core components
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "@material-ui/core/Button"
import Dropdown from "../Dropdown/Dropdown"

import styles from "../../assets/component/headerLinksStyle"
import { useSelector } from "react-redux"

const useStyles = makeStyles(styles)

function HeaderLinks(props) {
	const { active } = props
	const classes = useStyles()
	const router = useRouter()

	const value = useSelector(state => state.data.headerLink)

	return (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<Dropdown
					noLiPadding
					navDropdown
					buttonText="หมวดหมู่"
					buttonProps={
						active === 1
							? {
									className: classes.navLinkActive,
							  }
							: { className: classes.navLink }
					}
					// buttonIcon={Apps}
					dropdownHeader="หัวข้อ"
					dropdownList={[
						<Link href="/about">
							<a className={classes.dropdownLink}>ทั้งหมด</a>
						</Link>,
						{ divider: true },
						<a href="https://creativetimofficial.github.io/nextjs-material-kit/#/documentation?ref=njsmk-navbar" target="_blank" className={classes.dropdownLink}>
							ห้องสมุด
						</a>,
					]}
				/>
			</ListItem>
			<ListItem className={classes.listItem}>
				<div className={active === 2 ? classes.navLinkActive : classes.navLink} onClick={() => router.push("/about")}>
					เกี่ยวกับเรา
				</div>
			</ListItem>
			<ListItem className={classes.listItem}>
				<div className={active === 3 ? classes.navLinkActive : classes.navLink} onClick={() => router.push("/payment")}>
					วิธีสั่งซื้อและชำระเงิน
				</div>
			</ListItem>
			<ListItem className={classes.listItem}>
				<div className={active === 4 ? classes.navLinkActive : classes.navLink} onClick={() => router.push("/contact")}>
					{" "}
					ติดต่อเรา
				</div>
			</ListItem>
			<ListItem className={classes.listItem}>
				<div className={active === 5 ? classes.navLinkActive : classes.navLink} onClick={() => router.push("/portfolio")}>
					ผลงาน
				</div>
			</ListItem>
			<ListItem className={classes.listItem}>
				<div className={active === 6 ? classes.navLinkActive : classes.navLink} onClick={() => router.push("/article")}>
					บทความ
				</div>
			</ListItem>
		</List>
	)
}

export default HeaderLinks
