import React from "react"
import dynamic from "next/dynamic"
import Link from 'next/link'

import Config from "../../setApi/Config"
import axios from "axios"

import { makeStyles } from "@material-ui/core/styles"
import ListItem from "../../component/Itemslist/ListItem"

const Layouts = dynamic(() => import("../../Layouts/Default"))

const useStyles = makeStyles(theme => ({
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
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    wroot: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        width: "100%",
    },
    listroot: {
        display: "flex",
        flexDirection: "row",
        flex: "1 1 0%",
        flexWrap: "wrap",
    },

    rootShop: {
        paddingTop: "1rem",
        paddingBottom: "2rem",
        [theme.breakpoints.up("sm")]: {
            paddingTop: "2.5rem",
        },
    },
    back: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#2893ff',
        cursor: 'pointer',
        "&:hover": {
            textDecoration: 'underline',
        }
    }
}))



const Category = ({ items, seo }) => {
    const classes = useStyles()
    console.log(items)
    console.log(seo)

    const ListData = () => {
        const data = items.map((value, index) => {
            return (
                <div key={index}>
                    <div className={classes.rootShop}>
                        <h1 style={{ fontSize: "2rem", lineHeight: 1, fontWeight: "200", marginBottom: 0 }}>{value.typeName}</h1>
                        <hr />
                    </div>
                    <div className={classes.listroot}>

                        {value.machine.map((item, list) => {
                            return (
                                <ListItem
                                    key={list}
                                    link={`/product/${item.machineName}`}
                                    title={item.machineName}
                                    price={parseInt(item.price)}
                                    discount={parseInt(item.discount)}
                                    soldout={item.soldout}
                                    imageSrc={item.localImage !== null ? Config.hosting + item.localImage : "/no-image.png"}
                                />
                            )
                        })}
                    </div>
                </div>
            )
        })
        return data
    }

    const noitem = () => {
        return (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={'/noitem.png'} style={{ width: '100%' }} />
            <p style={{ fontSize: '2rem', fontWeight: '500', marginBottom: 0 }}>ขอภัย กำลังเพิ่มข้อมูลสินค้า</p>
            <Link href={`/shop`}>
                <p className={classes.back}>กลับหน้าหมวดหมู่</p>
            </Link>
        </div>)
    }

    return (
        <React.Fragment>
            <Layouts title={`${seo} | KMS MACHINERY Co. Ltd`} active={1} sticky={true}>
                <div className={classes.rootTop}>

                    <div className={classes.root}>
                        <div className={classes.wroot}>
                            <div>

                                {items.length > 0 ? ListData() : noitem()}

                            </div>
                        </div>
                    </div>
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
    // const res = await fetch(Config.api.pageHeader, { agent })
    const res = await fetch(Config.api.pageHeader)
    const categories = await res.json()
    const paths = categories["items"].map(category => {
        return { params: { name: category.name } }
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
    const { data } = await axios.get(Config.api.pageIdHeader, {
        httpsAgent: agent,
        params: {
            name: params.name,
        },
    })
    // console.log(data);
    return {
        props: {
            items: data["items"],
            seo: data["seo"],
        },
    }
}



export default Category