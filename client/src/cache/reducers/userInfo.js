// userInfo.js

const userInfo = (state = {userId: '', bearerToken: '', isLoggedIn: false}, action) => {
    switch(action.type){
        case 'USER_LOGIN':
            return state = {
                userId: action.payload.userId,
                bearerToken: action.payload.bearerToken,
                isLoggedIn: true
            }
        default:
            return state;
    }
};
export default userInfo;