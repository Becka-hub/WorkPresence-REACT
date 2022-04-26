import { AJOUTE_USER,SUPRIMER_USER } from '../types/typeAuth';

export const AjouteUser = (user) => {
    return {
        type: AJOUTE_USER,
        payload: user
    }
}

export const suprimerUser = () => {
    return {
        type: SUPRIMER_USER,
        payload:"" 
    }
}
