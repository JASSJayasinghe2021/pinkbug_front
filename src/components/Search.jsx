import '../locales/i18n';
import { useTranslation } from "react-i18next";
import { ListPage } from '../components/ListPage';
import ComplainList from '../components/lists/ComplainList';
import InquaryList from '../components/lists/InquaryList';
export const SearchPage = () => {
  const { t } = useTranslation();
  return <ListPage title={t('home_page')} complain={<ComplainList />} inquary={<InquaryList />} />
};
