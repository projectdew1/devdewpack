import React from "react"
import dynamic from "next/dynamic"
import { Grid, Paper, ButtonBase, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/styles"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(theme => ({
    root: {
        minHeight: "100vh",
    },
    bg: {
        background: "url(/about-us-bg.jpg)",
        minHeight: "40vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    },
    content: {
        padding: "24px 0px 48px 0px",
        backgroundColor: "white",
    },
    container: {
        paddingLeft: "12px",
        paddingRight: "12px",
        margin: "0 auto",
        width: "100%",
        overflow: "hidden",
        [theme.breakpoints.up("md")]: {
            maxWidth: "960px",
            width: "960px",
        },
    },
    row: {
        width: "100%",
        position: "relative",
        marginTop: "5px",
        margin: "-8px",
    },
    col: {
        padding: "8px",
        animation: `$itemsLeft 800ms ${theme.transitions.easing.easeInOut}`,
    },
    Itemscol: {
        width: "100%",
    },
    ItemsAbout: {
        padding: "8px",
    },
    symbolCen: {
        display: "flex",
        justifyContent: "center",
        zIndex: 2000,
    },
    symbol: {
        boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14),0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)",
        width: "14rem",
        height: "14rem",
        borderRadius: "7rem",
        [theme.breakpoints.down("md")]: {
            width: "10rem",
            height: "10rem",
            borderRadius: "5rem",
        },
        [theme.breakpoints.down("sm")]: {
            width: "8rem",
            height: "8rem",
            borderRadius: "4rem",
        },
    },
    sb1: {
        background: "url(/iso.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        animation: `$itemsLeft 800ms ${theme.transitions.easing.easeInOut}`,
    },
    sb2: {
        background: "url(/1y.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        animation: `$fadeInUp 800ms ${theme.transitions.easing.easeInOut}`,
    },
    sb3: {
        background: "url(/service.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        animation: `$itemsRight 800ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes itemsLeft": {
        "0%": {
            opacity: 0,
            transform: "translateX(-200%)",
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0)",
        },
    },

    "@keyframes itemsRight": {
        "0%": {
            opacity: 0,
            transform: "translateX(200%)",
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0)",
        },
    },

    "@keyframes fadeInUp": {
        from: {
            transform: "translate3d(0,40px,0)",
            opacity: 0,
        },
        to: {
            transform: "translate3d(0,0,0)",
            opacity: 1,
        },
    },
}))

const About = () => {
    const classes = useStylec()

    return (
        <React.Fragment>
            <Layouts title="เกี่ยวกับเรา | KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด" active={2} fixed={true} appColor={"transparent"}>
                <div className={classes.root}>
                    <div className={classes.bg}></div>
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Grid container className={classes.row}>
                                <Grid item sm={12} md={12} className={classes.col1}>
                                    <div className={classes.Itemscol1}>
                                        <div className={classes.ItemsContactcol1}>
                                            <p style={{ margin: 0, fontSize: "1.5em", fontWeight: "500" }}>บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด</p>
                                            <p style={{ color: "#777676", margin: 0, fontSize: "1em", fontWeight: "300" }}>
                                                {`  \xa0\xa0\xa0\xa0\xa0\xa0\xa0 ดำเนินธุรกิจเกี่ยวกับเครื่องบรรจุภัณฑ์ มีสินค้ามากมายหลายชนิด เช่น เครื่องบรรจุของเหลว , น้ำยาล้างจาน ,แชมพู,แอลกอฮอล์,ครีม เครื่องบรรจุซองแนวตั้ง เมล็ด,ผงกาแฟ,คอลลาเจน, เครื่องบรรจุแนวนอน เครื่องซีลสูญญากาศ เครื่องอบฟิล์มหด
												เครื่องรัดกล่องและเครื่องอื่นๆ ที่เกี่ยวกับการบรรจุภัณฑ์`}
                                            </p>
                                            <p style={{ color: "#777676", margin: 0, fontSize: "1em", fontWeight: "300" }}>
                                                {`  \xa0\xa0\xa0\xa0\xa0\xa0\xa0 ทางบริษัทฯ ได้นำเข้าเครื่องจักร คุณภาพตามมาตรฐาน ISO 9002 และได้รับรองมาตรฐานความปลอดภัย CE  ทำให้ท่านมั่นใจในสินค้าและคุณภาพเครื่องจักร จากประสบการณ์อันยาวนาน ทำให้เราสามารถให้คำปรึกษาและคัดเลือกสินค้าเครื่องจักรที่เหมาะสมกับงานของลูกค้าได้อย่างลงตัว`}
                                            </p>
                                            <p style={{ color: "black", margin: 0, marginTop: "2em", fontSize: "1em", fontWeight: "400" }}>
                                                {`เรามีทีมช่างมืออาชีพที่คอยดูแล บริการติดตั้ง และ บริการหลังการขายด้วยความเป็นกันเอง  รับประกันสินค้า 1 ปี มีอะไหล่ให้บริการ 
`}
                                            </p>
                                            <p style={{ color: "#777676", margin: 0, marginTop: "2em", fontSize: "1em", fontWeight: "400" }}>{`ติดต่อเราทุกครั้งที่ท่านต้องการเครื่องบรรจุภัณฑ์ `}</p>
                                            <p style={{ color: "black", margin: 0, fontSize: "1em", fontWeight: "400" }}>{`บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด  ขอขอบคุณลูกค้าทุกท่านที่ให้ความไว้วางใจ `}</p>
                                        </div>

                                        <div className={classes.ItemsContactcol1}>
                                            <Grid container style={{ marginTop: "2em", justifyContent: "space-around" }}>
                                                <Grid item md={4} className={classes.symbolCen}>
                                                    <div className={classes.symbol + " " + classes.sb1}></div>
                                                </Grid>
                                                <Grid item md={4} className={classes.symbolCen}>
                                                    <div className={classes.symbol + " " + classes.sb2}></div>
                                                </Grid>
                                                <Grid item md={4} className={classes.symbolCen}>
                                                    <div className={classes.symbol + " " + classes.sb3}></div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Layouts>
        </React.Fragment>
    )
}

export default About
