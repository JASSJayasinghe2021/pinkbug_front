import { BasicPage } from "../components/BasicPage";
import Home from "@mui/icons-material/Home";
import '../locales/i18n';
import { useTranslation } from "react-i18next";


export const HomePage = () => {
  const { t } = useTranslation();
  return <BasicPage title={t('home_page')} icon={<Home />} />;
};
