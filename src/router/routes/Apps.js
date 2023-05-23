// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// const Chat = lazy(() => import('../../views/apps/chat'))
// const Todo = lazy(() => import('../../views/apps/todo'))
// const Email = lazy(() => import('../../views/apps/email'))
// const Kanban = lazy(() => import('../../views/apps/kanban'))
// const Calendar = lazy(() => import('../../views/apps/calendar'))

// const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
// const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
// const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
// const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
// const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

// const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
// const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
// const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
// const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const OtherTables = lazy(() => import('../../views/apps/otherTables'))
const Configuration = lazy(() => import('../../views/apps/configuration'))
const TransactionCode = lazy(() => import('../../views/apps/configuration/transactionCode'))
const Extras = lazy(() => import('../../views/apps/configuration/extras'))
const RoomType = lazy(() => import('../../views/apps/configuration/roomType'))
const Booker = lazy(() => import('../../views/apps/otherTables/booker'))
// const OverbookingLimit = lazy(() => import('../../views/apps/configuration/overbookingLimit'))
const Cancellation = lazy(() => import('../../views/apps/otherTables/cancellation'))
const GroupReservationRoomType = lazy(() => import('../../views/apps/otherTables/groupReservationRoomType'))
const Forex = lazy(() => import('../../views/apps/otherTables/forex'))
const FixedCharge = lazy(() => import('../../views/apps/otherTables/fixedCharge'))
const Commission = lazy(() => import('../../views/apps/otherTables/commission'))
const RoomInventory = lazy(() => import('../../views/apps/otherTables/roomInventory'))
const RoomInventoryForecast = lazy(() => import('../../views/apps/otherTables/roomInventoryForecast'))
const ExtraGroup = lazy(() => import('../../views/apps/otherTables/extraGroup'))
const ReservationType = lazy(() => import('../../views/apps/otherTables/reservationType'))
// const RoomClass = lazy(() => import('../../views/apps/otherTables/roomClass'))
// const RoomsInventory = lazy(() => import('../../views/apps/roomsInventory'))
const SplitTransaction = lazy(() => import('../../views/apps/otherTables/splitTransaction'))
const Ticket = lazy(() => import('../../views/apps/otherTables/ticket'))
const TicketCategory = lazy(() => import('../../views/apps/otherTables/ticketCategory'))
const WaitList = lazy(() => import('../../views/apps/otherTables/waitList'))
const Documents = lazy(() => import('../../views/apps/otherTables/documents'))
const DocumentType = lazy(() => import('../../views/apps/otherTables/documentType'))
const Transaction = lazy(() => import('../../views/apps/otherTables/transaction'))
const RoomWiseInventory = lazy(() => import('../../views/apps/otherTables/roomWiseInventory'))


// Nidhi Code
const Block = lazy(() => import('../../views/apps/configuration/block'))
// const Financial = lazy(() => import('../../views/apps/otherTables/financial'))
// const Accounts = lazy(() => import('../../views/apps/otherTables/financial/accounts'))
const RoomClass = lazy(() => import('../../views/apps/configuration/roomClass'))
// const Room = lazy(() => import('../../views/apps/configuration/room'))
const Floor = lazy(() => import('../../views/apps/configuration/floor'))
const Folio = lazy(() => import('../../views/apps/configuration/folio'))
const RoomStatus = lazy(() => import('../../views/apps/configuration/roomStatus'))
const RateCategory = lazy(() => import('../../views/apps/configuration/rateCategory'))
const RateClass = lazy(() => import('../../views/apps/configuration/rateClass'))
const RateCode = lazy(() => import('../../views/apps/configuration/rateCode'))
//const RateDetails = lazy(() => import('../../views/apps/configuration/rateDetails'))
const RateSetup = lazy(() => import('../../views/apps/configuration/rateSetup'))
const Group = lazy(() => import('../../views/apps/configuration/group'))
const PackageGroup = lazy(() => import('../../views/apps/configuration/packageGroup'))
const Package = lazy(() => import('../../views/apps/configuration/package'))
const Routing = lazy(() => import('../../views/apps/configuration/routing'))
const SubGroup = lazy(() => import('../../views/apps/configuration/subGroup'))
const Specials = lazy(() => import('../../views/apps/configuration/specials'))
const MarketCode = lazy(() => import('../../views/apps/configuration/marketCode'))
const MarketGroup = lazy(() => import('../../views/apps/configuration/marketGroup'))
const MembershipType = lazy(() => import('../../views/apps/configuration/membershipType'))
const Vip = lazy(() => import('../../views/apps/configuration/vip'))
const Users = lazy(() => import('../../views/apps/configuration/users'))
const HotelDetails = lazy(() => import('../../views/apps/configuration/hotelDetails'))
const VisaDetails = lazy(() => import('../../views/apps/configuration/visaDetails'))
const NightAudit = lazy(() => import('../../views/apps/configuration/nightAudit'))
const Tax = lazy(() => import('../../views/apps/configuration/tax'))
const GuestProfile = lazy(() => import('../../views/apps/configuration/guestProfile'))




const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))

const AppRoutes = [
  {
    element: <OtherTables />,
    path: '/apps/otherTables',
    meta: {
      // appLayout: false,
      className: 'hotelDetails-application'
    }
  },
  {
    element: <Block />,
    path: '/apps/configuration/block',
    meta: {
      appLayout: false,
      className: 'block-application'
    }
  },
  {
    element: <GuestProfile />,
    path: '/apps/configuration/guestProfile',
    meta: {
      appLayout: false,
      className: 'block-application'
    }
  },
  // {
  //   element: <RateDetails />,
  //   path: '/apps/configuration/rateDetails',
  //   meta: {
  //     appLayout: false,
  //     className: 'block-application'
  //   }
  // },
  {
    element: <Tax />,
    path: '/apps/configuration/tax',
    meta: {
      appLayout: false,
      className: 'block-application'
    }
  },
  {
    element: <Configuration />,
    path: '/apps/configuration',
    meta: {
      appLayout: true,
      className: 'configuration-application'
    }
  },
  {
    element: <TransactionCode/>,
    path: '/apps/configuration/transactionCode',
    meta: {
      // appLayout: true,
      className: 'configuration-application'
    }
  },
  // {
  //   element: <OverbookingLimit/>,
  //   path: '/apps/configuration/overbookingLimit',
  //   meta: {
  //     // appLayout: true,
  //     className: 'configuration-application'
  //   }
  // },
  {
    element: <Booker/>,
    path: '/apps/booker',
    meta: {
      // appLayout: true,
      className: 'booker-application'
    }
  },
  {
    element: <RoomType/>,
    path: '/apps/configuration/roomType',
    meta: {
      // appLayout: true,
      className: 'configuration-application'
    }
  },
  {
    element: <Extras />,
    path: '/apps/configuration/extras',
    meta: {
      // appLayout: true,
      className: 'configuration-application'
    }
  },
  {
    element: <Cancellation />,
    path: '/apps/cancellation',
    meta: {
      // appLayout: true,
      className: 'cancellation-application'
    }
  },
  {
    element: <GroupReservationRoomType />,
    path: '/apps/groupReservationRoomType',
    meta: {
      // appLayout: true,
      className: 'GroupReservationRoomType-application' 
    }
  },
  {
    element: <Forex />,
    path: '/apps/forex',
    meta: {
      // appLayout: true,
      className: 'forex-application' 
    }
  },
  {
    element: <FixedCharge />,
    path: '/apps/fixedCharge',
    meta: {
      // appLayout: true,
      className: 'fixedCharge-application' 
    }
  },
  {
    element: <Commission />,
    path: '/apps/commission',
    meta: {
      // appLayout: true,
      className: 'fixedCharge-application' 
    }
  },
  {
    element: <RoomInventory />,
    path: '/apps/roomInventory',
    meta: {
      // appLayout: true,
      className: 'fixedCharge-application' 
    }
  },
  {
    element: <RoomInventoryForecast />,
    path: '/apps/roomInventoryForecast',
    meta: {
      // appLayout: true,
      className: 'fixedCharge-application' 
    }
  },
  {
    element: <ExtraGroup />,
    path: '/apps/extraGroup',
    meta: {
      // appLayout: true,
      className: 'extraGroup-application' 
    }
  },
  {
    element: <ReservationType />,
    path: '/apps/reservationType',
    meta: {
      // appLayout: true,
      className: 'reservationType-application' 
    }
  },
  {
    element: <RoomClass />,
    path: '/apps/roomClass',
    meta: {
      // appLayout: true,
      className: 'reservationType-application' 
    }
  },
  // {
  //   element: <RoomsInventory />,
  //   path: '/apps/roomsInventory',
  //   meta: {
  //     // appLayout: true,
  //     className: 'roomsInventory-application' 
  //   }
  // },
  {
    element: <SplitTransaction />,
    path: '/apps/splitTrasaction',
    meta: {
      // appLayout: true,
      className: 'splitTransaction-application' 
    }
  },
  {
    element: <Ticket />,
    path: '/apps/ticket',
    meta: {
      // appLayout: true,
      className: 'ticket-application' 
    }
  },
  {
    element: <TicketCategory />,
    path: '/apps/ticketCategory',
    meta: {
      // appLayout: true,
      className: 'ticketCategory-application' 
    }
  },
  {
    element: <WaitList />,
    path: '/apps/waitList',
    meta: {
      // appLayout: true,
      className: 'waitList-application' 
    }
  },
  {
    element: <Documents />,
    path: '/apps/documents',
    meta: {
      // appLayout: true,
      className: 'documents-application' 
    }
  },
  {
    element: <DocumentType />,
    path: '/apps/documentType',
    meta: {
      // appLayout: true,
      className: 'documentType-application' 
    }
  },
  {
    element: <Transaction />,
    path: '/apps/transaction',
    meta: {
      // appLayout: true,
      className: 'transaction-application' 
    }
  },
  {
    element: <RoomWiseInventory />,
    path: '/apps/roomWiseInventory',
    meta: {
      // appLayout: true,
      className: 'RoomWiseInventory-application' 
    }
  },


  // Nidhi Code
  // {
  //   element: <Financial />,
  //   path: '/apps/financial',
  //   meta: {
  //     appLayout: true,
  //     className: 'financial-application'
  //   }
  // },
  // {
  //   element: <Accounts />,
  //   path: '/apps/financial/accounts',
  //   meta: {
  //      appLayout: false,
  //     className: 'accounts-application'
  //   }
  // },
  // {
  //   element: <Configuration />,
  //   path: '/apps/configuration',
  //   meta: {
  //     appLayout: true,
  //     className: 'configuration-application'
  //   }
  // },
  // {
  //   element: <Room />,
  //   path: '/apps/configuration/room',
  //   meta: {
  //     // appLayout: true,
  //     className: 'room-application'
  //   }
  // },
  {
    element: <Floor />,
    path: '/apps/configuration/floor',
    meta: {
      // appLayout: true,
      className: 'floor-application'
    }
  },
  // {
  //   element: <Folio />,
  //   path: '/apps/configuration/folio',
  //   meta: {
  //     appLayout: false,
  //     className: 'folio-application'
  //   }
  // },
  {
    element: <Block />,
    path: '/apps/configuration/block',
    meta: {
      appLayout: false,
      className: 'block-application'
    }
  },
  {
    element: <RoomStatus />,
    path: '/apps/configuration/roomStatus',
    meta: {
      appLayout: false,
      className: 'roomStatus-application'
    }
  },
  {
    element: <Routing />,
    path: '/apps/configuration/routing',
    meta: {
      appLayout: false,
      className: 'routing-application'
    }
  },
  {
    element: <NightAudit />,
    path: '/apps/configuration/nightAudit',
    meta: {
      appLayout: false,
      className: 'nightAudit-application'
    }
  },
  {
    element: <RateCategory />,
    path: '/apps/configuration/rateCategory',
    meta: {
      appLayout: false,
      className: 'rateCategory-application'
    }
  },
  {
    element: <RateSetup />,
    path: '/apps/configuration/rateSetup',
    meta: {
      // appLayout: true,
      className: 'rateSetup-application'
    }
  },
  {
    element: <RateClass />,
    path: '/apps/configuration/rateClass',
    meta: {
      appLayout: false,
      className: 'rateClass-application'
    }
  },
  {
    element: <RateCode />,
    path: '/apps/configuration/rateCode',
    meta: {
      appLayout: false,
      className: 'rateCode-application'
    }
  },
  {
    element: <Group />,
    path: '/apps/configuration/group',
    meta: {
      appLayout: false,
      className: 'Group-application'
    }
  },
  {
    element: <PackageGroup />,
    path: '/apps/configuration/packageGroup',
    meta: {
      appLayout: false,
      className: 'packageGroup-application'
    }
  },
  {
    element: <Package />,
    path: '/apps/configuration/package',
    meta: {
      appLayout: false,
      className: 'packageGroup-application'
    }
  },
  {
    element: <SubGroup />,
    path: '/apps/configuration/subGroup',
    meta: {
      appLayout: false,
      className: 'subGroup-application'
    }
  },
  {
    element: <Specials />,
    path: '/apps/configuration/specials',
    meta: {
      appLayout: false,
      className: 'specials-application'
    }
  },
  {
    element: <Users />,
    path: '/apps/configuration/users',
    meta: {
      appLayout: false,
      className: 'user-application'
    }
  },
  {
    element: <MarketCode />,
    path: '/apps/configuration/marketCode',
    meta: {
      appLayout: false,
      className: 'marketCode-application'
    }
  },
  {
    element: <MarketGroup />,
    path: '/apps/configuration/marketGroup',
    meta: {
      appLayout: false,
      className: 'marketGroup-application'
    }
  },
  {
    element: <MembershipType />,
    path: '/apps/configuration/membershipType',
    meta: {
      appLayout: false,
      className: 'marketGroup-application'
    }
  },
  {
    element: <Vip />,
    path: '/apps/configuration/vip',
    meta: {
      appLayout: false,
      className: 'visaDetails-application'
    }
  },
  {
    element: <VisaDetails />,
    path: '/apps/configuration/visaDetails',
    meta: {
      appLayout: false,
      className: 'visaDetails-application'
    }
  },
  {
    element: <HotelDetails />,
    path: '/apps/configuration/hotelDetails',
    meta: {
      appLayout: false,
      className: 'hotelDetails-application'
    }
  },

  
  // {
  //   element: <Email />,
  //   path: '/apps/email/:folder',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <Email />,
  //   path: '/apps/email/label/:label',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <Email />,
  //   path: '/apps/email/:filter'
  // },
  // {
  //   path: '/apps/chat',
  //   element: <Chat />,
  //   meta: {
  //     appLayout: true,
  //     className: 'chat-application'
  //   }
  // },
  // {
  //   element: <Todo />,
  //   path: '/apps/todo',
  //   meta: {
  //     appLayout: true,
  //     className: 'todo-application'
  //   }
  // },
  // {
  //   element: <Todo />,
  //   path: '/apps/todo/:filter',
  //   meta: {
  //     appLayout: true,
  //     className: 'todo-application'
  //   }
  // },
  // {
  //   element: <Todo />,
  //   path: '/apps/todo/tag/:tag',
  //   meta: {
  //     appLayout: true,
  //     className: 'todo-application'
  //   }
  // },
  // {
  //   element: <Calendar />,
  //   path: '/apps/calendar'
  // },
  // {
  //   element: <Kanban />,
  //   path: '/apps/kanban',
  //   meta: {
  //     appLayout: true,
  //     className: 'kanban-application'
  //   }
  // },
  // {
  //   element: <InvoiceList />,
  //   path: '/apps/invoice/list'
  // },
  // {
  //   element: <InvoicePreview />,
  //   path: '/apps/invoice/preview/:id'
  // },
  // {
  //   path: '/apps/invoice/preview',
  //   element: <Navigate to='/apps/invoice/preview/4987' />
  // },
  // {
  //   element: <InvoiceEdit />,
  //   path: '/apps/invoice/edit/:id'
  // },
  // {
  //   path: '/apps/invoice/edit',
  //   element: <Navigate to='/apps/invoice/edit/4987' />
  // },
  // {
  //   element: <InvoiceAdd />,
  //   path: '/apps/invoice/add'
  // },
  // {
  //   path: '/apps/invoice/print',
  //   element: <InvoicePrint />,
  //   meta: {
  //     layout: 'blank'
  //   }
  // },
  // {
  //   element: <EcommerceShop />,
  //   path: '/apps/ecommerce/shop',
  //   meta: {
  //     className: 'ecommerce-application'
  //   }
  // },
  // {
  //   element: <EcommerceWishlist />,
  //   path: '/apps/ecommerce/wishlist',
  //   meta: {
  //     className: 'ecommerce-application'
  //   }
  // },
  // {
  //   path: '/apps/ecommerce/product-detail',
  //   element: <Navigate to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />,
  //   meta: {
  //     className: 'ecommerce-application'
  //   }
  // },
  // {
  //   path: '/apps/ecommerce/product-detail/:product',
  //   element: <EcommerceDetail />,
  //   meta: {
  //     className: 'ecommerce-application'
  //   }
  // },
  // {
  //   path: '/apps/ecommerce/checkout',
  //   element: <EcommerceCheckout />,
  //   meta: {
  //     className: 'ecommerce-application'
  //   }
  // },
  // {
  //   element: <UserList />,
  //   path: '/apps/user/list'
  // },
  // {
  //   path: '/apps/user/view',
  //   element: <Navigate to='/apps/user/view/1' />
  // },
  // {
  //   element: <UserView />,
  //   path: '/apps/user/view/:id'
  // },
  // {
  //   element: <Roles />,
  //   path: '/apps/roles'
  // },
  // {
  //   element: <Permissions />,
  //   path: '/apps/permissions'
  // }
]

export default AppRoutes
