import React from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const Portfolio = () => {
	const classes = useStylec()

	return (
		<React.Fragment>
			<Layouts title="ผลงาน | ACI MACHINERY Co. Ltd" active={5} sticky={true}>
				<div className={classes.container} style={{ height: "55vh" }}>
					ผลงาน
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export default Portfolio
