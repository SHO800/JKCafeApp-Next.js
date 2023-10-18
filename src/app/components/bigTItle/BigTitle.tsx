import Link from "next/link"
import BigTitles from './bigTitle.module.css'

const BigTitle = () => {
    return (
        <Link href="/register">
            <h1 id={BigTitles.big_title}> JK Café </h1>
        </Link>
    )
}

export default BigTitle;
