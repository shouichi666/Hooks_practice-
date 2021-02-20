//
// userに関する情報
//
//
import initialState from "../appState";

const userState = initialState.users;

const users = (state = userState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const name = action.userName;
      const password = action.password;
      return {
        ...state,
        userName: name,
        password: password,
      };
    case "SIGN_OUT":
      alert("SING_OUT");
      return state;
    case "SIGN_UP":
      alert("SING_UP");
      return state;
    default:
      return state;
  }
};

export default users;
