// ** Icons Import
import { Mail, MessageSquare, Circle, Calendar, FileText, ShoppingCart, User, Shield } from 'react-feather'

export default [
  {
    header: 'Apps & Pages'
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: <Mail size={20} />,
    navLink: '/apps/configuration',
    children: [
      {
        id: 'hotelDetails',
        title: 'Hotel Details',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/hotelDetails'
      },  
      {
        id: 'roomClass',
        title: 'Room Class',
        icon: <Circle size={12} />,
        navLink: '/apps/roomClass'
      },
      {
        id: 'roomType',
        title: 'Room Type',
        icon: <Circle size={12} />,
        navLink: '/apps/configuration/roomType'
      },
      {
        id: 'roomStatus',
      title: 'Room Management',
      icon: <Circle size={20} />,
      navLink: '/apps/configuration/roomStatus'
      }, 
      {
        id: 'package',
        title: 'Package',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/package'
      }, 
      {
        id: 'transactionCode',
        title: 'Transaction Code',
        icon: <Circle size={12} />,
        navLink: '/apps/configuration/transactionCode'
      },
      {
        id: 'rateCode',
        title: 'Rate Code',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/rateCode'
      },
      {
        id: 'extras',
        title: 'Extras',
        icon: <Circle size={12} />,
        navLink: '/apps/configuration/extras'
      },
      {
        id: 'group',
        title: 'Group',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/group'
      },   
      {
        id: 'subGroup',
        title: 'Sub Group',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/subGroup'
      },
      {
        id: 'rateCategory',
        title: 'Rate Category',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/rateCategory'
      },
      {
        id: 'packageGroup',
        title: 'Package Group',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/packageGroup'
      }, 
      {
        id: 'tax',
        title: 'Tax ',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/tax'
      },
      {
        id: 'marketGroup',
        title: 'Market Group',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/marketGroup'
      }, 
      {
        id: 'marketCode',
        title: 'Market Code',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/marketCode'
      },
      {
        id: 'membershipType',
        title: 'Membership Type ',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/membershipType'
      },  
      // { id: 'overbookingLimit',
      //   title: 'Overbooking Limit',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/configuration/overbookingLimit'
      // },

      // Nidhi Code
      {
      id: 'block',
      title: 'Block',
      icon: <Circle size={20} />,
      navLink: '/apps/configuration/block'
      },
      {
        id: 'floor',
      title: 'Floor',
      icon: <Circle size={20} />,
      navLink: '/apps/configuration/floor'
      }, 
      // {
      //   id: 'folio',
      // title: 'Folio',
      // icon: <Circle size={20} />,
      // navLink: '/apps/configuration/folio'
      // },
     
     
      
    
      // {
      //   id: 'nightAudit',
      //   title: 'Night Audit',
      //   icon: <Circle size={20} />,
      //   navLink: '/apps/configuration/nightAudit'
      // },
     
    
      
      {
        id: 'rateClass',
        title: 'Rate Class',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/rateClass'
      },
    
      // {
      //   id: 'rateDetails',
      //   title: 'Rate Details',
      //   icon: <Circle size={20} />,
      //   navLink: '/apps/configuration/rateDetails'
      // },
      // {
      //   id: 'rateSetup',
      //   title: 'Rate Setup',
      //   icon: <Circle size={20} />,
      //   navLink: '/apps/configuration/rateSetup'
      // },
      
      // {
      //   id: 'room',
      // title: 'Room',
      // icon: <Circle size={20} />,
      // navLink: '/apps/configuration/room'
      // },
     
      // {
      //   id: 'routing',
      // title: 'Routing',
      // icon: <Circle size={20} />,
      // navLink: '/apps/configuration/routing'
      // },
      {
        id: 'specials',
        title: 'Specials',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/specials'
      },
      
   
      {
        id: 'guestProfile',
        title: 'Guest Profile ',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/guestProfile'
      },

      {
        id: 'users',
        title: 'Users',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/users'
      },
      {
        id: 'vip',
        title: 'Vip',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/vip'
      },
      {
        id: 'visaDetails',
        title: 'Visa Details',
        icon: <Circle size={20} />,
        navLink: '/apps/configuration/visaDetails'
      }
    ]
  },

  {
    id: 'otherTables',
    title: 'Other Tables',
    icon: <Circle size={20} />,
    navLink: '/apps/otherTables',
    children: [
  // {
  //   id: 'booker',
  //   title: 'Booker',
  //   icon: <Shield size={12} />,
  //   navLink: '/apps/booker'
  // },
  // {
  //   id: 'cancellation',
  //   title: 'Cancellation',
  //   icon: <Circle size={12} />,
  //   navLink: '/apps/cancellation'
  // },
  {
    id: 'groupReservationRoomType',
    title: 'Group Reservation Room Type',
    icon: <Circle size={12} />,
    navLink: '/apps/groupReservationRoomType'
  },
  // {
  //   id: 'forex',
  //   title: 'Forex',
  //   icon: <Circle size={12} />,
  //   navLink: '/apps/forex'
  // },
  // {
  //   id: 'fixedCharge',
  //   title: 'Fixed Charge',
  //   icon: <Circle size={12} />,
  //   navLink: '/apps/fixedCharge'
  // },
  // {
  //   id: 'commission',
  //   title: 'Commission',
  //   icon: <Circle size={12} />,
  //   navLink: '/apps/commission'
  // },
  {
    id: 'roomInventory',
    title: 'Room Inventory',
    icon: <Circle size={12} />,
    navLink: '/apps/roomInventory'
  },
  {
    id: 'roomInventoryForecast',
    title: 'Inventory Forecast',
    icon: <Circle size={12} />,
    navLink: '/apps/roomInventoryForecast'
  },
  {
    id: 'extraGroup',
    title: 'Extra Group',
    icon: <Circle size={12} />,
    navLink: '/apps/extraGroup'
  },
  {
    id: 'reservationType',
    title: 'Reservation Type',
    icon: <Circle size={12} />,
    navLink: '/apps/reservationType'
  },
 
  // {
  //   id: 'roomsInventory',
  //   title: 'Rooms Inventory',
  //   icon: <Circle size={12} />,
  //   navLink: '/apps/roomsInventory'
  // },
  {
    id: 'splitTransaction',
    title: 'Split Transaction',
    icon: <Circle size={12} />,
    navLink: '/apps/splitTrasaction'
  },
  // {
  //   id: 'ticket',
  //   title: 'Ticket',
  //   icon: <Circle size={12} />,
  //   navLink: '/apps/ticket'
  // },
  // {
  //   id: 'ticketCategory',
  //   title: 'Ticket Category',
  //   icon: <Circle size={12} />,
  //   navLink: '/apps/ticketCategory'
  // },
  {
    id: 'waitList',
    title: 'Wait List',
    icon: <Circle size={12} />,
    navLink: '/apps/waitList'
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: <Circle size={12} />,
    navLink: '/apps/documents'
  },
  {
    id: 'documentType',
    title: 'Document Type',
    icon: <Circle size={12} />,
    navLink: '/apps/documentType'
  },
  {
    id: 'transaction',
    title: 'Transaction',
    icon: <Circle size={12} />,
    navLink: '/apps/transaction'
  },
  {
    id: 'roomWiseInventory',
    title: 'Room Wise Inventory',
    icon: <Circle size={12} />,
    navLink: '/apps/roomWiseInventory'
  },

  {
    id: 'financial',
    title: 'Financial',
    icon: <Circle size={20} />,
    navLink: '/apps/financial',
    children: [
      {
        id: 'accounts',
        title: 'Accounts',
        icon: <Circle size={20} />,
        navLink: '/apps/financial/accounts'
        
      }
    ]
  },
]
  }
  // {
  //   id: 'email',
  //   title: 'Email',
  //   icon: <Mail size={20} />,
  //   navLink: '/apps/email'
  // },
  // {
  //   id: 'chat',
  //   title: 'Chat',
  //   icon: <MessageSquare size={20} />,
  //   navLink: '/apps/chat'
  // },
  // {
  //   id: 'todo',
  //   title: 'Todo',
  //   icon: <Circle size={20} />,
  //   navLink: '/apps/todo'
  // },
  // {
  //   id: 'calendar',
  //   title: 'Calendar',
  //   icon: <Calendar size={20} />,
  //   navLink: '/apps/calendar'
  // },
  // {
  //   id: 'kanban',
  //   title: 'Kanban',
  //   icon: <Circle size={20} />,
  //   navLink: '/apps/kanban'
  // },
  // {
  //   id: 'invoiceApp',
  //   title: 'Invoice',
  //   icon: <FileText size={20} />,
  //   children: [
  //     {
  //       id: 'invoiceList',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/list'
  //     },
  //     {
  //       id: 'invoicePreview',
  //       title: 'Preview',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/preview'
  //     },
  //     {
  //       id: 'invoiceEdit',
  //       title: 'Edit',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/edit'
  //     },
  //     {
  //       id: 'invoiceAdd',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/add'
  //     }
  //   ]
  // },

  // {
  //   id: 'roles-permissions',
  //   title: 'Roles & Permissions',
  //   icon: <Shield size={20} />,
  //   children: [
  //     {
  //       id: 'roles',
  //       title: 'Roles',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/roles'
  //     },
  //     {
  //       id: 'permissions',
  //       title: 'Permissions',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/permissions'
  //     }
  //   ]
  // },
  // {
  //   id: 'eCommerce',
  //   title: 'eCommerce',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'shop',
  //       title: 'Shop',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/shop'
  //     },
  //     {
  //       id: 'detail',
  //       title: 'Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/product-detail'
  //     },
  //     {
  //       id: 'wishList',
  //       title: 'Wish List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/wishlist'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Checkout',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/checkout'
  //     }
  //   ]
  // },
  // {
  //   id: 'users',
  //   title: 'User',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'list',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/list'
  //     },
  //     {
  //       id: 'view',
  //       title: 'View',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/view'
  //     }
  //   ]
  // }
]
