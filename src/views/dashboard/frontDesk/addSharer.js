// ** Reactstrap Imports
import { Search } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Col, Input, Form, Button, Label, Row, Modal, ModalHeader,ModalBody } from 'reactstrap'
import React, { Fragment, useState } from 'react'

const AddSharer = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
<h2 className='address-title text-center mb-1'>Add Sharer</h2>
        <Form className='sharer'>
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
        {/* </ModalBody>
        </Modal> */}
        </div>
  )
}
export default AddSharer