import React, { useEffect } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"

import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import styleScroll from "../assets/component/scrollTopStyle"

import { useDispatch } from "react-redux"
import action from "../redux/actions"
import axios from "axios"
import Config from "../setApi/Config"
import alasql from "alasql"
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { MessengerChat } from 'react-messenger-chat-plugin';


const Header = dynamic(() => import("../component/Header/Header.js"))
const Link = dynamic(() => import("../component/Header/HeaderLink"))
const ScrollTop = dynamic(() => import("../component/ScrollTop/ScrollTop"))
const Footer = dynamic(() => import("../component/Footer/Footer"))
const Social = dynamic(() => import("../component/SocialBar/Social"))

const useStyle = makeStyles(styleScroll)

export default function Default(props) {
    const classes = useStyle()
    const scrollClasses = classNames({
        [classes.shape]: true,
    })
    const { title = null, meta = null, children, active, fixed, sticky, appColor } = props

    const dispatch = useDispatch()

    useEffect(() => {
        const initMessenger = () => {
            console.log('Messenger')
            try {
                const chatbox = document.getElementById('fb-customer-chat');
                chatbox.setAttribute("page_id", "725364650867827");
                chatbox.setAttribute("attribution", "biz_inbox");

                window.fbAsyncInit = function () {
                    FB.init({
                        xfbml: true,
                        version: 'v12.0'
                    });
                };

                (function (d, s, id) {
                    let js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));

            } catch (err) {
                throw err;
            }
        };

        const gen = async () => {
            await axios
                .get(Config.api.pageHeader, null)
                .then(res => {
                    const items = res.data.items
                    let data = []
                    let round = 0
                    for (let index = 0; index < items.length; index += 10) {
                        round += 1
                        const sql = alasql(`select * from ? LIMIT 10 OFFSET ${index}`, [items])
                        data.push({
                            group: round,
                            list: sql,
                        })
                    }

                    dispatch(action.setData({ Link: data }))
                })
                .catch(e => console.log(e))
        }

        gen()
        initMessenger()
        // return () => {
        //     initMessenger()
        // };

        // dispatch(
        // 	action.setData({
        // 		Link: [
        // 			{
        // 				group: "1",
        // 				list: [{ name: "เครื่องจักรเครื่องจักรเครื่องจักร" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
        // 			},
        // 			{
        // 				group: "2",
        // 				list: [{ name: "เครื่องจักร1" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
        // 			},
        // 			{
        // 				group: "3",
        // 				list: [{ name: "เครื่องจักร1" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
        // 			},
        // 			{
        // 				group: "4",
        // 				list: [{ name: "เครื่องจักร1" }, { name: "เครื่องจักร2" }, { name: "เครื่องจักร3" }, { name: "เครื่องจักร4" }, { name: "เครื่องจักร5" }],
        // 			},
        // 		],
        // 	})
        // )
    }, [])

    return (
        <div>
            {title ? <Head>
                <title>{title}</title>
            </Head> : meta}

            <Header height={100} Links={<Link active={active} />} fixed={fixed} sticky={sticky} appColor={appColor} />
            {children}
            <Social {...props} />

            <ScrollTop {...props} click={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}>
                <div className={scrollClasses}>
                    <KeyboardArrowUpIcon />
                </div>
            </ScrollTop>
            <div>
                <div id="fb-root"></div>
                <div id="fb-customer-chat" className="fb-customerchat"></div>
            </div>
            <Footer />
        </div>
    )
}
