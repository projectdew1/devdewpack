import React from "react"
import dynamic from "next/dynamic"

import Config from "../../setApi/Config"
import axios from "axios"

import { makeStyles } from "@material-ui/core/styles"

const Layouts = dynamic(() => import("../../Layouts/Default"))

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	wroot: {
		display: "flex",
		flexDirection: "column",
		maxWidth: "100%",
		width: "100%",
	},
	listroot: {
		display: "flex",
		flexDirection: "row",
		flex: "1 1 0%",
		flexWrap: "wrap",
	},
}))

const Category = ({ items, seo }) => {
	const classes = useStyles()
	console.log(items)
	console.log(seo)
	return (
		<React.Fragment>
			<Layouts title={`${seo} | KMS MACHINERY Co. Ltd`} active={1} sticky={true}>
				<div className={classes.root}>
					<div className={classes.wroot}>
						<div>
							<div className={classes.listroot}></div>
						</div>
					</div>
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export const getStaticPaths = async () => {
	const https = require("https")
	const agent = new https.Agent({
		rejectUnauthorized: false,
	})
	// const res = await fetch(Config.api.pageHeader, { agent })
	const res = await fetch(Config.api.pageHeader)
	const categories = await res.json()
	const paths = categories["items"].map(category => {
		return { params: { name: category.name } }
	})
	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async ({ params }) => {
	const https = require("https")
	const agent = new https.Agent({
		rejectUnauthorized: false,
	})
	const { data } = await axios.get(Config.api.pageIdHeader, {
		httpsAgent: agent,
		params: {
			name: params.name,
		},
	})
	// console.log(data);
	return {
		props: {
			items: data["items"],
			seo: data["seo"],
		},
	}
}



export default Category
