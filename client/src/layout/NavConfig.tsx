// component
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const getIcon = (name:any) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Account Payments',
    path: '/',
    icon: getIcon('icon-park-twotone:flash-payment')
  },
  {
    title: 'Widthrawals',
    path: '/withdrawals',
    icon:getIcon('icon-park-twotone:flash-payment')
  },
];

export default navConfig;
