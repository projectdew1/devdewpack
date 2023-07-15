import React, { useEffect, useState } from "react"
import Maneger from "../../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import action from "../../../redux/actions"
import config from "../../../setApi/Config"
import Http from "../../../setApi/http"

import moment from "moment"
import momentz from "moment-timezone"

import { Visibility, MoreVert, Delete, Edit, FileCopy, AddCircleOutlineOutlined } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"
import {
	Grid,
	Badge,
	Tooltip,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	FormControlLabel,
	Checkbox,
	InputLabel,
	OutlinedInput,
	Snackbar,
} from "@material-ui/core"
import { Table, Button, Menu, Dropdown, Popconfirm, Upload, Input, Image, Form } from "antd"

import alasql from "alasql"

const { Search } = Input

const Article = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const [data, setData] = useState([])
	const [dataFilt, setDataFilt] = useState([])

	const [LoadingTable, setLoadingTable] = useState(false)

	//Alert
	const [Alertname, setAlertname] = useState("")
	const [Alerttype, setAlerttype] = useState("error")
	const [openAlert, setOpenAlert] = useState(false)

	const columns = [
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
			dataIndex: "blogId",
			key: "blogId",
			width: 50,
			align: "center",
			render: (text, record, index) => text,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"หัวข้อ"}</label>,
			dataIndex: "title",
			key: "title",
			sorter: (a, b) => {
				a = a.title || ""
				b = b.title || ""
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
			render: (text, record) => (text ? <Image src={config.ImageHosting + text} preview={false} /> : ""),
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"SEO"}</label>,
			dataIndex: "blogSeo",
			key: "blogSeo",
			sorter: (a, b) => {
				a = a.blogSeo || ""
				b = b.blogSeo || ""
				return a.localeCompare(b)
			},
			width: 200,
			// align: "center",
			ellipsis: true,
		},
		{
			title: () => <label style={{ fontWeight: "bold" }}>{"วันที่บันทึก"}</label>,
			dataIndex: "createDate",
			key: "createDate",
			width: 120,
			align: "center",
			sorter: (a, b) => moment(a.createDate).unix() - moment(b.createDate).unix(),
			render: (text, record) => (text ? momentz.utc(text).tz("Asia/Bangkok").format("DD/MM/YY HH:mm") : ""),
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
			render: (text, record) => (text ? momentz.utc(text).tz("Asia/Bangkok").format("DD/MM/YY HH:mm") : ""),
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
							{/* <Menu.Item key="1" onClick={() => handleClickView(record)}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Visibility />
                                    <label style={{ cursor: "pointer" }}>{` มุมมอง`}</label>
                                </div>
                            </Menu.Item> */}
							<Menu.Divider />
							<Menu.Item key="2" disabled={record.status === 0}>
								<Popconfirm disabled={record.status === 0} title={`ลบข้อมูล ${record.blogId}`} okText="ตกลง" cancelText="ยกเลิก" onConfirm={() => deleteBlog(record.blogId)}>
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

	useEffect(() => {
		dispatch(action.setAdmin("บทความ"))
		reload()
	}, [])

	const reload = async () => {
		setLoadingTable(true)
		await Http.post(config.api.contentBlog)
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

	const handleClickEdit = row => {
		// console.log(row)
		// dispatch(action.setId(`${row.enID}`))
		router.push(`/manager/article/edit/${row.enID}`)
		// router.push({ pathname: "/manager/article/edit/[name]", query: { name: row.enID } })
	}

	const deleteBlog = async id => {
		setLoadingTable(true)
		await Http.delete(config.api.deleteBlog, {
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

	const onSearch = values => {
		const filter = alasql(`select * from ? where title like '%${values}%'`, [dataFilt])
		// console.log(values)
		// const filter = []
		setData(filter)
	}

	const handleClickOpen = () => {
		router.push("/manager/article/create")
	}

	return (
		<React.Fragment>
			<Maneger>
				<Grid container>
					<Grid item xs={5} style={{ marginTop: "5px" }}>
						<Search placeholder="ค้นหาหัวข้อบทความ" allowClear onSearch={onSearch} />
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
							rowKey={"blogId"}
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
			</Maneger>
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(!openAlert)}>
				<Alert onClose={() => setOpenAlert(!openAlert)} severity={Alerttype}>
					{Alertname}
				</Alert>
			</Snackbar>
		</React.Fragment>
	)
}

export default Article
