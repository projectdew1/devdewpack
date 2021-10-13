import React, { useEffect } from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"

import componentsStyle from "../assets/component/component"
import Link from "next/link"
import axios from "axios"
import { slugify, titleIfy } from "../utils/helpers"
import DisplayMedium from "../component/Itemslist/DisplayMedium"
import Config from "../setApi/Config"
import Head from "next/head"

import { Breadcrumb } from 'antd';

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStyles = makeStyles(theme => ({
    ////////////////////////////////////////////////////////////
    rootTop: {
        display: "flex",
        justifyContent: "center",
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
        paddingBottom: "2.5rem",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "1rem",
            paddingRight: "1rem",
        },
    },
    rootShop: {
        paddingTop: "1rem",
        paddingBottom: "2rem",
        [theme.breakpoints.up("sm")]: {
            paddingTop: "2.5rem",
        },
    },
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
    gridItems: {
        marginBottom: "1rem",
        padding: "2rem",
        paddingBottom: 0,
        backgroundColor: "#f5f5f5",
        "&:hover": {
            backgroundColor: "#f0f0f0",
        },
        [theme.breakpoints.up("md")]: {
            marginBottom: 0,
        },
    },
    itemList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "14rem",
    },
    ////////////////////////////////////////////////////////////
}))

const useStylec = makeStyles(componentsStyle)

const Shop = ({ posts, seo }) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Layouts
                // title={`${seo} | KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด`} 
                meta={
                    <Head>
                        <title>{" "}</title>
                        {/* --- cache ---  */}
                        {/* <meta http-equiv="cache-control" content="max-age=0" />
                    <meta http-equiv="cache-control" content="no-cache" />
                    <meta http-equiv="expires" content="0" />
                    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
                    <meta http-equiv="pragma" content="no-cache" /> */}
                        {/* --- google ---  */}
                        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                        < meta name="description" content={`${seo}`} />
                        {/* --- facebook ---  */}
                        <meta property="og:locale" content="th_TH" />
                        < meta property="og:url" content="https://www.kmspacking.com/shop" />
                        < meta property="og:type" content="website" />
                        < meta property="og:title" content=" " />
                        < meta property="og:description" content={`${seo}`} />
                        < meta property="og:image" content="https://www.kmspacking.com/logokms.png" />
                        <meta property="article:publisher" content="https://www.facebook.com/kmsmachinerythailand" />
                    </Head>
                }
                active={1} sticky={true}>
                <div className={classes.rootTop}>
                    <div style={{ width: "100%" }}>
                        <div className={classes.rootShop}>
                            <Breadcrumb style={{ paddingBottom: '0.5rem' }}>
                                <Breadcrumb.Item>
                                    <Link href={`/`}>
                                        หน้าหลัก
                                    </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>หมวดหมู่</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 style={{ fontSize: "3rem", lineHeight: 1, fontWeight: "lighter", marginBottom: 0 }}>หมวดหมู่</h1>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div className={classes.gridMain}>
                                <div className={classes.gridContainer}>
                                    {posts.map((row, index) => (
                                        <DisplayMedium key={index} imageSrc={row.localImage !== null ? Config.hosting + row.localImage : "/no-image.png"} sizeImage={row.localImage !== null ? "90%" : "60%"} subtitle={`${row.items} ประเภท`} subtitle2={`${row.product} สินค้า`} title={row.name} link={`/category/${row.enID}`} />
                                    ))}
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
            posts: data["items"],
            seo: row.join(),
        },
    }
}

export default Shop
