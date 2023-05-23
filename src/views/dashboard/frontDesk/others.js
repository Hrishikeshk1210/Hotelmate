// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Col, } from 'reactstrap'

const Others = (centeredModal) => {
  // ** States
  // const [centeredModal, setCenteredModal] = useState(false)

  return (
    <div className='demo-inline-spacing'>
      <div className='vertically-centered-modal'>
        {/* <Fragment>
        <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Vertically Centered</ModalHeader>
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
            <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
              Accept
            </Button>{' '}
          </ModalFooter>
        </Modal>
        </Fragment> */}
          <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-4'>
        <Form>
          <Row className='mb-1'>
            <Label sm='3' for='id'>
             Clint ID
            </Label>
            <Col sm='9'>
              <Input type='number' name='id' id='id' placeholder='1348714' />
            </Col>
          </Row>

          <Row className='mb-1'>
            <Label sm='3' for='id'>
              Booking ID
            </Label>
            <Col sm='9'>
              <Input type='number' name='id' id='id' placeholder='12768723' />
            </Col>
          </Row>

          <Row className='mb-1'>
            <Label sm='3' for='room'>
              Select Room
            </Label>
            <Col sm='9'>
              <Input type='select' name='room' id='mobile'>
              <option>-Select-</option>
                <option>250</option>
                <option>251</option>
                <option>252</option>
                <option>253</option>
                <option>254</option>
                <option>255</option>
                <option>256</option>
                <option>257</option>
              </Input>
            </Col>
          </Row>

          <Row className='mb-1'>
            <Label sm='3' for='name'>
              Guest Name
            </Label>
            <Col sm='9'>
              <Input type='select' name='name' id='name'>
              <option>-Select-</option>
                <option>Jyothi Pawar</option>
                <option>Anilkumar S P</option>
                <option>Joe Smith</option>
                <option>Abdul Gaphur</option>
                <option>Manish Pandey</option>
              </Input>
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='date'>
              Arrival
            </Label>
            <Col sm='9'>
              <Input type='date' name='date' id='date' placeholder='dd/mm/yyyy' />
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='date'>
              Departure
            </Label>
            <Col sm='9'>
              <Input type='date' name='date' id='date' placeholder='dd/mm/yyyy' />
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='email'>
              Email
            </Label>
            <Col sm='9'>
              <Input type='email' name='email' id='email' placeholder='smith@gmail.com' />
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='number'>
              Phone Number
            </Label>
            <Col sm='9'>
              <Input type='number' name='phone' id='phone' placeholder='Enter Valid Phone Number' />
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='number'>
              ID Proof
            </Label>
            <Col sm='9'>
              <Input type='select' name='id' id='id' >
              <option>-Select-</option>
                <option>Andhra Card</option>
                <option>PAN Card</option>
                <option>Passport</option>
                <option>Driving Licence</option>
                <option>Others</option>
                </Input>
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='number'>
              ID Number
            </Label>
            <Col sm='9'>
              <Input type='number' name='phone' id='phone' placeholder='Enter Valid Number' />
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='number'>
              Attachment
            </Label>
            <Col sm='9'>
              <Input type='file' name='file' id='file'/>
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='number'>
              Address
            </Label>
            <Col sm='9'>
              <Input type='textarea' name='address' id='address' placeholder='Type Your Address'/>
            </Col>
          </Row>

          <Row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                Submit
              </Button>
              <Button outline color='secondary' type='reset'>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
          
        </ModalBody>
      </Modal>
      </div>
     
      
    </div>
  )
}
export default Others