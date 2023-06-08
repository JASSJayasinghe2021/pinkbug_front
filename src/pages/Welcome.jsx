import React from 'react';
import '../locales/i18n';
import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation();
  return (
    
    <div>{t('welcome')}</div>
  )
}

export default Welcome