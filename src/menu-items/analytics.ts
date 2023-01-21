// assets
import { IconDeviceAnalytics} from '@tabler/icons';
import { MenuItemChildren } from 'types/menuitem';


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
