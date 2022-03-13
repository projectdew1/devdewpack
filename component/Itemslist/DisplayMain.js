import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"



const DisplayMain = ({ imageSrc, title, link, }) => {
    const useStyle = makeStyles(theme => ({
        main: {
            borderRadius: "1rem",
            marginBottom: "1rem",
            padding: "1.5rem",
            paddingBottom: 0,
            backgroundColor: "#fbf9ff",
            cursor: "pointer",
            "& p": {
                fontSize: "1.5rem",
                lineHeight: "1.650rem",
                fontWeight: 300,
                marginBottom: "0.25rem",
                color: "#313131",
            },
            "&:hover": {
                backgroundColor: "#8159FF",
                "& p": {
                    color: "#fbf9ff",
                }
            },
            [theme.breakpoints.up("md")]: {
                marginBottom: 0,
            },
        },
        image: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "14rem",
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: ' no-repeat'
        }
    }))

    const classes = useStyle()
    return (
        <div className={classes.main}>
            <Link href={`${link}`}>
                <a aria-label={title}>
                    <div className={classes.image} />
                    <div style={{ marginBottom: "2rem", }} >
                        <p>{title}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default DisplayMain
