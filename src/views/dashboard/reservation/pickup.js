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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// import App from "./datagrid"
const pickupDropOptions = [
  { value: 'pickupRequired', label: 'Yes' },
  { value: 'No', label: 'No' },

]

const dropOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },

]

const defaultValues = {
  // hotelID: '',
  pickupRequired: null,
  pickUpTime: '',
  pickUpLocation: '',
  dropRequired: null,
  dropTime: '',
  dropLocation: '',
}

const ValidationThirdPartyComponents = () => {

  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()


  // const [selectedValue, setSelectedOption] = useState('');

  // const handleDropdownChange = (event) => {
  //   setSelectedOption(event.value);

  //   console.log(event.value); // print the selected value to console
  //   if (selectedValue == 'pickupRequired') {
  //     console.log("hi")
  //     //         setitemOptions([{ value: "1", label: "Active" }]) 
  //   }
  //   else {

  //     //         setitemOptions({ value: "0", label: "InActive" })
  //   }
  // };


  // const handleDropdownChange1 = (event) => {
  //   setSelectedOption(event.value);

  //   console.log(event.value); // print the selected value to console
  //   if (selectedValue == 'Yes') {
  //     console.log("hi")
  //     //         setitemOptions([{ value: "1", label: "Active" }]) 
  //   }
  //   else {

  //     //         setitemOptions({ value: "0", label: "InActive" })
  //   }
  // };




  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.pickupRequired != null && data.dropRequired != null) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,

        "pickUpDetails": data.pickupRequired.value,
        "pickUpTime": data.pickUpTime,
        "pickUpLocation": data.pickUpLocation,
        "dropDetails": data.dropRequired.value,
        "dropTime": data.dropTime,
        "dropLocation": data.dropLocation,
      })
      console.log(createmarketGroup)
      let res = fetch("http://192.168.1.33:14700/pickUp", {
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
              {/* <li>
                <strong>Hotel ID</strong>: {data.hotelID}
              </li> */}
              {/* <li>
                <strong>Market Group</strong>: {data.marketGroup}
              </li>
              <li>
                <strong>Description</strong>: {data.description}
              </li>
              <li>
                <strong>Active Status</strong>: {data.pickupRequired.value}
              </li> */}
            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      // hotelID: '',
      pickupRequired: null,
      pickUpTime: '',
      pickUpLocation: '',
      dropRequired: null,
      dropTime: '',
      dropLocation: '',
    })
  }

  const handleEdit = () => {
    let addAccount = [
  // fetch('http://localhost:14702/updatePickUpDetails?hotelID=1')
  // .then(result => result.json())
  // .then(resp => {
  //   // console.log(resp['data'])
  //   addAccount = resp['data']
  //   console.log(addAccount)
  // })
]
  }


  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='hotelID'>
                  Hotel ID
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.hotelID === null || !data.hotelID.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='hotelID'
                    name='hotelID'
                    control={control}
                    placeholder='hotelID'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.hotelID === null || !data.hotelID.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col> */}




              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='pickupRequired'>
                    Pickup Required
                  </Label>
                  <Controller
                    id='pickupRequired'
                    control={control}
                    name='pickupRequired'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={pickupDropOptions}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.pickupRequired === null })}
                        disabled={true} 
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
                      

              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="pickUpTime">
                    PickUp Time
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='pickUpTime'
                    name='pickUpTime'
                    render={({ field }) => <Input placeholder='pickUpTime'

                      invalid={errors.pickUpTime && true} {...field} />}
                  />
                </div>
              </Col>
              
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="pickUpLocation">
                    PickUp Locaton
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='pickUpLocation'
                    name='pickUpLocation'
                    render={({ field }) => <Input placeholder='pickUpLocation'
                      invalid={errors.pickUpLocation && true} {...field} />}
                  />
                </div>
              </Col>


              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='dropRequired'>
                    Drop Required
                  </Label>
                  <Controller
                    id='dropRequired'
                    control={control}
                    name='dropRequired'
                    render={({ field }) => (
                      <Select
                      isClearable
                      options={pickupDropOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.dropRequired === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>

              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="dropTime">
                    Drop Time
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='dropTime'
                    name='dropTime'
                    render={({ field }) => <Input placeholder='dropTime'

                      invalid={errors.dropTime && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="dropLocation">
                    Drop Locaton
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='dropLocation'
                    name='dropLocation'
                    render={({ field }) => <Input placeholder='Drop Location'
                      invalid={errors.dropLocation && true} {...field} />}
                  />
                </div>
              </Col>



              <div className='d-flex'>
              <Button className='me-1' outline color='secondary' type='reset' onClick={handleReset}>
                  Reset
                </Button>
                <Button className='me-1' color='primary' type='submit'>
                  Continue
                </Button>
                <Button outline color='secondary' type='reset' onClick={handleEdit}>
                  Edit
                </Button>

              </div>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <App /> */}
    </div>
  )
}

export default ValidationThirdPartyComponents
