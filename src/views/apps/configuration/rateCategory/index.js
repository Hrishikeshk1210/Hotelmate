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
import { Card, Col, Form, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Input, Row } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const id = '1';

// import { ActiveStatus } from '../repeat'
import App from './datagrid'

const colourOptions = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },
  
]

const defaultValues = {
    rateCategory: '',
    description: '',
    activeStatus: null,
    rateClassID: null
}


let rateClassID = [
  fetch('http://192.168.1.33:14700/getRateCategoryRateClassID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      rateClassID = resp['data']
      console.log(rateClassID)
    })
  ]

const RateCategory = () => {
 const [open, setOpen] = useState('')
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    
    // {headerName: 'HotelID  ',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Rate Category ',field: 'rateCategory',cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140},
    {headerName: 'Description',field: 'description',cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140},
       {headerName: 'Active Status',field: 'isActive',cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140},
       {headerName: 'rateClassID ',field: 'rateClass',cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140}
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
    fetch('http://192.168.1.33:14700/RateCategory?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.rateCategory.length && data.description.length) {
        console.log(data)
        let createasset = JSON.stringify({
          "rateCategory"   : data.rateCategory,
          "description" : data.description,
          "isActive" : data.activeStatus.value,
          "rateClassID": data.rateClassID.value
        })
        console.log(createasset)
        let res = fetch("http://192.168.1.33:14700/rateCategory", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: createasset
        }).then((res) => {
          console.log(res);
          if(res['status']==200){
            fetch('http://192.168.1.33:14700/RateCategory?hotelID=1')
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
          <h4>Rate Category Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
        rateCategory: '',
        description: '',
        activeStatus: null,
        rateClassID: null
    })
  }

  return (
    <div>

    
   

 <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Rate Category </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag='h4'>Rate Category</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
   <Col md='4' sm='12'>
        <div className='mb-1'>
            <Label className='form-label' for='rateCategory'>
              Rate Category
            </Label>
            <InputGroup className='input-group-merge'>
        
              <Controller
                id='rateCategory'
                name='rateCategory'
                control={control}
                render={({ field }) => (
                  <Input
                  required
                  placeholder='Rate Category'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.rateCategory === null || !data.rateCategory.length)
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
            <Label className='form-label' for='description'>
            Description
            </Label>
            <InputGroup className='input-group-merge'>
        
              <Controller
                id='description'
                name='description'
                control={control}
                render={({ field }) => (
                  <Input
                  placeholder='description'
                  required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.description === null || !data.description.length)
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
            <Label className='form-label' for='activeStatus'>
              Active Status
            </Label>
            <Controller
              id='activeStatus'
              control={control}
              name='activeStatus'
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={colourOptions}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.activeStatus === null })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='rateClassID'>
                Rate Class ID
                </Label>
                <Controller
                  id='rateClassID'
                  control={control}
                  name='rateClassID'
                  render={({ field }) => (
                    <Select
                    required
                      isClearable
                      options={rateClassID}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.rateClassID === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            </Row>
            {/* <ActiveStatus/> */}
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

export default RateCategory