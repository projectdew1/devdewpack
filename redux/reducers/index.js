import { combineReducers } from "redux"
import authReducer from "./authen.reducers"

const rootReducer = combineReducers({
	data: authReducer,
})

export default rootReducer
