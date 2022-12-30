

import  { KEY_MODE_CONFIG   , KEY_LANG_CONFIG } from './constans/constant'
import { Config, Languages } from './types/config/config'

export const listLanguages :Languages[]  = [
    {
        name: 'English',
        value: 'en'
    },
    {
        name: 'Tiếng việt',
        value: 'vi',
    },
]



const modeLocal : string | 'light'   = JSON.parse(localStorage.getItem(KEY_MODE_CONFIG) || JSON.stringify('light'))  
const langLocal : string | 'vi'   = JSON.parse(localStorage.getItem(KEY_LANG_CONFIG) || JSON.stringify('vi'))


const config : Config = {
    basename: '/',
    defaultPath: 'dashboard',
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 8,
    i18n: langLocal, // 'en' - English, 'vi' - Vietnamese,
    i18nDefault: 'vi', // 'en' - English, 'vi' - Vietnamese,
    mode:modeLocal,
};

export default config;