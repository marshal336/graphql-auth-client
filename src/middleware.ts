import { NextRequest, NextResponse } from "next/server";
import { PAGES } from "./utils/page.enum";

export async function middleware(req: NextRequest, res: NextResponse) {
    const { cookies, url } = req
    const isAuthPage = url.includes(PAGES.SIGN_UP)
    const isAuthPageSignIn = url.includes(PAGES.SIGN_IN)
    const isProfilePage = url.includes(PAGES.PROFILE)
    const sessionSID = cookies.get('nest.sid')?.value

    if(!sessionSID && isProfilePage) {
        return NextResponse.redirect(new URL(PAGES.SIGN_UP, url))
    }
    if (sessionSID && (isAuthPage || isAuthPageSignIn)) {
        return NextResponse.redirect(new URL(PAGES.HOME, url))
    }
    return
}

export const config = {
    matcher: ['/auth/:path*', '/profile/:path*'],
}