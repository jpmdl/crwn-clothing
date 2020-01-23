// base reducer object that represents all state of application
// combines all states together
import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

// root reducer will combine all reducers and will return it to an object with a key foreach reducer
export default combineReducers({
  user: userReducer
});
