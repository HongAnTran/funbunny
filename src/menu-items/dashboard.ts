// assets
import { IconDashboard  } from '@tabler/icons';
import { MenuItemChildren } from 'types/menuitem';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard :MenuItemChildren = {
        id: 'dashboard',
        title: 'dashboard',
        type: 'item',
        url: '/dashboard',
        icon: icons.IconDashboard,
        breadcrumbs: true,    
    
};

export default dashboard;
