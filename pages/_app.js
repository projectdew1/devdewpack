import * as React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import { CacheProvider } from "@emotion/react"
import CssBaseline from "@material-ui/core/CssBaseline"
import createCache from "@emotion/cache"
import theme from "../src/theme"
import "../node_modules/@fortawesome/fontawesome-free/js/brands"
import "../node_modules/@fortawesome/fontawesome-free/js/solid"
import "../node_modules/@fortawesome/fontawesome-free/js/fontawesome"
import "../node_modules/slick-carousel/slick/slick.css"
import "../node_modules/slick-carousel/slick/slick-theme.css"
import "../node_modules/react-image-gallery/styles/css/image-gallery.css"
import "../styles/globals.css"
import "antd/dist/antd.css"
import "@react-page/editor/lib/index.css"
import "@react-page/plugins-background/lib/index.css"
import "@react-page/plugins-html5-video/lib/index.css"
import "@react-page/plugins-image/lib/index.css"
import "@react-page/plugins-spacer/lib/index.css"
import "@react-page/plugins-video/lib/index.css"
import AOS from "aos"
import "aos/dist/aos.css"
import TagManager from "react-gtm-module"

import { wrapper } from "../redux"

export const cache = createCache({ key: "css", prepend: true })

function MyApp(props) {
	const { Component, pageProps } = props

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side")
		AOS.init()
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
		TagManager.initialize({ gtmId: "GTM-TM7H4FZ" })
	}, [])

	return (
		<CacheProvider value={cache}>
			<Head>
				<meta charSet="utf-8" />
				<meta name="google-site-verification" content="YsuK3sIrMfpQY931poATkUIjgFaaxlPqJUxjUjGBP6k" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link rel="icon" href="/kmsicon.ico" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	)
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
}

export default wrapper.withRedux(MyApp)
