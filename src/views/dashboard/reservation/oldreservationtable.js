// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import "./reservationscreen.scss"
const MultipleColumnForm = () => {
  return (
    <div>
      <div>
      <Card className='float'>
        <CardHeader>
          <CardTitle tag='h4'>Stay Information</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            
            <Row>
              <Col md='9' sm='8' className='font'>
                <p> Property   Prop1</p>
                <p> Arrival    12-14-2022</p>
                <p> Nights     3 </p>
                <p> Departure  12-16-2022 </p>
                <p> Guests     2+1 </p>
                <p> Room       Deluex</p>
                <p> RateCode   Dulex </p>
                <p> Rate       5000/- </p>
                <br></br>

                <b>Packages</b>
                <p> All year packages</p>
                <br></br>

                <b>Packages</b>
                <p> No Cancellation After 12-12-2022</p>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      </div>

      <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Guest Information </CardTitle>
          
        </CardHeader>
        <b><hr width="90%"></hr></b>
        <CardBody>
        <Form className='required:before'>
            <Row>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='nameMulti'>
                  Name
                </Label>
                <Input type='text' name='Name' id='nameMulti' placeholder='Name' />
              </Col>
              <Col md='4' sm='8' className='name'>
              <Button className='me-1' color='light-secondary' type='submit' onClick={e => e.preventDefault()}>
               New Name
            </Button>               
              </Col>
              <br></br>
              <br></br>
              <br></br>
              <h4> Booking Details </h4>
              <br></br>
              <b><hr width="90%"></hr></b>
              <br></br>
              <Row>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='nameMulti'>
                  Reservation Type
                </Label>
                <Input type='text' name='Reservation Type' id='nameMulti' placeholder='Reservation Type' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='lastNameMulti'>
                  Room Type
                </Label>
                <Input type='text' name='Room Type' id='lastNameMulti' placeholder='Room Type' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='cityMulti'>
                  Waitlist Reason
                </Label>
                <Input type='text' name='Waitlist' id='cityMulti' placeholder='Waitlist Reason' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='CountryMulti'>
                  Market
                </Label>
                <Input type='text' name='Market' id='CountryMulti' placeholder='Market' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='CompanyMulti'>
                  Rate
                </Label>
                <Input type='text' name='Rate' id='CompanyMulti' placeholder='Rate' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='cityMulti'>
                  Waitlist Comment
                </Label>
                <Input type='text' name='Waitlist' id='cityMulti' placeholder='Waitlist Comment' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='EmailMulti'>
                  Source
                </Label>
                <Input type='text' name='Source' id='EmailMulti' placeholder='Source' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='EmailMulti'>
                  Total Cost of Stay
                </Label>
                <Input type='text' name='TotalCostofStay' id='EmailMulti' placeholder='TotalCostofStay' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='EmailMulti'>
                  Arrival Time
                </Label>
                <Input type='text' name='ArrivalTime' id='EmailMulti' placeholder='Arrival Time' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='EmailMulti'>
                  Package
                </Label>
                <Input type='text' name='Package' id='EmailMulti' placeholder='Package' />
              </Col>
              <Col md='4' sm='8' className='name'>
                <Label className='label' for='EmailMulti'>
                  Inventory Items
                </Label>
                <Input type='text' name='InventoryItems' id='EmailMulti' placeholder='Inventory Items' />
              </Col>
              <Col sm='12'>
                <div className='button'>
                  
                </div>
              </Col>
            </Row>
            </Row>
          </Form>
        </CardBody>
      </Card>

     
      </div>

    </div>
  )
}
export default MultipleColumnForm
