import { SET, ADMIN, STATE, MAIN, CHECK } from "../type"
import { Dashboard, Mail, VerticalSplit, BurstMode, MoveToInbox, Group, ExitToApp } from "@material-ui/icons"

const initialState = {
	headerLink: [],
	headerAdmin: "",
	count: 0,
	navPage: [
		{ id: 1, title: "Dashboard", path: "/manager", icon: <Dashboard />, menu: false, children: [] },
		{ id: 2, title: "ผู้ติดต่อ", path: "/manager/contact", icon: <Mail />, menu: false, children: [] },
		{
			id: 3,
			title: "ผลิตภัณฑ์",
			path: "",
			icon: <MoveToInbox />,
			menu: false,
			children: [
				{ id: 31, title: "ประเภท", path: "/manager/category", icon: <MoveToInbox />, menu: false },
				{ id: 32, title: "หมวดหมู่", path: "/manager/group", icon: <MoveToInbox />, menu: false },
				{ id: 33, title: "สินค้า", path: "/manager/product", icon: <MoveToInbox />, menu: false },
			],
		},
		{ id: 4, title: "ผลงาน", path: "/manager/portfolio", icon: <BurstMode />, menu: false, children: [] },
		{ id: 5, title: "บทความ", path: "/manager/article", icon: <VerticalSplit />, menu: false, children: [] },
		{
			id: 6,
			title: "จัดการผู้ใช้งาน",
			path: "",
			icon: <Group />,
			menu: false,
			children: [
				{ id: 61, title: "ผู้ใช้งาน", path: "/manager/user", icon: <MoveToInbox />, menu: false },
				{ id: 62, title: "เปลี่ยนรหัสผ่าน", path: "", icon: <MoveToInbox />, menu: false },
			],
		},
		{ id: 7, title: "ออกจากระบบ", path: "/administrator", icon: <ExitToApp />, menu: false, children: [] },
	],
	id: "",
}

const changeState = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET:
			return { ...state, headerLink: payload.headerLink.Link }
		case ADMIN:
			return { ...state, headerAdmin: payload.headerAdmin }
		case STATE: {
			return { ...state, count: payload.count }
		}
		case MAIN: {
			return { ...state, navPage: payload.navPage }
		}
		case CHECK: {
			return { ...state, id: payload.id }
		}

		default:
			return state
	}
}

export default changeState
