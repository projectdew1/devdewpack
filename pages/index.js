import React from "react"
import dynamic from "next/dynamic"
// import Image from "next/image"

import GridContainer from "../component/Grid/GridContainer"
import GridItem from "../component/Grid/GridItem"

import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"
import Grid from "@material-ui/core/Grid"

import Slider from "react-slick"
import Config from "../setApi/Config"
import Link from "next/link"
import Head from "next/head"
import { Image } from 'antd'

const Parallax = dynamic(() => import("../component/Parallax/Parallax"))
const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 500,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        // {
        // 	breakpoint: 600,
        // 	settings: {
        // 		slidesToShow: 2,
        // 		slidesToScroll: 2,
        // 		initialSlide: 2,
        // 	},
        // },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
}

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
            <Layouts
                meta={
                    <Head>
                        <title>{"ศูนย์รวมเครื่องบรรจุภัณฑ์ สินค้าได้รับมาตรฐาน บริการจริงใจ พร้อมส่งทั่วประเทศไทย"}</title>
                        {/* --- cache ---  */}
                        {/* <meta http-equiv="cache-control" content="max-age=0" />
                        <meta http-equiv="cache-control" content="no-cache" />
                        <meta http-equiv="expires" content="0" />
                        <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
                        <meta http-equiv="pragma" content="no-cache" /> */}
                        {/* --- google ---  */}
                        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                        < meta name="description" content="KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด  สินค้าได้รับมาตรฐาน บริการจริงใจ นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์" />
                        {/* --- facebook ---  */}
                        <meta property="og:locale" content="th_TH" />
                        < meta property="og:url" content="https://www.kmspacking.com/" />
                        < meta property="og:type" content="website" />
                        < meta property="og:title" content="ศูนย์รวมเครื่องบรรจุภัณฑ์ สินค้าได้รับมาตรฐาน บริการจริงใจ พร้อมส่งทั่วประเทศไทย" />
                        < meta property="og:description" content="KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด  สินค้าได้รับมาตรฐาน บริการจริงใจ นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์" />
                        < meta property="og:image" content="https://www.kmspacking.com/page.jpg" />
                        <meta property="article:publisher" content="https://www.facebook.com/kmsmachinerythailand" />
                    </Head>
                }
                active={0} fixed={true} appColor={"transparent"}>
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
                                    {/* <img loading="lazy" src={"/QSJ-5040A.png"} className={classes.image1}></img> */}
                                    <Image src={"/QSJ-5040A.png"} className={classes.image1} preview={false} />
                                </div>
                            </Grid>
                            <Grid item sm={6} md={6} className={classes.gridItemsTextImage}>
                                <div className={classes.gridText}>
                                    <h1 className={classes.Text1}>KMS MACHINERY</h1>
                                    <h1 className={classes.Text2}>ศูนย์รวมเครื่องบรรจุภัณฑ์</h1>
                                    <h1 className={classes.Text3}>สินค้าได้รับมาตรฐาน บริการจริงใจ</h1>
                                    <h1 className={classes.Text3}>นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์</h1>
                                    <div className={classes.centerBtn}>
                                        <Link href={`/shop`}>
                                            <a className={classes.buttonShow} onClick={null}>สินค้า</a>
                                        </Link>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>


                {/* ////////////////////////////////////////////////////////////// */}
                {/* <div style={{ padding: "2em 5em" }}>
					<div style={{ height: "auto" }}>
						<Grid container spacing={2}>
							<Grid item sm={12} md={4} className={classes.Gridy} style={{ width: "100%" }}>
								<div className={classes.Gridy} style={{ padding: "1em", backgroundColor: "#FFEED0", borderRadius: "10px" }}>
									<i className="fas fa-shipping-fast" style={{ fontSize: "2em", color: "#ff6600" }} />
								</div>
								<label style={{ fontWeight: "bold" }}>Free Shipping</label>
								<p>All purchases over $199 are eligible for free shipping via USPS First Class Mail</p>
							</Grid>
							<Grid item sm={12} md={4} className={classes.Gridy} style={{ width: "100%" }}>
								<div className={classes.Gridy} style={{ padding: "1em", backgroundColor: "#FFEED0", borderRadius: "10px" }}>
									<i className="fas fa-boxes" style={{ fontSize: "2em", color: "#ff6600" }} />
								</div>
								<label style={{ fontWeight: "bold" }}>Finest Quality</label>
								<p>Designed to last, each of our products has been crafted with the finest materials.</p>
							</Grid>
							<Grid item sm={12} md={4} className={classes.Gridy} style={{ width: "100%" }}>
								<div className={classes.Gridy} style={{ padding: "1em", backgroundColor: "#FFEED0", borderRadius: "10px" }}>
									<i className="fas fa-headset" style={{ fontSize: "2em", color: "#ff6600" }} />
								</div>
								<label style={{ fontWeight: "bold" }}>Free Shipping</label>
								<p>All purchases over $199 are eligible </p>
							</Grid>
						</Grid>
					</div>
				</div> */}
                {/* ////////////////////////////////////////////////////////////// */}
                {/* <div className={classes.bgZone2}>
					<svg className={classes.expain} viewBox="0 0 1440 320">
						<path
							fill="#001c38"
							fillOpacity="1"
							d="M0,256L48,245.3C96,235,192,213,288,224C384,235,480,277,576,256C672,235,768,149,864,128C960,107,1056,149,1152,176C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
						></path>
					</svg> */}
                {/* <div style={{ padding: "0em 5em" }}>
						<h2 className={classes.line_title}>เครื่องแพ็คกิ้งและบรรจุภัณฑ์</h2>
						<div>
							<h3 className={classes.line_title}>เครื่องแพ็คกิ้งและบรรจุภัณฑ์</h3>
							<Slider {...settings}>
								<div>
									<div className={classes.itemImage} style={{ backgroundImage: "url(https://ucarecdn.com/2a5f69bc-befa-49f4-acc6-ab1dcae514c7/winter3.jpg)" }}>
										<div>
											<h3>The Witcher 3</h3>
											<p>The Witcher 3 is a multiplayer online battle arena by Valve.</p>
										</div>
									</div>
								</div>
								<div>
									<div className={classes.itemImage} style={{ backgroundImage: "url(https://ucarecdn.com/2a5f69bc-befa-49f4-acc6-ab1dcae514c7/winter3.jpg)" }}>
										<div>
											<h3>The Witcher 3</h3>
											<p>The Witcher 3 is a multiplayer online battle arena by Valve.</p>
										</div>
									</div>
								</div>
								<div>
									<div className={classes.itemImage} style={{ backgroundImage: "url(https://ucarecdn.com/2a5f69bc-befa-49f4-acc6-ab1dcae514c7/winter3.jpg)" }}>
										<div>
											<h3>The Witcher 3</h3>
											<p>The Witcher 3 is a multiplayer online battle arena by Valve.</p>
										</div>
									</div>
								</div>
								<div>
									<div className={classes.itemImage} style={{ backgroundImage: "url(https://ucarecdn.com/2a5f69bc-befa-49f4-acc6-ab1dcae514c7/winter3.jpg)" }}>
										<div>
											<h3>The Witcher 3</h3>
											<p>The Witcher 3 is a multiplayer online battle arena by Valve.</p>
										</div>
									</div>
								</div>
							</Slider>
						</div>
					</div> */}
                {/* </div> */}
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

function Next(props) {
    const { className, style, onClick } = props
    return (
        <div className={className} onClick={onClick} style={{ ...style, display: "block" }}>
            <i class="fas fa-chevron-right" />
        </div>
    )
}

function Prev(props) {
    const { className, style, onClick } = props
    return (
        <div className={className} onClick={onClick} style={{ ...style, display: "block" }}>
            <i class="fas fa-chevron-left" />
        </div>
    )
}

export default Home
