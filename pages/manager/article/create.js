import React, { useEffect, useState } from "react"
import Maneger from "../../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import action from "../../../redux/actions"

import { Table, Button, Menu, Dropdown, Popconfirm, Upload, Input, Image, Form } from "antd"
import { Grid, Badge, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import config from "../../../setApi/Config"

// The editor core

import Editor from '@react-page/editor';

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
// import '@react-page/editor/lib/index.css';

import { cellPlugin } from '../../../plugin/cellPlugins.tsx'
//langua
import { uiTranslator } from '../../../utils/editorLang'


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}


export default function CreateArticle() {
    const [form] = Form.useForm()
    const router = useRouter()
    const dispatch = useDispatch()

    const [value, setValue] = useState(null);
    const [Loading, setLoading] = useState(false);
    //Alert
    const [Alertname, setAlertname] = useState("")
    const [Alerttype, setAlerttype] = useState("error")
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        dispatch(action.setAdmin("เพิ่มบทความ"))
    }, [])

    const handleClickOpen = () => {
        console.log(value)
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

    const onFinish = (val) => {
        console.log(val)
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


    return (
        <React.Fragment>
            <Maneger>
                <div style={{ padding: '24px', boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)', borderRadius: '4px' }}>
                    <Form form={form} name="control-hooks" onFinish={onFinish}>
                        <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                            <Button style={{ marginRight: '5px' }} type="ghost" shape="round" onClick={handleClickOpen}>
                                ทดสอบ
                            </Button>
                            <Popconfirm
                                placement="bottom"
                                title="คุณต้องการล้างค่าใช่หรือไม่ ?"
                                onConfirm={onResetContent}
                                onCancel={onReset}
                                okText="ล้างค่าเนื้อหา"
                                cancelText="ล้างค่าข้อมูลเบื้องต้น"
                            >
                                <Button style={{ marginRight: '5px' }} danger shape="round" >
                                    ล้างค่า
                                </Button>
                            </Popconfirm>
                            <Button style={{ marginRight: '5px' }} type="dashed" shape="round" onClick={handleClickOpen}>
                                รูปภาพ
                            </Button>
                            <Button style={{ marginRight: '5px' }} type="primary" shape="round" htmlType="submit" loading={Loading} >
                                บันทึก
                            </Button>
                            <Popconfirm
                                placement="bottomRight"
                                title="คุณต้องการปิดหน้าใช่หรือไม่ ?"
                                onConfirm={closePage}
                                okText="ใช่"
                                cancelText="ไม่"
                            >

                                <Button type="danger" shape="round" >
                                    ปิด
                                </Button>
                            </Popconfirm>
                        </div>
                        <label >ข้อมูลเบื้องต้น :</label>
                        <div style={{ marginTop: '10px', marginBottom: '10px', padding: '16px', boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)', borderRadius: '4px' }}>
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
                                <Input placeholder="กรุณากรอกหัวข้อ" autoComplete={"off"} />
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
                                <Input placeholder="กรุณากรอก SEO" autoComplete={"off"} />
                            </Form.Item>
                            <Form.Item name="upload" rules={[
                                {
                                    required: true,
                                    message: "กรุณาอัพโหลดภาพ",
                                },
                            ]} label="รูปภาพปก" valuePropName="fileList" getValueFromEvent={normFile}>
                                <Upload name="logo" action={config.api.mock} maxCount={1} listType="picture" beforeUpload={beforeUpload}>
                                    <Button >อัพโหลดภาพ</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                        <label>เนื้อหา :</label>
                        <div style={{ marginTop: '10px', marginBottom: '10px', padding: '16px', boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)', borderRadius: '4px' }}>
                            <Editor
                                cellPlugins={cellPlugin}
                                value={value}
                                onChange={setValue}
                                lang={'th'}
                                onChange={setValue}
                                uiTranslator={uiTranslator} />
                        </div>
                    </Form>

                </div>
            </Maneger>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(!openAlert)}>
                <Alert onClose={() => setOpenAlert(!openAlert)} severity={Alerttype}>
                    {Alertname}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
