import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        try{
            setError(null)
            setIsPending(true)
            const res = await projectAuth.signOut();

            if (!res){
                throw new Error('Cannot logout at the moment');
            }
        }catch(err){
            setError(err.message)
            setIsPending(false)
        }


        dispatch({type: 'LOGOUT', payload: null})
    }

    return {error, isPending, logout}
}