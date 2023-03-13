import dashboard from './dashboard';
import analytics from './report';
import history from './historyTransaction';
import { MenuItems } from 'types/menuitem';

// ==============================|| MENU ITEMS ||============================== //


const menuItems : MenuItems = {
    items: [dashboard,analytics , history]
};

export default menuItems;
