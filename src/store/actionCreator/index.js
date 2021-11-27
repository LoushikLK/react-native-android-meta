export const isLogin = (value) => {
    return ((dispatch) => {
        dispatch({
            type: "USER-LOGIN",
            payload: value
        })
    })
}