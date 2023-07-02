import React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

import Config from "../../setApi/Config"
import axios from "axios"

import { makeStyles } from "@material-ui/core/styles"
import ListItem from "../../component/Itemslist/ListItem"
import { Breadcrumb } from "antd"

const Layouts = dynamic(() => import("../../Layouts/Default"))

const useStyles = makeStyles(theme => ({
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
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		maxWidth: "100%",
		width: "100%",
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

	rootShop: {
		paddingTop: "1rem",
		paddingBottom: "2rem",
		[theme.breakpoints.up("sm")]: {
			paddingTop: "2.5rem",
		},
	},
	back: {
		fontSize: "1rem",
		fontWeight: "500",
		color: "#2893ff",
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline",
		},
	},
}))

const Category = ({ items, seo, name }) => {
	const classes = useStyles()
	const ListData = () => {
		const data = items.map((value, index) => {
			return (
				<div key={index}>
					<div className={classes.rootShop}>
						{index == 0 ? (
							<Breadcrumb style={{ paddingBottom: "0.5rem" }}>
								<Breadcrumb.Item style={{ fontSize: "18px" }}>
									<Link href={`/`}>หน้าหลัก</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item style={{ fontSize: "18px" }}>
									<Link href={`/shop`}>หมวดหมู่</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item style={{ fontSize: "18px" }}>{name}</Breadcrumb.Item>
							</Breadcrumb>
						) : null}
						<h1 style={{ fontSize: "2rem", lineHeight: 1, fontWeight: "200", marginBottom: 0 }}>{value.typeName}</h1>
						<hr />
					</div>
					<div className={classes.listroot}>
						{value.machine.map((item, list) => {
							return (
								<ListItem
									key={list}
									link={`/product/${item.id}`}
									title={item.machineName}
									price={parseInt(item.price)}
									discount={parseInt(item.discount)}
									soldout={item.soldout}
									imageSrc={item.localImage !== null ? Config.ImageHosting + item.localImage : "/no-image.png"}
								/>
							)
						})}
					</div>
				</div>
			)
		})
		return data
	}

	const noitem = () => {
		return (
			<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<img src={"/noitem.png"} />
				<p style={{ fontSize: "2rem", fontWeight: "500", marginBottom: 0 }}>ขอภัย กำลังเพิ่มข้อมูลสินค้า</p>
				<Link href={`/shop`}>
					<p className={classes.back}>กลับหน้าหมวดหมู่</p>
				</Link>
			</div>
		)
	}

	return (
		<React.Fragment>
			<Layouts title={`${seo} | KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด`} active={1} sticky={true}>
				<div className={classes.rootTop}>
					<div className={classes.root}>
						<div className={classes.wroot}>
							<div>{items.length > 0 ? ListData() : noitem()}</div>
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
	const { data } = await axios.get(Config.api.pageHeader, {
		httpsAgent: agent,
	})
	const paths = data["items"].map(category => {
		return { params: { name: category.enID } }
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
	return {
		props: {
			items: data["items"],
			seo: data["seo"],
			name: data["name"],
		},
	}
}

export default Category
