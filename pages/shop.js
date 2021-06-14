import React, { useEffect } from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"
import Link from "next/link"
import axios from "axios"
import { slugify, titleIfy } from "../utils/helpers"
import DisplayMedium from "../component/Itemslist/DisplayMedium"
import Config from "../setApi/Config"

import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import ListSubheader from "@material-ui/core/ListSubheader"
import IconButton from "@material-ui/core/IconButton"

import { Info } from "@material-ui/icons"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStyles = makeStyles(theme => ({
	////////////////////////////////////////////////////////////
	rootTop: {
		display: "flex",
		justifyContent: "center",
		paddingLeft: "2.5rem",
		paddingRight: "2.5rem",
		paddingBottom: "2.5rem",
		[theme.breakpoints.down("sm")]: {
			paddingLeft: "1rem",
			paddingRight: "1rem",
		},
	},
	rootShop: {
		paddingTop: "1rem",
		paddingBottom: "2rem",
		[theme.breakpoints.up("sm")]: {
			paddingTop: "2.5rem",
		},
	},
	gridMain: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	gridContainer: {
		display: "grid",
		gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
		gap: "1rem",
		[theme.breakpoints.up("sm")]: {
			gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		},
		[theme.breakpoints.up("md")]: {
			gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
		},

		// backgroundColor: "#2196F3",
	},
	gridItems: {
		marginBottom: "1rem",
		padding: "2rem",
		paddingBottom: 0,
		backgroundColor: "#f5f5f5",
		"&:hover": {
			backgroundColor: "#f0f0f0",
		},
		[theme.breakpoints.up("md")]: {
			marginBottom: 0,
		},
	},
	itemList: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "14rem",
	},
	////////////////////////////////////////////////////////////
}))

const useStylec = makeStyles(componentsStyle)

const Shop = ({ posts, seo }) => {
	const classes = useStyles()

	return (
		<React.Fragment>
			<Layouts title={`${seo} | KMS MACHINERY Co. Ltd`} active={1} sticky={true}>
				<div className={classes.rootTop}>
					<div style={{ width: "100%" }}>
						<div className={classes.rootShop}>
							<h1 style={{ fontSize: "3rem", lineHeight: 1, fontWeight: "lighter", marginBottom: 0 }}>หมวดหมู่</h1>
						</div>
						<div style={{ width: "100%" }}>
							<div className={classes.gridMain}>
								<div className={classes.gridContainer}>
									{posts.map((row, index) => (
										<DisplayMedium key={index} imageSrc={row.localImage !== null ? Config.hosting + row.localImage : "/no-image.png"} subtitle={`${row.items} ชิ้นงาน`} title={row.name} link={`/category/${row.name}`} />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export const getStaticProps = async () => {
	const https = require("https")
	const agent = new https.Agent({
		rejectUnauthorized: false,
	})
	const res = await fetch(Config.api.pageHeader)
	// const res = await fetch(Config.api.pageHeader, { agent })
	const posts = await res.json()

	const row = posts["items"].map((row, index) => {
		return row.name
	})

	return {
		props: {
			posts: posts["items"],
			seo: row.join(),
		},
	}
}

export default Shop
