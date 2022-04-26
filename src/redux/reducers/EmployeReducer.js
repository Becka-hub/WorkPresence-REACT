import { AJOUTE_EMPLOYE, SUPRIMER_EMPLOYE, MODIFIER_EMPLOYE, EMPLOYE } from '../types/typeEmploye';

const employes = [];
const EmployeReducer = (state = employes, action) => {
    if (localStorage.getItem('employe')) {
        state = JSON.parse(localStorage.getItem('employe'));
    }
    switch (action.type) {
        case EMPLOYE:
            state = action.payload;
            return state;
            break;
        case AJOUTE_EMPLOYE:
            const newState = [...state, { ...action.payload }];
            localStorage.setItem('employe', JSON.stringify(newState));
            return newState;
            break;
        case MODIFIER_EMPLOYE:
            const updateState = state.map((employe) => employe.id === action.payload.id ? action.payload : employe);
            localStorage.setItem('employe', JSON.stringify(updateState));
            return updateState;
            break;

        case SUPRIMER_EMPLOYE:
            const deleteState = state.filter((employe) => employe.id !== action.payload);
            localStorage.setItem('employe', JSON.stringify(deleteState));
            return deleteState;
            break;
        default:
            return state;

    }
}

export default EmployeReducer;