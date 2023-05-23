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
import Moment from 'moment'

// ** Custom Components 
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import {useRef, useEffect, useMemo, useCallback} from 'react';
const id = '1';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

// import App from "./datagrid"
// const colourOptions = [
//   { value: 'status', label: '---Select Status---' },
//   { value: 'active', label: 'Active' },
//   { value: 'inactive', label: 'In Active' },
//   // { value: 'red', label: 'Red' },
//   // { value: 'orange', label: 'Orange' }
// ]

const defaultValues = {
 
  reservation: '',
  visaNumber: '',
  guestProfileID: '',
  issueDate: null,
  expiryDate: null

}

const VisaDetails = () => {
  const [open, setOpen] = useState('')
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    
    {headerName: 'Reservation',field: 'reservation', suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 160 },
    { headerName: 'Visa Number', field: 'visaNumber', suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 160  },
    { headerName: 'Guest Profile ID', field: 'guestProfileID', suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 160  },
    { headerName: 'Issue Date', field: 'issueDate', suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 160  },
    { headerName: 'Expiry Date', field: 'ExpiryDate', suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 160  },
     
    
  ]);

  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
        buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/visaDetails?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);


  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if ( data.reservation!== null && data.visaNumber!== null && data.guestProfileID!== null&& data.issueDate !== null & data.expiryDate !== null) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        
        "reservation"   : data.reservation,
          "visaNumber" : data.visaNumber,
          "guestProfileID":data.guestProfileID,
          "issueDate" : (Moment(String(new Date(data.issueDate[0]))).format('YYYY-MM-DD')),
          "ExpiryDate" : (Moment(String(new Date(data.expiryDate[0]))).format('YYYY-MM-DD'))
      })
      console.log(createmarketGroup)
      let res = fetch("http://192.168.1.33:14700/visaDetails", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/visaDetails?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
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
            <h4>Visa Details Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
     
      reservation: '',
      visaNumber: '',
      guestProfileID: '',
      issueDate: null,
      expiryDate: null
    })
  }

  return (
    <div>
      

      <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Visa Details </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
        <CardHeader>
          <CardTitle tag='h4'>Visa Details</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
             
              <Col>
                <div className='mb-1'>
                  <Label className='form-label' for='reservation'>
                    Reservation
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.reservation === null || !data.reservation.length)
                      })}
                    >
                    </InputGroupText>
                    <Controller
                      id='reservation'
                      name='reservation'
                      control={control}
                      placeholder='reservation'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.reservation === null || !data.reservation.length)
                          })}
                        // options={{ phone: true, phoneRegionCode: 'US' }}y
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>

              <Col md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='visaNumber'>
                    Visa Number
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.visaNumber === null || !data.visaNumber.length)
                      })}
                    >
                    </InputGroupText>
                    <Controller
                      id='visaNumber'
                      name='visaNumber'
                      control={control}
                      placeholder='visaNumber'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.visaNumber === null || !data.visaNumber.length)
                          })}
                        // options={{ phone: true, phoneRegionCode: 'US' }}y
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>

              <Col md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='guestProfileID'>
                    Guest Profile ID
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.guestProfileID === null || !data.guestProfileID.length)
                      })}
                    >
                    </InputGroupText>
                    <Controller
                      id='guestProfileID'
                      name='guestProfileID'
                      control={control}
                      placeholder='guestProfileID'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.guestProfileID === null || !data.guestProfileID.length)
                          })}
                        // options={{ phone: true, phoneRegionCode: 'US' }}y
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>


              <Col md='4' sm='12'>
              <div className='mb-1'>
            <Label className='form-label' for='issueDate'>
              Issue Date
            </Label>
            <Controller
              control={control}
              id='issueDate'
              name='issueDate'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.issueDate === null
                  })}
                />
              )}
            />
          </div>        
              </Col>
              
              <Col md='4' sm='12'>
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
                  options={{ allowInput: true }} 
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
        </AccordionBody>
      </AccordionItem>
      </Accordion>
</div>
      <br></br>
    <div>
    <Card>
    <div className="ag-theme-alpine" style={{ height: 540}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
    </Card>
    </div>  
    </div>
  )
}

export default VisaDetails