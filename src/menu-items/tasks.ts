// assets
import { IconLayoutKanban } from '@tabler/icons';
import { MenuItemChildren } from 'types/menuitem';


const icons = { IconLayoutKanban };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const tasks :MenuItemChildren = {
        id: 'tasks',
        title: 'tasks',
        type: 'item',
        url: '/tasks',
        icon: icons.IconLayoutKanban ,
        breadcrumbs: true,    
    
};

export default tasks;
