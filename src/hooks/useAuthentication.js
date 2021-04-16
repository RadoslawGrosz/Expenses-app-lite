import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../security/AuthenticationService";
import { setUser } from "../actions/user";

const useAuthentication = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUserAuthentication = async () => {
      if (AuthenticationService.isUserLoggedIn()) {
        const loggedUser = await AuthenticationService.logIn();
        if (loggedUser.id) {
          dispatch(setUser(loggedUser));
        } else {
          sessionStorage.clear("token");
        }
      } else {
        dispatch(setUser({}));
      }
    };
    handleUserAuthentication();
  }, []);

  useEffect(() => {
    if (!user.id) history.push(`/`);
  }, [user]);
};

export default useAuthentication;
