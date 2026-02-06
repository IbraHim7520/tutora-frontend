import { authClient } from "./auth-client"

export const Logout= async() =>{
    await authClient.signOut();
}