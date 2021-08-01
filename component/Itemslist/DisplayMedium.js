// import Image from "./Image"
import { Image } from 'antd'
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
    main: {
        borderRadius: "1rem",
        marginBottom: "1rem",
        padding: "2rem",
        paddingBottom: 0,
        backgroundColor: "#f5f5f5",
        "&:hover": {
            backgroundColor: "#f0f0f0",
        },
        [theme.breakpoints.up("md")]: {
            marginBottom: 0,
        },
    },
}))

const DisplayMedium = ({ imageSrc, title, subtitle, subtitle2, link, sizeImage }) => {
    const classes = useStyle()
    return (
        <div className={classes.main}>
            <Link href={`${link}`}>
                <a aria-label={title}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "14rem",
                            backgroundImage: `url(${imageSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: ' no-repeat'
                        }}

                    >
                        {/* <div style={{ height: 'auto', width: '10rem' }}> */}
                        {/* <Image src={imageSrc} alt={title} style={{ width: sizeImage }} preview={false} /> */}
                        {/* </div> */}
                    </div>
                    <div
                        style={{
                            marginBottom: "2rem",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1.875rem",
                                lineHeight: "2.25rem",
                                fontWeight: 300,
                                marginBottom: "0.25rem",
                                color: "#313131",
                            }}
                        >
                            {title}
                        </p>
                        <p
                            style={{
                                color: "rgba(55, 65, 81, 1)",
                                fontSize: "0.75rem",
                                lineHeight: "1rem",
                                display: 'flex',
                                justifyContent: "space-between"
                            }}
                        >
                            <label>
                                {subtitle}
                            </label>
                            <label>
                                {subtitle2}
                            </label>
                        </p>

                    </div>
                </a>
            </Link>
        </div>
    )
}

export default DisplayMedium
