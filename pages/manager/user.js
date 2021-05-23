import React, { useEffect, useState } from "react"
import Maneger from "../../Layouts/Maneger"

import moment from "moment"

import { useDispatch } from "react-redux"
import action from "../../redux/actions"

import { Grid, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core"
import { VpnKey, VisibilityOff, Visibility, Delete } from "@material-ui/icons"

import { Table, Input, Button } from "antd"

import Http from "../../setApi/http"
import config from "../../setApi/Config"

import { useRouter } from "next/router"

import alasql from "alasql"

import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"

import Swal from "sweetalert2"

const { Search } = Input

export default function user() {
	const dispatch = useDispatch()
	const router = useRouter()
	const [LoadingTable, setLoadingTable] = useState(false)
	const [LoadingAdd, setLoadingAdd] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [visible, setVisible] = useState(false)
	const [visiblePass, setVisiblePass] = useState(false)
	const [data, setData] = useState([])
	const [dataFilter, setDataFilter] = useState([])
	const [datainput, setDatainput] = React.useState({
		username: "",
		password: "",
	})
	const [text, setText] = useState("")

	const columns = [
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
			dataIndex: "index",
			key: "index",
			width: 50,
			align: "center",
			render: (text, record, index) => index + 1,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ชื่อผู้ใช้งาน"}</label>,
			dataIndex: "username",
			key: "username",
			sorter: (a, b) => a.username.localeCompare(b.username),
			width: 100,
			// align: "center",
			// ellipsis: true,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"เข้าสู่ระบบล่าสุด"}</label>,
			dataIndex: "lastLogin",
			key: "lastLogin",
			width: 120,
			align: "center",
			sorter: (a, b) => moment(a.lastLogin).unix() - moment(b.lastLogin).unix(),
			render: (text, record) => (text ? moment(text).format("DD/MM/YY HH:mm") : ""),
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ผู้บันทึก"}</label>,
			dataIndex: "createUser",
			key: "createUser",
			sorter: (a, b) => a.createUser.localeCompare(b.createUser),
			width: 80,
			ellipsis: true,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"วันที่บันทึก"}</label>,
			dataIndex: "createDate",
			key: "createDate",
			width: 120,
			align: "center",
			sorter: (a, b) => moment(a.createDate).unix() - moment(b.createDate).unix(),
			render: (text, record) => (text ? moment(text).format("DD/MM/YY HH:mm") : ""),
		},
		{
			title: "",
			dataIndex: "menu",
			key: "menu",
			width: 50,
			align: "center",
			render: (text, record) => (
				<div>
					<Tooltip title="รีเซ็ตรหัสผ่าน">
						<IconButton color="inherit" onClick={() => resetpass(record)} disabled={record.callBy !== "dew"}>
							<VpnKey />
						</IconButton>
					</Tooltip>
					<Tooltip title="ลบผู้ใช้งาน">
						<IconButton color="inherit" onClick={async () => await deleteUser(record)} disabled={record.callBy !== "dew"}>
							<Delete />
						</IconButton>
					</Tooltip>
				</div>
			),
		},
	]

	useEffect(async () => {
		dispatch(action.setAdmin("ผู้ใช้งาน"))
		const cook = Cookies.get(config.master)
		const token = cook ? jwt_decode(cook).user : null

		setLoadingTable(true)
		await Http.post(config.api.user, null, {
			params: {
				callBy: token,
			},
		})
			.then(res => {
				const data = res.data.items

				setData(data)
				setDataFilter(data)
			})
			.catch(e => {})
			.finally(res => {
				setLoadingTable(false)
			})
	}, [])

	const handleChange = prop => event => {
		setDatainput({ ...datainput, [prop]: event.target.value })
	}

	const reload = async () => {
		const cook = Cookies.get(config.master)
		const token = cook ? jwt_decode(cook).user : null
		setLoadingTable(true)
		await Http.post(config.api.user, null, {
			params: {
				callBy: token,
			},
		})
			.then(res => {
				const data = res.data.items
				setData(data)
				setDataFilter(data)
			})
			.catch(e => {})
			.finally(res => {
				setLoadingTable(false)
			})
	}

	const addUser = async () => {
		const cook = Cookies.get(config.master)
		const token = jwt_decode(cook)
		setLoadingAdd(true)
		await Http.post(config.api.adduser, null, {
			params: {
				username: datainput.username,
				pass: datainput.password,
				user: token.user,
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
					Swal.fire({
						icon: "success",
						title: "บันทึกเรียบร้อย!",
						showConfirmButton: false,
						timer: 1500,
					})
				} else {
					Swal.fire({
						icon: "error",
						title: "แจ้งเตือน !",
						text: check,
						confirmButtonText: "ตกลง",
					})
				}
			})
			.catch(e => {
				Swal.fire({
					icon: "error",
					title: "แจ้งเตือน !",
					text: e.response.data.message,
					confirmButtonText: "ตกลง",
				})
			})
			.finally(async res => {
				setLoadingAdd(false)
				addClose()
				await reload()
			})
	}

	const onSearch = value => {
		const filter = alasql(`select * from ? where username like '%${value}%'`, [dataFilter])
		setData(filter)
	}

	const onSubmit = async e => {
		e.preventDefault()
		await addUser()
	}

	const addClose = () => {
		setVisible(false)
		setDatainput({
			username: "",
			password: "",
		})
	}

	const resetpass = row => {
		setText(row.username)
		setVisiblePass(true)
	}

	const deleteUser = async row => {
		Swal.fire({
			title: "ต้องการลบใช่หรือไม่?",
			text: `ลบผู้ใช้งานชื่อ ${row.username} !`,
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "ใช่",
			cancelButtonText: "ไม่",
		}).then(async result => {
			if (result.isConfirmed) {
				await Http.delete(config.api.deleteuser, {
					params: {
						username: row.username,
					},
				})
					.then(res => {
						const check = res.data.message
						if (check === "success") {
							Swal.fire({
								icon: "success",
								title: "ลบเรียบร้อย!",
								showConfirmButton: false,
								timer: 1500,
							})
						} else {
							Swal.fire({
								icon: "error",
								title: "แจ้งเตือน !",
								text: check,
								confirmButtonText: "ตกลง",
							})
						}
					})
					.catch(e => {
						Swal.fire({
							icon: "error",
							title: "แจ้งเตือน !",
							text: e.response.data.message,
							confirmButtonText: "ตกลง",
						})
					})
					.finally(async () => {
						await reload()
					})
			}
		})
	}

	const reset = async () => {
		await Http.put(config.api.reset, null, {
			params: {
				username: text,
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
					Swal.fire({
						icon: "success",
						title: "รีเซ็ตรหัสผ่านเรียบร้อย!",
						showConfirmButton: false,
						timer: 1500,
					})
				} else {
					Swal.fire({
						icon: "error",
						title: "แจ้งเตือน !",
						text: check,
						confirmButtonText: "ตกลง",
					})
				}
			})
			.catch(e => {
				Swal.fire({
					icon: "error",
					title: "แจ้งเตือน !",
					text: e.response.data.message,
					confirmButtonText: "ตกลง",
				})
			})
			.finally(async () => {
				setVisiblePass(false)
				await reload()
			})
	}

	return (
		<React.Fragment>
			<Maneger>
				<Grid container>
					<Grid item xs={4}>
						<Search placeholder="ค้นหาชื่อผู้ใช้งาน" onSearch={onSearch} />
					</Grid>

					<Grid item xs={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Button type="primary" shape="round" onClick={() => setVisible(true)}>
							เพิ่ม
						</Button>
					</Grid>
					<Grid item xs={12} style={{ marginTop: "5px" }}>
						<Table
							rowKey={"username"}
							loading={{
								spinning: LoadingTable,
								size: "large",
								tip: "กำลังโหลด...",
							}}
							dataSource={data}
							columns={columns}
							// scroll={{ y: 600 }}
							size={"small"}
							bordered={true}
							tableLayout={"auto"}
							pagination={false}
							locale={{ emptyText: "ไม่มีข้อมูล" }}
						/>
					</Grid>
				</Grid>
			</Maneger>
			<Dialog open={visible} onClose={() => setVisible(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"เพิ่มผู้ใช้งาน"}</DialogTitle>
				<form onSubmit={onSubmit}>
					<DialogContent>
						<FormControl variant="outlined" fullWidth={true}>
							<InputLabel htmlFor="outlined-adornment-text" style={{ fontFamily: "Kanit, sans-serif" }}>
								ผู้ใช้งาน
							</InputLabel>
							<OutlinedInput id="outlined-adornment-text" value={datainput.username} onChange={handleChange("username")} autoComplete={"off"} type={"text"} labelWidth={70} required style={{ fontFamily: "Kanit, sans-serif" }} />
						</FormControl>
						<br />
						<FormControl variant="outlined" style={{ marginTop: 20 }} fullWidth={true}>
							<InputLabel htmlFor="outlined-adornment-password" style={{ fontFamily: "Kanit, sans-serif" }}>
								รหัสผ่าน
							</InputLabel>
							<OutlinedInput
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
					</DialogContent>
					<DialogActions>
						<Button type="primary" shape="round" loading={LoadingAdd} htmlType={"submit"}>
							เพิ่ม
						</Button>
						<Button type="primary" shape="round" danger onClick={addClose}>
							ยกเลิก
						</Button>
					</DialogActions>
				</form>
			</Dialog>
			<Dialog open={visiblePass} onClose={() => setVisiblePass(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"รีเซ็ตรหัสผ่าน"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description"> {`ชื่อผู้ใช้งาน: ${text}`}</DialogContentText>
					<DialogContentText id="alert-dialog-description"> รีเซ็ตรหัสผ่านตั้งค่า: 9999</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button type="primary" shape="round" onClick={reset}>
						ยืนยัน
					</Button>
					<Button type="primary" shape="round" danger onClick={() => setVisiblePass(false)}>
						ยกเลิก
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
