import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"

import GridContainer from "../component/Grid/GridContainer"
import GridItem from "../component/Grid/GridItem"

import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"
import Grid from "@material-ui/core/Grid"

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
			<Layouts title="หน้าหลัก | ACI MACHINERY Co. Ltd" active={0} fixed={true} appColor={"transparent"}>
				{/* แบบที่ 1  Parallax */}
				{/* <Parallax image="/bg.jpg">
					<div className={classes.container}>
						<GridContainer>
							<GridItem>
								<div className={classes.brand}>
									<p className={fadeInClasses}>ACI MACHINERY</p>
									<p className={subfadeInClasses}>ศูนย์รวมเครื่องแพ็คกิ้งและบรรจุภัณฑ์</p>
									<p className={classes.animatedItemIn} style={{ fontWeight: "bold" }}>
										สินค้าคุณภาพมาตรฐาน บริการฉับไว
									</p>
								</div>
							</GridItem>
						</GridContainer>
					</div>
				</Parallax> */}
				<div className={classes.bg}>
					{/* <svg className={classes.wave} viewBox="0 0 1440 320">
						<path
							fill="#ffffffea"
							fill-opacity="1"
							d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
						></path>
					</svg> */}
					<div className={classes.bordBander}>
						<Grid container spacing={2} className={classes.gridBander}>
							<Grid item sm={6} md={6} className={classes.gridItemsTextImage}>
								<div className={classes.gridImage}>
									<img src={"/QSJ-5040A.png"} className={classes.image1}></img>
								</div>
							</Grid>
							<Grid item sm={6} md={6} className={classes.gridItemsTextImage}>
								<div className={classes.gridText}>
									<h1 className={classes.Text1}>ACI MACHINERY</h1>
									<h1 className={classes.Text2}>ศูนย์รวมเครื่องแพ็คกิ้งและบรรจุภัณฑ์</h1>
									<h1 className={classes.Text3}>สินค้าคุณภาพมาตรฐาน บริการฉับไว</h1>
									<div className={classes.centerBtn}>
										<a className={classes.buttonShow}>สินค้า</a>
									</div>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
				<div className={classes.bgZone2}>
					<svg className={classes.expain} viewBox="0 0 1440 320">
						<path
							fill="#001c38"
							fillOpacity="1"
							d="M0,256L48,245.3C96,235,192,213,288,224C384,235,480,277,576,256C672,235,768,149,864,128C960,107,1056,149,1152,176C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
						></path>
					</svg>
					<div>
						<label>asd</label>
						<label>asd</label>
					</div>
				</div>
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
