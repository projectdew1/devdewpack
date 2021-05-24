import React, { useEffect, useState } from "react"
import Maneger from "../../Layouts/Maneger"

import { useDispatch, useSelector } from "react-redux"
import action from "../../redux/actions"
import config from "../../setApi/Config"
import Http from "../../setApi/http"

import { Grid, Badge, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox, InputLabel, OutlinedInput, Snackbar, Alert } from "@material-ui/core"
import { Visibility, MoreVert, Delete } from "@material-ui/icons"

import { Table, Tabs, Button, Menu, Dropdown, Popconfirm, message } from "antd"

import { withStyles } from "@material-ui/core/styles"
import { green } from "@material-ui/core/colors"
import moment from "moment"

const { TabPane } = Tabs

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		"&$checked": {
			color: green[600],
		},
	},
	checked: {},
})(props => <Checkbox color="default" {...props} />)

export default function Contact() {
	const dispatch = useDispatch()
	const count = useSelector(state => state.data.count)

	const [open, setOpen] = useState(false)
	const [checked, setChecked] = useState(false)
	const [LoadingTable, setLoadingTable] = useState(false)
	const [data, setData] = useState({
		all: [],
		read: [],
		noread: [],
	})
	const [select, setSelect] = useState({
		contactDetail: "",
		contactId: 1,
		contactMail: "",
		contactName: "",
		contactTel: "",
		contactTitle: "",
		status: 0,
		statusname: "",
	})
	const [Alertname, setAlertname] = useState("")
	const [Alerttype, setAlerttype] = useState("error")
	const [openAlert, setOpenAlert] = useState(false)

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
			title: () => <label style={{ fontWeight: "bold" }}>{"ผู้ติดต่อ"}</label>,
			dataIndex: "contactName",
			key: "contactName",
			sorter: (a, b) => a.contactName.localeCompare(b.contactName),
			width: 100,
			// align: "center",
			// ellipsis: true,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"เบอร์โทร"}</label>,
			dataIndex: "contactTel",
			key: "contactTel",
			sorter: (a, b) => a.contactTel.localeCompare(b.contactTel),
			width: 100,
			// align: "center",
			// ellipsis: true,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"อีเมลล์"}</label>,
			dataIndex: "contactMail",
			key: "contactMail",
			sorter: (a, b) => a.contactMail.localeCompare(b.contactMail),
			width: 100,
			// align: "center",
			// ellipsis: true,
		},

		{
			title: () => <label style={{ fontWeight: "bold" }}>{"สถานะ"}</label>,
			dataIndex: "statusname",
			key: "statusname",
			sorter: (a, b) => a.statusname.localeCompare(b.statusname),
			width: 80,
			render: (text, record) => {
				return {
					props: {
						style: {
							background: record.status == 0 ? "#ff7a7a" : null,
							color: record.status == 0 ? "#FFFFFF" : "#000000",
						},
					},
					children: text,
				}
			},
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
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item key="0" onClick={() => handleClickOpen(record)}>
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<Visibility />
									<label style={{ cursor: "pointer" }}>{` มุมมอง`}</label>
								</div>
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item key="1" disabled={record.status === 0}>
								<Popconfirm disabled={record.status === 0} title={`ลบข้อมูล ${record.contactName}`} okText="ตกลง" cancelText="ยกเลิก" onConfirm={() => deleteContact(record.contactId)}>
									<Tooltip title="ลบข้อมูล">
										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
											<Delete />
											<label style={{ cursor: "pointer" }}>{` ลบ`}</label>
										</div>
									</Tooltip>
								</Popconfirm>
							</Menu.Item>
						</Menu>
					}
					trigger={["click"]}
				>
					<MoreVert style={{ cursor: "pointer" }} />
				</Dropdown>
			),
		},
	]

	const setAlert = (typeAlert, nameAlert) => {
		setAlerttype(typeAlert)
		setAlertname(nameAlert)
		setOpenAlert(true)
	}

	const handleClickOpen = row => {
		// console.log(row)
		setSelect(row)
		setOpen(true)
		setChecked(row.status === 0 ? false : true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleChange = async event => {
		const status = event.target.checked ? 1 : 0
		await updateRead(select.contactId, status)
	}

	const updateRead = async (id, status) => {
		setLoadingTable(true)
		await Http.put(config.api.updatecontact, null, {
			params: {
				id,
				status,
			},
		})
			.then(res => {
				const check = res.data.message
				const checked = status === 1 ? true : false
				if (check === "success") {
					setChecked(checked)
				}
			})
			.catch(e => {})
			.finally(async () => {
				setLoadingTable(false)
				await getData()
			})
	}

	const getData = async () => {
		setLoadingTable(true)
		await Http.post(config.api.contact)
			.then(res => {
				const data = res.data.message
				if (data === "success") {
					const noRead = res.data.items.noRead
					// console.log(res.data.items)
					dispatch(action.stateSet(noRead))
					setData({ all: res.data.items.data, read: res.data.items.dataRead, noread: res.data.items.datanoRead })
				}
			})
			.catch(e => {})
			.finally(() => {
				setLoadingTable(false)
			})
	}

	const deleteContact = async id => {
		setLoadingTable(true)
		await Http.delete(config.api.deletecontact, {
			params: {
				id,
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
					setAlert("success", "ลบข้อมูลเรียบร้อย !")
				} else {
					setAlert("error", "ลบข้อมูลไม่สำเร็จ !")
				}
			})
			.catch(e => {
				setAlert("error", "เกิดข้อผิดพลาดจาก server !")
			})
			.finally(async () => {
				await getData()
				setLoadingTable(false)
			})
	}

	useEffect(() => {
		dispatch(action.setAdmin("ผู้ติดต่อ"))
		getData()
	}, [])

	return (
		<React.Fragment>
			<Maneger>
				<Grid container>
					<Grid item xs={12} style={{ marginTop: "5px" }}>
						<Tabs defaultActiveKey="1">
							<TabPane tab="ทั้งหมด" key="1">
								<Table
									rowKey={"contactId"}
									loading={{
										spinning: LoadingTable,
										size: "large",
										tip: "กำลังโหลด...",
									}}
									dataSource={data.all}
									columns={columns}
									// scroll={{ y: 600 }}
									size={"small"}
									bordered={true}
									tableLayout={"auto"}
									pagination={{
										defaultPageSize: 50,
										pageSizeOptions: ["10", "25", "50", "100"],
										showSizeChanger: true,
										locale: { items_per_page: "/ หน้า" },
									}}
									locale={{ emptyText: "ไม่มีข้อมูล" }}
								/>
							</TabPane>
							<TabPane
								tab={
									<Badge badgeContent={count} color="error">
										{"ยังไม่อ่าน"}
									</Badge>
								}
								key="2"
							>
								<Table
									rowKey={"contactId"}
									loading={{
										spinning: LoadingTable,
										size: "large",
										tip: "กำลังโหลด...",
									}}
									dataSource={data.noread}
									columns={columns}
									// scroll={{ y: 600 }}
									size={"small"}
									bordered={true}
									tableLayout={"auto"}
									pagination={{
										defaultPageSize: 50,
										pageSizeOptions: ["10", "25", "50", "100"],
										showSizeChanger: true,
										locale: { items_per_page: "/ หน้า" },
									}}
									locale={{ emptyText: "ไม่มีข้อมูล" }}
								/>
							</TabPane>
							<TabPane tab="อ่านแล้ว" key="3">
								<Table
									rowKey={"contactId"}
									loading={{
										spinning: LoadingTable,
										size: "large",
										tip: "กำลังโหลด...",
									}}
									dataSource={data.read}
									columns={columns}
									// scroll={{ y: 600 }}
									size={"small"}
									bordered={true}
									tableLayout={"auto"}
									pagination={{
										defaultPageSize: 50,
										pageSizeOptions: ["10", "25", "50", "100"],
										showSizeChanger: true,
										locale: { items_per_page: "/ หน้า" },
									}}
									locale={{ emptyText: "ไม่มีข้อมูล" }}
								/>
							</TabPane>
						</Tabs>
					</Grid>
				</Grid>
				<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">
						{
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<label>รายละเอียดผู้ติดต่อ</label>
								<div style={{ display: "flex", alignItems: "center" }}>
									<FormControlLabel control={<GreenCheckbox checked={checked} onChange={handleChange} name="checked" />} label="อ่านแล้ว" />
								</div>
							</div>
						}
					</DialogTitle>
					<DialogContent>
						<Grid container>
							<Grid item xs={6}>
								<label style={{ fontWeight: "bold" }}>{`ชื่อผู้ติดต่อ : `}</label>
								<label>{select.contactName}</label>
							</Grid>
							<Grid item xs={6} style={{ fontWeight: "bold" }}>
								<label style={{ fontWeight: "bold" }}>{`วันที่แจ้งข้อมูล : `}</label>
								<label>{select.createDate ? moment(select.createDate).format("DD/MM/YYYY HH:mm") : null}</label>
							</Grid>
							<Grid item xs={6}>
								<label style={{ fontWeight: "bold" }}>{`เบอร์โทร : `}</label>
								<label>{select.contactTel}</label>
							</Grid>
							<Grid item xs={6} style={{ fontWeight: "bold" }}>
								<label style={{ fontWeight: "bold" }}>{`อีเมลล์ : `}</label>
								<label>{select.contactMail}</label>
							</Grid>
							<Grid item xs={12} style={{ marginTop: "10px" }} />
							<Grid item xs={12}>
								<label style={{ fontWeight: "bold" }}>{`เรื่องที่แจ้ง : `}</label>
								<label>{select.contactTitle}</label>
							</Grid>
							<Grid item xs={12}>
								<label style={{ fontWeight: "bold" }}>{`รายละเอียด : `}</label>
								<label>{select.contactDetail}</label>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button danger type="primary" shape="round" onClick={handleClose}>
							ปิด
						</Button>
					</DialogActions>
				</Dialog>
			</Maneger>
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(!openAlert)}>
				<Alert onClose={() => setOpenAlert(!openAlert)} severity={Alerttype}>
					{Alertname}
				</Alert>
			</Snackbar>
		</React.Fragment>
	)
}
