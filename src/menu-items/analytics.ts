// assets
import { IconDeviceAnalytics} from '@tabler/icons';
import type { MenuItemChildren } from './index'
// constant
const icons = { IconDeviceAnalytics};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const analytics :MenuItemChildren = {
        id: 'analytics',
        title: 'analytics',
        type: 'item',
        url: '/analytics',
        icon: icons.IconDeviceAnalytics,
        breadcrumbs: true,    
    
};

export default analytics;
