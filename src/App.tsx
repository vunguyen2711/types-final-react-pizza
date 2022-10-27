import React, { useEffect } from "react";
import "./App.css";
import Layouts from "./layouts/Layouts";
import jwt_decode from "jwt-decode";
import { useAppDispatch } from "./redux/hook";
import {
  loginTokenThunk,
  resetStatus,
} from "./redux/features/Login&Register/login&registerSlice";
export interface UserDataToken {
  email: string;
  exp: number;
  iat: number;
  sub: string;
}
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userData: UserDataToken = jwt_decode(accessToken);
      dispatch(loginTokenThunk(userData.sub));
    } else {
      dispatch(resetStatus());
    }
  }, []);
  return (
    <div className="App">
      <Layouts />
    </div>
  );
};

export default App;
