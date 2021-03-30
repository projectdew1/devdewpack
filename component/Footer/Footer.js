import Grid from "@material-ui/core/Grid"

// import Hidden from "@material-ui/core/Hidden"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { orangeP, whiteP } from "../../assets/colorProject"
import { FacebookProvider, Page } from "react-facebook"

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	setItems: {
		padding: theme.spacing(2),
		// textAlign: "center",
		// color: theme.palette.text.secondary,
		backgroundColor: "transparent",
		// border: "1px solid rgba(0, 0, 0, 0.24)",
		fontFamily: "Kanit, sans-serif",
		fontWeight: "bold",
		color: "white",
		fontSize: "1rem",
	},
	line: {
		padding: theme.spacing(5),
		backgroundColor: "#11365f",
		// background: " linear-gradient(180deg, rgba(0,51,102,1) 20%, rgba(255,255,255,1) 80%)",
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
		height: "50px",
		backgroundColor: "#3a3939",
		color: whiteP,
		fontWeight: "200",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	lineItems: {
		borderRight: "1px solid white",
		[theme.breakpoints.down("md")]: {
			borderRight: "none",
		},
	},
	call: {
		backgroundColor: "#009aff",
		width: "200px",
		padding: "5px",
		textAlign: "center",
		borderRadius: "20px",
		fontSize: "20px",
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
}))

export default function Footer() {
	const classes = useStyles()
	return (
		<div>
			{/* <Hidden smDown>
				<Grid container spacing={2} className={classes.social}>
					<Grid item xs={12} sm={6} md={3}>
						<div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: "10px", backgroundColor: "#e5f2fd" }} className={classes.cardSocial}>
							<div className="col-xs-6">
								<i className="fas fa-phone-square-alt" style={{ fontSize: "5rem", color: "#339af0" }} />
							</div>
							<div className="col-xs-6">
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: "10px", backgroundColor: "#dfdfdf" }} className={classes.cardSocial}>
							<div className="col-xs-6">
								<i className="fas fa-envelope" style={{ fontSize: "5rem", color: "#000000" }} />
							</div>
							<div className="col-xs-6">
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: "10px", backgroundColor: "#dff6df" }} className={classes.cardSocial}>
							<div className="col-xs-6">
								<i className="fab fa-line" style={{ fontSize: "5rem", color: "#00B900" }} />
							</div>
							<div className="col-xs-6">
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: "10px", backgroundColor: "#e6eaf2" }} className={classes.cardSocial}>
							<div className="col-xs-6">
								<i className="fab fa-facebook-square" style={{ fontSize: "5rem", color: "#3b5998" }} />
							</div>
							<div className="col-xs-6">
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
								<p style={{ fontSize: "1rem", fontWeight: "bold", margin: "0px 0px 0px 10px" }}>ID : @XXXX</p>
							</div>
						</div>
					</Grid>
				</Grid>
			</Hidden> */}
			<Grid container spacing={2} className={classes.line}>
				<Grid item sm={12} md={4} className={classes.lineItems}>
					<div className={classes.setItems}>
						<p style={{ fontWeight: "500", marginTop: 0 }}>ACI MACHINERY Co. Ltd</p>
						<p style={{ margin: 0 }}>
							{/* <label style={{ fontWeight: "bold" }}>Address : </label> */}
							<label style={{ fontWeight: "200" }}>The Season Petkasem69, No. 79/57, Liap Khlong Phasi Charoen-South Road, Nong Khaem, Nong Khaem, Bangkok 10160 Thailand</label>
						</p>

						<div
							onClick={() => window.open("https://www.trustmarkthai.com/callbackData/popup.php?data=023-31-6-be3c6d70914dc781d7b520ca6105128140ddcd0f411&markID=firstmar", "DescriptiveWindowName", "resizable,scrollbars,status")}
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
							}}
						/>
					</div>
				</Grid>
				<Grid item sm={12} md={4} className={classes.lineItems}>
					<div className={classes.setItems}>
						<p style={{ fontWeight: "500", marginTop: 0 }}>Call Center</p>

						<div className={classes.call} onClick={() => window.open("tel:0954565550")}>
							<i className="fas fa-phone-alt" style={{ fontSize: "1rem", marginRight: "10px" }} />
							095-456-5550
						</div>
						<div className={classes.call} style={{ marginTop: "10px" }} onClick={() => window.open("tel:0869180060")}>
							<i className="fas fa-phone-alt" style={{ fontSize: "1rem", marginRight: "10px" }} />
							086-918-0060
						</div>

						<p style={{ fontWeight: "500" }}>Line</p>

						<div className={classes.addLine}>
							<i className="fab fa-line" style={{ fontSize: "1.5rem", marginRight: "10px" }} />
							Line official
						</div>
					</div>
				</Grid>
				<Grid item sm={12} md={4} style={{ overflow: "hidden" }}>
					<FacebookProvider appId="VoiceOnlineTH">
						<Page href="https://www.facebook.com/VoiceOnlineTH" tabs="timeline" height={"1px"} />
					</FacebookProvider>
				</Grid>
			</Grid>
			<div className={classes.bottom}>Copyright 2021 ACI MACHINERY | All Rights Reserved</div>
		</div>
	)
}
