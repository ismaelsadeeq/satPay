import PropTypes from 'prop-types';
// material
import {  styled } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// components
import Iconify from './Iconify';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: '#f9fafb',
  color:'black',
  height:'10%',
  borderBottom:'0.5px dotted grey',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }:{onOpenSidebar:any}) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {/* <Box sx={{ flexGrow: 1 }} /> */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
        <strong>0.0 &nbsp;</strong>Milli Sat -<strong>0.0</strong>&nbsp; Naira
        </Stack>
        {/* <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
         
        </Stack> */}
      </ToolbarStyle>
    </RootStyle>
  );
}
