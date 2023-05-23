import { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))
const DashboardFrontDesk = lazy(() => import('../../views/dashboard/frontDesk'))
// const DashboardAvailability = lazy(() => import('../../views/dashboard/availability'))
const DashboardAvailabilityMatrix = lazy(() => import('../../views/dashboard/availabilityMatrix'))
const DashboardRoomManagement = lazy(() => import('../../views/dashboard/roomManagement'))
const DashboardOutOfOrder = lazy(() => import('../../views/dashboard/roomManagement/outOfOrder'))
const DashboardOutOFService = lazy(() => import('../../views/dashboard/roomManagement/outOfService'))
const DashboardRoomStatus = lazy(() => import('../../views/dashboard/roomManagement/availability'))

const Reservation = lazy(() => import('../../views/dashboard/reservation'))

const DashboardRoutes = [
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />
  },
  {
    path: '/dashboard/ecommerce',
    element: <DashboardEcommerce />
  },
  {
    path: '/dashboard/frontDesk',
    element: <DashboardFrontDesk />
  },
  {
    path: '/dashboard/roomManagement',
    element: <DashboardRoomManagement />
  },
  {
    path: '/dashboard/roomManagement/outOfOrder',
    element: <DashboardOutOfOrder />
  },
  {
    path: '/dashboard/roomManagement/outOfService',
    element: <DashboardOutOFService />
  },
  // {
  //   path: '/dashboard/availability',
  //   element: <DashboardAvailability />
  // },
  {
    path: '/dashboard/availabilityMatrix',
    element: <DashboardAvailabilityMatrix />
  },
  {
    path: '/dashboard/roomManagement/availability',
    element: <DashboardRoomStatus />
  },

// Nidhi Code
{
  path: '/dashboard/reservation',
  element: <Reservation />
}

]

export default DashboardRoutes