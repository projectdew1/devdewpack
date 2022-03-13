import Grid from "@material-ui/core/Grid"

// import Hidden from "@material-ui/core/Hidden"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { orangeP, whiteP } from "../../assets/colorProject"
import { FacebookProvider, Page } from "react-facebook"
import RoomIcon from "@material-ui/icons/Room"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        padding: '20px 60px 0px 60px',
        backgroundColor: "#2a2d34",
        boxShadow: '0 -5px 5px -5px rgba(0, 0, 0, 0.35)',
        [theme.breakpoints.down("sm")]: {
            padding: '20px 30px 0px 30px',
        },
        [theme.breakpoints.down("xs")]: {
            padding: '20px 16px 0px 16px',
        }

    },
    setItems: {
        padding: theme.spacing(2),
        backgroundColor: "transparent",
        fontFamily: "Kanit, sans-serif",
        fontWeight: "bold",
        color: "white",
        fontSize: "1rem",
    },
    line: {
        padding: `${theme.spacing(5)} , ${theme.spacing(1)}`,
    },
    social: {
        padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
        borderTop: "2px solid #e8e8e8",
    },
    cardSocial: {
        transition: "transform .2s",
        width: "80%",
        height: "100px",
        margin: "0 auto",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: " 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",

        "&:hover": {
            transform: " scale(1.05)",
        },
    },
    bottom: {
        fontFamily: "Kanit, sans-serif",
        height: "auto",
        padding: "0.8rem",
        color: "#949699",
        fontWeight: "300",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2a2d34",
    },

    call: {
        backgroundColor: "#009aff",
        width: "160px",
        padding: "5px 5px 5px 15px",
        // textAlign: "center",
        borderRadius: "15px",
        fontSize: "15px",
        cursor: "pointer",
        fontWeight: "400",
    },
    addLine: {
        backgroundColor: "#00c300",
        width: "200px",
        padding: "5px",
        textAlign: "center",
        borderRadius: "20px",
        fontSize: "20px",
        cursor: "pointer",
        fontWeight: "400",
    },
    setItemfacebook: {
        overflow: "hidden",
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        width: "100%",
        [theme.breakpoints.down("md")]: {
            justifyContent: "flex-start",
        },
    },
    Itemfacebook: {
        padding: theme.spacing(2),
    },
    itemCard: {
        width: '40px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#3b5999 !important',
        color: ' #fff',
        borderRadius: '3px',
        overflow: 'hidden',
        margin: '5px',
        cursor: "pointer",
    },
    itemCardLine: {
        width: '40px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#00b489 !important',
        color: ' #fff',
        borderRadius: '3px',
        overflow: 'hidden',
        margin: '5px',
        cursor: "pointer",
    },
    itemCardTube: {
        width: '40px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#FF0000 !important',
        color: ' #fff',
        borderRadius: '3px',
        overflow: 'hidden',
        margin: '5px',
        cursor: "pointer",
    },
    itemsAll: {
        width: '100%',
        height: '200%',
        transition: 'all 0.3s ease 0s',
        position: 'relative',
        top: 0,
        "&:hover": {
            top: '-40px'
        },
    },
    itemInCard: {
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // transition: 'all 0.3s ease 0s',
        // position: 'relative',
        // top: 0,
        // "&:hover": {
        //     top: '-30px'
        // },

    }

}))

export default function Footer() {


    const classes = useStyles()
    return (
        <div>
            <div className={classes.root} >
                <Grid container className={classes.line}>
                    <Grid item xs={12} sm={12} md={4}>
                        <div className={classes.setItems}>
                            <p style={{ fontSize: "0.9em", fontWeight: "500", margin: 0, color: "#949699", marginBottom: "5px" }}>
                                <i className="fas fa-map-marker-alt" style={{ fontSize: "1em", marginRight: "5px" }} />
                                KMS MACHINERY CO.,LTD
                            </p>
                            <p style={{ margin: 0 }}>
                                <label style={{ fontSize: "0.9em", fontWeight: "300", color: "#949699" }}> No. 1/46 Moo 6, </label>
                            </p>
                            <p style={{ margin: 0 }}>
                                <label style={{ fontSize: "0.9em", fontWeight: "300", color: "#949699" }}>Petchkasem Road, Krathumbaen,</label>
                            </p>
                            <p style={{ margin: 0 }}>
                                <label style={{ fontSize: "0.9em", fontWeight: "300", color: "#949699" }}> Samut Sakhon 74310 Thailand</label>
                            </p>

                            <div
                                onClick={() => window.open("https://www.trustmarkthai.com/callbackData/popup.php?data=2ec-29-5-696cf548b5b0d1278f0a1d387874320fa2c84d1476&markID=firstmar", "DescriptiveWindowName", "resizable,scrollbars,status")}
                                style={{
                                    marginTop: "10px",
                                    backgroundImage: "url(https://www.trustmarkthai.com/trust_banners/bns_registered.png)",
                                    backgroundRepeat: "no-repeat",
                                    height: 60,
                                    width: 150,
                                    backgroundColor: "white",
                                    backgroundPosition: "center",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <div className={classes.setItems}>
                            <p style={{ fontWeight: "500", marginTop: 0, color: "#949699", marginBottom: "5px" }}>
                                <i className="fas fa-headset" style={{ fontSize: "1rem", marginRight: "10px" }} />
                                Call Center</p>
                            {/* <p style={{ fontSize: "0.9em", fontWeight: "300", textDecoration: 'underline', color: "#949699", cursor: 'pointer' }} onClick={() => window.open("tel:034116655")}>
                                034-116655
                            </p>
                            <p style={{ fontSize: "0.9em", fontWeight: "300", textDecoration: 'underline', color: "#949699", cursor: 'pointer' }} onClick={() => window.open("tel:0954565550")}>
                                095-456-5550
                            </p>
                            <p style={{ fontSize: "0.9em", fontWeight: "300", textDecoration: 'underline', color: "#949699", cursor: 'pointer' }} onClick={() => window.open("tel:0869180060")}>
                                086-918-0060
                            </p> */}



                            <div className={classes.call} onClick={() => window.open("tel:034116655")}>
                                <i className="fas fa-phone-alt" style={{ fontSize: "1rem", marginRight: "10px" }} />
                                034-116655
                            </div>
                            <div className={classes.call} style={{ marginTop: "10px" }} onClick={() => window.open("tel:0954565550")}>
                                <i className="fas fa-phone-alt" style={{ fontSize: "1rem", marginRight: "10px" }} />
                                095-456-5550
                            </div>
                            <div className={classes.call} style={{ marginTop: "10px" }} onClick={() => window.open("tel:0869180060")}>
                                <i className="fas fa-phone-alt" style={{ fontSize: "1rem", marginRight: "10px" }} />
                                086-918-0060
                            </div>

                            <p style={{ fontWeight: "500", color: "#949699", marginBottom: "5px", marginTop: "10px" }}>
                                <i className="fas fa-globe" style={{ fontSize: "1rem", marginRight: "10px" }} />
                                Social</p>
                            <div style={{ display: 'flex' }}>

                                <div className={classes.itemCard} onClick={() => window.open("https://www.facebook.com/kmsmachinerythailand")}>
                                    <div className={classes.itemsAll}>
                                        <div className={classes.itemInCard} >
                                            <i className="fab fa-facebook-f" />
                                        </div>
                                        <div className={classes.itemInCard} >
                                            <i className="fab fa-facebook-f" />

                                        </div>
                                    </div>
                                </div>

                                <div className={classes.itemCardLine} onClick={() => window.open("https://page.line.me/?accountId=kmsmachinery")}>
                                    <div className={classes.itemsAll}>
                                        <div className={classes.itemInCard} >
                                            <i className="fab fa-line" style={{ fontSize: "1.5rem" }} />
                                        </div>
                                        <div className={classes.itemInCard} >
                                            <i className="fab fa-line" style={{ fontSize: "1.5rem" }} />
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.itemCardTube} onClick={() => window.open("https://www.youtube.com/channel/UCRS6TDbjKR5H-L7z8KJmGFQ")}>
                                    <div className={classes.itemsAll}>
                                        <div className={classes.itemInCard} >
                                            <i className="fab fa-youtube" style={{ fontSize: "1.5rem" }} />
                                        </div>
                                        <div className={classes.itemInCard} >
                                            <i className="fab fa-youtube" style={{ fontSize: "1.5rem" }} />
                                        </div>
                                    </div>
                                </div>

                            </div>


                            {/* <div className={classes.addLine} onClick={() => window.open("https://page.line.me/?accountId=kmsmachinery")}>
                                <i className="fab fa-line" style={{ fontSize: "1.5rem", marginRight: "10px" }} />
                                Line official
                            </div> */}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} className={classes.setItemfacebook}>
                        <div className={classes.Itemfacebook}>
                            <FacebookProvider appId="kmsmachinerythailand">
                                <Page href="https://www.facebook.com/kmsmachinerythailand" tabs="timeline" height={20} />
                            </FacebookProvider>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.bottom}>Copyright 2021 KMS MACHINERY | All Rights Reserved</div>
        </div>
    )
}
