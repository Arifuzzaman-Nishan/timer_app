export const initialState = {
    remainingSecs:0,
    isActive: false
}

export const timerReducer = (state=initialState,action) => {
    const newState = {...state};
    switch(action.type){
        case "SEC_INCREMENT":
            newState.remainingSecs+=1;
            return newState;
        case "SEC_ZERO":
            newState.remainingSecs = 0;
            return newState;
        case "IS_ACTIVE":
            newState.isActive = action.payload;
            return newState;
        default:
            return state;
    }
}
