import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../security/AuthenticationService";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchUser, setUser } from "../store/userSlice";
import { User } from "../types/User";

const useAuthentication = () => {
  const history = useHistory();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleUserAuthentication = async () => {
      if (AuthenticationService.isUserLoggedIn()) {
        dispatch(fetchUser());
        // const loggedUser: User = await AuthenticationService.logIn();
        // if (loggedUser.id) {
        //   dispatch(setUser(loggedUser));
        // } else {
        //   sessionStorage.clear();
        // }
      } else {
        dispatch(setUser({}));
      }
    };
    handleUserAuthentication();
  }, []);

  useEffect(() => {
    if (user.id) history.push(`/`);
    else {
      sessionStorage.clear();
      history.push(`/login`);
    }
  }, [user]);
};

export default useAuthentication;
