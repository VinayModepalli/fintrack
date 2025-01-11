import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // If we don't use a ref here, infinite loop will happen in useEffect.
    // _query is an array and is different on every function call
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if (query){
            ref = ref.where(...query)
        }
        if (orderBy){
            ref = ref.orderBy(...orderBy)
        }

        // The below onSnapshot() accepts two functions, first will recieve an argument of snapshots (which we can use to save in local)
        // Second, will be used to handle errors
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError(error.message)
        } )

        // unsubscribe on unmount
        // From what I understand, useEffect will return a function when it unmounts. In this case, we are unsubscribing the above function
        return () => unsubscribe()
        
    }, [collection, query, orderBy])

    return {documents, error}

}