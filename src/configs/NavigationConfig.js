import { 
  DashboardOutlined, DragOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/pages/user-list`,
  title: 'Users List',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
    key: 'plan',
    path: `${APP_PREFIX_PATH}/home/pages/plan`,
    title: 'Plan',
    icon: DragOutlined,
    breadcrumb: false,
    submenu: []
  },
]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
