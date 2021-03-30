import { SET } from "../type"

const setDataReducer = payload => ({
	type: SET,
	payload,
})

const setData = ({ Link }) => {
	return dispatch => {
		dispatch(setDataReducer({ headerLink: { Link } }))
	}
}

export default {
	setData,
}
