import React from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const Payment = () => {
	const classes = useStylec()

	return (
		<React.Fragment>
			<Layouts title="วิธีสั่งซื้อและชำระเงิน | ACI MACHINERY Co. Ltd" active={3}>
				<div className={classes.container} style={{ height: "55vh" }}>
					ชำระเงิน
				</div>
			</Layouts>
		</React.Fragment>
	)
}

export default Payment
