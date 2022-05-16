import React, { useEffect, useState } from "react"
import Maneger from "../../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import action from "../../../redux/actions"

import { Grid, Badge, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox, InputLabel, OutlinedInput, Snackbar } from "@material-ui/core"
import { Table, Button, Menu, Dropdown, Popconfirm, Upload, Input, Image, Form } from "antd"




import alasql from "alasql"

const { Search } = Input



export default function Article() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [data, setData] = useState([])

    const [LoadingTable, setLoadingTable] = useState(false)

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
            render: (text, record) => (text ? <Image src={config.ImageHosting + text} preview={false} /> : ""),
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

    useEffect(() => {
        dispatch(action.setAdmin("บทความ"))
    }, [])



    const onSearch = values => {
        // const filter = alasql(`select * from ? where categoryName like '%${values}%'`, [dataFilt])
        console.log(values)
        const filter = []
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
                        <Search placeholder="ค้นหาบทความ" allowClear onSearch={onSearch} />
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

            </Maneger>
        </React.Fragment>
    )


}
