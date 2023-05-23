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

// ** Reactstrap Imports
import { Input, Row, Col, Card, Form, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

import "./guestProfile.scss"
const reservationType = [
  { value: 'EP', label: 'EP' },
  { value: 'CP', label: 'CP' },
  //   { value: 'red', label: 'Red' },
  //   { value: 'orange', label: 'Orange' }
]

// const countryOptions = [

//   { value: 'Afghanistan', label: 'Afghanistan' },
//   { value: 'Albania', label: 'Albania' },
//   { value: 'Anguilla', label: 'Anguilla' },
//   { value: 'Antarctica', label: 'Antarctica' },
//   { value: 'Australia', label: 'Australia' },
//   { value: 'Bahamas', label: 'Bahamas' },
//   { value: 'India', label: 'India' },
//   { value: 'Others', label: 'Others' },
//   //   { value: 'red', label: 'Red' },
//   //   { value: 'orange', label: 'Orange' }
// ]

const roomTypes = [
  { value: 'TSUP', label: 'TSUP' },
  { value: 'EXE', label: 'EXE' },
  { value: 'KDLX', label: 'KDLX' },
  { value: 'TDLX', label: 'TDLX' },
  { value: 'KCLB', label: 'KCLB' },
  { value: 'PM', label: 'PM' }
]


// const stateOptions = [
//   { value: 'Jammu Kashmir', label: 'Jammu Kashmir' },
//   { value: 'Karnataka', label: 'Karnataka' },
//   { value: 'Kerla', label: 'Kerla' },
//   { value: 'Maharastra', label: 'Maharastra' },

//   { value: 'TamilNaidu', label: 'TamilNaidu' },
//   { value: 'Telangana', label: 'Telangana' },
//   { value: 'Uttarpradesh', label: 'Uttarpradesh' },
//   // { value: 'India', label: 'India' },
//   // { value: 'Others', label: 'Others' },
//   //   { value: 'red', label: 'Red' },
//   //   { value: 'orange', label: 'Orange' }
// ]

const defaultValues = {
  reservationType: '',
  roomType: '',
  waitlistReason: '',      
  market: '',
  rate: '',
  waitlistComment: '',
  source: '',
  agent: '',     
  origin: '',
  totalCostOfStay: '',
  arrivalTime: '',
  package: '',
  inventoryItems: ''


}

const ValidationThirdPartyComponents = () => {
  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()



  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    // if (data.reservationType.length && data.waitlistReason !== null && data.idType !== null && data.phoneNumber.length) {

      console.log(data)
      let createmarketGroup = JSON.stringify({
        "reservationType": data.reservationType.value,
        "roomType": data.roomType.value,
        "waitlistReason": data.waitlistReason,
        "market": data.market,
        "rate": data.rate,
        "waitlistComment": data.waitlistComment,       
        "source": data.source,
        "agent": data.agent,
        "origin": data.origin,
        "totalCostOfStay": data.totalCostOfStay,
        "arrivalTime": data.arrivalTime,
        "package": data.package,
        "inventoryItems": data.inventoryItems,
        
      })
      console.log(createmarketGroup)
      let res = fetch("http://localhost:14700/bookingDetails", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res)
      });
    // }
    toast(
      <div className='d-flex'>
        <p> Submitted</p>
      </div>
    )
  }


  const handleReset = () => {
    reset({
      reservationType: '',
      roomType: '',
      waitlistReason: '',      
      market: '',
      rate: '',
      waitlistComment: '',
      source: '',
      agent: '',     
      origin: '',
      totalCostOfStay: '',
      arrivalTime: '',
      package: '',
      inventoryItems: ''

    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Booking Details</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          < Row>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='reservationType'>
                  Reservation Type
                </Label>
                <Controller
                  id='reservationType'
                  control={control}
                  name='reservationType'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={reservationType}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.reservationType === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='roomType'>
                  Room Type
                </Label>
                <Controller
                  id='roomType'
                  control={control}
                  name='roomType'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={roomTypes}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.roomType === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for=' waitlistReason'>
                  Waitlist Reason
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id=' waitlistReason'
                  name=' waitlistReason'
                  render={({ field }) => <Input placeholder='Waitlist Reason' invalid={errors.waitlistReason && true} {...field} />}
                />
              </div>
            </Col>


            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='market'>
                  Market
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='market'
                  name='market'
                  render={({ field }) => <Input placeholder=' Market ' invalid={errors.market && true} {...field} />}
                />
              </div>
            </Col>

            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for=' rate'>
                  Rate
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id=' rate'
                  name=' rate'
                  render={({ field }) => <Input placeholder='Rate ' invalid={errors.rate && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='  waitlistComment'>
                  Waitlist Comment
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='  waitlistComment'
                  name='  waitlistComment'
                  render={({ field }) => <Input placeholder='  Waitlist Comment' invalid={errors.waitlistComment && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for=' source'>
                  Source
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id=' source'
                  name=' source'
                  render={({ field }) => <Input placeholder=' Source' invalid={errors.source && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for=' agent'>
                  Agent 
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id=' agent'
                  name=' agent'
                  render={({ field }) => <Input placeholder='Agent' invalid={errors.agent && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for=' origin'>
                  Origin
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id=' origin'
                  name=' origin'
                  render={({ field }) => <Input placeholder=' Origin' invalid={errors.origin && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='totalCostofStay'>
                  Total Cost of Stay
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='totalCostofStay'
                  name='totalCostofStay'
                  render={({ field }) => <Input placeholder='Total Cost of Stay' invalid={errors.totalCostofStay && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='arrivalTime'>
                  Arrival Time
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='arrivalTime'
                  name='arrivalTime'
                  render={({ field }) => <Input placeholder='Arrival Time' invalid={errors.arrivalTime && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='package'>
                  Package
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='package'
                  name='package'
                  render={({ field }) => <Input placeholder='Package' invalid={errors.package && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='inventoryItems'>
                  Inventory Items
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='inventoryItems'
                  name='inventoryItems'
                  render={({ field }) => <Input placeholder='Inventory Items' invalid={errors.inventoryItems && true} {...field} />}
                />
              </div>
            </Col>
            {/* <h2>HEllo</h2>          */}
            {/* <div className='buttons'> */}
            <div className='d-flex'>
              <Button className='me-1' outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
              <Button color='primary' type='submit'>
                Submit
              </Button>

            </div>

            {/* </div> */}
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default ValidationThirdPartyComponents
