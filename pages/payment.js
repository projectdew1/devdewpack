import React from "react"
import dynamic from "next/dynamic"

import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import SendIcon from "@material-ui/icons/Send"

import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(theme => ({
    root: {
        minHeight: "100vh",
    },
    bg: {
        background: "url(/payment.jpg)",
        minHeight: "40vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        fontWeight: "500",
        color: "white",
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
    col1: {
        padding: "8px",
        animation: `$itemsLeft 800ms ${theme.transitions.easing.easeInOut}`,
    },
    col2: {
        padding: "8px",
        animation: `$itemsRight 800ms ${theme.transitions.easing.easeInOut}`,
    },
    Itemscol1: {
        width: "100%",
    },
    ItemsContactcol1: {
        padding: "8px",
    },
    form: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "200",
        },
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
}))

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        // margin: "auto",
        maxWidth: 500,
    },
    image: {
        width: 60,
        height: 60,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
}))

const Payment = () => {
    const classes = useStylec()
    const classStyle = useStyles()

    const Submitt = e => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <Layouts title="วิธีสั่งซื้อและชำระเงิน | KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด" active={3} fixed={true} appColor={"transparent"}>
                <div className={classes.root}>
                    <div className={classes.bg}>{/* <div className={classes.container}>วิธีสั่งซื้อและชำระเงิน</div> */}</div>
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Grid container className={classes.row}>
                                <Grid item sm={12} md={12} className={classes.col1}>
                                    <div className={classes.Itemscol1}>
                                        <div className={classes.ItemsContactcol1}>
                                            <p style={{ margin: 0, fontSize: "1.5em", fontWeight: "500" }}>วิธีการสั่งซื้อและการชำระเงิน</p>

                                            <p style={{ color: "#777676", margin: 0, fontSize: "1em", fontWeight: "300" }}>1. ลูกค้าสามารถสั่งซื้อสินค้า </p>

                                            <p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "1em", fontWeight: "300" }}>- ทางโทรศัพท์ 095-4565550 / 086-9180060</p>
                                            <p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "1em", fontWeight: "300" }}>- ผ่านไลน์ออฟฟิเชี่ยล @kmsmachinery และ korninter</p>
                                            <p style={{ color: "#777676", margin: 0, fontSize: "1em", fontWeight: "300" }}>2. รอการยันยืนสินค้า </p>
                                            <p style={{ color: "#777676", margin: 0, fontSize: "1em", fontWeight: "300" }}>3. ชำระเงินผ่านธนาคาร </p>
                                            <p style={{ color: "#777676", margin: 0, fontSize: "1em", fontWeight: "300" }}>4. แจ้งการชำระเงิน </p>
                                            <p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "1em", fontWeight: "300" }}>- ผ่านไลน์ออฟฟิเชี่ยล @kmsmachinery และ korninter</p>
                                            <p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "1em", fontWeight: "300" }}>- ทางอีเมลล์ เมล์ office@kmspacking.com, sales@kmspacking.com และ kmspacking@gmail.com </p>
                                            <p style={{ color: "#000000", margin: 0, marginTop: "10px", fontSize: "1em", fontWeight: "500" }}>หมายเหตุ </p>
                                            <p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "1em", fontWeight: "300" }}>** งดโอนเงินก่อนที่จะมีการยืนยันเรื่องสินค้า เพราะสินค้าบางรุ่นอาจหมดสต๊อกทั้งนี้เพื่อความสะดวกของตัวลูกค้าเอง </p>
                                        </div>

                                        <div className={classes.ItemsContactcol1}>
                                            <p style={{ margin: 0, fontSize: "1.5em", fontWeight: "500" }}>ช่องทางการชำระเงิน</p>
                                            <Grid container spacing={4}>
                                                <Grid item sm={12}>
                                                    <Paper className={classStyle.paper}>
                                                        <Grid container spacing={2}>
                                                            <Grid item>
                                                                <ButtonBase className={classStyle.image}>
                                                                    <img className={classStyle.img} alt="complex" src="/kcb.png" />
                                                                </ButtonBase>
                                                            </Grid>
                                                            <Grid item xs={12} sm container>
                                                                <Grid item xs container direction="column" spacing={2}>
                                                                    <Grid item xs>
                                                                        <Typography gutterBottom variant="subtitle1">
                                                                            ธนาคาร กสิกรไทย
                                                                        </Typography>
                                                                        <Typography variant="body2" gutterBottom>
                                                                            ชื่อบัญชี บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            เลขที่บัญชี xxx-x-xxxxx-x
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Paper className={classStyle.paper}>
                                                        <Grid container spacing={2}>
                                                            <Grid item>
                                                                <ButtonBase className={classStyle.image}>
                                                                    <img className={classStyle.img} alt="complex" src="/kcb.png" />
                                                                </ButtonBase>
                                                            </Grid>
                                                            <Grid item xs={12} sm container>
                                                                <Grid item xs container direction="column" spacing={2}>
                                                                    <Grid item xs>
                                                                        <Typography gutterBottom variant="subtitle1">
                                                                            ธนาคาร กสิกรไทย
                                                                        </Typography>
                                                                        <Typography variant="body2" gutterBottom>
                                                                            ชื่อบัญชี กิตติกร แซ่หลี่
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            เลขที่บัญชี 711-2-27996-9
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Paper className={classStyle.paper}>
                                                        <Grid container spacing={2}>
                                                            <Grid item>
                                                                <ButtonBase className={classStyle.image}>
                                                                    <img className={classStyle.img} alt="complex" src="/tmb.png" />
                                                                </ButtonBase>
                                                            </Grid>
                                                            <Grid item xs={12} sm container>
                                                                <Grid item xs container direction="column" spacing={2}>
                                                                    <Grid item xs>
                                                                        <Typography gutterBottom variant="subtitle1">
                                                                            ธนาคาร กสิกรไทย
                                                                        </Typography>
                                                                        <Typography variant="body2" gutterBottom>
                                                                            ชื่อบัญชี กิตติกร แซ่หลี่
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            เลขที่บัญชี 224-2-52525-7
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
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

export default Payment
