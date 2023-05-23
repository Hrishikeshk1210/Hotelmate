// // ** Custom Components
import React, { useState } from 'react'
import ValidationThirdPartyComponents from '../availability/RoomCardShow'
// import ChangeRoomFloor from './changeRoomFloor'
// import "./roomChange.scss"
// import GetAvailability from './getAvailability'
// // import App from './fullCalender'
// import AvailabilityTable from './availabilityTable'
// imo
import { Nav,TabPane,NavItem,NavLink,TabContent, Table} from 'reactstrap'
import { Fragment } from 'react'
const Availability = (roomAssign) => {
  const [active, setActive] = useState('1')
  const [reload, setreload] = useState(true)

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
      console.log(tab)
      setreload(false)
      setTimeout(()=>{setreload(true)},1)
    }
  }
  console.log(roomAssign)
  return (
    <div>
        {/* <GetAvailability/> */}
        <br/>
        {/* <App/> */}
        {/* <AvailabilityTable/> */}
    {/* <ChangeRoomFloor/> */}
    <Fragment>
    <Nav tabs className='tab'>
      <NavItem>
        <NavLink
          active={active === '1'}
          onClick={() => {
            toggle('1')
          }}
        >
          Floor-1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '2'}
          onClick={() => {
            toggle('2')
          }}
        >
          Floor-2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '3'}
          onClick={() => {
            toggle('3')
          }}
        >
          Floor-3
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '4'}
          onClick={() => {
            toggle('4')
          }}
        >
          Floor-4
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '5'}
          onClick={() => {
            toggle('5')
          }}
        >
          Floor-5
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '6'}
          onClick={() => {
            toggle('6')
          }}
        >
          Floor-6
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '7'}
          onClick={() => {
            toggle('7')
          }}
        >
          Floor-7
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '8'}
          onClick={() => {
            toggle('8')
          }}
        >
          Floor-8
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '9'}
          onClick={() => {
            toggle('9')
          }}
        >
          Floor-9
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '10'}
          onClick={() => {
            toggle('10')
          }}
        >
          Floor-10
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '11'}
          onClick={() => {
            toggle('11')
          }}
        >
          Floor-11
        </NavLink>
      </NavItem>


    </Nav>
    </Fragment>   
    
    {reload && <TabContent activeTab={active}>
        <TabPane tabId={active}>
        {active!='' && <ValidationThirdPartyComponents floorid={active} roomAssign={roomAssign}/>}
        </TabPane>
        </TabContent>}
        {/* <TabContent activeTab={active}>
        <TabPane tabId='2'>
        {active!='' && <ValidationThirdPartyComponents floorid={2}/>}
        </TabPane>
        </TabContent> */}
        {/* <TabContent activeTab={active}>
        <TabPane tabId='3'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='4'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='5'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='6'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='7'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='8'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='9'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='10'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent>
        <TabContent activeTab={active}>
        <TabPane tabId='11'>
        <ValidationThirdPartyComponents/>
        </TabPane>
        </TabContent> */}

    </div>
  )
}

export default Availability
