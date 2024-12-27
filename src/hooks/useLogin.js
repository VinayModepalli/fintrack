import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try{
            // sign the user out
            const res = await projectAuth.signInWithEmailAndPassword(email, password);
            // console.log(res)
            // if (!res){
            //     throw new Error("Could not login")
            // }

            // dispatch logout action
            dispatch({type: 'LOGIN', payload: res.user})

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

    return {login, error, isPending}
}