import '../locales/i18n';
import { useTranslation } from "react-i18next";
import {Dashboard} from "../components/Dashboard";

export const DashboardPage = () => {
  const { t } = useTranslation();
  return <Dashboard/>;
};
