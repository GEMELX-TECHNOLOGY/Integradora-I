import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "@/lib/api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/lib/constants"
import { useState, useEffect } from "react"

//Component that protects routes, ensuring that the user is authenticated before allowing access
function ProtectedRoute({children}){
    const [isAuthorizated, setIsAuthorizated] = useState(null)

    //Hook useEffect that runs authentication when the component is mounted
    useEffect(() => {
        auth().catch(() => setIsAuthorizated(false))
    }, [])

    //Refresh ACCESS_TOKEN
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            //Send a request to the API for a new access token
            const res = await api.post("/api/token/refresh/", {
                refresh : refreshToken,
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorizated(true)
            }
            else{
                setIsAuthorizated(false)
            }
        }catch (error){
            console.log(error)
            setIsAuthorizated(false)
        }
    }
    

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorizated(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now){
            await refreshToken()
        }else {
            setIsAuthorizated(true)
        }
    }

    if (isAuthorizated === null) {
        return <div>Loading...</div>
    }

    //If IsAuthorized, display the protected content, otherwise redirect to login
    return isAuthorizated ? children : <Navigate to="/login"/>
}


export default ProtectedRoute