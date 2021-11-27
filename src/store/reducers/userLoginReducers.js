const reducer = (state = { isLogin: false }, action) => {
    if (action.type === "USER-LOGIN") {
        return {

            isLogin: action.payload.isLogin,

        }

    }
    else {
        return state
    }
}

export default reducer