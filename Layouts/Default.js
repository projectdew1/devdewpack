import React, { useEffect } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"

import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import styleScroll from "../assets/component/scrollTopStyle"

import { useDispatch } from "react-redux"
import action from "../redux/actions"

const Header = dynamic(() => import("../component/Header/Header.js"))
const Link = dynamic(() => import("../component/Header/HeaderLink"))
const ScrollTop = dynamic(() => import("../component/ScrollTop/ScrollTop"))
const Footer = dynamic(() => import("../component/Footer/Footer"))
const Social = dynamic(() => import("../component/SocialBar/Social"))

const useStyle = makeStyles(styleScroll)

export default function Default(props) {
	const classes = useStyle()
	const scrollClasses = classNames({
		[classes.shape]: true,
	})
	const { title, children, active, fixed, sticky, appColor } = props

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			action.setData({
				Link: [
					{
						group: "1",
						list: [{ name: "เครื่องจักรเครื่องจักรเครื่องจักร" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
					},
					{
						group: "2",
						list: [{ name: "เครื่องจักร1" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
					},
					{
						group: "3",
						list: [{ name: "เครื่องจักร1" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
					},
					{
						group: "4",
						list: [{ name: "เครื่องจักร1" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
					},
				],
			})
		)
	}, [])

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<Header height={100} Links={<Link active={active} />} fixed={fixed} sticky={sticky} appColor={appColor} />
			{children}
			<Social {...props} />
			<ScrollTop {...props} click={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}>
				<div className={scrollClasses}>
					<KeyboardArrowUpIcon />
				</div>
			</ScrollTop>
			<Footer />
		</div>
	)
}
