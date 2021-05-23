import React from "react"
import dynamic from "next/dynamic"

import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Send } from "@material-ui/icons"
import CircularProgress from "@material-ui/core/CircularProgress"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/core/Alert"

import Axios from "axios"
import config from "../setApi/Config"

const Layouts = dynamic(() => import("../Layouts/Default"))

const useStylec = makeStyles(theme => ({
	root: {
		minHeight: "100vh",
	},
	bg: {
		background: "url(/contactus-bg.png)",
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

const Contact = () => {
	const classes = useStylec()

	const [Loading, setLoading] = React.useState(false)
	const [open, setOpen] = React.useState(false)
	const [AlertName, setAlertName] = React.useState("")
	const [AlertType, setAlertType] = React.useState("error")

	const refName = React.useRef("")
	const refTel = React.useRef("")
	const refMail = React.useRef("")
	const refTitle = React.useRef("")
	const refDetail = React.useRef("")

	const Submitt = async e => {
		e.preventDefault()
		await sendData()
	}

	const cleatData = () => {
		refName.current.value = ""
		refTel.current.value = ""
		refMail.current.value = ""
		refTitle.current.value = ""
		refDetail.current.value = ""
	}

	const sendData = async () => {
		setLoading(true)
		await Axios.post(config.api.addcontact, null, {
			params: {
				name: refName.current.value,
				mail: refMail.current.value,
				tel: refTel.current.value,
				title: refTitle.current.value,
				detail: refDetail.current.value,
			},
		})
			.then(res => {
				const data = res.data.message

				if (data === "success") {
					AlertData("ส่งข้อมูลสำเร็จ !", "success")
					cleatData()
				} else {
					AlertData("ส่งข้อมูลไม่สำเร็จ !", "error")
				}
			})
			.catch(e => {
				AlertData("เกิดข้อผิดพลาดจาก Server", "error")
			})
			.finally(async () => {
				setLoading(false)
			})
	}

	const AlertData = (name, type) => {
		setOpen(true)
		setAlertName(name)
		setAlertType(type)
	}

	return (
		<React.Fragment>
			<Layouts title="ติดต่อเรา | ACI MACHINERY Co. Ltd" active={4} fixed={true} appColor={"transparent"}>
				<div className={classes.root}>
					<div className={classes.bg} />
					<div className={classes.content}>
						<div className={classes.container}>
							<Grid container className={classes.row}>
								<Grid item sm={12} md={4} className={classes.col1}>
									<div className={classes.Itemscol1}>
										<div className={classes.ItemsContactcol1}>
											<p style={{ margin: 0, fontSize: "1em", fontWeight: "500" }}>ข้อมูลการติดต่อ</p>
											<p style={{ color: "#777676", margin: 0, fontSize: "0.8em", fontWeight: "300" }}>
												<i className="fas fa-envelope" /> E-mail :
											</p>
											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>sale@acipacking.com</p>
											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>acipacking@gmail.com</p>
											<p style={{ color: "#777676", margin: 0, fontSize: "0.8em", fontWeight: "300" }}>
												<i className="fas fa-phone-alt" /> Tel :
											</p>
											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>095-456-5550</p>
											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>086-918-0060</p>
											<p style={{ color: "#777676", margin: 0, fontSize: "0.8em", fontWeight: "300" }}>
												<i className="fab fa-line" /> Line :
											</p>
											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>@acimachinery</p>
											<p style={{ color: "#777676", margin: 0, fontSize: "0.8em", fontWeight: "300" }}>
												<i className="fab fa-facebook" /> Facebook :
											</p>
											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>@acimachinery</p>
											<p style={{ color: "#777676", margin: 0, fontSize: "0.8em", fontWeight: "300" }}>
												<i className="fab fa-youtube" /> Youtube :
											</p>
											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>@acimachinery</p>
										</div>
									</div>
									<div className={classes.Itemscol1}>
										<div className={classes.ItemsContactcol1}>
											<p style={{ margin: 0, fontSize: "1em", fontWeight: "500" }}>ข้อมูลตำแหน่งที่ตั้ง</p>

											<p style={{ color: "#777676", margin: 0, paddingLeft: "1.6em", fontSize: "0.8em", fontWeight: "300" }}>
												{" "}
												<i className="fas fa-map-marker-alt" /> บริษัท เอซีไอ แมชชีนเนอรี่ จำกัด 79/57 ถนนเลียบคลองภาษีเจริญฝั่งใต้ แขวงหนองแขม เขตหนองแขม กรุงเทพมหานคร 10160
											</p>
										</div>
									</div>
								</Grid>
								<Grid item sm={12} md={8} className={classes.col2}>
									<div className={classes.Itemscol1}>
										<form className={classes.form} autoComplete="off" onSubmit={Submitt}>
											<div>
												<TextField
													label={"ชื่อ-นามสกุล"}
													placeholder="ชื่อ-นามสกุล"
													size={"small"}
													fullWidth
													InputLabelProps={{
														shrink: true,
													}}
													inputProps={{
														maxLength: 100,
													}}
													required
													variant="outlined"
													inputRef={refName}
												/>
											</div>
											<div>
												<TextField
													label={"เบอร์โทรศัพท์"}
													placeholder="0XXXXXXXXX"
													size={"small"}
													variant="outlined"
													InputLabelProps={{
														shrink: true,
													}}
													inputProps={{
														maxLength: 10,
														pattern: "[0-9]{10}",
													}}
													required
													type="text"
													helperText="ระบุเบอร์โทรศัพท์ เพื่อความสะดวกในการติดต่อ"
													inputRef={refTel}
												/>
												<TextField
													label={"อีเมลล์"}
													placeholder="XXX@mail.com"
													size={"small"}
													variant="outlined"
													InputLabelProps={{
														shrink: true,
													}}
													required
													type="email"
													helperText="ระบุอีเมลล์ที่ใช้งาน เพื่อความสะดวกในการติดต่อ"
													inputRef={refMail}
													inputProps={{
														maxLength: 45,
													}}
												/>
											</div>
											<div>
												<TextField
													label={"หัวข้อสอบถาม"}
													placeholder="แจ้งหัวข้อสอบถาม"
													size={"small"}
													fullWidth
													InputLabelProps={{
														shrink: true,
													}}
													variant="outlined"
													inputRef={refTitle}
													inputProps={{
														maxLength: 200,
													}}
												/>
											</div>
											<div>
												<TextField
													label={"รายละเอียดเพิ่มเติม"}
													placeholder="แจ้งรายละเอียดเพิ่มเติม"
													size={"small"}
													variant="outlined"
													InputLabelProps={{
														shrink: true,
													}}
													multiline
													rows={4}
													fullWidth
													inputRef={refDetail}
													inputProps={{
														maxLength: 500,
													}}
												/>
											</div>
											<div style={{ marginLeft: "5px" }}>
												<Button disabled={Loading} type="submit" variant="contained" size="small" color="inherit" startIcon={Loading ? <CircularProgress size={15} /> : <Send />}>
													ส่ง
												</Button>
											</div>
										</form>
									</div>
								</Grid>
							</Grid>
						</div>
					</div>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d685.282368751402!2d100.37596834935819!3d13.685551766651933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bd7659b44721%3A0x89351cde15bd5a22!2sThe%20season!5e0!3m2!1sth!2sth!4v1617254605186!5m2!1sth!2sth"
						style={{ border: "none", width: "100%", height: "400px" }}
						loading="lazy"
					></iframe>
				</div>
				<Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={() => setOpen(!open)}>
					<Alert onClose={() => setOpen(!open)} severity={AlertType}>
						{AlertName}
					</Alert>
				</Snackbar>
			</Layouts>
		</React.Fragment>
	)
}

export default Contact
