import React from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const About = () => {
	const classes = useStylec()

	return (
		<React.Fragment>
			<Layouts title="เกี่ยวกับเรา | ACI MACHINERY Co. Ltd" active={2}>
				<div className={classes.container} style={{ height: "55vh" }}>
					เกี่ยวกับ
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export default About
