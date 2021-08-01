import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from 'next/link'

import Config from "../../setApi/Config"
import axios from "axios"
import numeral from "numeral"

import { makeStyles } from "@material-ui/core/styles"
import { Breadcrumb, Image } from 'antd';
import ImageGallery from 'react-image-gallery';
import Youtube from '../../component/Youtube/Youtube'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';




const Layouts = dynamic(() => import("../../Layouts/Default"))

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
        paddingBottom: "2.5rem",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "1rem",
            paddingRight: "1rem",
        },

    },
    crumb: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
        // sm
        '@media (min-width: 640px)': {
            paddingTop: '3rem',
            // paddingBottom: '3rem',
        },
    },
    rootTop: {
        width: '100%',
        // paddingTop: '1rem',
        paddingBottom: '1rem',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: "flex",
        flex: '1 1 0%',
        flexDirection: "column",
        // sm
        '@media (min-width: 640px)': {
            // paddingTop: '3rem',
            paddingBottom: '3rem',
        },
        // md
        '@media (min-width: 768px)': {
            flexDirection: "row",
        },
    },
    rootImage: {
        // "w-full md:w-1/2 h-120 flex flex-1 bg-light hover:bg-light-200"
        width: '100%',
        display: "flex",
        flex: '1 1 0%',
        backgroundColor: "#f5f5f5",
        borderRadius: "1rem",
        "&:hover": {
            backgroundColor: "#f0f0f0",
        },
        //md
        '@media (min-width: 768px)': {
            width: '50%',
        },
    },
    board: {
        // "py-16 p10 flex flex-1 justify-center items-center"
        display: "flex",
        flex: '1 1 0%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2.5rem',
        paddingTop: '4rem',
        paddingBottom: '4rem',
    },
    rootTxt: {
        // pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2
        width: '100%',
        paddingTop: '0.5rem',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingBottom: '2rem',
        //md
        '@media (min-width: 768px)': {
            width: '50%',
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
        },
    },
    connectColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    connectRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
    },
    divRow: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        color: '#ffffff',
        width: "200px",
        padding: "5px",
        textAlign: "center",
        borderRadius: "2rem",
        fontSize: "20px",
        cursor: "pointer",
        fontWeight: "400",
    }
}))



const Product = ({ items, seo }) => {
    const classes = useStyles()
    // console.log(items)
    const [dataImage, setDataImage] = useState([])


    useEffect(() => {
        let arr = [{ index: 0, original: Config.hosting + items.localImage, thumbnail: Config.hosting + items.localImage }]
        items.image.map((r, i) => {
            arr.push({
                index: i + 1,
                original: Config.hosting + r.local,
                thumbnail: Config.hosting + r.local
            })

        })
        setDataImage(arr)
    }, [])

    const detail = () => {
        const data = items.detail.map((r, i) => {
            return (
                <ul key={i}>
                    <li>
                        {r.detail}
                    </li>
                </ul>
            )
        })
        return data
    }

    const detailTech = () => {
        const data = items.detailTech.map((r, i) => {
            return (
                <TableRow key={i}>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>{r.technicallyName}</TableCell>
                    <TableCell align="center">{r.detailTech}</TableCell>
                </TableRow>
            )
        })

        return data
    }

    const videos = () => {
        const data = items.video.map((r, i) => {
            return (
                <Youtube key={i} link={r.linkMap} />
            )
        })

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <hr style={{ width: '100%' }} />
                <h1 style={{ fontSize: "1.5rem", lineHeight: 1, fontWeight: "200", marginBottom: '2rem' }}>{'วีดีโอการใช้งาน'}</h1>
                <br />
                {data}
            </div>
        )
    }






    return (
        <React.Fragment>
            <Layouts title={`${seo} | KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด`} active={1} sticky={true}>
                <div className={classes.root}>
                    <Breadcrumb className={classes.crumb}>
                        <Breadcrumb.Item>
                            <Link href={`/`}>
                                หน้าหลัก
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link href={`/shop`}>
                                หมวดหมู่
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link href={`/category/${items.type.idCategory}`}>
                                {items.type.categoryName}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{items.machineName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={classes.rootTop}>
                        <div className={classes.rootImage}>
                            <div className={classes.board}>
                                <ImageGallery items={dataImage} showPlayButton={false} lazyLoad={true} thumbnailPosition={"right"} />
                                {/* <Image src={`http://203.154.83.34:5004${items.localImage}`} preview={false} style={{ maxHeight: ' 100%' }} /> */}
                            </div>
                        </div>
                        <div className={classes.rootTxt}>
                            <p style={{ marginBottom: 0, marginRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>{items.machineName}</p>
                            {items.soldout == 0 ? items.discount > 0 ?
                                <p> <label style={{ color: '#767676', marginRight: '1rem', textDecoration: 'line-through' }}>{`฿${numeral(items.price).format("0,0")}`}</label>
                                    <label style={{ color: '#FF6600', fontWeight: 'bold', fontSize: '1.5rem' }}>{`฿${numeral(items.discount).format("0,0")}`}</label></p>
                                : items.price == 0 ? null : <p><label style={{ marginRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>{`฿${numeral(items.price).format("0,0")}`}</label></p>
                                : <p><label style={{ color: 'red', marginRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>{`สินค้าหมด !!`}</label></p>}

                            {detail()}
                            <p style={{ fontWeight: "bold", marginBottom: 0 }}>รายละเอียด</p>
                            <p>&emsp;&emsp;&emsp;&emsp;&emsp;{items.explain.length > 0 ? items.explain[0].explainDetail : ""}</p>
                            <div className={classes.connectColumn}>
                                <div className={classes.connectRow}>
                                    <div className={classes.divRow}>
                                        <div className={classes.buttonRow} style={{ backgroundColor: '#FF6600' }} onClick={() => window.open("tel:0954565550")}>
                                            <i className="fas fa-phone-alt" style={{ fontSize: "1rem", marginRight: "10px" }} />
                                            095-456-5550
                                        </div>
                                    </div>
                                    <div className={classes.divRow}>
                                        <div className={classes.buttonRow} style={{ backgroundColor: '#FF6600' }} onClick={() => window.open("tel:0869180060")}>
                                            <i className="fas fa-phone-alt" style={{ fontSize: "1rem", marginRight: "10px" }} />
                                            086-918-0060
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.connectRow}>
                                    <div className={classes.divRow}>
                                        <div className={classes.buttonRow} style={{ backgroundColor: '#00c300' }} onClick={() => window.open("https://page.line.me/?accountId=kmsmachinery")}>
                                            <i className="fab fa-line" style={{ fontSize: "1.5rem", marginRight: "10px" }} />
                                            Line official
                                        </div>
                                    </div>
                                    <div className={classes.divRow}>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr style={{ width: '100%' }} />
                    <div style={{ display: 'flex', width: '100%' }}>

                        <div className={classes.rootTxt}>

                            <h1 style={{ fontSize: "1.5rem", lineHeight: 1, fontWeight: "200", marginBottom: 0 }}>{'คุณสมบัติทางเทคนิค'}</h1>
                            <br />
                            <Table aria-label="caption table">
                                <caption>{items.machineName}</caption>

                                <TableBody>

                                    {detailTech()}
                                </TableBody>
                            </Table>
                        </div>
                        {/* <div className={classes.rootTxt}>

                            <h1 style={{ fontSize: "1.5rem", lineHeight: 1, fontWeight: "200", marginBottom: 0 }}>{'คู่มือใช้งาน'}</h1>
                            <br />
                            <Table aria-label="caption table">
                                <caption>{items.machineName}</caption>

                                <TableBody>

                                    {detailTech()}
                                </TableBody>
                            </Table>
                        </div> */}
                    </div>
                    {items.video.length > 0 ? videos() : null}
                </div>

            </Layouts>
        </React.Fragment>
    )
}

export const getStaticPaths = async () => {
    const https = require("https")
    const agent = new https.Agent({
        rejectUnauthorized: false,
    })

    const { data } = await axios.get(Config.api.pageProduct, {
        httpsAgent: agent,
    })
    const paths = data["items"].map(category => {
        return { params: { name: category.id } }
    })
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({ params }) => {
    const https = require("https")
    const agent = new https.Agent({
        rejectUnauthorized: false,
    })
    const { data } = await axios.get(Config.api.pageIdProduct, {
        httpsAgent: agent,
        params: {
            id: params.name,
        },
    })

    return {
        props: {
            items: data['items'],
            seo: data['seo'],
        },
    }
}



export default Product
