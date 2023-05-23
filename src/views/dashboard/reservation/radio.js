


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import React, { useState } from 'react';


// import "./companydetails.scss"


const MultipleColumnForm = () => {

  const [showForm, setShowForm] = useState(false);

  const handleRadioClick = () => {
    setShowForm(!showForm);
  }

  return (
    <div>
         <div>
      <label htmlFor="radioButton">Click to Show Form</label>
      <input type="radio" id="radioButton" name="radioButton" onClick={handleRadioClick} />

      {showForm && (
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" /><br /><br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" /><br /><br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>


      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Companydetails</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col md='6' sm='12' className='name'>
                <Label className='name' for='nameMulti'>
                  Source
                </Label>
              </Col>

              <Col align='left' className='mb-1'>
                {/* <div style={{ display: this.state.clickedYes ? 'block' : 'none' }}> */}
                  <div className='demo-inline-spacing'>
                    <div className='form-check'>
                      <Input type='radio' id='ex1-active' name='ex1' defaultChecked />
                      <Label className='form-check-label' for='ex1-active'>
                        FIT
                      </Label>
                    </div>
                  </div>

                  <div className='demo-inline-spacing'>
                    <div className='form-check'>
                      <Input type='radio' name='ex1' id='ex1-inactive' />
                      <Label className='form-check-label' for='ex1-inactive'>
                        Corporate
                      </Label>
                    </div>
                  </div>
                {/* </div> */}

              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Form>
            <Row>
              <Col md='6' sm='12' className='mb-1'>
                <Label className='form-label' for='CountryMulti'>
                  Corporate
                </Label>
                <Input type='select' id='Select Room'>
                  <option>---Select Corporate---</option>
                  <option> Microsoft </option>
                  <option> Booking.com</option>
                  <option> </option>
                </Input>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
export default MultipleColumnForm
