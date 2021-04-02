import Axios from "axios"
import Cookies from "js-cookie"
import { master } from "./Config"

const Http = Axios.create({
	timeout: 1000000000, // เพิ่มค่า timeout
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
})

Http.interceptors.request.use(
	function (config) {
		const token = Cookies.get(master)
		if (token) config.headers.Authorization = `Bearer ${token}`
		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)

export default Http
