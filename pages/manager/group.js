import React, { useEffect, useState } from "react"
import Maneger from "../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import action from "../../redux/actions"
import config from "../../setApi/Config"
import Http from "../../setApi/http"

import { Grid, Badge, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox, Alert, Snackbar } from "@material-ui/core"
import { Visibility, MoreVert, Delete, Edit } from "@material-ui/icons"

import { Table, Button, Menu, Dropdown, Popconfirm, Select, Input, Form, Upload, Image } from "antd"

import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"
import alasql from "alasql"
import moment from "moment"

const { Search, TextArea } = Input

const { Option } = Select

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
}

export default function group() {
	const [form] = Form.useForm()
	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)
	const [isSave, setIsSave] = useState(false)
	const [isView, setIsView] = useState(false)
	const [Loading, setLoading] = useState(false)
	const [LoadingTable, setLoadingTable] = useState(false)
	const [selectLoading, setSelectLoading] = useState(false)
	const [data, setData] = useState([])
	const [dataFilt, setDataFilt] = useState([])
	const [selector, setSelector] = useState([])
	const [Title, setTitle] = useState("")
	//Alert
	const [Alertname, setAlertname] = useState("")
	const [Alerttype, setAlerttype] = useState("error")
	const [openAlert, setOpenAlert] = useState(false)

	const columns = [
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
			dataIndex: "typeId",
			key: "typeId",
			width: 50,
			align: "center",
			render: (text, record, index) => text,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ประเภทผลิตภัณฑ์"}</label>,
			dataIndex: "category",
			key: "category",
			sorter: (a, b) => {
				a = a.category || ""
				b = b.category || ""
				return a.localeCompare(b)
			},
			width: 100,
			ellipsis: true,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"หมวดหมู่ผลิตภัณฑ์"}</label>,
			dataIndex: "typeName",
			key: "typeName",
			sorter: (a, b) => {
				a = a.typeName || ""
				b = b.typeName || ""
				return a.localeCompare(b)
			},
			width: 120,
			ellipsis: true,
		},

		{
			title: () => <label style={{ fontWeight: "bold" }}>{"SEO"}</label>,
			dataIndex: "typeSeo",
			key: "typeSeo",
			sorter: (a, b) => {
				a = a.typeSeo || ""
				b = b.typeSeo || ""
				return a.localeCompare(b)
			},
			width: 100,
			ellipsis: true,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"รูปภาพปก"}</label>,
			dataIndex: "localImage",
			key: "localImage",
			width: 100,
			render: (text, record) => (text ? <Image src={config.hosting + text} preview={false} /> : ""),
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
			title: () => <label style={{ fontWeight: "bold" }}>{"ผู้บันทึก"}</label>,
			dataIndex: "createUser",
			key: "createUser",
			sorter: (a, b) => {
				a = a.createUser || ""
				b = b.createUser || ""
				return a.localeCompare(b)
			},
			width: 100,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"วันที่แก้ไข"}</label>,
			dataIndex: "editDate",
			key: "editDate",
			width: 120,
			align: "center",
			sorter: (a, b) => moment(a.editDate).unix() - moment(b.editDate).unix(),
			render: (text, record) => (text ? moment(text).format("DD/MM/YY HH:mm") : ""),
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ผู้แก้ไข"}</label>,
			dataIndex: "editUser",
			key: "editUser",
			sorter: (a, b) => {
				a = a.editUser || ""
				b = b.editUser || ""
				return a.localeCompare(b)
			},
			width: 100,
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
							<Menu.Item key="0" onClick={() => handleClickEdit(record)}>
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<Edit />
									<label style={{ cursor: "pointer" }}>{` แก้ไข`}</label>
								</div>
							</Menu.Item>
							<Menu.Item key="1" onClick={() => handleClickView(record)}>
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<Visibility />
									<label style={{ cursor: "pointer" }}>{` มุมมอง`}</label>
								</div>
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item key="2">
								<Popconfirm title={`ลบข้อมูล ${record.typeId}`} okText="ตกลง" cancelText="ยกเลิก" onConfirm={() => deleteGroup(record.typeId)}>
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

	const deleteGroup = async id => {
		setLoadingTable(true)
		await Http.delete(config.api.deletetype, {
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
				reload()
				setLoadingTable(false)
			})
	}

	const handleClickEdit = async row => {
		await selectCategory()
		await find(row.typeId)
		setTitle(row.typeId)
		setOpen(true)
		setIsSave(false)
		setIsView(false)
	}

	const handleClickView = async row => {
		await selectCategory()
		await find(row.typeId)
		setTitle(row.typeId)
		setOpen(true)
		setIsSave(false)
		setIsView(true)
	}

	const dataSelector = () => {
		const data = selector.map((r, i) => {
			return (
				<Option key={i} value={r.categoryId}>
					{r.categoryName}
				</Option>
			)
		})
		return data
	}

	const selectCategory = async () => {
		setSelectLoading(true)
		await Http.post(config.api.category)
			.then(res => {
				const data = res.data.message
				if (data === "success") {
					const items = res.data.items
					setSelector(items)
				}
			})
			.catch(e => {})
			.finally(() => {
				setSelectLoading(false)
			})
	}

	const reload = async () => {
		setLoadingTable(true)
		await Http.post(config.api.type)
			.then(res => {
				const data = res.data.message
				if (data === "success") {
					const items = res.data.items
					// console.log(items)
					setData(items)
					setDataFilt(items)
				}
			})
			.catch(e => {})
			.finally(() => {
				setLoadingTable(false)
			})
	}

	const setAlert = (typeAlert, nameAlert) => {
		setAlerttype(typeAlert)
		setAlertname(nameAlert)
		setOpenAlert(true)
	}

	const handleClickOpen = () => {
		setOpen(true)
		setIsSave(true)
		setIsView(false)
		selectCategory()
	}

	const handleClose = () => {
		setOpen(false)
		onReset()
	}

	const onSearch = value => {
		const filter = alasql(`select * from ? where typeName like '%${value}%'`, [dataFilt])
		setData(filter)
	}

	const onFinish = values => {
		// console.log(values)
		if (isSave) {
			addGroup(values)
		} else {
			update(values)
		}
	}

	const addGroup = async value => {
		const cook = Cookies.get(config.master)
		const token = cook ? jwt_decode(cook).user : null
		const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null
		let data = new FormData()
		data.append("FormFile", upload)

		setLoadingTable(true)
		setLoading(true)
		await Http.post(config.api.addtype, data, {
			params: {
				user: token,
				seo: value.seo,
				typeName: value.group,
				categoryID: value.category,
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
					setAlert("success", "บันทึกข้อมูลเรียบร้อย !")
				} else {
					setAlert("error", check)
				}
			})
			.catch(e => {
				console.log(e)
				setAlert("error", "เกิดข้อผิดพลาดจาก server !")
			})
			.finally(async res => {
				await reload()
				setLoadingTable(false)
				setLoading(false)
				handleClose()
			})
	}

	const onReset = () => {
		form.resetFields()
		setIsView(false)
	}

	const find = async id => {
		await Http.post(config.api.idtype, null, {
			params: {
				id,
			},
		})
			.then(res => {
				const data = res.data.message
				if (data === "success") {
					const items = res.data.items
					console.log(items)
					form.setFieldsValue({
						seo: items.typeSeo,
						category: items.categoryId,
						group: items.typeName,
					})
					if (items.fileImage !== null) {
						let fileData = null
						let url = config.hosting + items.localImage
						toDataURL(url).then(dataUrl => {
							// console.log("Here is Base64 Url", dataUrl)
							fileData = dataURLtoFile(dataUrl, items.fileImage)
							// console.log("Here is JavaScript File Object", fileData)
							form.setFieldsValue({
								upload: [{ name: items.fileImage, originFileObj: fileData }],
							})
						})
					}
				}
			})
			.catch(e => {})
			.finally(() => {})
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

	const toDataURL = url =>
		fetch(url)
			.then(response => response.blob())
			.then(
				blob =>
					new Promise((resolve, reject) => {
						const reader = new FileReader()
						reader.onloadend = () => resolve(reader.result)
						reader.onerror = reject
						reader.readAsDataURL(blob)
					})
			)

	const dataURLtoFile = (dataurl, filename) => {
		var arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new File([u8arr], filename, { type: mime })
	}

	const update = async value => {
		const cook = Cookies.get(config.master)
		const token = cook ? jwt_decode(cook).user : null
		const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null
		let data = new FormData()
		data.append("FormFile", upload)

		setLoadingTable(true)
		setLoading(true)
		await Http.put(config.api.updatetype, data, {
			params: {
				id: Title,
				user: token,
				seo: value.seo,
				typeName: value.group,
				categoryID: value.category,
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
					setAlert("success", "แก้ไขข้อมูลเรียบร้อย !")
				} else {
					setAlert("error", check)
				}
			})
			.catch(e => {
				console.log(e)
				setAlert("error", "เกิดข้อผิดพลาดจาก server !")
			})
			.finally(async () => {
				await reload()
				setLoadingTable(false)
				setLoading(false)
				handleClose()
			})
	}

	useEffect(() => {
		dispatch(action.setAdmin("หมวดหมู่"))
		reload()
	}, [])

	return (
		<React.Fragment>
			<Maneger>
				<Grid container>
					<Grid item xs={5} style={{ marginTop: "5px" }}>
						<Search placeholder="ค้นหาหมวดหมู่ผลิตภัณฑ์" allowClear onSearch={onSearch} />
					</Grid>
					<Grid item xs={3} style={{ marginTop: "5px", marginLeft: "20px" }}>
						<Button type="primary" shape="round" onClick={handleClickOpen}>
							เพิ่ม
						</Button>
					</Grid>
					<Grid item xs={3} style={{ marginTop: "5px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
						<label style={{ color: "gray" }}>{`รายการ ${data.length}`}</label>
					</Grid>
					<Grid item xs={12} style={{ marginTop: "10px" }}>
						<Table
							rowKey={"typeId"}
							loading={{
								spinning: LoadingTable,
								size: "large",
								tip: "กำลังโหลด...",
							}}
							dataSource={data}
							columns={columns}
							scroll={{ x: 400 }}
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
					</Grid>
				</Grid>
				<Dialog
					open={open}
					onClose={handleClose}
					fullWidth={true}
					maxWidth={"md"}
					// fullScreen
				>
					<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
						<DialogTitle>
							{
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<label style={{ fontSize: "1.25rem" }}>{`หมวดหมู่ ${Title}`}</label>
									<div style={{ display: "flex", alignItems: "center" }}></div>
								</div>
							}
						</DialogTitle>
						<DialogContent>
							<Grid container>
								<Grid item xs={10}>
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
										<Input disabled={isView} placeholder="กรุณากรอก SEO" autoComplete={"off"} />
									</Form.Item>
									<Form.Item
										name="category"
										label="ประเภทผลิตภัณฑ์"
										rules={[
											{
												required: true,
												message: "กรุณาเลือกประเภท",
											},
										]}
									>
										<Select
											disabled={isView}
											dropdownStyle={{ zIndex: 2000 }}
											placeholder="กรุณาเลือกประเภท"
											loading={selectLoading}
											allowClear
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
											filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
										>
											{dataSelector()}
										</Select>
									</Form.Item>
									<Form.Item
										name="group"
										label="ชื่อหมวดหมู่"
										rules={[
											{
												required: true,
												message: "กรุณากรอกหมวดหมู่",
											},
										]}
									>
										<Input disabled={isView} placeholder="กรุณากรอกหมวดหมู่" autoComplete={"off"} />
									</Form.Item>
									{/* <Form.Item
										name="detail"
										label="รายละเอียด"
										rules={[
											{
												required: true,
												message: "กรุณากรอกรายละเอียด",
											},
										]}
									>
										<TextArea rows={4} autoSize={false} maxLength={400} showCount={true} autoComplete={"off"} />
									</Form.Item> */}

									<Form.Item name="upload" label="รูปภาพปก" valuePropName="fileList" getValueFromEvent={normFile}>
										<Upload name="logo" action={config.api.mock} maxCount={1} listType="picture" beforeUpload={beforeUpload}>
											<Button disabled={isView}>อัพโหลดภาพ</Button>
										</Upload>
									</Form.Item>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							{isView ? null : (
								<Button type="primary" shape="round" htmlType="submit" loading={Loading}>
									{isSave ? "บันทึก" : "แก้ไข"}
								</Button>
							)}
							<Button danger type="primary" shape="round" onClick={handleClose}>
								ปิด
							</Button>
						</DialogActions>
					</Form>
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
