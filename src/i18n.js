import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import config from './config';

i18n
 .use(Backend)
  .use(initReactI18next)
  .init({

    fallbackLng: config.i18n,
    saveMissing: true
  });

export default i18n;