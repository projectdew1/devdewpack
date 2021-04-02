import React from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const Article = () => {
	const classes = useStylec()

	return (
		<React.Fragment>
			<Layouts title="บทความ | ACI MACHINERY Co. Ltd" active={6} sticky={true}>
				<div className={classes.container} style={{ height: "55vh" }}>
					บทความ
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export default Article
