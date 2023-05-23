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
import { Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import ModalForm from "./modalForm"
import RateDetails from "./rateDetails"

const id = '1';

// import App from './datagrid'
// const transactionCode = [
//    { value: '1', label: 'Active' },
//   { value: '0', label: 'InActive' },
//   // { value: 'red', label: 'Red' },
//   // { value: 'orange', label: 'Orange' }
// ]

const defaultValues = {
  // hotelID: '',
  rateCode: '',
  description: '',
  rateCategory: null,
  marketCode: null,
  source: null,
  beginDate: '',
  sellDate: '',
  package: null,
  transactionCode: null,
  pkgtransactionCode: null,
  printRate: null,
  discount: null,
  dayUse: null,
  complementary: null,
  houseUse: null,
  day: null
}

let roomTypes = [
  fetch('http://192.168.1.33:14700/getRateCodeRooTypes?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      roomTypes = resp['data']
      // console.log(roomTypes)
    })
]

let packages = [
  fetch('http://192.168.1.33:14700/getRateCodePackageID?hotelID=1 ')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      packages = resp['data']
      // console.log(packages)
    })
]

let sources = [
  fetch('http://192.168.1.33:14700/getRateCodeSourceID?hotelID=1 ')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      sources = resp['data']
      // console.log(sources)
    })
]

let marketCodes = [
  fetch('http://192.168.1.33:14700/getRateCodeMarketID?hotelID=1 ')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      marketCodes = resp['data']
      // console.log(marketCodes)
    })
]


let rateCategory = [
  fetch('http://192.168.1.33:14700/getRateCodeRateCategory?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      rateCategory = resp['data']
      // console.log(rateCategory)
    })
]

let addAccount = [
  fetch('http://192.168.1.33:14700/getRateCodeAccountID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      addAccount = resp['data']
      // console.log(addAccount)
    })
]

let transactionCode = [
  fetch('http://192.168.1.33:14700/getRateCodeTransactionID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      transactionCode = resp['data']
      // console.log(transactionCode)
    })
]

let packagetransactionCode = [
  fetch('http://192.168.1.33:14700/getRateCodeTransactionID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'] pending)
      packagetransactionCode = resp['data']
      // console.log(packagetransactionCode)
    })
]


const Options = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const day = [
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
  { value: "7", label: "Sunday" },

];

const rateCode = () => {

  // AG Grid
  const [rowData, setRowData] = useState();
  const [filldata, setfilldata] = useState(' ');

  const gridRef = useRef();

  const [selectedOption, setSelectedOption] = useState('');

  // const handleDropdownChange = (event) => {
  //   setSelectedOption(event.target.value);
  // }

  // const [columnDefs, setColumnDefs] = useState([
  //   { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
  //   { headerName: 'Market Code', field: 'rateCode', suppressSizeToFit: true },
  //   { headerName: 'Description', field: 'description' },
  //   { headerName: 'Active Status', field: 'isActive' },
  //   { headerName: 'Market Group ID', field: 'transactionCode' },

  // ]);

  // const [columnDefs, setColumnDefs] = useState([
  //   { headerName: 'Room Type ', field: 'roomTypeID', suppressSizeToFit: true, maxWidth: 160 },
  //   { headerName: 'One Adult Price', field: 'oneAdultPrice' },
  //   { headerName: 'Two Adult Price', field: 'twoAdultPrice' },
  //   { headerName: 'Three Adult Price', field: 'threeAdultPrice' },
  //   { headerName: 'Extra Adult Price ', field: 'extraAdultPrice' },
  //   { headerName: 'Extra Child Price', field: 'extraChildPrice' },
  //   {
  //     headerName: 'Action', field: 'numAvlRooms', suppressSizeToFit: true, maxWidth: 200, cellRendererFramework: (params) =>
  //       <Button color='primary' onClick={() => actionButton(!show)}> Modify Rates </Button>
  //   },
  // ]);
  const [show, actionButton] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Rate Code', field: 'rateCode', suppressSizeToFit: true, maxWidth: 140 },
    { headerName: 'Description', field: 'description', suppressSizeToFit: true , maxWidth: 140 },   
    { headerName: 'Begin Date', field: 'beginSellDate', suppressSizeToFit: true, maxWidth: 140 },
    { headerName: 'SellDate', field: 'endSellDate', suppressSizeToFit: true,  maxWidth: 140  },
    { headerName: 'Days Applicable', field: 'daysApplicable' , maxWidth: 140 },
    { headerName: 'Action', field: 'numAvlRooms', suppressSizeToFit: true, maxWidth: 180, cellRendererFramework: (params) =>
        <Button color='primary' onClick={() => actionButton(!show)}> Configure Rates </Button>    },   
    { headerName: 'Market ID', field: 'marketID', maxWidth: 140  },
    { headerName: 'Package ', field: 'packageID', suppressSizeToFit: true , maxWidth: 140 },
    { headerName: 'RateCategoryID', field: 'rateCategoryID', maxWidth: 140  },
    { headerName: 'SourceID', field: 'sourceID', maxWidth: 100  },
    { headerName: 'Tansaction Code ID', field: 'tansactionCodeID', maxWidth: 140  },    
     // { headerName: 'Add Accounts', field: 'addAccounts', suppressSizeToFit: true },
    // { headerName: 'Room Type ID', field: 'roomTypeID' },
    // { headerName: 'PrintRate', field: 'printRate', maxWidth: 140  },
    // { headerName: 'Day Use', field: 'dayUse', maxWidth: 140  },
    // { headerName: 'Discount ', field: 'discount', maxWidth: 140  },
    // { headerName: 'Discount Percentage ', field: 'discountPercentage' , maxWidth: 140 },
    // { headerName: 'Complementary', field: 'complementary', maxWidth: 140  },
    // { headerName: 'houseUse', field: 'houseUse', maxWidth: 140  },
    // { headerName: 'Active Status', field: 'isActive', maxWidth: 140  },
    // { headerName: 'PackageTransactionCodeID', field: 'packageTransactionCodeID', suppressSizeToFit: true , maxWidth: 140 },
  ]);


  ////roomTypeID, rateCodeID,oneAdultPrice, twoAdultPrice, threeAdultPrice, extraAdultPrice, extraChildPrice 

  const defaultColDef = useMemo(() => (
    {
      suppressSizeToFit: true,
      autoHeight: true,
      resizable: true,
      // editable: true,
      sortable: true,
      filter: true,
      singleClickEdit: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));


  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
    console.log(event['data'])
    // console.log(event['rowIndex'])
    localStorage.setItem('id', event['data']['id'])
    console.log(event['data']['id'])
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/RateCode?hotelID=1')
      .then(result => result.json())
      .then(rowData => setRowData(rowData['data']))
      // console.log(rowData)
  }, []);



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
    if (data.rateCode !== null && data.transactionCode !== null) {
      console.log(data)
      let createrateCode = JSON.stringify({
        // "hotelID": data.hotelID,
        "rateCode": data.rateCode,
        "description": data.description,
        "addAccounts": data.addAccounts,
        "roomType":data.roomType,
        "beginDate": data.beginDate,
        "sellDate": data.sellDate,
        "marketCode": data.marketCode.value,
        "source": data.source.value,        
        "package": data.package,
        "transactionCode": data.transactionCode.value,
        "pkgtransactionCode": data.pkgtransactionCode.value,
        "printRate": data.printRate.value,
        "discount": data.discount.value,
        "dayUse": data.dayUse.value,
        "complementary": data.dayUse.value,
        "houseUse": data.houseUse.value,
        "day": data.day.value

        // beginDate:'',
        // sellDate:'',
        // package:null,

      })
      console.log(data.rateCode)
      console.log(createrateCode)
      let res = fetch("http://192.168.1.33:14700/rateCode", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createrateCode
      })
      // .then((res) => {
      //   console.log(res)
      //   if (res['status'] == 200) {
      //     fetch('http://192.168.1.33:14700/RateCode?hotelID=1')
      //       .then(result => result.json())
      //       .then(rowData => {
      //         setRowData(rowData['data'])
      //         console.log(rowData['data'])
      //       })
      //   }
      // });
      .then(result => result.json())
      .then(resp => {
        // localStorage.setItem('id',resp['data']['id'])
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
            <h4>Market Code Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      // hotelID: '',
      rateCode: '',
      description: '',
      rateCategory: null,
      marketCode: null,
      source: null,
      beginDate: '',
      sellDate: '',
      package: null,
      transactionCode: null,
      pkgtransactionCode: null,
      printRate: null,
      discount: null,
      dayUse: null,
      complementary: null,
      houseUse: null,
      day: null
    })
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Rate Code</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <Row>
               
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='rateCode'>
                      Rate Code
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='rateCode'
                      name='rateCode'
                      render={({ field }) => <Input placeholder='Rate Code'
                        pattern='[0-9_]{1,15}'
                        title="Rate Code can contain numbers . It cannnot contain alphabets and special characters." required
                        invalid={errors.rateCode && true} {...field} />}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='description'>
                      Description
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='description'
                      name='description'
                      render={({ field }) => <Input placeholder='Description' pattern='[A-Za-z0-9_]{1,15}'
                        title="Description should not contain special characters and should only contain 15 characters"
                        invalid={errors.description && true} {...
                        field} />}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='addAccounts'>
                      Add Accounts
                    </Label>
                    <Controller
                      id='addAccounts'
                      control={control}
                      name='addAccounts'
                      render={({ field }) => (
                        <Select
                          isMulti
                          isClearable
                          options={addAccount}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.addAccounts === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
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
                          isMulti
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
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='rateCategory'>
                      Rate Category
                    </Label>
                    <Controller
                      id='rateCategory'
                      control={control}
                      name='rateCategory' sources
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={rateCategory}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.rateCategory === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='marketCode'>
                      Market Code
                    </Label>
                    <Controller
                      id='marketCode'
                      control={control}
                      name='marketCode'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={marketCodes}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.marketCode === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='source'>
                      Source
                    </Label>
                    <Controller
                      id='source'
                      control={control}
                      name='source'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={sources}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.source === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='beginDate'>
                      Begin Date
                    </Label>
                    <Controller
                      control={control}
                      id='beginDate'
                      name='beginDate'
                      render={({ field }) => (
                        <Flatpickr
                          // selected={this.state.startDate}
                          // onChange={this.handleChange}
                          // minDate={moment().toDate()}
                          // placeholderText="Select a day"

                          {...field}
                          options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.beginDate === null
                          })}
                        />
                      )}
                    />
                  </div>

                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='sellDate'>
                      Sell Date
                    </Label>
                    <Controller
                      control={control}
                      id='sellDate'
                      name='sellDate'
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.sellDate === null
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>

                
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='package'>
                      Package
                    </Label>
                    <Controller
                      id='package'
                      control={control}
                      name='package'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={packages}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.package === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>


                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='transactionCode'>
                      Transaction Code
                    </Label>
                    <Controller
                      id="transactionCode"
                      control={control}
                      name="transactionCode"
                      render={({ field }) => (
                        <Select
                          required
                          isClearable
                          options={transactionCode}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select", {
                            "is-invalid": data !== null && data.transactionCode === null,
                          })}
                          {...field}

                        />
                      )}
                    />
                  </div>
                </Col>


                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='pkgtransactionCode'>
                      Pkg Transaction Code
                    </Label>
                    <Controller
                      id='pkgtransactionCode'
                      control={control}
                      name='pkgtransactionCode'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={packagetransactionCode}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.pkgtransactionCode === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='printRate'>
                      Print Rate
                    </Label>
                    <Controller
                      id='printRate'
                      control={control}
                      name='printRate'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={Options}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.printRate === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='discount'>
                      Discout
                    </Label>
                    <Controller
                      id='discount'
                      control={control}
                      name='discount'
                      render={({ field }) => (
                        <Select
                          // onChange={handleDropdownChange}
                          isClearable
                          options={Options}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.discount === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                {/* {selectedOption === 'option1' && (
                  <div className='mb-1'>
                    <Label className='form-label' for='discountamt'>
                      Discount Amount
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='discountamt'
                      name='discountamt'
                      render={({ field }) => <Input placeholder='DiscountAmount'
                        pattern='[0-9_]{1,15}'
                        title="Discount Amount can contain numbers . It cannnot contain alphabets and special characters." required
                        invalid={errors.discountamt && true} {...field} />}
                    />
                  </div>
                  <div className='mb-1'>
                    <Label className='form-label' for='discountpercentage'>
                     Discount Percentage
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='discountpercentage'
                      name='discountpercentage'
                      render={({ field }) => <Input placeholder=' Discount Percentage'
                        pattern='[0-9_]{1,15}'
                        title="Discount Percentagecan contain numbers . It cannnot contain alphabets and special characters." required
                        invalid={errors.discountpercentage && true} {...field} />}
                    />
                  </div>
                )} */}

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='dayUse'>
                      Day Use
                    </Label>
                    <Controller
                      id='dayUse'
                      control={control}
                      name='dayUse'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={Options}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.dayUse === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>


                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='complementary'>
                      Complementary
                    </Label>
                    <Controller
                      id='complementary'
                      control={control}
                      name='complementary'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={Options}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.complementary === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='houseUse'>
                      House Use
                    </Label>
                    <Controller
                      id='houseUse'
                      control={control}
                      name='houseUse'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={Options}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.houseUse === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='day'>
                      Day
                    </Label>
                    <Controller
                      id='day'
                      control={control}
                      name='day'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={day}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.day === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>



              </Row>
            </div>

            <div className='vertically-centered-modal'>
              <Modal isOpen={show} toggle={() => actionButton(!show)} className='modal-xl'>
                <ModalHeader toggle={() => actionButton(!show)}> Welcome...  </ModalHeader>
                <ModalBody >
                  <Card>
                    {/* <div className="ag-theme-alpine" style={{ height: 320 }}>
                      <AgGridReact
                        ref={gridRef}
                        rowData={rowData} columnDefs={columnDefs}
                        animateRows={true} rowSelection='multiple'
                        onCellClicked={cellClickedListener}
                        // paginationAutoPageSize = 'true'
                        paginationPageSize='10'
                        pagination='true'
                        singleClickEdit='true'
                        defaultColDef={defaultColDef}
                        headerColor="ddw-primary"

                      />
                    </div> */}
                    <RateDetails/>
                    <ModalForm />
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' onClick={() => setDisabledModal(!disabledModal)}>
                    Continue
                  </Button>
                </ModalFooter>
              </Modal>
              {/* <Components /> */}
              {/* <App/> */}
            </div>

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
              <Button outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
            </div>

          </Form>


        </CardBody>
      </Card>

      <Card>
        <div className="ag-theme-alpine" style={{ height: 400 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            paginationPageSize='10'
            pagination='true'
            singleClickEdit='true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"

          />
        </div>
      </Card>

      {/* <App/> */}
    </div>
  )
}

export default rateCode;
