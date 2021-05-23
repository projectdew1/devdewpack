import { SET, ADMIN, STATE } from "../type"

const setDataReducer = payload => ({
	type: SET,
	payload,
})

const setAdminReducer = payload => ({
	type: ADMIN,
	payload,
})

const setStateReducer = payload => ({
	type: STATE,
	payload,
})

const setData = ({ Link }) => {
	return dispatch => {
		dispatch(setDataReducer({ headerLink: { Link } }))
	}
}

const setAdmin = admin => {
	return dispatch => {
		dispatch(setAdminReducer({ headerAdmin: admin }))
	}
}

const stateSet = value => {
	return dispatch => {
		dispatch(setStateReducer({ count: value }))
	}
}

export default {
	setData,
	setAdmin,
	stateSet,
}
