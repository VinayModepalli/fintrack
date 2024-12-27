import { useEffect, useState } from 'react'
import {projectAuth} from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)

    const {dispatch} = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        try{
            console.log("making call")
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            
            // If there is no response
            if (!res){
                throw new Error('Could not signup right now')
            }
            
            // Now add display name to the user
            // We cannot directly add the display name when we create the user
            await res.user.updateProfile({ displayName })

            // Dispatch the created user into context
            dispatch({type: 'LOGIN', payload: res.user})


            if(!isCancelled){
                setIsPending(false)
            }else{
                // console.log("component unmounted")
            }

        }catch(err){
            if(!isCancelled){
                // When an error occurs, set the error and update the isPending
                // This error is returned to the caller, so it knows what went wrong
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])

    return {error, isPending, signup}
}