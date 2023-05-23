import React, { Fragment, useState, useRef, useEffect, useMemo, useCallback } from 'react'

import Profile from './profile'
import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Moment from 'moment'
import toast from 'react-hot-toast'
import Avatar from '@components/avatar'
import { Check } from 'react-feather'
import { useNavigate } from "react-router-dom"

import * as ReactDOM from 'react-dom'


// ** Reactstrap Imports
import {
   AccordionBody, AccordionHeader, AccordionItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Label, Accordion, InputGroup, NavLink
} from 'reactstrap'


import ConfirmedDetails from "./confirmedDetails"
// import "./card.scss"

import { AgGridReact } from 'ag-grid-react'
// import 'ag-grid-enterprise'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

localStorage.removeItem('reservationid')
localStorage.removeItem('guestProfileID')
localStorage.removeItem('package')
localStorage.removeItem('companyID')

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


const Origin = [
  { value: '0', label: 'Email' },
  { value: '1', label: 'Phone' },
  { value: '2', label: 'Walk-In' },
  { value: '3', label: 'House-Use' },
  { value: '4', label: 'Hotel-Reservation Office' },
  { value: '5', label: 'Online' }
]


const ReservationTypes = [
  { value: 1, label: 'CC-Credit Card Gtd' },
  { value: 2, label: 'Company Gtd' }, 
  { value: 3, label: 'Travel Agent Gtd' }, 
  { value: 4, label: 'Deposit Paid' }, 
  { value: 5, label: 'Bank/Debit Card' },
  { value: 6, label: 'House Use/COMP/Day Use' },
  { value: 7, label: 'Inquiry Only' }
]


let Features = [
  fetch('http://192.168.1.33:14700/getPrefernceOptions?hotelID=1')
  .then(result => result.json())
  .then(resp => {
    Features = resp['data']
    console.log(Features)
  })
]


let paymentName = [
  fetch('http://192.168.1.33:14700/getPayment?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      paymentName = resp['data']
    })
]


const pickupDropOptions = [
  { value: 'pickupRequired', label: 'Yes' },
  { value: 'No', label: 'No' }
]


let sourceCode = [
  fetch('http://192.168.1.33:14700/getSourceName?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      sourceCode = resp['data']
      // console.log(sourceCode)
    })
]


let Agent = [
  fetch('http://192.168.1.33:14700/getAgentList?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      Agent = resp['data']
      console.log(Agent)
    })
]

console.log(localStorage.getItem('companyID'))


let Booker = [
  fetch('http://192.168.1.33:14700/getBookerList?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      Booker = resp['data']
      console.log(Booker)
    })
]


let extraName = [
  fetch('http://192.168.1.33:14700/getExtraDescription?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      extraName = resp['data']
      console.log(extraName)
    })
]


const defaultValues = {
  // source,
  // companyid,
  // reservationid,
  checkIn: null,
  checkOut: null,
  adult: null,
  children: null,
  quantity: null
}


const defaultValues1 = {
  reservationid: '',
  source: '',
  companyID: ''
}


const defaultValues6 = {
  eta:'',
  etd:'',
  extras: null,
  resType:null,
  origin: null,
  agent: null,
  source: null,
  booker:null,
  features:null,
  package:localStorage.getItem('package'),
  market: null,
  comment: '',
  billingInstructions: ''
}


const defaultValues8 = {
  paymentTypeID: null,
  cardNumber: '',
  cardHolderName: '',
  expiryDate: '',
  cvv:''
}


let companyID = [
  fetch('http://192.168.1.33:14700/getAccountName?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      companyID = resp['data']
      console.log(companyID)
    })
]


const Companydetails = () => {
  // const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)
  const [source, setsource] = useState('')
  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()

  const [showDropdown, setShowDropdown] = useState(false)

  function handleRadioChange(event) {
    if (event.target.value === 'corporate') {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
    setsource(event.target.value)
  }

  function handleDropdownChange(event) {
    alert("company selected")
    // Do something with the selected value
  }

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues1 })

  const onSubmit = data => {
    setData(data)

    if (source !== null && source !== '') {

      if (source === 'corporate' && data.companyID !== null) {
        const corporate = JSON.stringify({
          // reservationid,
          source: 2,
          companyID: localStorage.getItem('companyID'),
          guestProfileID:localStorage.getItem('guestProfileID') 

        })
        // console.log(corporate)
        const res = fetch("http://192.168.1.33:14700/CompanyInformation", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: corporate
        }).then(result => result.json())
          .then(resp => {
            // console.log(resp)
            const floorList = resp['data']['reservationid']
            localStorage.setItem('source', resp['data']['source'])
            localStorage.setItem('reservationid', floorList)
            return resp['data']
          }).catch((error) => {
            console.log(error)
          })
      } else {
        const company = JSON.stringify({
          source: 1,
          companyID: 1,
          guestProfileID:localStorage.getItem('guestProfileID') 

        })
        const res = fetch("http://192.168.1.33:14700/CompanyInformation", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: company
        }).then(result => result.json())
          .then(resp => {
            localStorage.setItem('source', resp['data']['source'])
            const floorList = resp['data']['reservationid']
            localStorage.setItem('reservationid', floorList)
          }).catch((error) => {
            console.log(error)
          })
      }
    }
  }


  const handleReset = () => {
    reset({
      reservationid: "",
      source: '',
      companyID: ''
    })
  }

  return (
    <div>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className='name'>
                <div className='demo-inline-spacing'>
                  <div className='form-check'>
                    <Label className='form-check-label' for='ex1-active'>
                      <Input type="radio" name='ex1' value="fit" onChange={handleRadioChange} />
                      FIT
                    </Label>

                    <br></br>
                    <br></br>
                    <Label className='form-check-label'>
                      <Input type="radio" name='ex1' value="corporate" onChange={handleRadioChange} />
                      Corporate
                    </Label>
                  </div>
                </div>
              </Col>

            </Row>
            {showDropdown && (
              <div>
                <br></br>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    {/* <Label className='form-label' for='companyID'>
                    Name
                  </Label> */}
                    <Controller
                      defaultValue=''
                      control={control}
                      id='companyID'
                      name='companyID'
                      render={({ field }) => <Input placeholder='companyID' invalid={errors.companyID && true} {...field}
                        value={localStorage.getItem('companyname')} />}
                    />
                  </div>
                </Col>
              </div>
            )}

            <br></br>
            <div className='button'>
              <Button className='me-1' style={{align:'right'}} outline color='secondary' type='reset' onClick={handleReset} >
                Reset
              </Button>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>

    </div>
  )
  // }

}


const Extra = () => {

  const {
    setError,
    formState: { errors }
  } = useForm()

  let DefaultAgent = [
    fetch(`http://192.168.1.33:14701/getSourceOfReservation?companyid=${localStorage.getItem('companyID')}`)
      .then(result => result.json())
      .then(resp => {
        DefaultAgent = resp['data']
        console.log(DefaultAgent)
      })
  ]

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues6 })


  //onsubmit data post
  const onSubmit = data => {
    setData(data)
    console.log(data)
    if (data.packageName !== null) {
      const createmarketGroup = JSON.stringify({
        reservationID: localStorage.getItem('reservationid'),
        ETA:data.eta,
        ETD:data.etd,
        extraDescription: data.extras.label,
        resType:data.resType.value,
        origin: data.origin.label,
        agent: data.agent.value,
        source: data.source.value,
        booker: data.booker.value,
        features: data.features.value, 
        package:data.package,
        market: data.marketcode,
        comment: data.comment,
        billingInstructions: data.billingInstructions
      })


      console.log(createmarketGroup)
      const res = fetch("http://192.168.1.33:14700/addTempExtra", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res)
      })
    }
  }


  //reset button function
  const handleReset = () => {
    reset({
      eta:'',
      etd:'',
      extras: null,
      resType:null,
      origin: null,
      agent: null,
      source: null,
      booker:null,
      features:null,
      package:'',
      market: null,
      comment: '',
      billingInstructions: ''
    })
  }

  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>

              {/* ETA */}
               <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='eta'>
                    ETA
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='eta'
                    name='eta'
                    render={({ field }) => <Input type='time' placeholder='Agent' invalid={errors.eta && true} {...field} />}
                  />
                </div>
              </Col>

              
              {/* ETD */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='etd'>
                    ETD
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='etd'
                    name='etd'
                    render={({ field }) => <Input type='time' placeholder='Agent' invalid={errors.etd && true} {...field} />}
                  />
                </div>
              </Col>


              {/* Extras Options */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='extras' >
                    Select Extra
                  </Label>
                  <Controller
                    id='extras'
                    control={control}
                    name='extras'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={extraName}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.extras === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


              {/* Reservation Types */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='resType'>
                    Reservation Type
                  </Label>
                  <Controller
                    id='resType'
                    control={control}
                    name='resType'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={ReservationTypes}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.resType === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


             {/* Origin options */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='origin'>
                    Origin 
                  </Label>
                  <Controller
                    id='origin'
                    control={control}
                    name='origin'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={Origin}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.origin === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


             {/* Agent Options */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='agent'>
                  Agent 
                  </Label>
                  <Controller
                    // defaultValue={DefaultAgent[0]}
                    id='agent'
                    control={control}
                    name='agent'
                    render={({ field }) => (
                      <Select
                        isClearable
                        // isMulti
                        options={Agent}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.agent === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


             {/* Source Options */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='source'>
                  Source 
                  </Label>
                  <Controller
                    // defaultValue={sourceCode[2]}
                    id='source'
                    control={control}
                    name='source'
                    render={({ field }) => (
                      <Select
                      // isMulti
                        isClearable
                        options={sourceCode}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.source === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


             {/* Booker Options */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='booker'>
                  Booker 
                  </Label>
                  <Controller
                    // defaultValue={localStorage.getItem('sourcecode')}
                    id='booker'
                    control={control}
                    name='booker'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={Booker}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.booker === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


             {/* Features Options */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='features'>
                  Features / Preferences
                  </Label>
                  <Controller
                    id='features'
                    control={control}
                    name='features'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={Features}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.features === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


             {/* Packages */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='package'>
                    Package
                  </Label>
                  <Controller
                    // defaultValue={localStorage.getItem('package')}
                    control={control}
                    id='package'
                    name='package'
                    render={({ field }) => <Input placeholder='package' invalid={errors.package && true} {...field} />}
                  />
                </div>
              </Col>
             

             {/* Market Options */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='market'>
                    Market
                  </Label>
                  <Controller
                    // defaultValue={localStorage.getItem('marketcode')}
                    control={control}
                    id='market'
                    name='market'
                    render={({ field }) => <Input placeholder=' Market ' invalid={errors.market && true} {...field} />}
                  />
                </div>
              </Col>


             {/* Comments */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='comment'>
                    Comment
                  </Label>
                  <Controller
                    // defaultValue='Comment'
                    control={control}
                    id='comment'
                    name='comment'
                    render={({ field }) => <Input placeholder='Comment' invalid={errors.comment && true} {...field} />}
                  />
                </div>
              </Col>


             {/* Billing Instructions */}
              <Col md='4' sm='8'>
                <div className='mb-1'>
                  <Label className='form-label' for='billingInstructions'>
                    Billing Instructions
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='billingInstructions'
                    name='billingInstructions'
                    render={({ field }) => <Input placeholder='Comment' invalid={errors.billingInstructions && true} {...field} />}
                  />
                </div>
              </Col>


             {/* On submit buttons */}
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit'>
                  Submit
                </Button>
                <Button outline color='secondary' type='reset' onClick={handleReset}>
                  Reset
                </Button>
              </div>


            </Row>
          </Form>
        </CardBody>
      </Card>

    </div>
  )

}


const DailyDetails = ({ id }) => {
  // function App() {
  console.log(id)
  const [rowData, setRowData] = useState()

  useEffect(() => {
    fetch(`http://192.168.1.33:14700/showdetails?reservationID=${localStorage.getItem('reservationid')}`)
      .then(result => result.json())
      .then(rowData => setRowData(rowData['data']))
    console.log(rowData)
  }, [])

  const [updatedrowData, setupdatedRowData] = useState([])

  const gridRef = useRef()

  const colourMappings = {
    EP: 'EP',
    CP: 'CP'
  }

  const extractKeys = (mappings) => {
    return Object.keys(mappings)
  }

  const lookupValue = (mappings, key) => {
    return mappings[key]
  }

  const colourCodes = extractKeys(colourMappings)


  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Date', field: 'inventory_date' },

    // { headerName: 'rateCodeID', field: 'rateCodeID', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'sourceID  ', field: 'sourceID ', suppressSizeToFit: true },
    {
      headerName: 'Package',
      field: 'packageCode',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: colourCodes
      },
      valueFormatter: (params) => {
        return lookupValue(colourMappings, params.value)
      },
      // cellRenderer: ColourCellRenderer,
      filter: 'agSetColumnFilter'
    },
    // { headerName: 'extraCode', field: 'extraCode' },
    // { headerName: 'roomTypeID', field: 'roomTypeID' },
    { headerName: 'baseprice', field: 'baseprice' },
    // { headerName: 'extraadultprice', field: 'extraadultprice' },
    // { headerName: 'childrenprice', field: 'childrenprice' },
    { headerName: 'total', field: 'total' }
  ])

  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      // editable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ))

  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event)
  }, [])


  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll()
  }, [])

  const onCellValueChanged = useCallback(event => {
    console.log('onCellValueChanged', event)

    const ID = event.data.id
    const PCODE = event.data.packageCode
    const updatedItem = JSON.stringify({
      id: ID,
      packageCode: PCODE
    })
    console.log(updatedItem)
    fetch(`http://192.168.1.33:14700/updatePackageInfo`, {
      method: 'PUT',
      body: updatedItem,
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 320 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection='multiple'
          onCellClicked={cellClickedListener}
          onCellValueChanged={onCellValueChanged}
          paginationPageSize='10'
          pagination='true'
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"

        />
      </div>
      <br></br>
      <Form onSubmit={e => e.preventDefault()}>
        <Button className='me-1' color='primary'>
          Proceed
        </Button>
      </Form>

    </div>
  )
}


const Payment = () => {
  const {
    setError,
    formState: { errors }
  } = useForm()

  // ** State
  const [data, setData] = useState(null)
  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues8 })


  const onSubmit = data => {
    setData(data)
    console.log(data)
    if (data.packageName !== null) {
      const createmarketGroup = JSON.stringify({
        paymentTypeID: data.payment.value,
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        cvv:data.cvv,
        expiryDate: (Moment(String(new Date(data.expiryDate[0]))).format('YYYY-MM-DD')),
        reservationID: localStorage.getItem('reservationid')
      })
      console.log(createmarketGroup)
      setData(createmarketGroup)
      const res = fetch("http://192.168.1.33:14700/resPaymentType", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res)
      })
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <ul className='list-unstyled mb-0'>
              <p> </p>
            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      paymentInformation: null,
      cardNumber: '',
      cardHolderName: '',
      expiryDate: ''
    })
  }

  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='payment' >
                    Select Payment Type
                  </Label>
                  <Controller
                    id='payment'
                    control={control}
                    name='payment'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={paymentName}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.payment === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
                <Col md='4' sm='8' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='cardNumber'>
                      Card Number
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='cardNumber'
                      name='cardNumber'
                      render={({ field }) => <Input placeholder='Card Number'
                        // pattern='[0-9_]{1,15}'
                        // title="Card Number should not contain small alphabets and special characters." 
                        invalid={errors.cardNumber && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='4' sm='8' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='cvv'>
                      CVV
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='cvv'
                      name='cvv'
                      render={({ field }) => <Input placeholder='cvv'
                        // pattern='[0-9_]{1,15}'
                        // title="Card Number should not contain small alphabets and special characters." 
                        invalid={errors.cardNumber && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='4' sm='8' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='cardHolderName'>
                      Card Holder Name
                    </Label>
                    <InputGroup className="input-group-merge">
                      <Controller
                        defaultValue=''
                        control={control}
                        id='cardHolderName'
                        name='cardHolderName'
                        render={({ field }) => <Input placeholder='Card Holder Name'
                          // pattern='[Aa-Zz ]{1,15}'
                          // title="Card Holder Name should  contain alphabets. Cannot contain numbers and special characters." 
                          invalid={errors.cardNumber && true}{...field} />}
                      />
                    </InputGroup>
                  </div>
                </Col>
                <Col md='4' sm='8' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='expiryDate'>
                      Expiry Date
                    </Label>
                    <Controller
                      control={control}
                      id='expiryDate'
                      name='expiryDate'
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.expiryDate === null
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit'>
                  Submit
                </Button>
                <Button outline color='secondary' type='reset' onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )

}


const PickUpDetails = () => {

  const defaultValues9 = {
    // pickUpRequired: null,
    pickUpDate: '',
    pickUpTime: '',
    pickUpStationCode: '',
    pickUpCarrierCode:'',
    pickUpTransportType: '',
    pickUpRemarks:'',
  
    // dropRequired: null,
    dropDate: '',
    dropTime: '',
    dropStationCode: '',
    dropCarrierCode: '',
    dropTransportType: '',
    dropRemarks:''
  }

  const {
    setError,
    formState: { errors }
  } = useForm()


  const [data, setData] = useState(null)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [checkboxChecked1, setCheckboxChecked1] = useState(false)


  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked)
  }


  const handleCheckboxChange1 = () => {
    setCheckboxChecked1(!checkboxChecked1)
  }


  //Flatpicker 
  const today = Moment().format('YYYY-MM-DD')
  const options = {
    minDate: today
  }


  const { reset, handleSubmit, control } = useForm({ defaultValues9 })


  const onSubmit = data => {
    setData(data)
    if (data.pickUpRequired !== null && data.dropDetails !== null) {
      console.log(data)
      const createmarketGroup = JSON.stringify({
        reservationID: localStorage.getItem('reservationid'),
        // pickUpRequired: data.pickupRequired.value,
        pickUpDate:(Moment(String(new Date(data.pickUpDate))).format('YYYY-MM-DD')),
        pickUpTime: data.pickUpTime,
        pickUpStationCode: data.pickUpStationCode,
        pickUpCarrierCode: data.pickUpCarrierCode,
        pickUpTransportType: data.pickUpTransportType,
        pickUpRemarks: data.pickUpRemarks,

        // dropRequired: data.dropRequired.value,        
        dropDate: data.dropDate,
        dropTime: data.dropTime,
        dropStationCode: data.dropStationCode,
        dropCarrierCode: data.dropCarrierCode,
        dropTransportType: data.dropTransportType,
        dropRemarks: data.dropRemarks
      })
      console.log(createmarketGroup)
      const res = fetch("http://192.168.1.33:14700/pickUp", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res)
      })
    }
  }


  const handleReset = () => {
    reset({
      // pickUpRequired: null,
      pickUpDate: '',
      pickUpTime: '',
      pickUpStationCode: '',
      pickUpCarrierCode:'',
      pickUpTransportType: '',
      pickUpRemarks:'',
    
      // dropRequired: null,
      dropDate: '',
      dropTime: '',
      dropStationCode: '',
      dropCarrierCode: '',
      dropTransportType: '',
      dropRemarks:''
    })
  }


  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>

            {/* Pickup Details */}
            <Row>
              <Col md='6' sm='12'>
              <div className='form-check form-check-inline'>
                <Input type='checkbox' id='basic-cb-unchecked' checked={checkboxChecked} onChange={handleCheckboxChange} />
                <Label for='pickUpRequired' className='form-check-label'>
                  Pickup Required
                </Label>
              </div>
              </Col>

              {checkboxChecked && (
              <Row>
                <Col md='6' sm='12' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='pickUpDate'>
                      PickUp Date
                    </Label>
                    <Controller
                      control={control}
                      id='pickUpDate'
                      name='pickUpDate'
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          options={options}
                          placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.pickUpDate === null
                          })}
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
                      render={({ field }) => <Input
                        placeholder='pickUpTime'
                        type='time'
                        invalid={errors.pickUpTime && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="pickUpStationCode">
                      PickUp Locaton
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='pickUpStationCode'
                      name='pickUpStationCode'
                      render={({ field }) => <Input placeholder='pickUpStationCode'
                        invalid={errors.pickUpStationCode && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="pickUpCarrierCode">
                      PickUp Carrier Code
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='pickUpCarrierCode'
                      name='pickUpCarrierCode'
                      render={({ field }) => <Input placeholder='pickUpCarrierCode'

                        invalid={errors.pickUpCarrierCode && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="pickUpTransportType">
                      PickUp Transport Type
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='pickUpTransportType'
                      name='pickUpTransportType'
                      render={({ field }) => <Input placeholder='pickUpTransportType'
                        invalid={errors.pickUpTransportType && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="pickUpRemarks">
                    PickUp Remarks
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='pickUpRemarks'
                      name='pickUpRemarks'
                      render={({ field }) => <Input placeholder='pickUpRemarks'
                        invalid={errors.pickUpRemarks && true} {...field} />}
                    />
                  </div>
                </Col>
              </Row>
              )}
            </Row>

            <br></br>

            {/* Drop Details */}
            <Row>
              <Col md='6' sm='12'>
              <div className='form-check form-check-inline'>
                <Input type='checkbox' id='basic-cb-unchecked' checked={checkboxChecked1} onChange={handleCheckboxChange1}  />
                <Label for='dropRequired' className='form-check-label'>
                  Drop  Required
                </Label>
              </div>
              </Col>
              {checkboxChecked1 && (
              <Row>
                <Col md='6' sm='12' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='dropDate'>
                      Drop Date
                    </Label>
                    <Controller
                      control={control}
                      id='dropDate'
                      name='dropDate'
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          options={options}
                          placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.dropDate === null
                          })}
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
                      render={({ field }) => <Input
                        placeholder='dropTime'
                        type='time'

                        invalid={errors.dropTime && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="dropStationCode">
                      Drop Locaton
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='dropStationCode'
                      name='dropStationCode'
                      render={({ field }) => <Input placeholder='Drop Location'
                        invalid={errors.dropLocation && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="dropCarrierCode">
                      Drop Carrier Code
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='dropCarrierCode'
                      name='dropCarrierCode'
                      render={({ field }) => <Input placeholder='dropCarrierCode'

                        invalid={errors.dropCarrierCode && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="dropTransportType">
                      Drop Transport Type
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='dropTransportType'
                      name='dropTransportType'
                      render={({ field }) => <Input placeholder='dropTransportType'
                        invalid={errors.dropTransportType && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="dropRemarks">
                    Drop Remarks
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='dropRemarks'
                      name='dropRemarks'
                      render={({ field }) => <Input placeholder='Drop Remarks'
                        invalid={errors.dropRemarks && true} {...field} />}
                    />
                  </div>
                </Col>
              </Row>
              )}
            </Row>

            <br></br><br></br>

            <div className='d-flex'>
              <Button className='me-1' outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
            </div>


          </Form>
        </CardBody>
      </Card>
    </div>  
  )

}


const AccordionUncontrolled = () => {
  const navigate = useNavigate()
  // const gridRef = useRef()
  const [rowData1, setRowData1] = useState()
  const [rowData2, setRowData2] = useState()
  const [Rate, setRate] = useState()
  const [Rate1, setRate1] = useState()
  const [open, setOpen] = useState('1')
  const [checkonclick, setcheckonclick] = useState(false)
  const [show, actionButton] = useState(false)

  //on button click add
  const actionButton1 = (rowval) => {
    alert("Do you really want to select this room type?")
    setcheckonclick(true)
    const createmarketGroup = JSON.stringify({
      hotelID: 1,
      reservationID: localStorage.getItem('reservationid'),
      ratecode: localStorage.getItem('ratecode'),
      checkIn: localStorage.getItem('checkIn'),
      checkOut: localStorage.getItem('checkout'),
      adults: localStorage.getItem('adults'),
      children: localStorage.getItem('children'),
      roomtypeid: rowval['data']['roomTypeID']
    })

    console.log(createmarketGroup)
    fetch("http://192.168.1.33:14700/addstorerateCodeSelection", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: createmarketGroup
    }).then((res) => {
      console.log(res)
    })

    setOpen('4')
  }

  //ag-grid
  const [columnDefs1, setColumnDefs1] = useState([
    { headerName: 'RoomType', field: 'roomType', suppressSizeToFit: true, maxWidth: 120 },
    { headerName: 'Rate ', field: 'baseprice', suppressSizeToFit: true, maxWidth: 90 },
    { headerName: 'Total', field: 'fulltotal', suppressSizeToFit: true, maxWidth: 90 },
    { headerName: 'Package', field: 'packageCode', suppressSizeToFit: true, maxWidth: 105 },
    {
      headerName: 'Breakup',
      field: 'numAvlRooms',
      suppressSizeToFit: true,
      maxWidth: 125,
      cellStyle: { "text-align": "center" },
      cellRendererFramework: () => <Button className='me-1' color='secondary' onClick={() => { actionButton(!show) }}>Breakup </Button>
    },
    { headerName: 'Avalablity', field: 'numAvlRooms', suppressSizeToFit: true, maxWidth: 120 },
    {
      headerName: 'Action',
      field: 'numAvlRooms',
      suppressSizeToFit: true,
      maxWidth: 125,
      cellRendererFramework: (params) => <Button color='primary' type='submit' onClick={() => actionButton1(params)}> Add </Button>
    }
  ])


  //ag-grid column definition
  const defaultColDef1 = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ))


  //cell click listener
  const cellClickedListener1 = useCallback(event => {
    console.log('cellClicked', event)
    if (checkonclick === true) {
      console.log(Rate)
    }
  }, [])


  //declarations
  const [data, setData] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)


  const { reset1, handleSubmit, control } = useForm({ defaultValues })

  //Reservation API
  const onSubmit = data => {
    setData(data)
    if (data.checkIn !== null && data.checkOut !== null && data.adult !== null && data.children !== null && data.quantity !== null) {
      console.log(data)
      const createmarketGroup = JSON.stringify({
        hotelID: 1,
        reservationID: localStorage.getItem('reservationid'),
        source: localStorage.getItem('source'),
        companyID: localStorage.getItem('companyID'),
        checkIn: (Moment(String(new Date(data.checkIn[0]))).format('YYYY-MM-DD')),
        checkOut: (Moment(String(new Date(data.checkOut[0]))).format('YYYY-MM-DD')),
        adults: data.adult.value,
        children: data.children.value,
        quantity: data.quantity.value
      })
      console.log(createmarketGroup)
      const next = JSON.parse(createmarketGroup)
      console.log(next)
      localStorage.setItem('checkIn', next['checkIn'])
      localStorage.setItem('checkout', next['checkOut'])
      localStorage.setItem('adults', next['adults'])
      localStorage.setItem('children', next['children'])
      fetch('http://192.168.1.33:14700/add_bookinfo_reservation', {
        method: 'POST',
        body: createmarketGroup,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then((res) => res.json())
        .then(postres => {
          console.log(postres['data'])
          localStorage.setItem('marketcode', postres['data'][0]['marketCode'])
          localStorage.setItem('sourcecode', postres['data'][0]['sourceCode'])
          localStorage.setItem('ratecode', postres['data'][0]['rateCodeID'])
          localStorage.setItem('package', postres['data'][0]['packageCode'])
          console.log(localStorage.getItem('ratecode'))
          setRate(postres['data'])
          const tablearr = []
          for (let i = 1; i < 8; i++) {
            if (postres['data'][0]['RoomTypeWiseDetails'][i] !== undefined) {
              tablearr.push(postres['data'][0]['RoomTypeWiseDetails'][i]['roominfo'][0])
              setRate1(postres['data'][0]['RoomTypeWiseDetails'][i]['roominfo'])
              console.log(postres['data'][0]['RoomTypeWiseDetails'][i]['roominfo'])
            }
          }
          console.log(tablearr)
          setRowData1(tablearr)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
    setIsSubmitted(true)
  }


  const handleReset1 = () => {
    window.location.reload()
    // reset({
    //   checkIn: null,
    //   checkOut: null,
    //   adult: null,
    //   children: null,
    //   quantity: null
    // })
  }

  //this is accordian 1 functions
  const [rowData, setRowData] = useState()
  const [assign, setAssign] = useState(false)
  const [filldata, setfilldata] = useState('')


  //Accordian toggle button
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const gridRef = useRef()


  //Guest Profile search ag-grid Button
  const [columnDefs] = useState([
    { headerName: 'Name', field: 'name', maxWidth: 140 },
    { headerName: 'Email ID', field: 'email', maxWidth: 300 },
    { headerName: 'Company Name', field: 'accountName', suppressSizeToFit: true, maxWidth: 140 },
    {
      headerName: "Action",
      maxWidth: 140,
      cellRenderer: () => {
        return (<Button color='primary' onClick={() => setOpen('2')} >Proceed</Button>)
      }

    },
    {
      cellRenderer: () => {
        return (<Button color='primary' onClick={() => setAssign(!assign)} >View Profile</Button>)
      }
    }
  ])


  //Ag-grid column of break-up button
  const [columnDefs2] = useState([
    { headerName: 'Date', field: 'inventory_date', maxWidth: 128 },
    { headerName: 'Base Price', field: 'baseprice', maxWidth: 125 },
    { headerName: 'RoomType', field: 'roomType', suppressSizeToFit: true, maxWidth: 125 },
    { headerName: 'Total Price', field: 'total', suppressSizeToFit: true, maxWidth: 125 },
    { headerName: 'Package', field: 'packageCode', suppressSizeToFit: true, maxWidth: 125 },
    { headerName: 'Children Price', field: 'childrenprice', suppressSizeToFit: true, maxWidth: 140 }

  ])


  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ))


  //ag-grid cell clcked value
  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event)
    console.log(event['data'])
    setfilldata(event['data'])
    localStorage.setItem('companyname', event['data']['accountName'])
    localStorage.setItem('guestProfileID', event['data']['id'])
    localStorage.setItem('companyID', event['data']['companyID'])
    console.log(event['rowIndex'])
  })


  useEffect(() => {
    fetch(`http://192.168.1.33:14700/getCompleteReservation?reservationID=${localStorage.getItem('reservationid')}`)
    .then(result => result.json())
    .then(rowData2 => {
      setRowData2(rowData2['data'])
      setfilldata(rowData2['data'])
      console.log(rowData2['data'])
    })
  }, [])

  //API to get all the guests
  useEffect(() => {
    ReactDOM.render(<CardData />, document.getElementById("displayCard"))
    fetch(`http://192.168.1.33:14700/getAllGuestDetails`)
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
        console.log(rowData['data'])
      })
  }, [])


  //Search element
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    )
  }, [])


  //Flatpicker 
  const today = Moment().format('YYYY-MM-DD')
  const options = {
    minDate: today
  }


  const [basicModal, setBasicModal] = useState(false)
  const { } = useForm({ defaultValues })


  //on click of new guest navigate
  const onclickButton = () => {
    setTimeout(() => { navigate('/apps/configuration/guestProfile') }, 1000)
  }


  //Guest details Crad update function
  function CardData() {
    console.log(localStorage.getItem('checkIn'))
    return (
      <div>
        <br></br>
        <b><h3>Guest Information</h3></b>

        {/* <b>Reservation ID: </b>{localStorage.getItem('reservationid')} <br></br> */}
        <b> <small>Guest Name :</small>  </b>&nbsp; {filldata['salutation']} {filldata['name']}<br></br>
        <b><small>Company Name:</small>  </b>&nbsp; {filldata['accountName']} <br></br>
        <b><small>Country: </small> </b>&nbsp; {filldata['country']} <br></br>
        <b><small>State:</small>  </b>&nbsp; {filldata['state']} <br></br>
        <b><small>Nationality: </small> </b>&nbsp; {filldata['nationality']} <br></br>
        <hr></hr>
        <b><h3>Contact Information</h3></b> 
        <b><small>Email ID:</small>  </b>&nbsp; {filldata['email']} <br></br>
        <b><small>Mobiile Number: </small> </b>&nbsp; {filldata['phoneNumber']} <br></br>


        {/* Arrival Date:  &nbsp; {localStorage.getItem('checkIn')} <br></br> */}
      </div>

    )
  }

  return (
    <div>
      {/* View Guest Profile */}
      <div>
        <Modal isOpen={assign} toggle={() => setAssign(!assign)} className='demo-inline-spacing'>
          <ModalHeader className='bg-transparent' toggle={() => setAssign(!assign)}></ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>
            <h1>
              Guest Profile
            </h1>
            <br></br>
            {/* <strong>Guest Name : </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{filldata['name']}<br></br>
            <strong> Mobile Number : </strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{filldata['phoneNumber']}<br></br>
            <strong> Email ID : </strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{filldata['email']}<br></br>
            <strong> Date of Birth : </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{filldata['dob']}<br></br>
            <strong> Nationality : </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{filldata['nationality']}<br></br>
            <strong> Company Name : </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{filldata['accountName']}<br></br>
            <strong> Country:  </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {filldata['country']} <br></br>
            <strong> Postal Code:   </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {filldata['postalCode']} <br></br>
            <strong>State:  </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {filldata['state']} <br></br> */}
          </ModalBody>
        </Modal>
      </div>

      <Row>
        {/* Guest Card */}
        <Col md='4' sm='12'>
          <Card>
            <CardHeader style={{ background: '#8c82f2', textAlign: 'center' }}>
              <CardTitle>
                <h3 style={{ color: 'white', textAlign: 'center' }}>Stay Information</h3>
                {/* <hr style={{background:'line', color:'black', width:'340px'}}></hr> */}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div id="displayCard"></div>
            </CardBody>
          </Card>
        </Col>

        <Col md='8' sm='12'>
          <Card >

            {/* Rate Breakup Modal */}
            <Modal isOpen={show} toggle={() => actionButton(!show)} className="modal-lg">
              <ModalHeader>
                Rate Breakup
              </ModalHeader>
              <ModalBody>
                <div className="ag-theme-alpine" style={{ width: 760, height: 520 }}>
                  <AgGridReact
                    ref={gridRef}
                    rowData={Rate1}
                    columnDefs={columnDefs2}
                    animateRows={true}
                    rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"
                  />
                </div>
              </ModalBody>
            </Modal>


            <Accordion className='accordion-margin' open={open} toggle={toggle}>


              {/* Guest Search Accordian */}
              <div >
                <AccordionItem open={open}>
                  <AccordionHeader targetId='1'> <h5><b>Profile Search</b></h5></AccordionHeader>
                  <AccordionBody accordionId='1'>
                    <div>
                      <Row className='mb-1'>
                        <Col md='3' sm='12' className='me-1'>
                          <Label className='form-label' for='fullName'>
                            Search
                          </Label>
                          <Input
                            type="text"
                            id="filter-text-box"
                            placeholder="Filter..."
                            onInput={onFilterTextBoxChanged}
                          />
                        </Col>
                        <Col md='3' sm='12' className='me-1'>
                          <br></br> &nbsp;&nbsp;&nbsp;
                          <Button align='right' color='primary' onClick={onclickButton}> Add New Guest</Button>
                        </Col>
                      </Row>
                    </div>
                    <div className="ag-theme-alpine" style={{ height: 520 }}>
                      <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='multiple'
                        onCellClicked={cellClickedListener}
                        paginationPageSize='10'
                        pagination='true'
                        defaultColDef={defaultColDef}
                        headerColor="ddw-primary"
                      />
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </div>


              {/* Corporate or Individual */}
              <div >
                <AccordionItem onSubmit={() => setOpen('3')} >
                  <AccordionHeader targetId='2'> <h5><b>Booking Type</b></h5></AccordionHeader>
                  <AccordionBody accordionId='2'>
                    <Companydetails />
                    {open === '2' && (ReactDOM.render(<CardData />, document.getElementById("displayCard")))}
                  </AccordionBody>
                </AccordionItem>
              </div>


              {/* Checkin and Checkout information */}
              <div>
                <AccordionItem>
                  <AccordionHeader targetId='3'>
                    <h5><b>Arrival Details</b></h5>
                  </AccordionHeader>
                  <AccordionBody accordionId='3'>
                    <div>
                      <Card>
                        <CardBody>
                          <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                              <Col md='3' sm='12'>
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
                                        disabled={isSubmitted}
                                        {...field}
                                        options={options} 
                                        placeholder='YYYY-MM-DD '
                                        className={classnames('form-control', {
                                          'is-invalid': data !== null && data.checkIn === null
                                        })}
                                      />
                                    )}
                                  />
                                </div>
                              </Col>

                              <Col md='3' sm='12'>
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
                                        options={options} placeholder='YYYY-MM-DD '
                                        className={classnames('form-control', {
                                          'is-invalid': data !== null && data.checkOut === null
                                        })}
                                      />
                                    )}
                                  />
                                </div>
                              </Col>

                              <Col md='2' sm='12'>
                                <div>
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
                                        className={classnames('react-select', { 'is-invalid': data !== null && data.children === null })}
                                        {...field}
                                      />
                                    )}
                                  />
                                </div>
                              </Col>

                              <Col md='2' sm='5'>
                                <div className='mb-1'>
                                  <Label className='form-label' for='quantity'>
                                    Quantity
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
                              <div align='end' className='buttons'>
                                <Button outline className='me-1' color='secondary' type='reset' onClick={handleReset1}>
                                  Start Over
                                </Button>
                                <Button color='primary' className='me-1' type='submit'>
                                  Get Rates
                                </Button>
                              </div>
                            </Row>
                          </Form>
                        </CardBody>
                      </Card>
                      <div className="ag-theme-alpine" style={{ height: 220 }}>
                        {rowData1 !== undefined && <AgGridReact
                          ref={gridRef}
                          rowData={rowData1}
                          columnDefs={columnDefs1}
                          animateRows={true}
                          rowSelection='multiple'
                          onCellClicked={cellClickedListener1}
                          paginationPageSize='10'
                          defaultColDef={defaultColDef1}
                          headerColor="ddw-primary"
                        />}
                      </div>
                    </div>
                    {open === '3' && setTimeout(() => { ReactDOM.render(<CardData />, document.getElementById("displayCard")) }, 500)}
                  </AccordionBody>
                </AccordionItem>
              </div>


              {/* General Booking Information */}
              <div>
                <AccordionItem onSubmit={() => setOpen('5')}>
                  <AccordionHeader targetId='4'> <h5><b>Booking Information</b></h5> </AccordionHeader>
                  <AccordionBody accordionId='4'>
                    <Extra />
                  </AccordionBody>
                </AccordionItem>
              </div>


              {/* Daily Details */}
              <div>
                <AccordionItem onSubmit={() => setOpen('6')}>
                  <AccordionHeader targetId='5'> <h5><b>Daily Details</b></h5> </AccordionHeader>
                  <AccordionBody accordionId='5'>
                    {open === '5' && <DailyDetails id={localStorage.getItem('reservationid')} />}
                  </AccordionBody>
                </AccordionItem>
              </div>


              {/* Payment Information */}
              <div>
                <AccordionItem onSubmit={() => setOpen('7')}>
                  <AccordionHeader targetId='6'><h5><b>Payment Information</b></h5></AccordionHeader>
                  <AccordionBody accordionId='6'>
                    <Payment />
                  </AccordionBody>
                </AccordionItem>
              </div>


              {/* PickUp and Drop */}
              <div>
                <AccordionItem onSubmit={() => setOpen('8')}>
                  <AccordionHeader targetId='7'><h5><b>Pickup And Drop</b></h5></AccordionHeader>
                  <AccordionBody accordionId='7'>
                    <PickUpDetails />
                  </AccordionBody>
                </AccordionItem>
              </div>


            </Accordion>

          </Card>
        </Col>
      </Row>

      {/* Final Submit Buttons */}
      <div className='demo-inline-spacing'>
        <div className='basic-modal'>
          <Button className='me-1' color='primary' outline onClick={() => setBasicModal(!basicModal)}>
            Submit
          </Button>
          <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)} className='modal-xl'>
            <ModalHeader toggle={() => setBasicModal(!basicModal)}>Basic Modal</ModalHeader>
            <ModalBody>
              <ConfirmedDetails />
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={() => setBasicModal(!basicModal)}>
                Accept
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

    </div>
  )

}


export default AccordionUncontrolled