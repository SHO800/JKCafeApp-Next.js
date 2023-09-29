import Link from "next/link"
import Headers from './header.module.css'

const header = () => {
    return (
        <>
            <header id={Headers.header}>
                <h1 className={Headers.site_title}>
                    <a href="/">
                        Home
                    </a>
                </h1>
                <nav>
                    <ul>
                        <li><Link href="/register">register</Link></li>
                        <li><Link href="/admin">admin</Link></li>
                        <li><Link href="/display/register">regi_display</Link></li>
                        <li><Link href="/display/kitchen">kitchen_display</Link></li>
                        <li><Link href="/clear">clear</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default header;