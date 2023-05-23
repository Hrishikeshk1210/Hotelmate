// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import "./profile.scss"

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Manage Profile</CardTitle>
      </CardHeader>

      <CardBody>
      <Form>            
            <b><hr width="100%"></hr></b>
            <br></br>
            <br></br>
          <Row>
            <Col md='4' sm='8' aria-required className='mb-1'>
              <Label className='label' for='nameMulti'>
               View By
              </Label>
              <Input type='text' name='View By' id='nameMulti' placeholder='View By' />
            </Col>              
            <Col md='4' sm='8' className='mb-1'>
              <Label className='label' for='CompanyMulti'>
              State
              </Label>
              <Input type='text' name='State' id='CompanyMulti' placeholder=' State' />
            </Col>  
            <Col md='4' sm='8' className='mb-1'>
            <Label className='label' for='CountryMulti'>
                Membership Levels
              </Label>
              <Input type='text' name='Membership Levels' id='CompanyMulti' placeholder=' Membership Levels' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Profile Numbers
              </Label>
              <Input type='text' name='Profile Numbers' id='CompanyMulti' placeholder='Profile Numbers' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Postal Code
              </Label>
              <Input type='number' name='Postal Code' id='CompanyMulti' placeholder='Postal Code' />
            </Col>
            <Col md='4' sm='8' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Birth Date
              </Label>
              <Input type='date' name='Birth Date' id='cityMulti' placeholder='Birth Date' />
            </Col>
            <Col md='4' sm='8' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
               Name  
              </Label>
              <Input type='text' name='Name' id='lastNameMulti' placeholder='Name ' />
            </Col>
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Keyword
              </Label>
              <Input type='text' name='Keyword' id='CompanyMulti' placeholder=' Keyword' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                 Client ID
              </Label>
              <Input type='number' name='Client ID' id='CompanyMulti' placeholder=' Client ID' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Membership Levels
              </Label>
              <Input type='text' name='Membership Levels' id='CompanyMulti' placeholder=' Membership Levels' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Arrival Time
              </Label>
              <Input type='time' name='Arrival Time' id='CompanyMulti' placeholder=' Arrival Time' />
            </Col>  
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Communication
              </Label>
              <Input type='text' name='Communication' id='CompanyMulti' placeholder=' Communication' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Business Segment
              </Label>
              <Input type='text' name='Business Segment' id='CompanyMulti' placeholder=' Business Segment' />
            </Col>
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' aria-required for='nameMulti'>
              Address
              </Label>
              <Input type='text' name='Address' id='nameMulti' placeholder='Address' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                ID Number
              </Label>
              <Input type='number' name='ID Number' id='CompanyMulti' placeholder=' ID Number' />
            </Col>             
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
              A/R Number
              </Label>
              <Input type='text' name='A/R Number' id='CompanyMulti' placeholder=' A/R Number' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Country Region
              </Label>
              <Input type='text' name='Country Region' id='CompanyMulti' placeholder=' Country Region' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Membership Number
              </Label>
              <Input type='text' name='Membership Number' id='CompanyMulti' placeholder=' Membership Number' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Tax ID
              </Label>
              <Input type='text' name='Tax ID' id='CompanyMulti' placeholder=' Tax ID' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              City    
              </Label>
              <Input type='text' name='City' id='CompanyMulti' placeholder='Select City' />            
            </Col>
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Membership Type
              </Label>
              <Input type='text' name='Membership Type' id='CompanyMulti' placeholder='Membership Type' />
            </Col> 
            <Col md='4' sm='8' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                Owner
              </Label>
              <Input type='text' name='Owner' id='CompanyMulti' placeholder='Owner' />
            </Col>  
                
            <Col sm='6'>                
            <div className='buttons'>            
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Reset
                </Button>
                <Button outline color='secondary' type='reset'>
                  Select
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
