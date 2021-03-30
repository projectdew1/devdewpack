import React from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const Shop = () => {
	const classes = useStylec()

	return (
		<React.Fragment>
			<Layouts title="seo | ACI MACHINERY Co. Ltd" active={1}>
				<div className={classes.container} style={{ height: "55vh" }}>
					หมวดหมู่
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export default Shop
