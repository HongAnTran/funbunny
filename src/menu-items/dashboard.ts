// assets
import { IconDashboard  } from '@tabler/icons';
import type { MenuItemChildren } from './index'
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
