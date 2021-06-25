import React from 'react'
import Link from 'next/link'
// import Image from './Image'
import { Image } from 'antd'
import { makeStyles } from "@material-ui/core/styles"
import numeral from 'numeral'

const useStyle = makeStyles(theme => ({
    main: {
        width: '100%',
        padding: '0.25rem',

        // md
        "@media (min-width: 768px)": {
            width: '50%'
        },
        // lg
        "@media (min-width: 1024px)": {
            width: '25%'
        },
        // sm
        "@media (min-width: 640px)": {
            padding: '0.5rem',
        },
    },
    divh: {
        borderRadius: "1rem",
        height: '18rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f5f5f5",
        //rinbon
        position: 'relative',
        "&:hover": {
            backgroundColor: "#f0f0f0",
        },
    },
    divIm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtp1: {
        fontSize: '1rem',
        lineHeight: '1.75rem',
        margin: '1rem',
        marginBottom: '0.25rem',
        fontWeight: "600",

        textAlign: 'center',


    },
    txtp2: {
        textAlign: 'center',
        // margin: '1rem',
        color: 'rgba(55, 65, 81)',
        fontSize: '1rem',
    },
    ribbon: {
        width: '150px',
        height: '150px',
        overflow: 'hidden',
        position: 'absolute',
        // top right
        top: '-10px',
        right: '-10px',
        "&::before,&::after": {
            position: 'absolute',
            zIndex: '-1',
            content: '',
            display: 'block',
            border: '5px solid #2980b9',
            // top right
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
        },
        // top right
        "&::before": {
            top: 0,
            left: 0,
        },
        "&::after": {
            bottom: 0,
            right: 0,
        }
    },
    spanribbon: {
        position: 'absolute',
        display: 'block',
        width: '225px',
        padding: '15px 0',
        boxShadow: '0 5px 10px rgba(0,0,0,.1)',
        color: '#fff',
        // font: 700 18px/1 'Lato', sans-serif,
        fontWeight: '500',
        fontSize: '1.15rem',
        textShadow: '0 1px 1px rgba(0,0,0,.2)',
        textTransform: 'uppercase',
        textAlign: 'center',
        // top right
        left: '-25px',
        top: '30px',
        transform: 'rotate(45deg)',
    },
}))

const ListItem = ({ link, title, imageSrc, price, discount, soldout }) => {
    const classes = useStyle()
    return (
        <div className={classes.main}>
            <Link href={`${link}`}>
                <a aria-label={title}>
                    <div className={classes.divh}>

                        {soldout == 1
                            ? <div className={classes.ribbon}>
                                <span style={{ backgroundColor: 'red' }} className={classes.spanribbon}>สินค้าหมด !!</span>
                            </div>
                            : discount > 0
                                ? <div className={classes.ribbon}>
                                    <span style={{ backgroundColor: '#FF6600' }} className={classes.spanribbon}>ลดราคา !!</span>
                                </div>
                                : null}

                        <div className={classes.divIm}>
                            <div style={{ height: 'auto', width: '10rem' }}>
                                <Image alt={title} src={imageSrc} style={{ width: '100%', }} preview={false} />
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            {discount > 0 ? <div>
                <p className={classes.txtp1}>{title}</p>
                <p className={classes.txtp2}>
                    <label style={{ color: '#767676', marginRight: '1rem', textDecoration: 'line-through' }}>{`฿${numeral(price).format("0,0")}`}</label>
                    <label style={{ color: '#FF6600', fontWeight: 'bold', fontSize: '1.5rem' }}>{`฿${numeral(discount).format("0,0")}`}</label>
                </p>
            </div> :
                price == 0 ? <div><p className={classes.txtp1}>{title}</p></div> :
                    <div>
                        <p className={classes.txtp1}>{title}</p>
                        <p className={classes.txtp2}>
                            <label style={{ marginRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>{`฿${numeral(price).format("0,0")}`}</label>

                        </p>
                    </div>
            }
        </div>
    )
}

export default ListItem