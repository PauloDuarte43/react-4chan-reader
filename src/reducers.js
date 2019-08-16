import {
    combineReducers
} from 'redux';


export const messageOne = (state = { message1: "Initial Message 1" }, action) => {
    switch (action.type) {
        case "changeMs1":
            return {
                ...state,
                message1: action.payload
            };
        default:
            return state
    }
}

export const messageTwo = (state = { message2: "Initial Message 2" }, action) => {
    switch (action.type) {
        case "changeMs2":
            return {
                ...state,
                message2: action.payload
            };
        default:
            return state
    }
}

const initialAppState = { 
    ws: true,
    wsBoards: [],
    boards: []
}

export const AppReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case "changeWs":
            return {
                ...state,
                ws: action.payload
            };
        case "changeWsBoards":
            return {
                ...state,
                wsBoards: action.payload
            };
        case "changeBoards":
            return {
                ...state,
                boards: action.payload
            };
        default:
            return state
    }
}

export const Reducers = combineReducers({
    messageOne,
    messageTwo,
    AppReducer
})