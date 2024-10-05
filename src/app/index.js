//home page for MENSA

import Link from 'next/link';

import "./page.js";


export default function HomePage() {
    return (
        <div>
            <h1>Home Page for MENSA FFL</h1>
            <Link href="/page">Go to Rosters</Link>
        </div>
    )
}