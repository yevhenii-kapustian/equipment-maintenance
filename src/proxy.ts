import { createServerClient } from "@supabase/ssr/dist/main/createServerClient";
import { NextRequest, NextResponse } from "next/server"
import { isUserAdmin } from "./utils/access";

export const proxy = async (request: NextRequest) => {
    const supabaseResponse = NextResponse.next({ request })
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
                    cookiesToSet.forEach(({name, value, options}) => supabaseResponse.cookies.set(name, value, options))
                }
            }
        }
    )

    const adminProtectedRoutes = [
        /^\/equipment\/create$/
    ]

    const protectedRoutes = [
        /^\/auth(\/.*)?$/
    ]

    const pathname = request.nextUrl.pathname
    const { data: {user} } = await supabase.auth.getUser()

    if (adminProtectedRoutes.some(routes => routes.test(pathname))) {
        const isAdmin = await isUserAdmin(supabase)
        
        if (!isAdmin) {
            const url = request.nextUrl.clone()
            url.pathname = "/"
            return NextResponse.redirect(url)
        }
    }

    if (user && protectedRoutes.some(routes => routes.test(pathname))) {
        const newUrl = request.nextUrl.clone()
        newUrl.pathname = "/"

        return NextResponse.redirect(newUrl)
    }

}