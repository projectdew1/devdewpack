import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"

import GridContainer from "../component/Grid/GridContainer"
import GridItem from "../component/Grid/GridItem"

import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

const Parallax = dynamic(() => import("../component/Parallax/Parallax"))
const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const Home = ({ props }) => {
	const classes = useStylec()

	const fadeInClasses = classNames({
		[classes.title]: true,
		[classes.animatedItemIn]: true,
	})

	const subfadeInClasses = classNames({
		[classes.subtitle]: true,
		[classes.animatedItemIn]: true,
	})

	return (
		<React.Fragment>
			<Layouts title="หน้าหลัก | ACI MACHINERY Co. Ltd" active={0}>
				<Parallax image="/bg.jpg">
					<div className={classes.container}>
						<GridContainer>
							<GridItem>
								<div className={classes.brand}>
									<p className={fadeInClasses}>ACI MACHINERY</p>
									{/* {props.stars2 ? props.stars2 : "ไม่มี"} */}
									<p className={subfadeInClasses}>ศูนย์รวมเครื่องแพ็คกิ้งและบรรจุภัณฑ์</p>
									<p className={classes.animatedItemIn} style={{ fontWeight: "bold" }}>
										สินค้าคุณภาพมาตรฐาน บริการฉับไว
									</p>
								</div>
							</GridItem>
						</GridContainer>
					</div>
				</Parallax>
				{/* <label>asd</label> */}
				{/* <Image src="/bg.jpg" alt="Picture of the author" width={500} height={500} /> */}
				<div style={{ height: 2000, backgroundColor: "blue" }}></div>
			</Layouts>
		</React.Fragment>
	)
}

// Home.getInitialProps = async () => {
// 	const res = await fetch("https://api.github.com/repos/vercel/next.js")
// 	const json = await res.json()

// 	return {
// 		props: {
// 			stars2: json.stargazers_count,
// 		},
// 	}
// }

export default Home
