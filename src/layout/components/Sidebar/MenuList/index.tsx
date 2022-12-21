// material-ui
import {Typography } from '@mui/material';


import menuItem from '../../../../menu-items';
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';
// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'item':
                return (
                    <>
                    <div style={{marginBottom:12}} key={item.id}>

                    <NavItem  level={1} item={item} />
                    </div>
                 
                    </>
                )
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={1}/>;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
