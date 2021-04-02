import React, { Component } from "react"
// import Router from "next/router"

export default class _error extends Component {
	componentDidMount = () => {
		window.history.back()
	}

	render() {
		return <div />
	}
}
