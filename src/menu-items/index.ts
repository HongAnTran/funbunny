import dashboard from './dashboard';
import analytics from './analytics';

import { TablerIcon } from '@tabler/icons';
import { ChipProps } from '@mui/material';

// ==============================|| MENU ITEMS ||============================== //


export interface MenuItemChildren{
            id: string
            title: string;
            type: 'item' | 'collapse' ;
            url?: string;
            icon?: TablerIcon ;
            breadcrumbs?: boolean;
            external?: boolean;
            target?: boolean;
            children? :MenuItemChildren[] ;
            disabled?: boolean
             caption?:string;
             chip?:ChipProps

}

interface MenuItems{ 
    items: MenuItemChildren[]
}

const menuItems : MenuItems = {
    items: [dashboard,analytics]
};

export default menuItems;
