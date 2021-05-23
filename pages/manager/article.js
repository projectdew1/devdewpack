import React, { useEffect } from "react"
import Maneger from "../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import action from "../../redux/actions"

export default function index() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(action.setAdmin("บทความ"))
	}, [])
	return (
		<React.Fragment>
			<Maneger>ยังไม่ได้ทำ</Maneger>
		</React.Fragment>
	)
}
