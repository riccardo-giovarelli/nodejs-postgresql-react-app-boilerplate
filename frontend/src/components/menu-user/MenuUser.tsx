import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import useAuthentication from '@/authentication/hooks/useAuthentication/useAuthentication';
import { Menu, MenuItem } from '@mui/material';

import { MenuUserProps } from './MenuUser.type';

const MenuUser = ({ anchorEl, handleClose }: MenuUserProps) => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogoutClick = async () => {
    await logout();
    navigate('/');
    handleClose();
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleProfileClick}>{t('user_menu.profile')}</MenuItem>
      <MenuItem onClick={handleLogoutClick}>{t('user_menu.logout')}</MenuItem>
    </Menu>
  );
};

export default MenuUser;
