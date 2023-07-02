import React, { useEffect } from "react"

import { useDispatch } from "react-redux"
import action from "../../../redux/actions"
import Article from "../../../component/Article/Article"

export default function EditArticle() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(action.setAdmin("เพิ่มบทความ"))
	}, [])
	return (
		<React.Fragment>
			<Article />
		</React.Fragment>
	)
}
