import { SET, ADMIN, STATE, MAIN, CHECK } from "../type"

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

const setPageReducer = payload => ({
	type: MAIN,
	payload,
})

const setIdReducer = payload => ({
	type: CHECK,
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

const setPage = value => {
	return dispatch => {
		dispatch(setPageReducer({ navPage: value }))
	}
}

const stateSet = value => {
	return dispatch => {
		dispatch(setStateReducer({ count: value }))
	}
}

const setId = value => {
	return dispatch => {
		dispatch(setIdReducer({ id: value }))
	}
}

export default {
	setData,
	setAdmin,
	stateSet,
	setPage,
	setId,
}
