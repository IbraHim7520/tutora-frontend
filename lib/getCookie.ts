import { cookies } from "next/headers";
export const getUserData = async() =>{

    try {
    const browserCookies = await cookies();
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/api/auth/get-session` , {
        headers: {
            cookie : browserCookies.toString()
        },
    })

    const data = await res.json();
    return data?.user
    } catch (error) {
        return {data: {}}
    }

}
