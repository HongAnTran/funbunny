// assets
import { IconHistory  } from '@tabler/icons';
import { MenuItemChildren } from 'types/menuitem';

// constant
const icons = { IconHistory };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const history :MenuItemChildren = {
        id: 'history',
        title: 'transaction history',
        type: 'item',
        url: '/transaction-history',
        icon: icons.IconHistory,
        breadcrumbs: true,    
    
};

export default history;
