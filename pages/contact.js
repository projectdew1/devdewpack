import React from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const Contact = () => {
	const classes = useStylec()

	return (
		<React.Fragment>
			<Layouts title="ติดต่อเรา | ACI MACHINERY Co. Ltd" active={4}>
				<div className={classes.container} style={{ height: "55vh" }}>
					ติดต่อเรา
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export default Contact
