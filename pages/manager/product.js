import React, { useEffect, useState } from "react"
import Maneger from "../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import action from "../../redux/actions"
import config from "../../setApi/Config"
import Http from "../../setApi/http"

import { Grid, Badge, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox, Snackbar } from "@material-ui/core"
import { Visibility, MoreVert, Delete, Edit, FileCopy, AddCircleOutlineOutlined } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"

import { Table, Button, Menu, Dropdown, Popconfirm, Select, Input, Form, Upload, Image, Radio, InputNumber } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"

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

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
}
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
}

export default function Product() {
    const [form] = Form.useForm()
    const [formTech] = Form.useForm()

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [opent, setOpent] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isSave, setIsSave] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isView, setIsView] = useState(false)
    const [isPrice, setIsPrice] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [LoadingTable, setLoadingTable] = useState(false)
    const [selectLoading, setSelectLoading] = useState(false)
    const [LoadingTableTech, setLoadingTableTech] = useState(false)
    const [data, setData] = useState([])
    const [datat, setDatat] = useState([])
    const [dataFilt, setDataFilt] = useState([])
    const [selector, setSelector] = useState([])
    const [dataFiltTech, setDataFiltTech] = useState([])
    const [Title, setTitle] = useState("")
    const [Techid, setTechid] = useState("")
    //Alert
    const [Alertname, setAlertname] = useState("")
    const [Alerttype, setAlerttype] = useState("error")
    const [openAlert, setOpenAlert] = useState(false)

    const columns = [
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
            dataIndex: "machineId",
            key: "machineId",
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
            width: 100,
            ellipsis: true,
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"ชื่อสินค้าผลิตภัณฑ์"}</label>,
            dataIndex: "machineName",
            key: "machineName",
            sorter: (a, b) => {
                a = a.machineName || ""
                b = b.machineName || ""
                return a.localeCompare(b)
            },
            width: 100,
            ellipsis: true,
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"รหัสสินค้า"}</label>,
            dataIndex: "itemsCode",
            key: "itemsCode",
            sorter: (a, b) => {
                a = a.itemsCode || ""
                b = b.itemsCode || ""
                return a.localeCompare(b)
            },
            width: 120,
            ellipsis: true,
        },

        {
            title: () => <label style={{ fontWeight: "bold" }}>{"SEO"}</label>,
            dataIndex: "machineSeo",
            key: "machineSeo",
            sorter: (a, b) => {
                a = a.machineSeo || ""
                b = b.machineSeo || ""
                return a.localeCompare(b)
            },
            width: 100,
            ellipsis: true,
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"Sold out"}</label>,
            dataIndex: "soldout",
            key: "soldout",
            width: 100,
            ellipsis: true,
            render: (text, record) => {
                return {
                    props: {
                        style: {
                            background: text == 1 ? "#ff7a7a" : null,
                            color: text == 1 ? "#FFFFFF" : "#000000",
                        },
                    },
                    children: text === 1 ? "ของหมด" : "มีของ",
                }
            },
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"ราคา"}</label>,
            dataIndex: "price",
            key: "price",
            width: 100,
            ellipsis: true,
            render: (text, record) => {
                return {
                    props: {
                        style: {
                            background: record.soldout == 1 ? "#ff7a7a" : null,
                            color: record.soldout == 1 ? "#FFFFFF" : "#000000",
                        },
                    },
                    children: text,
                }
            },
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"ลดราคาเหลือ"}</label>,
            dataIndex: "discount",
            key: "discount",
            width: 100,
            ellipsis: true,
            render: (text, record) => {
                return {
                    props: {
                        style: {
                            background: record.soldout == 1 ? "#ff7a7a" : null,
                            color: record.soldout == 1 ? "#FFFFFF" : "#000000",
                        },
                    },
                    children: text,
                }
            },
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
            fixed: "right",
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
                            <Menu.Item key="3" onClick={() => handleClickCopy(record)}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <FileCopy />
                                    <label style={{ cursor: "pointer" }}>{`คัดลอก`}</label>
                                </div>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="2">
                                <Popconfirm title={`ลบข้อมูล ${record.machineId}`} okText="ตกลง" cancelText="ยกเลิก" onConfirm={() => deleteProduct(record.machineId)}>
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

    const columnsTech = [
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
            dataIndex: "technicallyId",
            key: "technicallyId",
            width: 50,
            align: "center",
            render: (text, record, index) => text,
        },
        {
            title: () => <label style={{ fontWeight: "bold" }}>{"คุณสมบัติทางเทคนิค"}</label>,
            dataIndex: "technicallyName",
            key: "technicallyName",
            sorter: (a, b) => {
                a = a.technicallyName || ""
                b = b.technicallyName || ""
                return a.localeCompare(b)
            },
            width: 100,
            ellipsis: true,
        },

        {
            title: "",
            dataIndex: "menu",
            key: "menu",
            width: 50,
            align: "center",
            render: (text, record) => (
                <div>
                    <Button type="primary" shape="round" onClick={() => handleEditTech(record)}>
                        แก้ไข
                    </Button>
                    <Button danger type="primary" shape="round" onClick={() => deleteTechnical(record.technicallyId)}>
                        ลบ
                    </Button>
                </div>
            ),
        },
    ]

    const deleteProduct = async id => {
        setLoadingTable(true)
        await Http.delete(config.api.deletemachine, {
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

    const updateProduct = async value => {
        const cook = Cookies.get(config.master)
        const token = cook ? jwt_decode(cook).user : null
        const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null

        const number = value.price ? value.number : null
        const discount = value.price ? value.discount : null
        const video = value.video ? (value.video.length > 0 ? value.video.toString() : null) : null
        const manual = value.manual ? (value.manual.length > 0 ? value.manual.toString() : null) : null
        const detail = value.detail ? (value.detail.length > 0 ? value.detail.toString() : null) : null
        const technical = value.technical ? (value.technical.length > 0 ? ConvertJSontoBackend(value.technical) : null) : null
        let data = new FormData()
        data.append("FormFile", upload)
        if (value.uploadmulti) {
            if (value.uploadmulti.length > 0) {
                value.uploadmulti.map(row => data.append("FormFileMulti", row.originFileObj))
            }
        }

        setLoadingTable(true)
        setLoading(true)
        await Http.post(config.api.updatemachine, data, {
            params: {
                id: Title,
                seo: value.seo,
                typeID: value.group,
                machineName: value.product,
                machineModels: value.model,
                price: number,
                discount: discount,
                soldout: value.soldout,
                user: token,
                explain: value.explain,
                detail: detail,
                manual: manual,
                videos: video,
                technical: technical,
            },
            headers: {
                "content-type": "multipart/form-data",
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
            .finally(async res => {
                await reload()
                setLoadingTable(false)
                setLoading(false)
                handleClose()
            })
    }

    const handleClickEdit = async row => {
        await selectGroup()
        await reloadTech()
        await find(row.machineId, false)
        setTitle(row.machineId)
        setOpen(true)
        setIsSave(false)
        setIsView(false)
    }

    const handleClickView = async row => {
        await selectGroup()
        await reloadTech()
        await find(row.machineId, false)
        setTitle(row.machineId)
        setOpen(true)
        setIsSave(false)
        setIsView(true)
    }

    const handleClickCopy = async row => {
        await selectGroup()
        await reloadTech()
        await find(row.machineId, true)
        setOpen(true)
        setIsSave(true)
        setIsView(false)
    }

    const dataSelector = () => {
        const data = selector.map((r, i) => {
            return (
                <Option key={i} value={r.typeId}>
                    {r.typeName}
                </Option>
            )
        })
        return data
    }

    const dataTechSelector = () => {
        const data = datat.map((r, i) => {
            return (
                <Option key={i} value={r.technicallyId}>
                    {r.technicallyName}
                </Option>
            )
        })
        return data
    }

    const selectGroup = async () => {
        setSelectLoading(true)
        await Http.post(config.api.type)
            .then(res => {
                const data = res.data.message
                if (data === "success") {
                    const items = res.data.items
                    setSelector(items)
                }
            })
            .catch(e => { })
            .finally(() => {
                setSelectLoading(false)
            })
    }

    const reload = async () => {
        setLoadingTable(true)
        await Http.post(config.api.machine)
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

    const setAlert = (typeAlert, nameAlert) => {
        setAlerttype(typeAlert)
        setAlertname(nameAlert)
        setOpenAlert(true)
    }

    const reloadTech = async () => {
        setLoadingTableTech(true)
        await Http.post(config.api.technical)
            .then(res => {
                const data = res.data.message
                if (data === "success") {
                    const items = res.data.items
                    // console.log(items)
                    setDatat(items)
                    setDataFiltTech(items)
                }
            })
            .catch(e => { })
            .finally(() => {
                setLoadingTableTech(false)
            })
    }

    const handleClickOpen = () => {
        setOpen(true)
        setIsSave(true)
        setIsView(false)
        selectGroup()
        reloadTech()
    }

    const handleClickOpenTech = () => {
        setOpent(true)
        reloadTech()
    }

    const handleClose = () => {
        setOpen(false)
        onReset()
    }

    const onSearch = value => {
        const filter = alasql(`select * from ? where machineName like '%${value}%'`, [dataFilt])
        setData(filter)
    }

    const onSearchTech = value => {
        const filter = alasql(`select * from ? where technicallyName like '%${value}%'`, [dataFiltTech])
        setDatat(filter)
    }

    const onFinish = values => {
        if (isSave) {
            addProduct(values)
        } else {
            updateProduct(values)
        }
    }

    const onFinishTech = values => {
        if (isEdit) {
            editTechnical(values)
        } else {
            addTechnical(values)
        }
    }

    const handleCloseTech = () => {
        setOpent(false)
        setIsAdd(false)
        setIsEdit(false)
        onResetTech()
    }

    const handleEditTech = value => {
        setIsEdit(true)
        setIsAdd(true)
        setTechid(value.technicallyId)
        formTech.setFieldsValue({
            name: value.technicallyName,
        })
    }

    const onResetTech = () => {
        formTech.resetFields()
    }

    const addProduct = async value => {
        const cook = Cookies.get(config.master)
        const token = cook ? jwt_decode(cook).user : null
        const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null
        const uploadMulti = () => {
            if (value.uploadmulti) {
                if (value.uploadmulti.length > 0) {
                    value.uploadmulti.map(row => data.push(row.originFileObj))
                    return data
                } else {
                    return null
                }
            } else {
                return null
            }
        }
        // console.log(uploadMulti())
        const number = value.price ? value.number : null
        const discount = value.price ? value.discount : null
        const video = value.video ? (value.video.length > 0 ? value.video.toString() : null) : null
        const manual = value.manual ? (value.manual.length > 0 ? value.manual.toString() : null) : null
        const detail = value.detail ? (value.detail.length > 0 ? value.detail.toString() : null) : null
        const technical = value.technical ? (value.technical.length > 0 ? ConvertJSontoBackend(value.technical) : null) : null
        let data = new FormData()
        data.append("FormFile", upload)
        if (value.uploadmulti) {
            if (value.uploadmulti.length > 0) {
                value.uploadmulti.map(row => data.append("FormFileMulti", row.originFileObj))
            }
        }
        // data.append("FormFileMulti", uploadMulti())
        setLoadingTable(true)
        setLoading(true)
        await Http.post(config.api.addmachine, data, {
            params: {
                seo: value.seo,
                typeID: value.group,
                machineName: value.product,
                machineModels: value.model,
                price: number,
                discount: discount,
                soldout: value.soldout,
                user: token,
                explain: value.explain,
                detail: detail,
                manual: manual,
                videos: video,
                technical: technical,
            },
            headers: {
                "content-type": "multipart/form-data",
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
        setIsPrice(false)
        setTitle("")
    }

    const addTechnical = async ({ name }) => {
        setLoading(true)
        setLoadingTableTech(true)
        await Http.post(config.api.addtechnical, null, {
            params: {
                name,
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
                onResetTech()
                reloadTech()
                setLoading(false)
                setLoadingTableTech(false)
            })
    }

    const editTechnical = async ({ name }) => {
        setLoading(true)
        setLoadingTableTech(true)
        await Http.put(config.api.updatetechnical, null, {
            params: {
                id: Techid,
                name,
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
                onResetTech()
                reloadTech()
                setIsAdd(false)
                setLoading(false)
                setLoadingTableTech(false)
            })
    }

    const deleteTechnical = async id => {
        setLoadingTableTech(true)
        await Http.delete(config.api.deletetechnical, {
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
                reloadTech()
                setLoadingTableTech(false)
            })
    }

    const multi = async image => {
        if (image.length > 0) {
            await image.map(async (row, index) => {
                let url = config.hosting + row.local
                return await toDataURL(url).then(dataUrl => {
                    // console.log("Here is Base64 Url", dataUrl)
                    let fileDatamulti = dataURLtoFile(dataUrl, row.fileName)
                    // console.log("Here is JavaScript File Object", fileDatamulti)
                    if (form.getFieldValue("uploadmulti")) {
                        form.setFieldsValue({
                            uploadmulti: [...form.getFieldValue("uploadmulti"), { key: index, name: row.fileName, originFileObj: fileDatamulti }],
                        })
                    } else {
                        form.setFieldsValue({
                            uploadmulti: [{ key: index, name: row.fileName, originFileObj: fileDatamulti }],
                        })
                    }
                    // return { key: index, name: row.fileName, originFileObj: fileDatamulti }
                })
            })
        }
    }

    const find = async (id, copy) => {
        await Http.post(config.api.idmachine, null, {
            params: {
                id,
            },
        })
            .then(async res => {
                const data = res.data.message
                if (data === "success") {
                    const items = res.data.items
                    // console.log(items)
                    let technical = []
                    let detail = []
                    let video = []
                    let manual = []

                    if (!copy) {
                        await multi(items.image)
                    }

                    items.detail.forEach(row => {
                        detail.push(row.detail)
                    })

                    items.video.forEach(row => {
                        video.push(row.link)
                    })

                    items.manual.forEach(row => {
                        manual.push(row.manual)
                    })

                    items.detailTech.forEach(row => {
                        technical.push({ tech: row.technicallyId, name: row.detailTech })
                    })

                    form.setFieldsValue({
                        seo: items.machineSeo,
                        group: items.typeId,
                        product: copy ? "" : items.machineName,
                        model: items.itemsCode,
                        number: items.price,
                        price: parseInt(items.price + items.discount) > 0 ? true : false,
                        discount: items.discount,
                        soldout: items.soldout == 1 ? true : false,
                        explain: items.explain[0].explainDetail,
                        detail,
                        video,
                        manual,
                        technical,
                    })
                    setIsPrice(parseInt(items.price + items.discount) > 0 ? true : false)
                    if (!copy) {
                        if (items.fileImage !== null) {
                            let fileData = null
                            let url = config.hosting + items.localImage
                            console.log(url)
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
                }
            })
            .catch(e => { })
            .finally(() => { })
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
        fetch(url, {
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

    useEffect(() => {
        dispatch(action.setAdmin("สินค้า"))
        reload()
    }, [])

    const DialogMain = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                // fullWidth={true}
                // maxWidth={"md"}
                fullScreen
            >
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <DialogTitle>
                        {
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={{ fontSize: "1.25rem" }}>{`สินค้า ${Title}`}</label>
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
                                    name="group"
                                    label="หมวดหมู่ผลิตภัณฑ์"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณาเลือกหมวดหมู่",
                                        },
                                    ]}
                                >
                                    <Select
                                        disabled={isView}
                                        dropdownStyle={{ zIndex: 2000 }}
                                        placeholder="กรุณาเลือกหมวดหมู่"
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
                                    name="product"
                                    label="ชื่อสินค้า"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณากรอกชื่อสินค้า",
                                        },
                                    ]}
                                >
                                    <Input disabled={isView} placeholder="กรุณากรอกชื่อสินค้า" autoComplete={"off"} />
                                </Form.Item>
                                <Form.Item
                                    name="model"
                                    label="รหัสรุ่น"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณากรอกรหัสรุ่น",
                                        },
                                    ]}
                                >
                                    <Input disabled={isView} placeholder="กรุณากรอกรหัสรุ่น" autoComplete={"off"} />
                                </Form.Item>
                                <Form.Item label="ราคา" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="price"
                                        label="เลือก"
                                        rules={[
                                            {
                                                required: true,
                                                message: "เลือกราคา",
                                            },
                                        ]}
                                        style={{ display: "inline-block" }}
                                    >
                                        <Radio.Group onChange={e => setIsPrice(e.target.value)} disabled={isView}>
                                            <Radio.Button value={false}>ไม่มี</Radio.Button>
                                            <Radio.Button value={true}>มี</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                    {isPrice ? (
                                        <Form.Item
                                            label="จำนวนราคา"
                                            name="number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณากรอกจำนวนราคา",
                                                },
                                            ]}
                                            style={{ display: "inline-block", margin: "0 8px" }}
                                        >
                                            <InputNumber min={0} disabled={isView} />
                                        </Form.Item>
                                    ) : null}
                                    {isPrice ? (
                                        <Form.Item
                                            label="จำนวนลดราคา"
                                            name="discount"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณากรอกจำนวนลดราคา",
                                                },
                                            ]}
                                            style={{ display: "inline-block", margin: "0 8px" }}
                                        >
                                            <InputNumber min={0} disabled={isView} />
                                        </Form.Item>
                                    ) : null}
                                </Form.Item>

                                <Form.Item
                                    name="soldout"
                                    label="จำนวนสินค้า"
                                    rules={[
                                        {
                                            required: true,
                                            message: "เลือกจำนวนสินค้า",
                                        },
                                    ]}
                                >
                                    <Radio.Group disabled={isView}>
                                        <Radio.Button value={true}>ของหมด</Radio.Button>
                                        <Radio.Button value={false}>มีอยู่</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="upload" label="รูปภาพปก" valuePropName="fileList" getValueFromEvent={normFile} extra="อัพโหลดได้รูปเดียว">
                                    <Upload name="logo" action={config.api.mock} maxCount={1} listType="picture" beforeUpload={beforeUpload}>
                                        <Button disabled={isView}>อัพโหลดภาพ</Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    name="explain"
                                    label="คำอธิบาย"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณากรอกคำอธิบาย",
                                        },
                                    ]}
                                >
                                    <TextArea rows={4} autoSize={false} maxLength={400} showCount={true} disabled={isView} autoComplete={"off"} />
                                </Form.Item>
                                <Form.List name="detail">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={index === 0 ? "คุณสมบัติ" : ""} required={false} key={field.key}>
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={["onChange", "onBlur"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "กรุณากรอกคุณสมบัติ",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            maxLength={400}
                                                            placeholder="กรุณากรอกคุณสมบัติ"
                                                            style={{ width: "80%" }}
                                                            autoComplete={"off"}
                                                            disabled={isView}
                                                            onKeyDown={e => {
                                                                if (e.code === "Comma") {
                                                                    e.preventDefault()
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 0 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item label={"เพิ่มคุณสมบัติ"}>
                                                <Button type="dashed" onClick={() => add()} style={{ width: "60%" }} disabled={isView} icon={<PlusOutlined />}>
                                                    เพิ่มคุณสมบัติ
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.List name="technical">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={index === 0 ? "คุณสมบัติทางเทคนิค" : ""} required={false} key={field.key}>
                                                    <Form.Item
                                                        name={[field.name, "tech"]}
                                                        fieldKey={[field.fieldKey, "tech"]}
                                                        validateTrigger={["onChange", "onBlur"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "กรุณาเลือกคุณสมบัติ",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Select
                                                            style={{ width: "30%" }}
                                                            disabled={isView}
                                                            dropdownStyle={{ zIndex: 2000 }}
                                                            placeholder="กรุณาเลือกคุณสมบัติ"
                                                            loading={selectLoading}
                                                            allowClear
                                                            showSearch
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                                                            disabled={isView}
                                                        >
                                                            {dataTechSelector()}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        name={[field.name, "name"]}
                                                        fieldKey={[field.fieldKey, "name"]}
                                                        validateTrigger={["onChange", "onBlur"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "กรุณากรอกคุณสมบัติทางเทคนิค",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            maxLength={400}
                                                            placeholder="กรุณากรอกคุณสมบัติทางเทคนิค"
                                                            style={{ width: "60%" }}
                                                            autoComplete={"off"}
                                                            disabled={isView}
                                                            onKeyDown={e => {
                                                                if (e.code === "Comma" || e.code === "Minus") {
                                                                    e.preventDefault()
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 0 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item label={"เพิ่มคุณสมบัติทางเทคนิค"}>
                                                <Button type="dashed" onClick={() => add()} style={{ width: "60%" }} disabled={isView} icon={<PlusOutlined />}>
                                                    เพิ่มคุณสมบัติทางเทคนิค
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.List name="manual">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={index === 0 ? "วิธีใช้" : ""} required={false} key={field.key}>
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={["onChange", "onBlur"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "กรุณากรอกวิธีใช้",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            maxLength={400}
                                                            placeholder="กรุณากรอกวิธีใช้"
                                                            disabled={isView}
                                                            style={{ width: "80%" }}
                                                            onKeyDown={e => {
                                                                if (e.code === "Comma") {
                                                                    e.preventDefault()
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 0 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item label={"เพิ่มวิธีใช้"}>
                                                <Button type="dashed" onClick={() => add()} style={{ width: "60%" }} disabled={isView} icon={<PlusOutlined />}>
                                                    เพิ่มวิธีใช้
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                <Form.List name="video">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={index === 0 ? "ลิ้งค์วีดีโอ" : ""} required={false} key={field.key}>
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={["onChange", "onBlur"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "กรุณากรอกลิ้งค์วีดีโอ",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            maxLength={400}
                                                            placeholder="กรุณากรอกลิ้งค์วีดีโอ"
                                                            disabled={isView}
                                                            style={{ width: "80%" }}
                                                            onKeyDown={e => {
                                                                if (e.code === "Comma") {
                                                                    e.preventDefault()
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 0 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item label={"เพิ่มลิ้งค์วีดีโอ"}>
                                                <Button type="dashed" onClick={() => add()} style={{ width: "60%" }} disabled={isView} icon={<PlusOutlined />}>
                                                    เพิ่มลิ้งค์วีดีโอ
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item name="uploadmulti" label="รูปภาพประกอบ" valuePropName="fileList" getValueFromEvent={normFile} extra="อัพโหลดได้ 10 รูป">
                                    <Upload name="logo" action={config.api.mock} maxCount={10} multiple listType="picture" beforeUpload={beforeUpload}>
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
        )
    }

    const DialogTech = () => {
        return (
            <Dialog
                open={opent}
                onClose={handleCloseTech}
                fullWidth={true}
                maxWidth={"md"}
            // fullScreen
            >
                <DialogTitle>
                    {
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <label style={{ fontSize: "1.25rem" }}>{`คุณสมบัติทางเทคนิค`}</label>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Button
                                    type="primary"
                                    shape="round"
                                    onClick={() => {
                                        setIsAdd(true)
                                        setIsEdit(false)
                                        onResetTech()
                                    }}
                                >
                                    เพิ่ม
                                </Button>
                            </div>
                        </div>
                    }
                </DialogTitle>
                <DialogContent>
                    <Form {...layout} form={formTech} name="control-hooks" onFinish={onFinishTech}>
                        {isAdd ? (
                            <Form.Item
                                name="name"
                                label="ชื่อคุณสมบัติทางเทคนิค"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกคุณสมบัติทางเทคนิค",
                                    },
                                ]}
                            >
                                <Input placeholder={"กรุณากรอกคุณสมบัติทางเทคนิค"} maxLength={400} autoComplete={"off"} />
                            </Form.Item>
                        ) : null}
                        {isAdd ? (
                            <Button type="primary" shape="round" htmlType="submit" loading={Loading}>
                                {isEdit ? "แก้ไข" : "บันทึก"}
                            </Button>
                        ) : null}
                        {isAdd ? (
                            <Button
                                danger
                                type="primary"
                                shape="round"
                                onClick={() => {
                                    onResetTech()
                                    setIsAdd(false)
                                }}
                            >
                                ยกเลิก
                            </Button>
                        ) : null}
                    </Form>
                    <Search style={{ marginTop: "20px" }} placeholder="ค้นหาชื่อคุณสมบัติทางเทคนิค" allowClear onSearch={onSearchTech} />
                    <Table
                        rowKey={"technicallyId"}
                        loading={{
                            spinning: LoadingTableTech,
                            size: "large",
                            tip: "กำลังโหลด...",
                        }}
                        dataSource={datat}
                        columns={columnsTech}
                        scroll={{ x: 150 }}
                        size={"small"}
                        bordered={true}
                        tableLayout={"auto"}
                        pagination={{
                            defaultPageSize: 10,
                            pageSizeOptions: ["10", "25", "50", "100"],
                            showSizeChanger: true,
                            locale: { items_per_page: "/ หน้า" },
                        }}
                        locale={{ emptyText: "ไม่มีข้อมูล" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button danger type="primary" shape="round" onClick={handleCloseTech}>
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const ConvertJSontoBackend = json => {
        let data = []
        json.forEach(element => {
            let row = []
            for (const [key, value] of Object.entries(element)) {
                row.push(`${key}=${value}`)
            }
            const convert = row.toString().replace(",", "-")
            data.push(convert)
        })
        return data.toString()
    }

    const TEST = async () => {
        const arr = ["Banana", "Orange", "Apple", "Mango"]
        const json = [
            { tech: "a1", name: "asd" },
            { tech: "a2", name: "qwe" },
        ]
        const data = ConvertJSontoBackend(json)

        await Http.post("https://localhost:5004/api/Product/GetTEST", null, {
            params: {
                test: data,
            },
        })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <React.Fragment>
            <Maneger>
                <Grid container>
                    <Grid item xs={5} style={{ marginTop: "5px" }}>
                        <Search placeholder="ค้นหาสินค้าผลิตภัณฑ์" allowClear onSearch={onSearch} />
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: "5px", marginLeft: "20px", display: "flex", justifyContent: "space-around" }}>
                        <Button type="primary" shape="round" onClick={handleClickOpen}>
                            เพิ่ม
                        </Button>
                        {/* <Button type="primary" shape="round" onClick={TEST}>
							TEST
						</Button> */}
                        <Button danger type="primary" shape="round" onClick={handleClickOpenTech}>
                            คุณสมบัติทางเทคนิค
                        </Button>
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: "5px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <label style={{ color: "gray" }}>{`รายการ ${data.length}`}</label>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "10px" }}>
                        <Table
                            rowKey={"machineId"}
                            loading={{
                                spinning: LoadingTable,
                                size: "large",
                                tip: "กำลังโหลด...",
                            }}
                            dataSource={data}
                            columns={columns}
                            scroll={{ x: 1300 }}
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
                {DialogMain()}
                {DialogTech()}
            </Maneger>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(!openAlert)}>
                <Alert onClose={() => setOpenAlert(!openAlert)} severity={Alerttype}>
                    {Alertname}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
