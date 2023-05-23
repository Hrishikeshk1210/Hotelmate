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

const viewbyName = [

    { value: 'name', label: 'name' },
  //   { value: 'orange', label: 'Orange' }
]


const countryOptions = [

  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'India', label: 'India' },
  { value: 'Others', label: 'Others' },
  //   { value: 'red', label: 'Red' },
  //   { value: 'orange', label: 'Orange' }
]

const stateOptions = [

  { value: 'AndraPradesh', label: 'AndraPradesh' },
  { value: 'Gujrat', label: 'Gujrat' },
  { value: 'Jammu Kashmir', label: 'Jammu Kashmir' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerla', label: 'Kerla' },
  { value: 'MadyaPradesh', label: 'MadyaPradesh' },
  { value: 'Maharastra', label: 'Maharastra' },
  { value: 'TamilNaidu', label: 'TamilNaidu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Uttarpradesh', label: 'Uttarpradesh' },
  
]

const defaultValues = {
  name: '',
  // viewby:null,
  // profileNumber: '',
  membershipLevel:'',
  membershipNumber:'',
  membershipType: '',
  // clientId: '',
  address: '',
  country: null,
  state: null,
  postalcode: '',
  idNumber: '',
  // communication: '',
  // businessSegment: '',
  arrivalTime: '',
  // ARnumber:'',
  // taxId:'',
  // owner: ''


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
    if (data.name.length && data.profileNumber !== null && data.membershipType !== null && data.address.length) {

      console.log(data)
      let createmarketGroup = JSON.stringify({
        "name": data.name,
        // "viewBy": data.viewby.value,
        // "profileNumber": data.profileNumber,
        "membershipLevel": data.membershipLevel,
        "membershipNumber": data.membershipNumber,
        "membershipType": data.membershipType,
        // "clientID": data.clientId,
        "address": data.address,
        "country": data.country.value,
        "state": data.state.value,
        "postalCode": data.postalcode,
        "idNumber": data.idNumber,
        // "communication": data.communication,
        // "businessSegment": data.businessSegment,        
        "arrivalTime": data.arrivalTime,
        // "ARNumber":data.ARNumber,
        // "taxID": data.taxId,
        // "owner": data.owner,

      })
      console.log(createmarketGroup)
      let res = fetch("http://192.168.1.33:14700/mangeProfile", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res)
      });
    }
    toast(
      <div className='d-flex'>
        <p> Submitted</p>
      </div>
    )
  }


  const handleReset = () => {
    reset({
      name: '',
      // viewby:null,
      // profileNumber: '',
      membershipLevel:'',
      membershipNumber:'',
      membershipType: '',
      // clientId: '',
      address: '',
      country: null,
      state: null,
      postalcode: '',
      idNumber: '',
      // communication: '',
      // businessSegment: '',
      arrivalTime: '',
      // ARNumber:'',
      // taxId:'',
      // owner: ''

    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Manage Profile </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          < Row>

            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Name
                </Label>
                <Controller
                
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => <Input placeholder=' Name' invalid={errors.name && true} {...field}
                  value={'Nayanaa'} 
                  disabled={true}/>}
                />
              </div>
            </Col>
            {/* <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='viewby'>
                  View By
                </Label>
                <Controller
                  id='viewby'
                  control={control}
                  name='viewby'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={viewbyName}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.viewby === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col> */}
            {/* <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='profileNumber'>
                  Profile Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='profileNumber'
                  name='profileNumber'
                  render={({ field }) => <Input placeholder='Profile Number' invalid={errors.profileNumber && true} {...field} />}
                />
              </div>
            </Col> */}
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='membershipLevel'>
                  Membership Level
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='membershipLevel'
                  name='membershipLevel'
                  render={({ field }) => <Input placeholder=' Membership Level' invalid={errors.membershipLevel && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='membershipNumber'>
                  Membership Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='membershipNumber'
                  name='membershipNumber'
                  render={({ field }) => <Input placeholder=' Membership Number' invalid={errors.membershipNumber && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='membershipType'>
                  Membership Type
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='membershipType'
                  name='nmembershipTypeame'
                  render={({ field }) => <Input placeholder=' Membership Type' invalid={errors.membershipType && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='clientId'>
                  Client ID
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='clientId'
                  name='clientId'
                  render={({ field }) => <Input placeholder=' Client ID' invalid={errors.clientId && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='address'
                  name='address'
                  render={({ field }) => <Input placeholder='Address' invalid={errors.address && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Controller
                  id='country'
                  control={control}
                  name='country'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={countryOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='state'>
                  State
                </Label>
                <Controller
                  id='state'
                  control={control}
                  name='state'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={stateOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.state === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='postalcode'>
                  Postalcode
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='postalcode'
                  name='postalcode'
                  render={({ field }) => <Input placeholder='postalcode' invalid={errors.postalcode && true} {...field} />}
                />
              </div>
            </Col>
            <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='idNumber'>
                  ID Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='idNumber'
                  name='idNumber'
                  render={({ field }) => <Input placeholder=' ID Number' invalid={errors.idNumber && true} {...field} />}
                />
              </div>
            </Col>
            {/* <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='communication'>
                  Communication
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='communication'
                  name='communication'
                  render={({ field }) => <Input placeholder=' Communication' invalid={errors.name && true} {...field} />}
                />
              </div>
            </Col> */}
            {/* <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='businessSegment'>
                  Business Segment
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='businessSegment'
                  name='businessSegment'
                  render={({ field }) => <Input placeholder='Business Segment' invalid={errors.profileNumber && true} {...field} />}
                />
              </div>
            </Col> */}
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
                  render={({ field }) => <Input placeholder='arrivalTime' invalid={errors.arrivalTime && true} {...field} />}
                />
              </div>
            </Col>
            {/* <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for=' ARNumber'>
                  A/R Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id=' ARNumber'
                  name=' ARNumber'
                  render={({ field }) => <Input placeholder=' A/R Number' invalid={errors.ARNumber && true} {...field} />}
                />
              </div>
            </Col> */}


            {/* <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='taxId'>
                  Tax ID
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='taxId'
                  name='taxId'
                  render={({ field }) => <Input placeholder='Tax ID' invalid={errors.postalcode && true} {...field} />}
                />
              </div>
            </Col> */}
            {/* <Col md='4' sm='8'>
              <div className='mb-1'>
                <Label className='form-label' for='owner'>
                  Owner
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='owner'
                  name='owner'
                  render={({ field }) => <Input placeholder='owner' invalid={errors.owner && true} {...field} />}
                />
              </div>
            </Col> */}
            {/* <h2>HEllo</h2>          */}
            {/* <div className='buttons'> */}
            <div className='d-flex'>
              <Button className='me-1' outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
              <Button className='me-1' color='primary' type='submit'>
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
