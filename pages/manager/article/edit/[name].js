import React, { useEffect } from "react"
import Maneger from "../../../../Layouts/Maneger"

import { useDispatch } from "react-redux"
import action from "../../../../redux/actions"
import Article from "../../../../component/Article/Article"
import { useRouter } from "next/router"

import axios from "axios"
import config from "../../../../setApi/Config"

const EditArticle = ({ id }) => {
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		console.log(id)
		dispatch(action.setAdmin("แก้ไขบทความ"))
	}, [])
	return (
		<React.Fragment>
			<Article edit={true} name={id} />
		</React.Fragment>
	)
}

export const getStaticPaths = async () => {
	const https = require("https")
	const agent = new https.Agent({
		rejectUnauthorized: false,
	})

	const { data } = await axios.get(config.api.listBolg, {
		httpsAgent: agent,
	})
	const paths = data["items"].map(blog => {
		return { params: { name: blog.enID } }
	})
	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async ({ params }) => {
	return {
		props: {
			id: params.name,
		},
	}
}

export default EditArticle
