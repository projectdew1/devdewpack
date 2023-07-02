import React, { useEffect, useState } from "react"
import Maneger from "../../Layouts/Maneger"

import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import action from "../../redux/actions"

import { Table, Button, Menu, Dropdown, Popconfirm, Upload, Input, Image, Form, Modal, Spin } from "antd"
import { Grid, Badge, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { Visibility, MoreVert, Delete, Edit, FileCopy, AddCircleOutlineOutlined } from "@material-ui/icons"

import config from "../../setApi/Config"
import Http from "../../setApi/http"

// The editor core

import Editor from "@react-page/editor"

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
// import '@react-page/editor/lib/index.css';

import { cellPlugin } from "../../plugin/cellPlugins.tsx"
//langua
import { uiTranslator } from "../../utils/editorLang"

import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"

const { TextArea } = Input
const { confirm } = Modal

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
}

export default function CreateArticle() {
	const [formDialog] = Form.useForm()
	const [form] = Form.useForm()
	const router = useRouter()
	const dispatch = useDispatch()

	const edit = useSelector(state => state.data.edit)

	const [value, setValue] = useState(null)
	const [Loading, setLoading] = useState(false)
	//Alert
	const [Alertname, setAlertname] = useState("")
	const [Alerttype, setAlerttype] = useState("error")
	const [openAlert, setOpenAlert] = useState(false)
	// dialog
	const [open, setOpen] = useState(false)
	const [LoadingTable, setLoadingTable] = useState(false)
	const [data, setData] = useState([])

	const columns = [
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
			dataIndex: "idPhoto",
			key: "idPhoto",
			width: 50,
			align: "center",
			render: (text, record, index) => text,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ชื่อรูปภาพ"}</label>,
			dataIndex: "fileName",
			key: "fileName",
			sorter: (a, b) => {
				a = a.fileName || ""
				b = b.fileName || ""
				return a.localeCompare(b)
			},
			width: 150,
			// align: "center",
			ellipsis: true,
		},

		{
			title: () => <label style={{ fontWeight: "bold" }}>{"รูปภาพปก"}</label>,
			dataIndex: "local",
			key: "local",
			width: 100,
			render: (text, record) => (text ? <Image height={50} src={config.ImageHosting + text} preview={false} /> : ""),
		},
		{
			title: "",
			dataIndex: "delete",
			key: "delete",
			width: 50,
			align: "center",
			render: (text, record) => (
				<div style={{ cursor: "pointer" }} onClick={deletePhoto(record.idPhoto)}>
					<Tooltip title="ลบข้อมูล">
						<Delete />
					</Tooltip>
				</div>
			),
		},
		{
			title: "",
			dataIndex: "copy",
			key: "copy",
			width: 50,
			align: "center",
			render: (text, record) => (
				<div style={{ cursor: "pointer" }} onClick={copyPhoto(record)}>
					<Tooltip title="คัดลอกลิ้งรูป">
						<FileCopy />
					</Tooltip>
				</div>
			),
		},
	]

	useEffect(() => {
		console.log(router.query)
		console.log(router)
	}, [])

	const handleClickOpen = () => {
		// console.log(value)
		reloadDialog()
		setOpen(true)
	}

	const setAlert = (typeAlert, nameAlert) => {
		setAlerttype(typeAlert)
		setAlertname(nameAlert)
		setOpenAlert(true)
	}

	const beforeUpload = file => {
		if (file.type === "image/png" || file.type === "image/jpeg") {
			return true
		} else {
			setAlert("error", `${file.name} ไม่ใช่ไฟล์ png หรือ jpeg`)
			return Upload.LIST_IGNORE
		}
	}

	const normFile = e => {
		// console.log("Upload event:", e)

		if (Array.isArray(e)) {
			return e
		}

		return e && e.fileList
	}

	const onFinish = async val => {
		const cook = Cookies.get(config.master)
		const token = cook ? jwt_decode(cook).user : null
		const upload = val.upload ? (val.upload.length > 0 ? val.upload[0].originFileObj : null) : null
		let data = new FormData()
		data.append("FormFile", upload)
		setLoading(true)
		console.log({
			seo: val.seo,
			user: token,
			title: val.title,
			content: JSON.stringify(value),
		})
		await Http.post(config.api.addBlog, data, {
			params: {
				seo: val.seo,
				user: token,
				title: val.title,
				content: JSON.stringify(value),
			},
			headers: {
				"content-type": "multipart/form-data",
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
					setAlert("success", "เพิ่มข้อมูลเรียบร้อย !")
					closePage()
				} else {
					setAlert("error", check)
				}
			})
			.catch(e => {
				console.log(e)
				setAlert("error", "เกิดข้อผิดพลาดจาก server !")
			})
			.finally(async res => {
				setLoading(false)
			})
	}

	const onReset = () => {
		form.resetFields()
	}

	const onResetContent = () => {
		setValue(null)
	}

	const closePage = () => {
		router.push("/manager/article")
	}
	//Dialog Photo

	const onResetDialog = () => {
		console.log(formDialog)
		formDialog.resetFields()
	}

	const deleteData = async id => {
		setLoadingTable(true)
		await Http.delete(config.api.deletePhoto, {
			params: {
				id,
			},
		})
			.then(res => {
				// console.log(res)
				const data = res.data.message
				if (data === "success") {
					setAlert("success", "ลบข้อมูลเรียบร้อย !")
				} else {
					setAlert("error", data)
				}
			})
			.catch(e => {
				setAlert("error", "เกิดข้อผิดพลาดจาก server !")
			})
			.finally(() => {
				reloadDialog()
				setLoadingTable(false)
			})
	}

	const deletePhoto = id => () => {
		confirm({
			zIndex: 100000,
			mask: false,
			title: "ลบข้อมูล " + id + " ?",
			okText: "ตกลง",
			cancelText: "ยกเลิก",
			onOk() {
				deleteData(id)
			},
		})
	}

	const copyPhoto = link => () => {
		const txt = config.ImageHosting + link.local
		navigator.clipboard.writeText(txt).then(
			() => {
				console.log("Async: Copying to clipboard was successful!")
				setAlert("success", "คัดลอกแล้ว")
			},
			err => {
				console.error("Async: Could not copy text: ", err)
				setAlert("error", "ไม่สามารถคัดลอกได้ " + err)
			}
		)
	}

	const onFinishDialog = async value => {
		let data = new FormData()
		if (value.uploadmulti) {
			if (value.uploadmulti.length > 0) {
				value.uploadmulti.map(row => data.append("FormFileMulti", row.originFileObj))
			}
		}
		setLoadingTable(true)
		await Http.post(config.api.addPhoto, data, {
			headers: {
				"content-type": "multipart/form-data",
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
					setAlert("success", "เพิ่มข้อมูลเรียบร้อย !")
				} else {
					setAlert("error", check)
				}
				onResetDialog()
			})
			.catch(e => {
				console.log(e)
				setAlert("error", "เกิดข้อผิดพลาดจาก server !")
			})
			.finally(() => {
				reloadDialog()
				setLoadingTable(false)
			})
	}

	const handleClose = () => {
		setOpen(false)
		onResetDialog()
	}

	const reloadDialog = async () => {
		setLoadingTable(true)
		await Http.post(config.api.photo)
			.then(res => {
				const data = res.data.message
				if (data === "success") {
					const items = res.data.items
					// console.log(items)
					setData(items)
				}
			})
			.catch(e => {})
			.finally(() => {
				setLoadingTable(false)
			})
	}

	const DialogPhoto = () => {
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				// fullWidth
				fullScreen
			>
				<DialogTitle>
					{
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							<label style={{ fontSize: "1.25rem" }}>{`รูปภาพ `}</label>
							<div style={{ display: "flex", alignItems: "center" }}></div>
						</div>
					}
				</DialogTitle>
				<DialogContent>
					<Form {...layout} form={formDialog} name="control-hooks" onFinish={onFinishDialog}>
						<Form.Item
							name="uploadmulti"
							label="รูปภาพประกอบ"
							valuePropName="fileList"
							getValueFromEvent={normFile}
							extra="อัพโหลดได้ 10 รูป"
							rules={[
								{
									required: true,
									message: "กรุณาอัพโหลดภาพ",
								},
							]}
							style={{ overflow: "scroll", height: "300px" }}
						>
							<Upload name="logo" action={config.api.mock} maxCount={10} multiple listType="picture" beforeUpload={beforeUpload}>
								<Button>อัพโหลดภาพ</Button>
							</Upload>
						</Form.Item>
						<Form.Item>
							<Button style={{ marginRight: "5px" }} danger shape="round" onClick={onResetDialog}>
								ล้างค่า
							</Button>
							<Button type="primary" shape="round" htmlType="submit">
								บันทึก
							</Button>
						</Form.Item>
					</Form>
					<Grid container>
						<Grid item xs={12} style={{ marginTop: "5px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
							<label style={{ color: "gray" }}>{`รายการ ${data.length}`}</label>
						</Grid>
						<Grid item xs={12} style={{ marginTop: "10px" }}>
							<Table
								rowKey={"blogId"}
								loading={{
									spinning: LoadingTable,
									size: "large",
									tip: "กำลังโหลด...",
								}}
								dataSource={data}
								columns={columns}
								scroll={{ y: 200 }}
								size={"small"}
								bordered={true}
								tableLayout={"auto"}
								pagination={{
									defaultPageSize: 10,
									pageSizeOptions: ["5", "10", "25", "50", "100"],
									showSizeChanger: true,
									locale: { items_per_page: "/ หน้า" },
								}}
								locale={{ emptyText: "ไม่มีข้อมูล" }}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button danger type="primary" shape="round" onClick={handleClose}>
						ปิด
					</Button>
				</DialogActions>
			</Dialog>
		)
	}

	return (
		<React.Fragment>
			<Spin spinning={Loading}>
				<Maneger>
					<div style={{ padding: "24px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)", borderRadius: "4px" }}>
						<Form form={form} name="control-hooks" onFinish={onFinish}>
							<div style={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
								{/* <Button style={{ marginRight: '5px' }} type="ghost" shape="round" onClick={handleClickOpen}>
                                ทดสอบ
                            </Button> */}
								<Popconfirm
									placement="bottom"
									title="คุณต้องการล้างค่าใช่หรือไม่ ?"
									onConfirm={onResetContent}
									onCancel={onReset}
									okText="ล้างค่าเนื้อหา"
									cancelText="ล้างค่าข้อมูลเบื้องต้น"
								>
									<Button style={{ marginRight: "5px" }} danger shape="round">
										ล้างค่า
									</Button>
								</Popconfirm>
								<Button style={{ marginRight: "5px" }} type="dashed" shape="round" onClick={handleClickOpen}>
									รูปภาพ
								</Button>
								<Button style={{ marginRight: "5px" }} type="primary" shape="round" htmlType="submit" loading={Loading}>
									บันทึก
								</Button>
								<Popconfirm placement="bottomRight" title="คุณต้องการปิดหน้าใช่หรือไม่ ?" onConfirm={closePage} okText="ใช่" cancelText="ไม่">
									<Button type="danger" shape="round">
										ปิด
									</Button>
								</Popconfirm>
							</div>
							<label>ข้อมูลเบื้องต้น :</label>
							<div
								style={{
									marginTop: "10px",
									marginBottom: "10px",
									padding: "16px",
									boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
									borderRadius: "4px",
								}}
							>
								<Form.Item
									name="title"
									label="หัวข้อ"
									rules={[
										{
											required: true,
											message: "กรุณากรอกหัวข้อ",
										},
									]}
								>
									<TextArea maxLength={500} showCount={true} placeholder="กรุณากรอกหัวข้อ" autoComplete={"off"} />
								</Form.Item>
								<Form.Item
									name="seo"
									label="SEO"
									rules={[
										{
											required: true,
											message: "กรุณากรอก SEO",
										},
									]}
								>
									<TextArea placeholder="กรุณากรอก SEO" autoComplete={"off"} />
								</Form.Item>
								<Form.Item
									name="upload"
									rules={[
										{
											required: true,
											message: "กรุณาอัพโหลดภาพ",
										},
									]}
									label="รูปภาพปก"
									valuePropName="fileList"
									getValueFromEvent={normFile}
								>
									<Upload name="logo" action={config.api.mock} maxCount={1} listType="picture" beforeUpload={beforeUpload}>
										<Button>อัพโหลดภาพ</Button>
									</Upload>
								</Form.Item>
							</div>
							<label>เนื้อหา :</label>
							<div
								style={{
									marginTop: "10px",
									marginBottom: "10px",
									padding: "16px",
									boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
									borderRadius: "4px",
								}}
							>
								<Editor cellPlugins={cellPlugin} value={value} onChange={setValue} lang={"th"} readOnly={open} uiTranslator={uiTranslator} />
							</div>
						</Form>
					</div>
				</Maneger>
			</Spin>
			{DialogPhoto()}
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(!openAlert)}>
				<Alert onClose={() => setOpenAlert(!openAlert)} severity={Alerttype}>
					{Alertname}
				</Alert>
			</Snackbar>
		</React.Fragment>
	)
}
