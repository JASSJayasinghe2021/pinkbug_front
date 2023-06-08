import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";
import '../locales/i18n';
import { useTranslation } from "react-i18next";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  
  const { t } = useTranslation();
  

  if (user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <AppBar

        pages={[
        ]}
      />
      {outlet}
    </div>
  );
};
