import React from "react"
import dynamic from "next/dynamic"
// import Image from "next/image"

import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"

import Config from "../setApi/Config"
import Link from "next/link"
import Head from "next/head"
import { Image } from 'antd'

import Grid from "@material-ui/core/Grid"
import Slider from "react-slick";

import DisplayMain from "../component/Itemslist/DisplayMain"
import axios from "axios"


const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(componentsStyle)

const useStyles = makeStyles(theme => ({
    gridMain: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        gap: "1rem",
        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        },
        [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        },

        // backgroundColor: "#2196F3",
    },
}))

const Home = ({ posts, seo }) => {
    const classes = useStylec()
    const classess = useStyles()

    const section1 = classNames({
        [classes.section]: true,
        [classes.bg2]: true,
    })

    // const subfadeInClasses = classNames({
    //     [classes.subtitle]: true,
    //     [classes.animatedItemIn]: true,
    // })

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 885,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 645,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            },
        ]
    };


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
                {/* ******************* แบบที่ 1 old web ******************* */}
                {/* <div className={classes.bg}>                    
                    <div className={classes.bordBander}>
                        <Grid container spacing={2} className={classes.gridBander}>
                            <Grid item sm={6} md={6} className={classes.gridItemsTextImage}>
                                <div className={classes.gridImage}>                                   
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
                </div> */}
                {/* ********************************************************************** */}

                <div className={classes.container2}>
                    <div className={section1}>
                        <Grid container className={classes.rowSection1}>
                            <Grid item sm={6} md={6} >
                                <div >
                                    <h1 className={classes.text1Section1}>KMS MACHINERY</h1>
                                    <h1 className={classes.Text2}>ศูนย์รวมเครื่องบรรจุภัณฑ์</h1>
                                    <h1 className={classes.Text3}>สินค้าได้รับมาตรฐาน บริการจริงใจ</h1>
                                    <h1 className={classes.Text3}>นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์</h1>
                                    <div style={{ display: 'flex' }}>
                                        <div className={classes.centerBtn} style={{ marginRight: '10px' }} onClick={() => window.open("https://www.m.me/kmsmachinerythailand")}>

                                            <a className={classes.buttonContact} onClick={null}>ติดต่อ</a>

                                        </div>
                                        <div className={classes.centerBtn}>
                                            <Link href={`/shop`}>
                                                <a className={classes.buttonShow} onClick={null}>สินค้า</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </Grid>
                            <Grid item sm={6} md={6}>
                                <div className={classes.gridImage}>
                                    <Image src={"/svg/machine.svg"} className={classes.imageSection1} preview={false} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ position: "relative", minHeight: '65vh', marginBottom: '20px' }} >
                        <div className={classes.containerSection2}>
                            <div data-aos="zoom-in"
                                data-aos-anchor-placement="top-bottom" style={{ marginBottom: '50px' }}>
                                <h2 style={{ fontSize: '2.5em' }}>ทำไมต้องเลือกเรา ?</h2>
                            </div>
                            <Grid container spacing={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
                                <Grid item md={4} >
                                    <div data-aos="fade-right"
                                        data-aos-anchor-placement="top-center" className={classes.cardSection2}>
                                        <Image src={"/svg/order.svg"} preview={false} width={200} />
                                        <h2 style={{ marginTop: '10px' }}>สินค้าคุณภาพราคาย่อมเยาว์</h2>
                                    </div>
                                </Grid>
                                <Grid item md={4}  >
                                    <div data-aos="fade-up"
                                        data-aos-anchor-placement="top-center" className={classes.cardSection2}>
                                        <Image src={"/svg/delive.svg"} preview={false} width={200} />
                                        <h2 style={{ marginTop: '10px' }}>บริการจัดส่งสินค้าทั่วไทย</h2>
                                    </div>
                                </Grid>
                                <Grid item md={4}  >
                                    <div data-aos="fade-left"
                                        data-aos-anchor-placement="top-center" className={classes.cardSection2}>
                                        <Image src={"/svg/support.svg"} preview={false} width={200} />
                                        <h2 style={{ marginTop: '10px' }}>บริการลูกค้า</h2>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div style={{ position: "relative", minHeight: '65vh', backgroundColor: '#fbf9ff' }} >
                        <div className={classes.containerSection3}>
                            <div data-aos="zoom-in"
                                data-aos-anchor-placement="top-bottom" style={{ marginBottom: '50px' }}>
                                <h2 style={{ fontSize: '2.5em' }}>ผลงานจัดส่งและติดตั้ง</h2>
                            </div>
                            <div data-aos="fade-left" data-aos-anchor-placement="top-center">
                                <Slider {...settings}>
                                    <div className={classes.cardSection3}>
                                        <Image className={classes.imageSection3} src={"/version2/1.jpg"} preview={false} width={250} height={200} />
                                        <h4 style={{ marginTop: '10px' }}>งานติดตั้งและสอนการใช้งานชุดแอลซีล เครื่องห่อแนวนอน จ.สระแก้ว</h4>
                                    </div>
                                    <div className={classes.cardSection3}>
                                        <Image className={classes.imageSection3} src={"/version2/2.jpg"} preview={false} width={250} height={200} />
                                        <h4 style={{ marginTop: '10px' }}>งานติดตั้งและสอนการใช้งานเครื่องขัดเม็ดยา</h4>
                                    </div>
                                    <div className={classes.cardSection3}>
                                        <Image className={classes.imageSection3} src={"/version2/3.jpg"} preview={false} width={250} height={200} />
                                        <h4 style={{ marginTop: '10px' }}>งานติดตั้งและสอนการใช้งานชุดแอลซีล จ.นครปฐม</h4>
                                    </div>
                                    <div className={classes.cardSection3}>
                                        <Image className={classes.imageSection3} src={"/version2/4.jpg"} preview={false} width={250} height={200} />
                                        <h4 style={{ marginTop: '10px' }}>งานติดตั้งและสอนการใช้งานชุดแอลซีล กทม. มีนบุรี</h4>
                                    </div>
                                    <div className={classes.cardSection3}>
                                        <Image className={classes.imageSection3} src={"/version2/5.jpg"} preview={false} width={250} height={200} />
                                        <h4 style={{ marginTop: '10px' }}>งานติดตั้งและสอนเครื่องบรรจุแคปซูลกึ่งอัตโนมัติ จ.สระแก้ว</h4>
                                    </div>

                                </Slider>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "relative", marginBottom: '50px' }}>
                        <div className={classes.containerSection4}>
                            <div data-aos="zoom-in"
                                data-aos-anchor-placement="top-bottom" style={{ marginBottom: '50px', marginTop: '20px' }}>
                                <h2 style={{ fontSize: '2.5em' }}>สินค้าของเรา</h2>
                            </div>
                            <div style={{ width: "100%" }}>
                                <div className={classess.gridMain}>
                                    <div className={classess.gridContainer}>
                                        {posts.map((row, index) => (
                                            <DisplayMain key={index} imageSrc={row.localImage !== null ? Config.ImageHosting + row.localImage : "/no-image.png"} sizeImage={row.localImage !== null ? "90%" : "60%"} subtitle={`${row.items} ประเภท`} subtitle2={`${row.product} สินค้า`} title={row.name} link={`/category/${row.enID}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </Layouts>
        </React.Fragment>
    )
}

export const getStaticProps = async () => {
    const https = require("https")
    const agent = new https.Agent({
        rejectUnauthorized: false,
    })

    const { data } = await axios.get(Config.api.pageHeader, {
        httpsAgent: agent,
    })


    const row = data["items"].map((row, index) => {
        return row.name
    })

    return {
        props: {
            posts: data["items"].filter(row => row.product !== 0),
            seo: row.join(),
        },
    }
}


export default Home
