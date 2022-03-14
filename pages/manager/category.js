import React, { useEffect, useState } from "react"
import Maneger from "../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import action from "../../redux/actions"
import config from "../../setApi/Config"
import Http from "../../setApi/http"
import moment from "moment"
import momentz from "moment-timezone"

import { Grid, Badge, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox, InputLabel, OutlinedInput, Snackbar } from "@material-ui/core"
import { Edit, MoreVert, Delete, TrendingUpTwoTone, Visibility } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"

import { Table, Button, Menu, Dropdown, Popconfirm, Upload, Input, Image, Form } from "antd"

import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"
import alasql from "alasql"
import axios from "axios"

const { Search } = Input

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

export default function Category() {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [LoadingTable, setLoadingTable] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [dataFilt, setDataFilt] = useState([])
    const [categoryTitle, setCategoryTitle] = useState("")
    const [Alertname, setAlertname] = useState("")
    const [Alerttype, setAlerttype] = useState("error")
    const [isSave, setisSave] = useState(true)
    const [isView, setisView] = useState(false)

    const columns = [
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
            dataIndex: "categoryId",
            key: "categoryId",
            width: 50,
            align: "center",
            render: (text, record, index) => text,
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"ประเภทผลิตภัณฑ์"}</label>,
            dataIndex: "categoryName",
            key: "categoryName",
            sorter: (a, b) => {
                a = a.categoryName || ""
                b = b.categoryName || ""
                return a.localeCompare(b)
            },
            width: 150,
            // align: "center",
            // ellipsis: true,
        },

        {
            title: () => <label style={{ fontWeight: "bold" }}>{"รูปภาพปก"}</label>,
            dataIndex: "localImage",
            key: "localImage",
            width: 100,
            render: (text, record) => (text ? <Image src={config.hosting + text} preview={false} /> : ""),
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"SEO"}</label>,
            dataIndex: "seo",
            key: "seo",
            sorter: (a, b) => {
                a = a.seo || ""
                b = b.seo || ""
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
                            <Menu.Item key="1" onClick={() => handleClickView(record)}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Visibility />
                                    <label style={{ cursor: "pointer" }}>{` มุมมอง`}</label>
                                </div>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="2" disabled={record.status === 0}>
                                <Popconfirm disabled={record.status === 0} title={`ลบข้อมูล ${record.categoryId}`} okText="ตกลง" cancelText="ยกเลิก" onConfirm={() => deleteCategory(record.categoryId)}>
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

    const handleExit = () => {
        setCategoryTitle("")
        form.resetFields()
    }

    const handleClickEdit = async row => {
        await find(row.categoryId)
        setCategoryTitle(row.categoryId)
        setOpen(true)
        setisSave(false)
        setisView(false)
    }

    const handleClickView = async row => {
        await find(row.categoryId)
        setCategoryTitle(row.categoryId)
        setOpen(true)
        setisSave(false)
        setisView(true)
    }

    const handleClickOpen = () => {
        setOpen(true)
        setisSave(true)
        setisView(false)
    }

    const handleClose = () => {
        setOpen(false)
        setisView(false)
        handleExit()
    }

    const beforeUpload = file => {
        if (file.type === "image/png" || file.type === "image/jpeg") {
            return true
        } else {
            setAlert("error", `${file.name} ไม่ใช่ไฟล์ png หรือ jpeg`)
            return Upload.LIST_IGNORE
        }
    }

    const find = async id => {
        await Http.post(config.api.idcategory, null, {
            params: {
                id,
            },
        })
            .then(async res => {
                const data = res.data.message
                if (data === "success") {
                    const items = res.data.items
                    form.setFieldsValue({
                        category: items.categoryName,
                        seo: items.seo == null ? "" : items.seo,
                    })
                    if (items.fileImage !== null) {
                        let fileData = null
                        let url = config.hosting + items.localImage

                        await Http.get(config.api.base64, {
                            params: {
                                url
                            }
                        }).then(res => {
                            fileData = dataURLtoFile(res.data.base64, items.fileImage)
                            // console.log("Here is JavaScript File Object", fileData)
                            form.setFieldsValue({
                                upload: [{ name: items.fileImage, originFileObj: fileData }],
                            })
                        })

                        // toDataURL(url).then(dataUrl => {
                        //     console.log("Here is Base64 Url", dataUrl)
                        //     fileData = dataURLtoFile(dataUrl, items.fileImage)
                        //     // console.log("Here is JavaScript File Object", fileData)
                        //     form.setFieldsValue({
                        //         upload: [{ name: items.fileImage, originFileObj: fileData }],
                        //     })
                        // })
                    }
                }
            })
            .catch(e => { })
            .finally(() => { })
    }

    const reload = async () => {
        setLoadingTable(true)
        await Http.post(config.api.category)
            .then(res => {
                const data = res.data.message
                if (data === "success") {
                    const items = res.data.items
                    // console.log(items)
                    setData(items)
                    setDataFilt(items)
                }
            })
            .catch(e => { })
            .finally(() => {
                setLoadingTable(false)
            })
    }

    const deleteCategory = async id => {
        setLoadingTable(true)
        await Http.delete(config.api.deletecategory, {
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

    const addCategory = async value => {
        const cook = Cookies.get(config.master)
        const token = cook ? jwt_decode(cook).user : null
        const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null
        let data = new FormData()
        data.append("FormFile", upload)

        setLoadingTable(true)
        setLoading(true)
        await Http.post(config.api.addcategory, data, {
            params: {
                user: token,
                categoryName: value.category,
                seo: value.seo,
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
                setAlert("error", "เกิดข้อผิดพลาดจาก server !")
            })
            .finally(async res => {
                await reload()
                setLoadingTable(false)
                setLoading(false)
                handleClose()
            })
    }

    const update = async value => {
        const cook = Cookies.get(config.master)
        const token = cook ? jwt_decode(cook).user : null
        const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null
        let data = new FormData()
        data.append("FormFile", upload)

        setLoadingTable(true)
        setLoading(true)
        await Http.put(config.api.updatecategory, data, {
            params: {
                user: token,
                categoryName: value.category,
                id: categoryTitle,
                seo: value.seo,
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

    const onSearch = value => {
        const filter = alasql(`select * from ? where categoryName like '%${value}%'`, [dataFilt])
        setData(filter)
    }

    const toDataURL = async url =>
        await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
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

    const onFinish = async values => {
        // console.log(values)


        if (isSave) {
            addCategory(values)
        } else {
            update(values)
        }
    }

    const normFile = e => {
        // console.log("Upload event:", e)

        if (Array.isArray(e)) {
            return e
        }

        return e && e.fileList
    }

    useEffect(() => {
        dispatch(action.setAdmin("ประเภท"))
        reload()
    }, [])

    return (
        <React.Fragment>
            <Maneger>
                <Grid container>
                    <Grid item xs={5} style={{ marginTop: "5px" }}>
                        <Search placeholder="ค้นหาประเภทผลิตภัณฑ์" allowClear onSearch={onSearch} />
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
                            rowKey={"categoryId"}
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
                <Dialog open={open} fullWidth={true} maxWidth={"md"}>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <DialogTitle id="alert-dialog-title">
                            {
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <label style={{ fontSize: "1.25rem" }}>{`ประเภทผลิตภัณฑ์ ${categoryTitle}`}</label>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {/* <Button danger type="primary" shape="round" onClick={handleClose}>
										ปิด
									</Button> */}
                                    </div>
                                </div>
                            }
                        </DialogTitle>
                        <DialogContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Form.Item
                                        name="category"
                                        label="ชื่อประเภท"
                                        rules={[
                                            {
                                                required: true,
                                                message: "กรุณากรอกชื่อประเภท",
                                            },
                                        ]}
                                    >
                                        <Input disabled={isView} placeholder="กรุณากรอกชื่อประเภท" autoComplete={"off"} />
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
                                        <Input disabled={isView} placeholder="กรุณากรอก SEO" autoComplete={"off"} />
                                    </Form.Item>
                                    <Form.Item name="upload" label="รูปภาพปก" valuePropName="fileList" getValueFromEvent={normFile}>
                                        <Upload name="logo" action={config.api.mock} maxCount={1} listType="picture" beforeUpload={beforeUpload} onRemove={false}>
                                            <Button disabled={isView}>อัพโหลดภาพ</Button>
                                        </Upload>
                                    </Form.Item>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            {isView ? null : (
                                <Button type="primary" shape="round" loading={Loading} htmlType={"submit"}>
                                    {isSave ? "บันทึก" : "แก้ไข"}
                                </Button>
                            )}
                            <Button danger type="primary" shape="round" disabled={Loading} onClick={handleClose}>
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
