// ** Custom Components
import React, { Fragment, useState } from 'react'
import "./frontDesk.scss"
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Form, Label, CardText,CardFooter , Nav,TabPane,NavItem,NavLink,TabContent, Table} from 'reactstrap'
import{Card, CardHeader, CardTitle, CardBody,} from 'react'
// ** Icons Imports
import { MoreVertical, Edit, Trash, Search, CheckSquare } from 'react-feather'
import AddSharer from './addSharer'
// import ModalBasic from './changeRoom'
import Others from './others'
import ButtonOption from './addSharer'
import { render } from 'react-dom'
import { ReactDOM } from 'react'
import Buttons from './otherButtons'
import "./roomChange.scss"
import ChangeRoom from './changeRoomForm1'
import ChangeRoomFloor from './changeRoomFloor'
import ChangeRoomlastForm from './ChangeRoomformlast'
import AllReservation from './allReservation'
import Arrivals from './arrivals'
import Departures from './departures'
import InHouseGuest from './inHouseGuest'
import Today from './today'
import Tomorrow from './tomorrow'
import AssignRoom from './assignRoom'
import StayOver from './stayOver'



const TableWithData = () => {
  // ** State
  const [active, setActive] = useState('1')
  const [basicModal, setBasicModal] = useState(false)
  const [centeredModal, setCenteredModal] = useState(false)
  const [disabledModal, setDisabledModal] = useState(false)
  const [disabledAnimation, setDisabledAnimation] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [show, setShow] = useState(false)
  const [set, setChangeRoom] = useState(false)
  const [form, setSharer] = useState(false)
  const [assign, setAssign] = useState(false)

      
  
  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <div>
    <Fragment>
      
      <Nav tabs filled>
      <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            ALL RESERVATIONS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
            ARRIVAL
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3')
            }}
          >
            DEPARTURES
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '4'}
            onClick={() => {
              toggle('4')
            }}
          >
            IN-HOUSE GUESTS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '5'}
            onClick={() => {
              toggle('5')
            }}
          >
            STAYOVERS
          </NavLink>
        </NavItem>
      </Nav>
      <Nav tabs filled>
      <NavItem>
          <NavLink
            active={active === '6'}
            onClick={() => {
              toggle('6')
            }}
          >
            TODAY
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '7'}
            onClick={() => {
              toggle('7')
            }}
          >
            TOMORROW
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId=''>
        <Table bordered responsive>
      <thead className='content'>
        <tr>
          <th>ROOM NUMBER</th>
          <th>GUEST NAME</th>
          <th>RESERVATION ID</th>
          <th>SOURCE</th>
          <th>STATUS</th>
          <th>ORDER STATUS</th>
        </tr>
      </thead>
      <tbody className='tabledata'>
        <tr>
          <td>
            <span className='align-middle fw-bold'>203</span>
          </td>
          <td>Peter Charles</td>
          <td>
            12786
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN</div>
      <div className='others' onClick={() =>setCenteredModal(!centeredModal)}>OTHERS
        </div>
      </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>204</span>
          </td>
          <td>Ronald Frest</td>
          <td>
            12345
          </td>
          <td>
            MakeMyTrip
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN
            
      </div>
      <div className='others' onClick={() =>setCenteredModal(!centeredModal)}>OTHERS</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>205</span>
          </td>
          <td>Jack Obes</td>
          <td>
            12698
          </td>
          <td>
            Booking.com
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN
            
            </div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS</div>
      </div>
          
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>206</span>
          </td>
          <td>Jerry Milton</td>
          <td>
            12586
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
            confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in'  onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN
            </div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS</div>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
        </TabPane>

        <TabPane tabId=''>
        <Table bordered responsive>
      <thead className='content'>
        <tr>
          <th>ROOM NUMBER</th>
          <th>GUEST NAME</th>
          <th>RESERVATION ID</th>
          <th>SOURCE</th>
          <th>STATUS</th>
          <th>ORDER STATUS</th>
        </tr>
      </thead>
      <tbody className='tabledata'>
        <tr>
          <td>
            <span className='align-middle fw-bold'>203</span>
          </td>
          <td>Peter Charles</td>
          <td>
            12786
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in'  onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT
            <div className='disabled-backdrop-modal'>
          <Modal
            isOpen={disabledModal}
            toggle={() => setDisabledModal(!disabledModal)}
            className='modal-dialog-centered'
            backdrop={false}
          >
            <ModalHeader toggle={() => setDisabledModal(!disabledModal)}>Manage Profile</ModalHeader>
            <ModalBody>
            
      {/* <CardHeader>
        <CardTitle tag='h4'>Manage Profile</CardTitle>
      </CardHeader> */}

      
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                View By
              </Label>
              <Input type='text' name='viewBy' id='nameVertical' placeholder='View By' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                State
              </Label>
              <Input type="select" id="state" name="state" class="form-control">
              <option value=''>-Select-</option>
              <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CT">Chhattisgarh</option>
                <option value="GA">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="GA">Goa</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OR">Odisha</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TG">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UT">Uttarakhand</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="WB">West Bengal</option>
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="CH">Chandigarh</option>
                <option value="DN">Dadra and Nagar Haveli</option>
                <option value="DD">Daman and Diu</option>
                <option value="DL">Delhi</option>
                <option value="LD">Lakshadweep</option>
                <option value="PY">Puducherry</option>
                </Input>
              </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailVertical'>
                Membership Level
              </Label>
              <Input type='text' name='embershipLevel' id='nameVertical' placeholder='Membership Level' ></Input><Search/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailVertical'>
                Profile Number
              </Label>
              <Input type='text' name='profileNumber' id='nameVertical' placeholder='Profile Number' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Postal Code
              </Label>
              <Input type='number' name='postalCode' id='CompanyMulti' placeholder='Type Your Postal Code' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Birth Date
              </Label>
              <Input type='date' name='date' id='CompanyMulti'/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Name
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='Enter Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Keyword
              </Label>
              <Input type='text' name='keyword' id='lastNameMulti' placeholder='Keyword' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Clint ID
              </Label>
              <Input type='number' name='clintID' id='nameVertical' placeholder='Enter Clint ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Arrival Time
              </Label>
              <Input type='datetime-local' name='clintID' id='nameVertical' placeholder='Enter Clint ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Communication
              </Label>
              <Input type='text' name='communication' id='nameVertical' placeholder='Language You Speak' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Business Segment
              </Label>
              <Input type='text' name='businessSegment' id='nameVertical' placeholder='Business Segment' /><Search/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Address
              </Label>
              <Input type='text' name='address' id='CompanyMulti' placeholder='Enter Complete Addess' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                ID Number
              </Label>
              <Input type='number' name='IDNumber' id='CompanyMulti' placeholder='Enter Valid ID Number' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                A/R Number
              </Label>
              <Input type='number' name='IDNumber' id='CompanyMulti' placeholder='Account Receivable Number' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Country Region
              </Label><Search/>
              <Input type="select" id="country" name="country" class="form-control">
              <option value=''>Select Country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Australia">Australia</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Brazil">Brazil</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>    
                <option value="France">France</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="India">India</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Mexico">Mexico</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Nepal">Nepal</option>
                <option value="Switzerland">Switzerland</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Membership Number
              </Label>
              <Input type='number' name='membershipNumber' id='CompanyMulti' placeholder='Enter Membership Number' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Tax ID
              </Label>
              <Input type='number' name='taxID' id='CompanyMulti' placeholder='Enter tax ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                City
              </Label>
              <Input type='text' name='text' id='CompanyMulti' placeholder='Type Your City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Membership Type
              </Label>
              <Input type='text' name='membershipType' id='CompanyMulti' placeholder='Select Membership' /><Search/>  
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Owner
              </Label>
              <Input type='text' name='address2' id='CompanyMulti' placeholder='Enter Owner' />
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Submit
                </Button>
                <Button outline color='secondary' type='reset'>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
    
            </ModalBody>
            {/* <ModalFooter>
              <Button color='primary' onClick={() => setDisabledModal(!disabledModal)}>
                Accept
              </Button>{' '}
            </ModalFooter> */}
          </Modal>
        
      </div>     
      </div>
      <div className='others' onClick={() => setCenteredModal(!centeredModal)}>View-Folio
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div>            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>204</span>
          </td>
          <td>Ronald Frest</td>
          <td>
            12345
          </td>
          <td>
            MakeMyTrip
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT
            <div className='disabled-backdrop-modal'>
          <Modal
            isOpen={disabledModal}
            toggle={() => setDisabledModal(!disabledModal)}
            className='modal-dialog-centered'
            backdrop={false}
          >
            <ModalHeader toggle={() => setDisabledModal(!disabledModal)}>Manage Profile</ModalHeader>
            <ModalBody>
            
      {/* <CardHeader>
        <CardTitle tag='h4'>Manage Profile</CardTitle>
      </CardHeader> */}

      
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                View By
              </Label>
              <Input type='text' name='viewBy' id='nameVertical' placeholder='View By' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                State
              </Label>
              <Input type="select" id="state" name="state" class="form-control">
              <option value=''>-Select-</option>
              <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CT">Chhattisgarh</option>
                <option value="GA">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="GA">Goa</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OR">Odisha</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TG">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UT">Uttarakhand</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="WB">West Bengal</option>
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="CH">Chandigarh</option>
                <option value="DN">Dadra and Nagar Haveli</option>
                <option value="DD">Daman and Diu</option>
                <option value="DL">Delhi</option>
                <option value="LD">Lakshadweep</option>
                <option value="PY">Puducherry</option>
                </Input>
              </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailVertical'>
                Membership Level
              </Label>
              <Input type='text' name='embershipLevel' id='nameVertical' placeholder='Membership Level' ></Input><Search/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailVertical'>
                Profile Number
              </Label>
              <Input type='text' name='profileNumber' id='nameVertical' placeholder='Profile Number' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Postal Code
              </Label>
              <Input type='number' name='postalCode' id='CompanyMulti' placeholder='Type Your Postal Code' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Birth Date
              </Label>
              <Input type='date' name='date' id='CompanyMulti'/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Name
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='Enter Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Keyword
              </Label>
              <Input type='text' name='keyword' id='lastNameMulti' placeholder='Keyword' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Clint ID
              </Label>
              <Input type='number' name='clintID' id='nameVertical' placeholder='Enter Clint ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Arrival Time
              </Label>
              <Input type='datetime-local' name='clintID' id='nameVertical' placeholder='Enter Clint ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Communication
              </Label>
              <Input type='text' name='communication' id='nameVertical' placeholder='Language You Speak' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Business Segment
              </Label>
              <Input type='text' name='businessSegment' id='nameVertical' placeholder='Business Segment' /><Search/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Address
              </Label>
              <Input type='text' name='address' id='CompanyMulti' placeholder='Enter Complete Addess' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                ID Number
              </Label>
              <Input type='number' name='IDNumber' id='CompanyMulti' placeholder='Enter Valid ID Number' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                A/R Number
              </Label>
              <Input type='number' name='IDNumber' id='CompanyMulti' placeholder='Account Receivable Number' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Country Region
              </Label><Search/>
              <Input type="select" id="country" name="country" class="form-control">
              <option value=''>Select Country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Australia">Australia</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Brazil">Brazil</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>    
                <option value="France">France</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="India">India</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Mexico">Mexico</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Nepal">Nepal</option>
                <option value="Switzerland">Switzerland</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Membership Number
              </Label>
              <Input type='number' name='membershipNumber' id='CompanyMulti' placeholder='Enter Membership Number' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Tax ID
              </Label>
              <Input type='number' name='taxID' id='CompanyMulti' placeholder='Enter tax ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                City
              </Label>
              <Input type='text' name='text' id='CompanyMulti' placeholder='Type Your City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Membership Type
              </Label>
              <Input type='text' name='membershipType' id='CompanyMulti' placeholder='Select Membership' /><Search/>  
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Owner
              </Label>
              <Input type='text' name='address2' id='CompanyMulti' placeholder='Enter Owner' />
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Submit
                </Button>
                <Button outline color='secondary' type='reset'>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
    
            </ModalBody>
            {/* <ModalFooter>
              <Button color='primary' onClick={() => setDisabledModal(!disabledModal)}>
                Accept
              </Button>{' '}
            </ModalFooter> */}
          </Modal>
        
      </div>
      </div>
      <div className='others' onClick={() => setCenteredModal(!centeredModal)}>View-Folio
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>205</span>
          </td>
          <td>Jack Obes</td>
          <td>
            12698
          </td>
          <td>
            Booking.com
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT
            </div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>View-Folio
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div></div>
          
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>206</span>
          </td>
          <td>Jerry Milton</td>
          <td>
            12586
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
            confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in'  onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT
            </div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>View-Folio
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
        </TabPane>
        <TabPane tabId=''>
        <Table bordered responsive>
      <thead className='content'>
        <tr>
          <th>ROOM NUMBER</th>
          <th>GUEST NAME</th>
          <th>RESERVATION ID</th>
          <th>SOURCE</th>
          <th>STATUS</th>
          <th>ORDER STATUS</th>
        </tr>
      </thead>
      <tbody className='tabledata'>
        <tr>
          <td>
            <span className='align-middle fw-bold'>203</span>
          </td>
          <td>Peter Charles</td>
          <td>
            12786
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in'  onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT    
      </div>
      <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div>            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>204</span>
          </td>
          <td>Ronald Frest</td>
          <td>
            12345
          </td>
          <td>
            MakeMyTrip
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT
            
      </div>
      <div className='others' onClick={() =>setCenteredModal(!centeredModal)}>OTHERS
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>205</span>
          </td>
          <td>Jack Obes</td>
          <td>
            12698
          </td>
          <td>
            Booking.com
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT
            </div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div></div>
          
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>206</span>
          </td>
          <td>Jerry Milton</td>
          <td>
            12586
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
            confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in'  onClick={() => setDisabledModal(!disabledModal)}>CHECK-OUT
        </div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS
            {/* <div className='disabled-animation-modal'>
        <Modal
          isOpen={disabledAnimation}
          toggle={() => setDisabledAnimation(!disabledAnimation)}
          className='modal-dialog-centered'
          fade={false}
        >
          <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}>Other Action options</ModalHeader>
          <ModalBody>
            <div  className='othersbutton'>
            <Col>
           <Button className='assign' color='primary'>ASSIGN ROOM</Button>
           <Button className='change' color='warning'>CHANGE ROOM</Button>
           </Col>
           <Col>
           <Button className='packages' color='success'>ADD PACKAGES</Button>
           <Button className='sharer'>ADD SHARER</Button>
           </Col>
           </div>
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div> */}
      </div>  
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
        </TabPane>

        <TabPane tabId=''>
        <Table bordered responsive>
      <thead className='content'>
        <tr>
          <th>ROOM NUMBER</th>
          <th>GUEST NAME</th>
          <th>RESERVATION ID</th>
          <th>SOURCE</th>
          <th>STATUS</th>
          <th>ORDER STATUS</th>
        </tr>
      </thead>
      <tbody className='tabledata'>
        <tr>
          <td>
            <span className='align-middle fw-bold'>203</span>
          </td>
          <td>Peter Charles</td>
          <td>
            12786
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN
      </div>
      <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS
      </div>
      </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>204</span>
          </td>
          <td>Ronald Frest</td>
          <td>
            12345
          </td>
          <td>
            MakeMyTrip
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN
      </div>
      <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS
      </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>205</span>
          </td>
          <td>Jack Obes</td>
          <td>
            12698
          </td>
          <td>
            Booking.com
          </td>
          <td className='status'>
          confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in' onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN
            </div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS</div>
      </div>    
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle fw-bold'>206</span>
          </td>
          <td>Jerry Milton</td>
          <td>
            12586
          </td>
          <td>
            Corporate
          </td>
          <td className='status'>
            confirmed
          </td>
          <td>
            <div className='tablebuttons'>
            <div className='check-in'  onClick={() => setDisabledModal(!disabledModal)}>CHECK-IN</div>
            <div className='others' onClick={() => setCenteredModal(!centeredModal)}>OTHERS</div>
            </div>
          </td>
        </tr>
      </tbody>
      
    </Table>
        </TabPane>
      </TabContent>
    </Fragment>
    {/* Others Buttons */}
    <div className='vertically-centered-modal'>
    <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
  <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Other Action Options</ModalHeader>
  <ModalBody>
  <div  className='othersbutton'>
  <Row>
  <Col md='6' sm='12' className='mb-1'>
   <Button className='assign' color='primary' onClick={() => setAssign(!assign)}>ASSIGN ROOM
   </Button>
   </Col>
   <Col md='6' sm='12' className='mb-1'>
   <Button className='change' color='warning' onClick={() => setShow(!show)}>CHANGE ROOM</Button>
   </Col>
   <Col md='6' sm='12' className='mb-1'>
   <Button className='packages' color='success'>ADD PACKAGES</Button>
    </Col>
   <Col md='6' sm='12' className='mb-1'>
   <Button className='sharer' onClick={() => setSharer(!form)}>ADD SHARER</Button>
   </Col>
   </Row>
   </div>
  </ModalBody>
</Modal>
</div>
{/* Change Room */}
<div>
<Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-xl'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)} ></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
        <h2 className='address-title text-center mb-1'>Change Room</h2>
        <div>
            <ChangeRoom/>
              {/* <br></br> */}
              <ChangeRoomFloor/>
              {/* <br></br> */}
              <ChangeRoomlastForm/>
    </div>
        </ModalBody>
      </Modal>
      </div>
      {/* Add Assign Room */}
      <div>
    <Modal isOpen={assign} toggle={() => setAssign(!assign)} className='demo-inline-spacing'>
        <ModalHeader className='bg-transparent' toggle={() => setAssign(!assign)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <div>
            <AssignRoom/>
          </div>
        </ModalBody>
      </Modal>
      </div>

      <div>
    <Modal isOpen={form} toggle={() => setSharer(!form)} className='demo-inline-spacing'>
        <ModalHeader className='bg-transparent' toggle={() => setSharer(!form)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <div>
            <AddSharer/>
          </div>
        </ModalBody>
      </Modal>
      </div>




       {/*  All Reservations */}

      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <AllReservation/>
        </TabPane>
        </TabContent>


        {/* Arrivals */}

        <TabContent activeTab={active}>
        <TabPane tabId='2'>
          <Arrivals/>
        </TabPane>
        </TabContent>


        {/* Departures */}

        <TabContent activeTab={active}>
        <TabPane tabId='3'>
          <Departures/>
        </TabPane>
        </TabContent>

         {/* In House Guests */}

         <TabContent activeTab={active}>
        <TabPane tabId='4'>
          <InHouseGuest/>
        </TabPane>
        </TabContent>


         {/* Today */}

         <TabContent activeTab={active}>
        <TabPane tabId='6'>
          <Today/>
        </TabPane>
        </TabContent>


           {/* Tomorrow */}

           <TabContent activeTab={active}>
        <TabPane tabId='7'>
          <Tomorrow/>
        </TabPane>
        </TabContent>

        {/* StayOver */}
        <TabContent activeTab={active}>
        <TabPane tabId='5'>
          <StayOver/>
        </TabPane>
        </TabContent>
</div>
  )
}
export default TableWithData
