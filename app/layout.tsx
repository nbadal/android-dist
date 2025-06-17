import './global.css'
import {Metadata, Viewport} from "next";

export const metadata: Metadata = {
    title: 'Android Platform Distribution',
    description: 'Android Platform Version Distribution',
}

export const viewport: Viewport = {
    themeColor: '#000000',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <div id="root">{children}</div>
        </body>
        </html>
    )
}