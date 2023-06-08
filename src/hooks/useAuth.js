import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from '../utils/Store';
import { apidata } from '../data/data';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useTranslation } from "react-i18next";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { t } = useTranslation();
  const [user, setUser] = useState(state.userInfo != null ? state.userInfo : null);
  const navigate = useNavigate();


  const login = async (data) => {
    await axios.post(apidata.api + 'user/signin', { email: data.email, password: data.password })
      .then(data => {
        //console.log(data);
        const userInfo = { id: data.data.user_id, username: data.data.user_name, token: data.data.access_token, workplace: data.data.workplace, user_roles: data.data.user_roles };
        dispatch({ type: 'USER_LOGIN', payload: userInfo });
        window.sessionStorage.setItem('ec_edr_userinfo', JSON.stringify(userInfo));
        //Cookies.set('ec_edr_userinfo', JSON.stringify(userInfo));
        setUser(userInfo);
        getCategries(userInfo.token);
        navigate("/dashboard/dashboard", { replace: true });
      })
      .catch(error => {
        //console.log(error);
        NotificationManager.error(t(error.response.data.code), '');
      })
  };

  const getCategries = (token) => {
    axios.get(apidata.api + 'location/all', { headers: { "Authorization": `Bearer ${token}` } })
      .then(data => {
        //console.log(data.data.data)
        dispatch({ type: 'SET_LOCATIONS', payload: data.data.data });
        window.sessionStorage.setItem("locations", JSON.stringify(data.data.data));
      })
      .catch(error => {
        //setAdmindivset([]);
        //setCategoryset.error(t('category_load_error'), '');
      })
  }

  const logout = () => {
    setUser(null);
    dispatch({ type: 'USER_LOGOUT' });
    //Cookies.remove('ec_edr_userinfo');
    if (window.sessionStorage.getItem('ec_edr_userinfo')) {
      window.sessionStorage.removeItem('ec_edr_userinfo');
    }
    if (window.sessionStorage.getItem('categories')) {
      window.sessionStorage.removeItem('categories');
    }
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {

  return useContext(AuthContext);
};
