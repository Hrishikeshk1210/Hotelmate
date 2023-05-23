// // ** React Imports
// import { useState } from 'react'

// // ** Third Party Components
// import Select from 'react-select'
// import toast from 'react-hot-toast'
// import classnames from 'classnames'
// import Cleave from 'cleave.js/react'
// import { Check } from 'react-feather'
// import Flatpickr from 'react-flatpickr'
// import 'cleave.js/dist/addons/cleave-phone.us'
// import { useForm, Controller } from 'react-hook-form'
// import Moment from 'moment';

// // ** Custom Components
// import Avatar from '@components/avatar'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // ** Reactstrap Imports
// import { Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// // ** Styles
// import '@styles/react/libs/flatpickr/flatpickr.scss'
// import '@styles/react/libs/react-select/_react-select.scss'
// import '@styles/react/pages/page-form-validation.scss'
// // AG Grid
// import { AgGridReact } from 'ag-grid-react';
// import '/node_modules/ag-grid-community/styles/ag-grid.css';
// import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import { useRef, useEffect, useMemo, useCallback } from 'react';
// import { ArrowLeft, ArrowRight } from 'react-feather'
// // const id = '1';

// // import App from './datagrid'

// const defaultValues = {
//     roomTypeID: null,
//     oneAdultPrice: '',
//     twoAdultPrice: '',
//     threeAdultPrice: '',
//     extraAdultPrice: '',
//     extraChildPrice: '',
// }


// const roomType = [
//     { value: "1", label: "OterraBlack" },
//     { value: "2", label: "OterraGold" },
//     { value: "3", label: "OterraSilver" },
//     { value: "4", label: "OterraPlatinum" },
// ];

// const levels = [
//     { value: "Black", label: "Black" },
//     { value: "Gold", label: "Gold" },
//     { value: "Silver", label: "Silver" },
//     { value: "Platinum", label: "Platinum" },
// ];



// const Floor = ({ stepper, type }) => {

//     // Ag Grid
//     const [rowData, setRowData] = useState();

//     const gridRef = useRef();

//     const [columnDefs, setColumnDefs] = useState([
//         { headerName: 'Room Type ', field: 'roomTypeID', suppressSizeToFit: true, maxWidth: 160 },
//         { headerName: 'One Adult Price', field: 'oneAdultPrice' },
//         { headerName: 'Two Adult Price', field: 'twoAdultPrice' },
//         { headerName: 'Three Adult Price', field: 'threeAdultPrice' },
//         { headerName: 'Extra Adult Price ', field: 'extraAdultPrice' },
//         { headerName: 'Extra Child Price', field: 'extraChildPrice' },
        
//     ]);

//     const defaultColDef = useMemo(() => (
//         {
//             sortable: true,
//             filter: true,
//             filterParams: {
//                 buttons: ['apply', 'reset']
//             }
//         }
//     ));

//     const cellClickedListener = useCallback(event => {
//         console.log('cellClicked', event);
//     }, []);

//     useEffect(() => {
//         fetch('http://192.168.1.33:14700/getRateCodeRoomRate?hotelID=1')
//             .then(result => result.json())
//             .then(rowData => setRowData(rowData['data']))
//     }, []);


//     // ** Hooks
//     const {
//         setError,
//         formState: { errors }
//     } = useForm()



//     // ** State
//     const [data, setData] = useState(null)

//     // ** Hooks
//     const { reset, handleSubmit, control } = useForm({ defaultValues })

//     const onSubmit = data => {
//         if (localStorage.getItem('guestID') != null) {
//             // Submit form data
//             console.log('Submitting form data...',);
//             setData(data)
//             console.log(data)
//             if (
//                 data.adultPriceOne !== null &&
//                 data.expiryDate !== null
//             ) {
//                 console.log(data)
//                 let createmarketGroup = JSON.stringify({
//                     // "hotelID": data.hotelID,
//                     // "rateCodeID": localStorage.getItem('rateCodeID'),
//                     "roomTypeID": data.roomType.value,
//                     "oneAdultPrice": data.adultPriceOne,
//                     "twoAdultPrice": data.adultPriceTwo,
//                     "threeAdultPrice":data.adultPriceThree,
//                     "extraAdultPrice":data.extraAdultPrice,
//                     "extraChildPrice":data.extraChildPrice,                 
//                 })
//                 console.log(createmarketGroup)
//                 localStorage.removeItem('guestID')

//                 console.log("hi")
//                 let res = fetch("http://192.168.1.33:14700/addrateCodeRoomRate", {
//                     method: "POST",
//                     headers: { 'Content-Type': 'application/json' },
//                     body: createmarketGroup
//                 }).then((res) => {
//                     console.log(res);
//                     if (res['status'] == 200) {
//                         fetch('http://192.168.1.33:14700/getRateCodeRoomRate?hotelID=1')
//                             .then(result => result.json())
//                             .then(rowData => {
//                                 setRowData(rowData['data'])
//                                 console.log(rowData['data'])
//                             })
//                     }

//                 });
//                 toast(
//                     <div className='d-flex'>
//                         <div className='me-1'>
//                             <Avatar size='sm' color='success' icon={<Check size={12} />} />
//                         </div>
//                         <div className='d-flex flex-column'>
//                             <h6>Form Submitted!</h6>
//                             <h4>Membership Details Added Successfull</h4>
//                         </div>
//                     </div>
//                 )
//             }
//         } else {
//             console.log('User is not logged in. Form data not submitted.');
//             alert("Please Fill Rate Code Details First")
//         }
//     }

//     const handleReset = () => {
//         reset({
//             roomTypeID: null,
//             oneAdultPrice: '',
//             twoAdultPrice: '',
//             threeAdultPrice: '',
//             extraAdultPrice: '',
//             extraChildPrice: '',
//         })
//     }

//     return (
//         <div>
//             <Card>
//                 {/* <CardHeader>
//                     <CardTitle tag='h4'>Floor</CardTitle>
//                 </CardHeader> */}
//                 <CardBody>
//                     <Form onSubmit={handleSubmit(onSubmit)}>
//                         <Row>
//                             <Col md='3' sm='12' className='mb-1'>
//                                 <div className="mb-1">
//                                     <Label className="form-label" for="roomType">
//                                         Room Type
//                                     </Label>
//                                     <Controller
//                                         defaultValue=''
//                                         control={control}
//                                         id='roomType'
//                                         name='roomType'
//                                         render={({ field }) => <Input placeholder='roomType' invalid={errors.roomType && true} {...field} />}
//                                     />
//                                 </div>
//                             </Col>
//                             <Col md='3' sm='12'>
//                                 <div className='mb-1'>
//                                     <Label className='form-label' for='adultPriceOne'>
//                                         Adult Price One
//                                     </Label>
//                                     <Controller
//                                         defaultValue=''
//                                         control={control}
//                                         id='adultPriceOne'
//                                         name='adultPriceOne'
//                                         render={({ field }) => <Input placeholder='Adult Price One' invalid={errors.adultPriceOne && true} {...field} />}
//                                     />
//                                 </div>
//                             </Col>

//                             <Col md='3' sm='12' className='mb-1'>
//                                 <div className='mb-1'>
//                                     <Label className='form-label' for='adultPriceTwo'>
//                                         Adult Price Two
//                                     </Label>
//                                     <Controller
//                                         defaultValue=''
//                                         control={control}
//                                         id='adultPriceTwo'
//                                         name='adultPriceTwo'
//                                         render={({ field }) => <Input placeholder='Adult Price Two' invalid={errors.adultPriceTwo && true} {...field} />}
//                                     />
//                                 </div>
//                             </Col>
//                             <Col md='3' sm='12' className='mb-1'>
//                                 <div className="mb-1">
//                                     <Label className="form-label" for=" adultPriceThree">
//                                         Adult Price Three
//                                     </Label>
//                                     <Controller
//                                         defaultValue=''
//                                         control={control}
//                                         id=' adultPriceThree'
//                                         name=' adultPriceThree'
//                                         render={({ field }) => <Input placeholder='Adult Price Three' invalid={errors.adultPriceThree && true} {...field} />}
//                                     />
//                                 </div>
//                             </Col>
//                             <Col md='3' sm='12' className='mb-1'>
//                                 <div className="mb-1">
//                                     <Label className="form-label" for=" extraAdultPrice">
//                                         Extra Adult Price
//                                     </Label>
//                                     <Controller
//                                         defaultValue=''
//                                         control={control}
//                                         id=' extraAdultPrice '
//                                         name=' extraAdultPrice'
//                                         render={({ field }) => <Input placeholder='Extra Adult Price ' invalid={errors.extraAdultPrice && true} {...field} />}
//                                     />
//                                 </div>
//                             </Col>
//                             <Col md='3' sm='12' className='mb-1'>
//                                 <div className="mb-1">
//                                     <Label className="form-label" for=" extraChildPrice">
//                                         Extra Child Price
//                                     </Label>
//                                     <Controller
//                                         defaultValue=''
//                                         control={control}
//                                         id=' extraChildPrice '
//                                         name=' extraChildPrice'
//                                         render={({ field }) => <Input placeholder='Extra Child Price ' invalid={errors.extraChildPrice && true} {...field} />}
//                                     />
//                                 </div>
//                             </Col>

//                         </Row>
//                         <div className='d-flex'>
//                             <Button className='me-1' color='primary' type='submit'>
//                                 Submit
//                             </Button>
//                             <Button outline color='secondary' type='reset' onClick={handleReset}>
//                                 Reset
//                             </Button>
//                         </div>

//                         <br></br>
//                         <br></br>

//                         <div className='d-flex justify-content-between'>
//                             <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
//                                 <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
//                                 <span className='align-middle d-sm-inline-block d-none'>Previous</span>
//                             </Button>

//                         </div>

//                     </Form>
//                 </CardBody>
//             </Card>
//             {/* <div className="ag-theme-alpine" style={{ height: 520 }}>
//                 <AgGridReact
//                     ref={gridRef}
//                     rowData={rowData} columnDefs={columnDefs}
//                     animateRows={true} rowSelection='multiple'
//                     onCellClicked={cellClickedListener}
//                     // paginationAutoPageSize = 'true'
//                     paginationPageSize='10'
//                     pagination='true'
//                     defaultColDef={defaultColDef}
//                     headerColor="ddw-primary"

//                 />
//             </div> */}
//             {/* <App/> */}
//         </div>
//     )
// }

// export default Floor;


// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import { X, Plus } from 'react-feather'

// ** Custom Components
import Repeater from '@components/repeater'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
// ** Custom Components
import Avatar from '@components/avatar'
import { Check } from 'react-feather'

const defaultValues = {
  roomTypeID: '',
  oneAdultPrice: '',
  twoAdultPrice: '',
  threeAdultPrice: '',
  extraAdultPrice: '',
  extraChildPrice: '',
}

const RepeatingForm = () => {
  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()

  // ** State
  const [count, setCount] = useState(1)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = e => {
    e.preventDefault()
    e.target.closest('form').remove()
  }

  const { reset, handleSubmit, control } = useForm({ defaultValues })
  // ** State
  const [data, setData] = useState(null)

  const onSubmit = data => {

    setData(data)
    console.log(data)
    if (
      data.oneAdultPrice !== null &&
      data.expiryDate !== null
    ) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "rateCodeID": localStorage.getItem('id'), 
        "roomTypeID": data.roomTypeID,
        "oneAdultPrice": data.oneAdultPrice,
        "twoAdultPrice": data.twoAdultPrice,
        "threeAdultPrice": data.threeAdultPrice,
        "extraAdultPrice": data.extraAdultPrice,
        "extraChildPrice": data.extraChildPrice,
      })
      console.log(createmarketGroup)
      localStorage.removeItem('guestID')

      console.log("hi")
      let res = fetch("http://192.168.1.33:14700/addrateCodeRoomRate", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res);
        if (res['status'] == 200) {
          fetch('http://192.168.1.33:14700/getRateCodeRoomRate?hotelID=1')
            .then(result => result.json())
            .then(rowData => {
              setRowData(rowData['data'])
              console.log(rowData['data'])
            })
        }

      });
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <h4>RateCode Details Added Successfull</h4>
          </div>
        </div>
      )
    }

  }

  return (
    <Card>
      {/* <CardHeader>
        <h4 className='card-title'>Rate Code</h4>
      </CardHeader> */}

      <CardBody>
        <Repeater count={count}>
          {i => (
            <Form key={i} onSubmit={handleSubmit(onSubmit)}>

              <Row className='justify-content-between align-items-center'>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="roomTypeID-${i}">
                      Room Type
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='roomTypeID-${i}'
                      name='roomTypeID'
                      render={({ field }) => <Input placeholder='  roomTypeID' invalid={errors.roomTypeID && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='oneAdultPrice-${i}'>
                      Adult Price One
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='oneAdultPrice-${i}'
                      name='oneAdultPrice'
                      render={({ field }) => <Input placeholder='Adult Price One' invalid={errors.oneAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>


                <Col md='3' sm='12' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='twoAdultPrice-${i}'>
                      Adult Price Two
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='twoAdultPrice-${i}'
                      name='twoAdultPrice'
                      render={({ field }) => <Input placeholder='Adult Price Two' invalid={errors.twoAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="threeAdultPrice-${i}">    Adult Price Three
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='threeAdultPrice-${i}'
                      name='threeAdultPrice'
                      render={({ field }) => <Input placeholder='Adult Price Three' invalid={errors.  threeAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                </Row>
                <Row>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="extraAdultPrice-${i}">
                      Extra Adult Price
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='extraAdultPrice -${i}'
                      name='extraAdultPrice'
                      render={({ field }) => <Input placeholder='Extra Adult Price' invalid={errors.extraAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="extraChildPrice-${i}">
                      Extra Child Price
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='extraChildPrice-${i}'
                      name='extraChildPrice'
                      render={({ field }) => <Input placeholder='Extra Child Price ' invalid={errors.extraChildPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                </Row>


                <Col md={2}>
                  <Button  color='danger' className='text-nowrap px-1' onClick={deleteForm} outline>
                    <X  size={14} className='me-50' />
                    <span>Delete</span>
                  </Button>   
                  <Button className='me-1' color='primary' type='submit'>
                    Submit
                  </Button>
                </Col>
                <Col sm={12}>
                  <hr />
                </Col>
            </Form>
          )}
        </Repeater>
        <Button className='btn-icon' color='primary' onClick={increaseCount}>
          <Plus size={14} />
          <span className='align-middle ms-25'>Add New</span>
        </Button>
      </CardBody>
    </Card>
  )
}

export default RepeatingForm

