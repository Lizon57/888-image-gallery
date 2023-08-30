import { PhotoEntity } from "@/models/photo-entity"
import { ReduxAction } from "@/models/redux-action"


const initialState: AppReducer = {
    searchTerm: '',
    photos: [],
    isLoading: false,
    error: 0
}


export const appReducer = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
        case 'setSearchTerm':
            return { ...state, searchTerm: action.searchTerm, error: 0, photos: null }

        case 'setPhotos':
            return { ...state, photos: action.photos }

        case 'addPhotos':
            if (!state.photos) return { ...state, photos: action.photos }
            return { ...state, photos: [...state.photos, ...action.photos] }

        case 'setIsLoading':
            return { ...state, isLoading: action.isLoading }

        case 'setError':
            return { ...state, error: action.error }

        default:
            return state
    }
}


type AppReducer = {
    searchTerm: string
    photos: PhotoEntity[] | null
    isLoading: boolean
    error: number
}

