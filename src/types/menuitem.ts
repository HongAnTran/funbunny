import { TablerIcon } from '@tabler/icons';
import { ChipProps } from '@mui/material';

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

export interface MenuItems{ 
items: MenuItemChildren[]
}
