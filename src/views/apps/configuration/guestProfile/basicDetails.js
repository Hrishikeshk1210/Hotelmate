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
import Moment from 'moment';

// ** Custom Components
import Avatar from '@components/avatar'

import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

import ViewModal from "./preference"
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';

// const id = '1';

// import App from './datagrid'

const defaultValues = {
  salutation: null,
  name: '',
  email: '',
  phoneNumber: '',
  gstID: '',
  nationality: '',
  dob: '',
  vipID: null,
  addressOne: '',
  addressTwo: '',
  anniversary: '',
  companyID: null,
  country: null,
  state: null,
  notes: '',
  city: '',
  postalCode: '',
  guestpreferencenotes: null,  
 
  // guestType: null,
  // lastVisit: '',
  // isActive: null,
  // isBlackListed: null,
  // lastRateID: null,
  // lastRoomID: null,
  // negotiatedRateID: null,
}


let companyID = [
  fetch('http://192.168.1.33:14700/getGuestProfileCompanyID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      companyID = resp['data']
      // console.log(companyID)
    })
]

let lastRate = [
  fetch('http://192.168.1.33:14700/getGuestProfileLastRateID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      lastRate = resp['data']
      // console.log(lastRate)
    })
]

let lastRoomID = [
  fetch('http://192.168.1.33:14700/getGuestProfileLastRoomID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      lastRoomID = resp['data']
      // console.log(lastRoomID)
    })
]

let negotiated = [
  fetch('http://192.168.1.33:14700/getGuestProfileLastRoomID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      negotiated = resp['data']
      // console.log(negotiated)
    })
]

let vipID = [
  fetch('http://192.168.1.33:14700/getGuestProfileVipID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      vipID = resp['data']
      // console.log(vipID)
    })
]

let countryOptions = [
  fetch('http://192.168.1.33:14700/getGuestProfileCountry?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      countryOptions = resp['data']
      // console.log(vipID)
    })
]
const isBlackListed = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];

const guestTypes = [
  { value: "FIT", label: "FIT" },
  { value: "Corporate", label: "Corporate" },
];

const guestStatus = [
  { value: "CheckedIn", label: "CheckedIn" },
  { value: "CheckedOut", label: "CheckedOut" },
];


const salutations = [
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
  { value: "Mr", label: "Ms." },
  { value: "Dr", label: "Dr." },
];

const stateOptions = [
  { value: 'Daman', label: 'Daman' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'HimachalPradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu Kashmir', label: 'Jammu Kashmir' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Ladakh', label: 'Ladakh' },
  { value: 'Lakshadweep', label: 'Lakshadweep' },
  { value: 'MadhyaPradesh', label: 'Madhya Pradesh' },
  { value: 'Maharastra', label: 'Maharastra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Puducherry', label: 'Puducherry' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'TamilNaidu', label: 'TamilNaidu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Uttarpradesh', label: 'Uttarpradesh' },
]





const Floor = ({ stepper, type ,data1}) => {
  console.log(data1)
 

  // Ag Grid
  const [rowData, setRowData] = useState();

  const [centeredModal, setCenteredModal] = useState(false)

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Floor ', field: 'floor', suppressSizeToFit: true },
    { headerName: 'Block ID', field: 'blockID', suppressSizeToFit: true, maxWidth: 160 },
  ]);

  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));

  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/GuestProfile?hotelID=1')
      .then(result => result.json())
      .then(rowData => setRowData(rowData['data']))
  }, []);


  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()



  const updateRecord = async (formData) => {
    let res = fetch("http://192.168.1.33:14700/updateguestprofile", {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: createmarketGroup
  }).then(result => result.json())
  .then(resp => {
    localStorage.setItem('guestID',resp['data'])
    console.log(resp)
  }).catch((error) => {
    console.log(error)
  })
  };
  




  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    console.log(data)
    if (
      data.firstName !== null &&
      data.name !== null
    ) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        "salutation": data.salutation.label,
        "name": data.name,
        "email": data.emailBasic,
        "phoneNumber": data.phoneNumber,
        "gstID": data.gst,
        "nationality": data.nationalitylabel,
        "dob": (Moment(String(new Date(data.dob[0]))).format('YYYY-MM-DD')),
        "vipID": data.vipID.value,
        "addressOne": data.addressOne,
        "addressTwo": data.addressTwo,
        "anniversary": (Moment(String(new Date(data.anniversary[0]))).format('YYYY-MM-DD')),
        "companyID": data.companyID.value,
        "country": data.country.label,
        "state": data.state.value,
        "notes": data.notes,
        "city": data.city,
        "postalCode": data.postalCode,
        "guestpreferencenotes":data.guestpreferencenotes,
        
      })

      console.log(createmarketGroup)
      console.log("hi")
      // let res = fetch("http://192.168.1.33:14700/guestProfile", {
      //   method: "POST",
      //   headers: { 'Content-Type': 'application/json' },
      //   body: createmarketGroup
      // }).then((res) => {  
      //   //  let guestID = res['data']['id']
      // localStorage.setItem('guestID',res)
      //  console.log(guestID)
      //   console.log(res);
      //   if (res['status'] == 200) {
      //     fetch('http://192.168.1.33:14700/GuestProfile?hotelID=1')
      //       .then(result => result.json())
      //       .then(rowData => {
      //         setRowData(rowData['data'])
      //         console.log(rowData['data'])
      //       })
      //   }

      // });
      let res = fetch("http://192.168.1.33:14700/guestProfile", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then(result => result.json())
      .then(resp => {
        localStorage.setItem('guestID',resp['data'])
        console.log(resp)
      }).catch((error) => {
        console.log(error)
      })
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <h4>Floor Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      salutation: null,
      name: '',
      email: '',
      phoneNumber: '',
      gstID: '',
      nationality: '',
      dob: '',
      vipID: null,
      addressOne: '',
      addressTwo: '',
      anniversary: '',
      companyID: null,
      country: null,
      state: null,
      notes: '',
      city: '',
      postalCode: '',
      guestpreferencenotes: null,  
     
      // guestType: null,
      // lastVisit: '',
      // isActive: null,
      // isBlackListed: null,
      // lastRateID: null,
      // lastRoomID: null,
      // negotiatedRateID: null,
    })
  }

  window.onload = function() {
    localStorage.clear();
  };

  return (
    <div>
      <Card>
        {/* <CardHeader>
                    <CardTitle tag='h4'>Floor</CardTitle>
                </CardHeader> */}
        <CardBody>
          {/* {data1!='' && <h6>Salutation: {data1['salutation']}</h6>}
          {data1!='' && <h6>Name: {data1['name']}</h6>}
          {data1!='' && <h6>Email: {data1['email']}</h6>}
          {data1!='' && <h6>Phone Number: {data1['phoneNumber']}</h6>}
          {data1!='' && <h6>GST ID: {data1['gstID']}</h6>}
          {data1!='' && <h6>Nationality: {data1['nationality']}</h6>}
          {data1!='' && <h6>DOB: {data1['dob']}</h6>}
          {data1!='' && <h6>VIP ID : {data1['vipID']}</h6>}
          {data1!='' && <h6>Aaddress One: {data1['addressOne']}</h6>}
          {data1!='' && <h6>Address Two: {data1['addressTwo']}</h6>}
          {data1!='' && <h6>Anniversary Date: {data1['anniversary']}</h6>}
          {data1!='' && <h6>Company ID: {data1['companyID']}</h6>}
          {data1!='' && <h6>Country: {data1['country']}</h6>}
          {data1!='' && <h6>State: {data1['state']}</h6>} */}
          <Form onSubmit={handleSubmit(onSubmit)}>
          
            <Row>
              <Col md='3' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="salutation">
                    Salutation
                  </Label>
                  <Controller
                    id="salutation"
                    control={control}
                    name="salutation"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={salutations}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.salutation === null,
                        })}
                        {...field}
                        // value={data1['salutation']}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='name'>
                    Name
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='name'
                    name='name'
                    render={({ field }) => <Input placeholder='Name' invalid={errors.name && true} {...field}
                    value={data1['name']} 
                    />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='emailBasic'>
                    Email
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='emailBasic'
                    name='emailBasic'
                    render={({ field }) => (
                      <Input
                        type='email'
                        placeholder='bruce.wayne@email.com'
                        invalid={errors.emailBasic && true}
                        {...field}
                        value={data1['email']}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='phonenumber'>
                    Phone Number
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
                      })}
                    >
                      IN (+91)
                    </InputGroupText>
                    <Controller
                      id='phone-number'
                      name='phoneNumber'
                      control={control}
                      placeholder='1 234 567 8900'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          value={data1['phoneNumber']}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
                          })}
                          options={{ phone: true, phoneRegionCode: 'IN' }}
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='gst'>
                    GST Number
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='gst'
                    name='gst'
                    render={({ field }) => <Input placeholder='gst' invalid={errors.gst && true} {...field}
                    value={data1['gstID']}
                     />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='nationality'>
                    Nationality
                  </Label>
                  <Controller
                    id='nationality'
                    control={control}
                    name='nationality'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={countryOptions}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.nationality === null })}
                        {...field}
                        value={data1['nationality']}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='dob'>
                    DOB
                  </Label>
                  <Controller
                    control={control}
                    id='dob'
                    name='dob'
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        value={data1['dob']}
                        options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                        className={classnames('form-control', {
                          'is-invalid': data !== null && data.dob === null
                        })}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className="mb-1">
                  <Label className="form-label" for="vipID">
                    VIP ID
                  </Label>
                  <Controller
                    id="vipID"
                    control={control}
                    name="vipID"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={vipID}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.vipID === null,
                        })}
                        {...field}
                        value={data1['vipID']}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='addressOne'>
                    Address 1
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressOne'
                    name='addressOne'
                    render={({ field }) => <Input placeholder='Address 1' invalid={errors.addressOne && true} 
                    {...field}
                    value={data1['addressOne']}
                     />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='addressTwo'>
                    Address 2
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressTwo'
                    name='addressTwo'
                    render={({ field }) => <Input placeholder='Address 2' invalid={errors.addressTwo && true} 
                    {...field} 
                    value={data1['addressTwo']}
                    />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='anniversary'>
                    Anniversary
                  </Label>
                  <Controller
                    control={control}
                    id='anniversary'
                    name='anniversary'
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        value={data1['anniversary']}

                        options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                        className={classnames('form-control', {
                          'is-invalid': data !== null && data.anniversary === null
                        })}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className="mb-1">
                  <Label className="form-label" for="companyID">
                    Company ID
                  </Label>
                  <Controller
                    id="companyID"
                    control={control}
                    name="companyID"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={companyID}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.companyID === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col>
                <Row md='4' sm='12'>
                  <Col md='3' sm='12'>
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
                  <Col md='3' sm='12'>
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
                  <Col md='6' sm='12' className='mb-1'>
                    <div className='mb-1'>
                      {/* <Label className='form-label' for='notes'>
                          Profile Notes
                        </Label> */}
                      <Controller
                        defaultValue=''
                        control={control}
                        id='notes'
                        name='notes'
                        render={({ field }) =>
                          // <textarea  rows="4" cols="23">
                          // Notes
                          // </textarea>
                          <InputGroup>
                            <InputGroupText>Profile Notes</InputGroupText>
                            <Input placeholder=' notes'
                              type='textarea'
                              pattern='[A-Za-z_]{1,15}'
                              title=" notes can contain alphabets . It cannnot contain numbers and special characters." 
                              invalid={errors.notes && true} {...field}
                              value={data1['notes']}
                            />
                          </InputGroup>
                        }
                      />
                    </div>
                  </Col>

                  {/* </Row> */}
                  {/* <Row md='4' sm='12'> */}
                  <Col md='3' sm='12'>
                    <div className='mb-1'>
                      <Label className='form-label' for='city'>
                        City
                      </Label>
                      <Controller
                        defaultValue=''
                        control={control}
                        id='city'
                        name='city'
                        render={({ field }) => <Input placeholder='City' invalid={errors.city && true} {...field} 
                        value={data1['city']}
                        />}
                      />
                    </div>
                  </Col>
                  <Col md='3' sm='12'>
                    <div className='mb-1'>
                      <Label className='form-label' for='postalCode'>
                        PostalCode
                      </Label>
                      <Controller
                        defaultValue=''
                        control={control}
                        id='postalCode'
                        name='postalCode'
                        render={({ field }) => <Input placeholder='postalCode' invalid={errors.postalCode && true} 
                        {...field} 
                        value={data1['postalCode']}
                        />}
                      />
                    </div>
                  </Col>
                  <Col md='6' sm='12' className='mb-1'>
                    <div className='mb-1'>
                      {/* <Label className='form-label' for='guestpreferencenotes'>
                          Guest Preference Notes
                        </Label> */}
                      <Controller
                        defaultValue=''
                        control={control}
                        id='guestpreferencenotes'
                        name='guestpreferencenotes'
                        render={({ field }) =>
                          <InputGroup>
                            <InputGroupText>Guest Preference Notes</InputGroupText>
                            <Input placeholder=' guestpreferencenotes'
                              type='textarea'
                              // pattern='[A-Za-z_]{1,15}'
                              // title=" guestpreferencenotes can contain alphabets . It cannnot contain numbers and special characters." required
                              invalid={errors.guestpreferencenotes && true} {...field} 
                              value={data1['guestpreferencenotes']}
                              />
                          </InputGroup>

                        }
                      />

                    </div>
                  </Col>
                </Row>
              </Col>




              {/* <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="guestStatus">
                    Guest Status
                  </Label>
                  <Controller
                    id="guestStatus"
                    control={control}
                    name="guestStatus"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={guestStatus}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.guestStatus === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}
              {/* <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="lastRateID">
                    Last Rate ID
                  </Label>
                  <Controller
                    id="lastRateID"
                    control={control}
                    name="lastRateID"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={lastRate}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.lastRateID === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}
              {/* <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="lastRoomID">
                    Last Room ID
                  </Label>
                  <Controller
                    id="lastRoomID"
                    control={control}
                    name="lastRoomID"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={lastRoomID}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.lastRoomID === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}
              {/* <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="negotiated">
                    Negotiated ID
                  </Label>
                  <Controller
                    id="negotiated"
                    control={control}
                    name="negotiated"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={negotiated}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.negotiated === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}
              {/* <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="guestType">
                    Guest Type
                  </Label>
                  <Controller
                    id="guestType"
                    control={control}
                    name="guestType"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={guestTypes}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.guestType === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}
              {/* <Col md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='lastVisit'>
                    Last Visit
                  </Label>
                  <Controller
                    control={control}
                    id='lastVisit'
                    name='lastVisit'
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                        className={classnames('form-control', {
                          'is-invalid': data !== null && data.lastVisit === null
                        })}
                      />
                    )}
                  />
                </div>
              </Col> */}
              {/* <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="isActive">
                    Is Active
                  </Label>
                  <Controller
                    id="isActive"
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={activeoptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.isActive === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}
              {/* <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="isBlackListed">
                    Black Listed
                  </Label>
                  <Controller
                    id="isBlackListed"
                    control={control}
                    name="isBlackListed"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={isBlackListed}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.isBlackListed === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}


            </Row>
            <div className='vertically-centered-modal'>
              {/* <Button color='primary' outline onClick={() => setCenteredModal(!centeredModal)}>
          Vertically Centered
        </Button> */}
              <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-xl'>
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Vertically Centered</ModalHeader>
                <ModalBody>
                  <ViewModal />
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
                    Accept
                  </Button>{' '}
                </ModalFooter>
              </Modal>
            </div>
            <div className='d-flex justify-content-between'>
 
{/* 
            <Button color='secondary' className='btn-prev' disabled>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
              </Button> */}

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
              <Button outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
            </div>
           
              {/* <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>View Details</Button> */}


              <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      {/* <div className="ag-theme-alpine" style={{ height: 520 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    // paginationAutoPageSize = 'true'
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div> */}



    </div>
  )
}

export default Floor;
