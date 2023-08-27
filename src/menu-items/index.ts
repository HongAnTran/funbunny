import dashboard from './dashboard';
import analytics from './report';
import history from './historyTransaction';
import { MenuItems } from 'types/menuitem';
import tasks from './tasks';

// ==============================|| MENU ITEMS ||============================== //


const menuItems : MenuItems = {
    items: [dashboard,analytics , history , tasks]
};

export default menuItems;
