export const loggedInReducer = (state = false,  action: { type: string }) => {
    switch(action.type) {
        case 'SWITCH':
            return !state
        default:
            return state
    }
}