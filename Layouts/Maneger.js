import React from "react"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import Head from "next/head"

import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"

import { Dashboard, ExpandLess, ExpandMore, Mail, VerticalSplit, BurstMode, MoveToInbox, ChevronLeft, ChevronRight, Group, RecentActors, VpnKey, ExitToApp, VisibilityOff } from "@material-ui/icons"
import Collapse from "@material-ui/core/Collapse"
import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"

import { Button } from "antd"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputAdornment, InputLabel, OutlinedInput, Badge } from "@material-ui/core"

import config from "../setApi/Config"
import Http from "../setApi/http"

import Swal from "sweetalert2"
import action from "../redux/actions"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}))

const PersistentDrawerLeft = props => {
	const { children } = props
	const value = useSelector(state => state.data.headerAdmin)
	const count = useSelector(state => state.data.count)
	const router = useRouter()
	const classes = useStyles()
	const theme = useTheme()
	const dispatch = useDispatch()

	const [open, setOpen] = React.useState(true)
	const [menu, setMenu] = React.useState(false)
	const [visible, setVisible] = React.useState(false)
	const [menuUser, setMenuUser] = React.useState(false)
	const [LoadingAdd, setLoadingAdd] = React.useState(false)
	const [LoadingPage, setLoadingPage] = React.useState(true)
	const [showPassword, setShowPassword] = React.useState(false)
	const [datainput, setDatainput] = React.useState({
		username: "",
		password: "",
	})
	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleClick = () => {
		setMenu(!menu)
	}

	const handleClickUser = () => {
		setMenuUser(!menuUser)
	}

	const handleChange = prop => event => {
		setDatainput({ ...datainput, [prop]: event.target.value })
	}

	const onSubmit = async e => {
		e.preventDefault()

		const cook = Cookies.get(config.master)
		const user = cook ? jwt_decode(cook).user : null
		setLoadingAdd(true)
		await Http.put(config.api.change, null, {
			params: {
				username: user,
				pass: datainput.password,
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
			.finally(() => {
				setVisible(false)
				setLoadingAdd(false)
			})
	}

	const addClose = () => {
		setVisible(false)
		setDatainput({
			username: "",
			password: "",
		})
	}

	const getData = async () => {
		await Http.post(config.api.contact)
			.then(res => {
				const data = res.data.message
				if (data === "success") {
					const noRead = res.data.items.noRead

					dispatch(action.stateSet(noRead))
				}
			})
			.catch(e => {})
	}

	React.useEffect(() => {
		setLoadingPage(true)
		getData()
		Http.get(config.api.admin)
			.then(res => {})
			.catch(e => {})
			.finally(() => {
				setLoadingPage(false)
			})
	}, [])

	return (
		<div className={classes.root}>
			<Head>
				<title>{"การจัดการเพจ | ACI MACHINERY Co. Ltd"}</title>
			</Head>
			<CssBaseline />
			{LoadingPage ? null : (
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap style={{ color: "#ffffff" }}>
							{value}
						</Typography>
					</Toolbar>
				</AppBar>
			)}
			{LoadingPage ? null : (
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<img style={{ height: "40px", width: "110px", cursor: "pointer" }} src={"/ACI885-322.png"} onClick={() => router.push("/manager")} />
						<IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}</IconButton>
					</div>
					<Divider />
					<List>
						<ListItem button onClick={() => router.push("/manager")}>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary={"Dashboard"} />
						</ListItem>
						<ListItem button onClick={() => router.push("/manager/contact")}>
							<ListItemIcon>
								<Mail />
							</ListItemIcon>
							<Badge badgeContent={count} color="error">
								<ListItemText primary={"ผู้ติดต่อ"} />
							</Badge>
						</ListItem>
						<ListItem button onClick={handleClick}>
							<ListItemIcon>
								<MoveToInbox />
							</ListItemIcon>
							<ListItemText primary="ผลิตภัณฑ์" />
							{menu ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={menu} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button onClick={() => router.push("/manager/category")}>
									<ListItemIcon>
										<MoveToInbox />
									</ListItemIcon>
									<ListItemText primary="ประเภท" />
								</ListItem>
								<ListItem button onClick={() => router.push("/manager/group")}>
									<ListItemIcon>
										<MoveToInbox />
									</ListItemIcon>
									<ListItemText primary="หมวดหมู่" />
								</ListItem>
								<ListItem button onClick={() => router.push("/manager/product")}>
									<ListItemIcon>
										<MoveToInbox />
									</ListItemIcon>
									<ListItemText primary="สินค้า" />
								</ListItem>
							</List>
						</Collapse>
						<ListItem button onClick={() => router.push("/manager/portfolio")}>
							<ListItemIcon>
								<BurstMode />
							</ListItemIcon>
							<ListItemText primary={"ผลงาน"} />
						</ListItem>
						<ListItem button onClick={() => router.push("/manager/article")}>
							<ListItemIcon>
								<VerticalSplit />
							</ListItemIcon>
							<ListItemText primary={"บทความ"} />
						</ListItem>
					</List>
					<Divider />
					<ListItem button onClick={handleClickUser}>
						<ListItemIcon>
							<Group />
						</ListItemIcon>
						<ListItemText primary="จัดการผู้ใช้งาน" />
						{menuUser ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={menuUser} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem button onClick={() => router.push("/manager/user")}>
								<ListItemIcon>
									<RecentActors />
								</ListItemIcon>
								<ListItemText primary="ผู้ใช้งาน" />
							</ListItem>
							<ListItem button onClick={() => setVisible(true)}>
								<ListItemIcon>
									<VpnKey />
								</ListItemIcon>
								<ListItemText primary="เปลี่ยนรหัสผ่าน" />
							</ListItem>
						</List>
					</Collapse>
					<Divider />
					<ListItem
						button
						onClick={() => {
							Cookies.remove(config.master)
							router.push("/administrator")
						}}
					>
						<ListItemIcon>
							<ExitToApp />
						</ListItemIcon>
						<ListItemText primary={"ออกจากระบบ"} />
					</ListItem>
					<Divider />
				</Drawer>
			)}
			{LoadingPage ? (
				<div>Loading...</div>
			) : (
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					{children}
				</main>
			)}
			<Dialog open={visible} onClose={() => setVisible(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"เปลี่ยนรหัสผ่านผู้ใช้งาน"}</DialogTitle>
				<form onSubmit={onSubmit}>
					<DialogContent>
						<FormControl variant="outlined" fullWidth={true}>
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
							ตกลง
						</Button>
						<Button type="primary" shape="round" danger onClick={addClose}>
							ยกเลิก
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}
export default PersistentDrawerLeft
