import React from "react"
import dynamic from "next/dynamic"

import { makeStyles } from "@material-ui/core/styles"


import Link from 'next/link'

const Layouts = dynamic(() => import("../Layouts/Default"))

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

const Portfolio = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Layouts title="ผลงาน | KMS MACHINERY Co. Ltd" active={5} sticky={true}>
                <div className={classes.rootTop}>

                    <div className={classes.root}>
                        <div className={classes.wroot}>
                            <div>
                                {/* ผลงาน */}
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                    <img src={'/noitem.png'} style={{ width: '100%' }} />
                                    <p style={{ fontSize: '2rem', fontWeight: '500', marginBottom: 0 }}>ขอภัย กำลังเพิ่มข้อมูลผลงาน</p>
                                    <Link href={`/`}>
                                        <p className={classes.back}>กลับหน้าหลัก</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layouts>
        </React.Fragment>
    )
}

export default Portfolio
