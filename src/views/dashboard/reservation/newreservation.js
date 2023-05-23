// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import toast from 'react-hot-toast'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { Check } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'
import Moment from 'moment';
// ** Reactstrap Imports
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

import "./newreservation.scss"
// import App from "./datagrid"
const colourOptions = [
  { value: '1', label: '1 (One)' },
  { value: '2', label: '2(two)' },
  { value: '3', label: '3(three)' },
  { value: '4', label: '4(four)' },
  { value: '5', label: '5( five)' }
]

const children = [
  { value: '0', label: '0 (Zero)' },
  { value: '1', label: '1 (One)' },
  { value: '2', label: '2(two)' },
  { value: '3', label: '3(three)' },
  { value: '4', label: '4(four)' },
  { value: '5', label: '5( five)' }
]

const defaultValues = {
  checkIn: null,
  checkOut: null,
  adult: null,
  children: null,
  quantity: null
}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)
// On submit data check
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  const onSubmit = data => {
    setData(data)
    if (data.checkIn !== null && data.checkOut !== null && data.adult !== null && data.children !== null && data.quantity !== null) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        "checkIn": (Moment(String(new Date(data.checkIn[0]))).format('YYYY-MM-DD')),
        "checkOut":(Moment(String(new Date(data.checkOut[0]))).format('YYYY-MM-DD')),
        "adults": data.adult.value,
        "children": data.children.value,
        "quantity": data.quantity.value,       
      })
      console.log(createmarketGroup)
      let res = fetch("http://192.168.1.33:14700/addDummyReservation", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res)
      });
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <ul className='list-unstyled mb-0'>
             <p> FORM SUBMITTED SUCCESSFULLY</p>

            </ul>
          </div>
        </div>
      )
    }
    setIsSubmitted(true);
  }

  const handleReset = () => {
    window.location.reload();
    // reset({
    //   checkIn: null,
    //   checkOut: null,
    //   adult: null,
    //   children: null,
    //   quantity: null
    // })
  }

  return (
    
<div>
    <Card>
      {/* <CardHeader>
        <CardTitle tag='h4'> </CardTitle>
      </CardHeader> */}
      <CardBody>
     
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='2' sm='5'>
              <div className='mb-1'>
                <Label className='form-label' for='checkIn'>
                  Check In
                </Label>
                <Controller
                  control={control}
                  id='checkIn'
                  name='checkIn'
                  render={({ field }) => (
                    <Flatpickr                  
                      // value={' '} 
                      disabled={isSubmitted}
                      {...field}
                      
                      options={{ allowInput: true }}  placeholder='YYYY-MM-DD '
                      className={classnames('form-control', {
                        'is-invalid': data !== null && data.checkIn === null
                      })}
                    />
                  )}
                />
              </div>

            </Col>

            <Col md='2' sm='5'>
              <div className='mb-1'>
                <Label className='form-label' for='checkOut'>
                  Check Out
                </Label>
                <Controller
                  control={control}
                  id='checkOut'
                  name='checkOut'
                  render={({ field }) => (
                    <Flatpickr
                    disabled={isSubmitted}
                      {...field}
                      options={{ allowInput: true }}  placeholder='YYYY-MM-DD '
                      className={classnames('form-control', {
                        'is-invalid': data !== null && data.checkOut === null
                      })}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='2' sm='5'>
              <div className='mb-1'>
                <Label className='form-label' for='adult'>
                  Adults
                </Label>
                <Controller
                  id='adult'
                  control={control}
                  name='adult'                 
                  render={({ field }) => (
                    <Select
                      isSubmitted
                      isClearable
                      options={colourOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.adult === null })}
                      // disabled={isSubmitted}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='2' sm='5'>
              <div className='mb-1'>
                <Label className='form-label' for='children'>
                  Children
                </Label>
                <Controller
                  id='children'
                  control={control}                 
                  name='children'
                  render={({ field }) => (
                    <Select
                    disabled={true}
                      isClearable                   
                      options={children}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                     
                      className={classnames('react-select', { 'is-invalid': data !== null && data.children === null})}
                     
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='2' sm='5'>
              <div className='mb-1'>
                <Label className='form-label' for='quantity'>
                  Number of Rooms
                </Label>
                <Controller
                  id='quantity'
                  control={control}
                  name='quantity'
                  render={({ field }) => (
                    
                    <Select
                    disabled={isSubmitted}  
                      isClearable
                      options={colourOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.quantity === null })}                                          
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <div align='end' className='buttons'>          
          <Button outline  className='me-1' color='secondary' type='reset' onClick={handleReset}>
              Start Over
            </Button>
            <Button color='primary' type='submit'>
              Continue
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>

    </div>
  )
}

export default ValidationThirdPartyComponents
