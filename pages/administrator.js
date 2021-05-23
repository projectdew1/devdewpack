import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import style from "../assets/login"
import IconButton from "@material-ui/core/IconButton"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/core/Alert"

import Axios from "axios"
import Cookies from "js-cookie"
import config from "../setApi/Config"

import { useRouter } from "next/router"

const useStyles = makeStyles(style)

export default function administrator() {
	const classes = useStyles()

	const [showPassword, setShowPassword] = React.useState(false)
	const [datainput, setDatainput] = React.useState({
		username: "",
		password: "",
	})
	const [open, setOpen] = React.useState(false)
	const [Loading, setLoading] = React.useState(false)
	const [Alertname, setAlertname] = React.useState("")

	const router = useRouter()

	const onSubmit = async e => {
		e.preventDefault()
		await Login()
	}

	const handleChange = prop => event => {
		setDatainput({ ...datainput, [prop]: event.target.value })
	}

	const Login = async () => {
		setLoading(true)
		const params = {
			username: datainput.username,
			password: datainput.password,
		}
		await Axios.post(config.api.login, params, {
			headers: {
				"content-type": "application/json; charset=utf-8",
			},
		})
			.then(res => {
				Cookies.set(config.master, res.data.token)
				router.push("/manager/")
			})
			.catch(e => {
				if (e.response) {
					if (e.response.status === 401) {
						AlertError("กรุณาลงชื่อเข้าสู่ระบบใหม่ !")
					}
				} else {
					AlertError("เกิดความผิดพลาดที่ Server")
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const AlertError = name => {
		setAlertname(name)
		setOpen(true)
	}

	return (
		<div className={classes.main}>
			{/* <div className={classes.main} /> */}
			<div className={classes.container}>
				<Grid container className={classes.line}>
					<Grid item xs={12} sm={10} md={6} className={classes.lineItems}>
						<div style={{ marginTop: "2rem", fontWeight: "bold", color: "gray", fontSize: "2rem" }}>
							<label>ลงชื่อเข้าสู่ระบบ</label>
						</div>
						<form onSubmit={onSubmit}>
							<br />
							<FormControl variant="outlined" fullWidth={true}>
								<InputLabel htmlFor="outlined-adornment-text" style={{ fontFamily: "Kanit, sans-serif" }}>
									ผู้ใช้งาน
								</InputLabel>
								<OutlinedInput id="outlined-adornment-text" disabled={Loading} value={datainput.username} onChange={handleChange("username")} autoComplete={"off"} type={"text"} labelWidth={70} required style={{ fontFamily: "Kanit, sans-serif" }} />
							</FormControl>
							<br />
							<FormControl variant="outlined" style={{ marginTop: 20 }} fullWidth={true}>
								<InputLabel htmlFor="outlined-adornment-password" style={{ fontFamily: "Kanit, sans-serif" }}>
									รหัสผ่าน
								</InputLabel>
								<OutlinedInput
									disabled={Loading}
									required
									autoComplete={"new-password"}
									style={{ fontFamily: "Kanit, sans-serif" }}
									id="outlined-adornment-password"
									type={showPassword ? "text" : "password"}
									value={datainput.password}
									onChange={handleChange("password")}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setShowPassword(!showPassword)}
												//   onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
							</FormControl>
							<br />

							<Button disabled={Loading} variant="outlined" color="primary" type="submit" size="large" style={{ marginTop: "20px", fontFamily: "Kanit, sans-serif" }}>
								{Loading ? <CircularProgress size={30} /> : "เข้าสู่ระบบ"}
							</Button>
						</form>
					</Grid>
				</Grid>
			</div>
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={() => setOpen(!open)}>
				<Alert onClose={() => setOpen(!open)} severity="error">
					{Alertname}
				</Alert>
			</Snackbar>
		</div>
	)
}
