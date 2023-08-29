import { ReduxAction } from "@/models/redux-action"


const initialState: AppReducer = {
    searchTerm: ''
}


export const appReducer = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
        case 'setSearchTerm':
            return { ...state, searchTerm: action.searchTerm }

        default:
            return state
    }
}


type AppReducer = {
    searchTerm: string
}

