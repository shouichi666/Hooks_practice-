//
// userに関する情報
//
//
import initialState from "../appState";

const userState = initialState.users;

const users = (state = userState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignIn: action.isSignIn,
        id: action.id,
      };

    case "SIGN_UP":
      return {
        ...state,
        userName: action.name,
        isSignIn: action.isSignIn,
        id: action.id,
      };

    case "SIGN_OUT":
      console.log("じゃあね");
      return {
        ...state,
        userName: "",
        isSignIn: false,
        id: "",
      };

    case "SET_USERS_NAME":
      return {
        ...state,
        userName: action.useName,
      };

    case "ANONYMOUSE":
      return {
        ...state,
        userName: "匿名",
        isSignIn: true,
        id: action.id,
      };

    case "SET_UID":
      return {
        ...state,
        id: action.id,
      };

    default:
      return state;
  }
};

export default users;
