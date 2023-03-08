// assets
import { IconDeviceAnalytics} from '@tabler/icons';
import { MenuItemChildren } from 'types/menuitem';


const icons = { IconDeviceAnalytics};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const report :MenuItemChildren = {
        id: 'report',
        title: 'report',
        type: 'item',
        url: '/report',
        icon: icons.IconDeviceAnalytics,
        breadcrumbs: true,    
    
};

export default report;
