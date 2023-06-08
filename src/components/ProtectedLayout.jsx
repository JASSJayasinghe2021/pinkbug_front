import {  Navigate, useOutlet } from "react-router-dom";
import {  useContext, useEffect, useMemo, useState } from "react";
import { AppBar } from "./AppBar";
import '../locales/i18n';
import { useTranslation } from "react-i18next";
import { Store } from '../utils/Store';
import { apidata } from '../data/data';
import axios from 'axios';

export const ProtectedLayout = () => {
  //const { user } = useAuth();
  const { state, dispatch } = useContext(Store);
  const [user, setUser] = useState(state.userInfo != null ? state.userInfo : null);
  const [features, setFeatures]=useState([]);
  const [pages, setPages]=useState([]);
  

  useEffect(() => {
   setUser(state.userInfo ? state.userInfo : null);
   getFeatures({
    role:state.userInfo.user_roles[0].id,
    token:state.userInfo.token
  });
    return () => {
    }
  }, []);

  const getFeatures = async(data)=>{
    await axios.get(apidata.api + 'task/viarole', { params: { id: data.role } , headers: { "Authorization": `Bearer ${data.token}` }})
        .then(data => {
            //dispatch({ type: 'USER_TASK_SET', payload: data.data.data});
            //Cookies.set('ec_edr_tasks', JSON.stringify(data.data.data));
            console.log(data.data.data[0].task.task_name);
            let p=[];
            data.data.data.map(x=>{
              x={
                label:x.task.task_name,
                path:x.task.task_name
              }
              p.push(x);
            });
            setPages(p);
            return data.data.data;
        })
        .catch(error => {
          //console.log(error.message);
          return [];
            //NotificationManager.error(t('login_server_error'), '');
        })
  }


  const outlet = useOutlet();
  const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{background:'#efefef'}}>
      <AppBar
        pages={pages}
      />
      {outlet}
    </div>
  );
};
