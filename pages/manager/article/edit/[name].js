import React, { useEffect } from "react"
import Maneger from "../../../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import action from "../../../../redux/actions"
import Article from "../../../../component/Article/Article"
import { useRouter } from "next/router"
const EditArticle = ({ query }) => {
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(action.setAdmin("แก้ไขบทความ"))
	}, [])
	return (
		<React.Fragment>
			<Article edit={true} name={query.name} />
		</React.Fragment>
	)
}

export const getServerSideProps = async ({ query }) => {
	return { props: { query } }
}

export default EditArticle
