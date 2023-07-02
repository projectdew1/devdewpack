import React, { useEffect } from "react"
import Maneger from "../../../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import action from "../../../../redux/actions"
import Article from "../../../../component/Article/Article"

export default function EditArticle() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(action.setAdmin("แก้ไขบทความ"))
	}, [])
	return (
		<React.Fragment>
			<Article />
		</React.Fragment>
	)
}
