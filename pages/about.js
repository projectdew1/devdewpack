import React from "react"
import dynamic from "next/dynamic"
import { Grid } from "@material-ui/core"

import { makeStyles } from "@material-ui/styles"
import { Image } from 'antd'

const Layouts = dynamic(() => import("../Layouts/Default"))


const useStylec = makeStyles(theme => ({
    root: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url(/svg/bg-10.svg)",
        backgroundRepeat: ' no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundColor: '#fbf9ff',
        padding: '80px 120px 0px 120px',
        [theme.breakpoints.down("sm")]: {
            backgroundImage: 'url(/svg/bg-12.svg)',
            padding: '80px 60px 0px 60px',
        },
        [theme.breakpoints.down("xs")]: {
            padding: '80px 30px 0px 30px',
        }
    },
    gridImage: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Kanit, sans-serif",
        width: "100%",
    },
    imageSection1: {
        maxWidth: "100%",
        position: "relative",
        zIndex: 100,
        height: '50vh'

    },
    textSection: {
        marginBottom: '50px',
        animation: `$itemsRight 800ms ${theme.transitions.easing.easeInOut}`,
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

}))

const About = () => {
    const classes = useStylec()

    return (
        <React.Fragment>
            <Layouts title="เกี่ยวกับเรา | KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด" active={2} fixed={true} appColor={"transparent"}>
                <div className={classes.root}>
                    <div >
                        <Grid container spacing={4}>
                            <Grid item sm={12} md={6} >
                                <div data-aos="zoom-in"
                                    data-aos-anchor-placement="top-bottom" className={classes.gridImage}>
                                    <Image src={"/svg/about.svg"} className={classes.imageSection1} preview={false} />
                                </div>

                            </Grid>
                            <Grid item sm={12} md={6}>

                                <div className={classes.textSection}>
                                    <p style={{ margin: 0, fontSize: "2em", fontWeight: "500", color: '#8159FF' }}>บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด</p>
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
                                    <p style={{ color: "black", fontSize: "1em", fontWeight: "400" }}>{`บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด  ขอขอบคุณลูกค้าทุกท่านที่ให้ความไว้วางใจ `}</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>





                </div>
            </Layouts>
        </React.Fragment>
    )
}

export default About
