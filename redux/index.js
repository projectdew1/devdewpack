import { createWrapper } from "next-redux-wrapper"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducers"

const middleware = [thunk]

const composeEnhancers = (typeof window !== "undefined" && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

//create a makeStore function
const makeStore = () => createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))

//export an assembles wrapper
export const wrapper = createWrapper(makeStore)
