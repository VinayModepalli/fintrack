import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try{
            // sign the user out
            await projectAuth.signOut();

            // dispatch logout action
            dispatch({type: 'LOGOUT'})

            if (!isCancelled){
                setIsPending(false)
            }

        }catch(err){
            if (!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }


    }

    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])

    return {error, isPending, logout}
}