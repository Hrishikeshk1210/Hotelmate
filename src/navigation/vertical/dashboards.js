// ** Icons Import
import { Home, Circle } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      // {
      //   id: 'analyticsDash',
      //   title: 'Analytics',
      //   icon: <Circle size={12} />,
      //   navLink: '/dashboard/analytics'
      // },
      // {
      //   id: 'eCommerceDash',
      //   title: 'eCommerce',
      //   icon: <Circle size={12} />,
      //   navLink: '/dashboard/ecommerce'
      // },
      {
        id: 'frontDesk',
        title: 'Front Desk',
        icon: <Circle size={12} />,
        navLink: '/dashboard/frontDesk'
      },
      // {
      //   id: 'availability',
      //   title: 'Room Availabilty',
      //   icon: <Circle size={12} />,
      //   navLink: '/dashboard/availability'
      // },
      {
        id: 'roomManagement',
        title: 'Room Management',
        icon: <Circle size={12} />,
        navLink: '/dashboard/roomManagement',
        children:[
          {
            id: 'outOfService',
            title: 'OOO / OOS ',
            icon: <Circle size={12} />,
            navLink: '/dashboard/roomManagement/outOfService'
          },
          // {
          //   id: 'outOfOrder',
          //   title: 'Out Of Order',
          //   icon: <Circle size={12} />,
          //   navLink: '/dashboard/roomManagement/outOfOrder'
          // },
          {
            id: 'availability',
            title: 'Room Status',
            icon: <Circle size={12} />,
            navLink: '/dashboard/roomManagement/availability'
          }
        ]
      },
      {
        id: 'availabilityMatrix',
        title: 'Inventory',
        icon: <Circle size={12} />,
        navLink: '/dashboard/availabilityMatrix'
      },
      // Nidhi Code
      {
        id: 'reservation',
        title: 'Reservation',
        icon: <Circle size={12} />,
        navLink: '/dashboard/reservation'
      }
 
    ]
  }
]