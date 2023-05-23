// ** React Imports
import { Fragment, useState } from 'react'
// import Package  from "./package"
import Pack from "./pack"
import Inventory  from "./inventory"
// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

const TabsBasic = () => {
  // ** State
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            Packages
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
            Inventory
          </NavLink>
        </NavItem> */}
        
        {/* <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3')
            }}
          >
            Daily View
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
          <Pack />
        {/* <Package /> */}
        </TabPane>
        <TabPane tabId='2'>
        <Inventory />
        </TabPane>
        {/* <TabPane tabId='3'>
          <p>
            Gingerbread cake cheesecake lollipop topping bonbon chocolate sesame snaps. Dessert macaroon bonbon carrot
            cake biscuit. Lollipop lemon drops cake gingerbread liquorice. Sweet gummies dragée. Donut bear claw pie
            halvah oat cake cotton candy sweet roll. Cotton candy sweet roll donut ice cream.
          </p>
          <p>
            Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears chocolate cake topping powder. Sweet
            marzipan cheesecake jelly-o powder wafer lemon drops lollipop cotton candy.
          </p>
        </TabPane> */}
      </TabContent>
    </Fragment>
  )
}
export default TabsBasic
