import { AJOUTE_EMPLOYE,SUPRIMER_EMPLOYE,MODIFIER_EMPLOYE,EMPLOYE } from '../types/typeEmploye';

export const employe = (employe) => {
    return {
        type: EMPLOYE,
        payload: employe
    }
}

export const ajouteEmploye = (employe) => {
    return {
        type: AJOUTE_EMPLOYE,
        payload:employe 
    }
}

export const suprimerEmploye = (id) => {
    return {
        type: SUPRIMER_EMPLOYE,
        payload:id 
    }
}

export const modifierEmploye = (employe) => {
    return {
        type: MODIFIER_EMPLOYE,
        payload:employe
    }
}

