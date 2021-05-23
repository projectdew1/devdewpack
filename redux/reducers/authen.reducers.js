import { SET, ADMIN, STATE } from "../type"

const initialState = {
	headerLink: [],
	headerAdmin: "",
	count: 0,
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

		default:
			return state
	}
}

export default changeState
