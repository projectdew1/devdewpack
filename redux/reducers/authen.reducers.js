import { SET } from "../type"

const initialState = {
	headerLink: [],
}

const changeState = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET:
			return { ...state, headerLink: payload.headerLink.Link }

		default:
			return state
	}
}

export default changeState
