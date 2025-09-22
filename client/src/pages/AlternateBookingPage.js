import { useEffect, useState, useCallback } from "react";

import { AlternateBookingTimes } from "../components/AlteranteBookingTimes.js"
import { getAuthorization,} from "../util/getAuthorization.js";

const AlternateBookingPage =  () => {

    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
  
        getAuthorization()
            .then( (val) => {
            setLoading(false)
            setIsAuth(val)
        });

    }, [])
    
    console.log(loading, isAuth);

    return (
        <AlternateBookingTimes />
    );
}

export { AlternateBookingPage }; 