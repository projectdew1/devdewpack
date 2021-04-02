const master = "authorization"

const host = "https://localhost:5001/api"
const admin = host + "/admin"

const api = {
	login: admin + "/login",
}

export default {
	master,
	api,
}
