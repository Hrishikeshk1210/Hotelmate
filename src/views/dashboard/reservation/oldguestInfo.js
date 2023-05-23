// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Guest Information</CardTitle>
            </CardHeader>
            <b><hr width="90%"></hr></b>
            <CardBody>
                <Form>
                    <Row>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='nameMulti'>
                                Reservation Type
                            </Label>
                            <Input type='text' name='Reservation Type' id='nameMulti' placeholder='Reservation Type' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='lastNameMulti'>
                                Room Type
                            </Label>
                            <Input type='text' name='Room Type' id='lastNameMulti' placeholder='Room Type' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='cityMulti'>
                                Waitlist Reason
                            </Label>
                            <Input type='text' name='Waitlist' id='cityMulti' placeholder='Waitlist Reason' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='CountryMulti'>
                                Market
                            </Label>
                            <Input type='text' name='Market' id='CountryMulti' placeholder='Market' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='CompanyMulti'>
                                Rate
                            </Label>
                            <Input type='text' name='Rate' id='CompanyMulti' placeholder='Rate' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='cityMulti'>
                                Waitlist Comment
                            </Label>
                            <Input type='text' name='Waitlist' id='cityMulti' placeholder='Waitlist Comment' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Source
                            </Label>
                            <Input type='text' name='Source' id='EmailMulti' placeholder='Source' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Total Cost of Stay
                            </Label>
                            <Input type='text' name='TotalCostofStay' id='EmailMulti' placeholder='TotalCostofStay' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Arrival Time
                            </Label>
                            <Input type='text' name='ArrivalTime' id='EmailMulti' placeholder='Arrival Time' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Package
                            </Label>
                            <Input type='text' name='Package' id='EmailMulti' placeholder='Package' />
                        </Col>
                        <Col md='4' sm='8' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Inventory Items
                            </Label>
                            <Input type='text' name='InventoryItems' id='EmailMulti' placeholder='Inventory Items' />
                        </Col>
                        <Col sm='12'>
                            <div className='d-flex'>
                                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}
export default MultipleColumnForm
