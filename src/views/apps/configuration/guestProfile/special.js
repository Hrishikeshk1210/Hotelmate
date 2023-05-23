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
import { Card, Form, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Input, Row } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
const id = '1';

// import App from './datagrid' 
// import { specialDescription } from '../repeat'
const colourOptions = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },
  
]

const defaultValues = {
    specialCode: '',
    specialDescription: '',
    
    
}


let specialGroupID = [
  fetch('http://192.168.1.33:14700/getSpecialGroupID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      specialGroupID = resp['data']
      console.log(specialGroupID)
    })
  ]



const Specials = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    
    {headerName: 'Preference',field: 'preference',suppressSizeToFit: true},
    {headerName: 'Description',field: 'description'},
    {headerName: 'Is Active',field: 'isActive'},
    {headerName: 'Special Group ID',field: 'specialGroupID'},

     
    
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
    fetch('http://192.168.1.33:14700/Specials?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.preference.length && data.description.length) {
        console.log(data)
        let createspecial = JSON.stringify({
          "preference"   : data.preference,
          "description" : data.description,
          "isActive" : data.isActive.value,
          "specialGroupID" : data.specialGroupID.value,
          
        })
        console.log(createspecial)
        let res = fetch("http://192.168.1.33:14700/specials", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: createspecial
        }).then((res) => {
          console.log(res);
          if(res['status']==200){
            fetch('http://192.168.1.33:14700/Specials?hotelID=1')
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
            <h4>Specials Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      preference: '',
      description: '',
      isActive:null,
      specialGroupID:''
        
    })
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Specials</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='4' sm='12'>
        <div className='mb-1'>
            <Label className='form-label' for='specialCode'>
            Preference
            </Label>
            <InputGroup className='input-group-merge'>
              
              <Controller
                id='preference'
                name='preference'
                control={control}
                render={({ field }) => (
                  <Input
                  placeholder='Preference'
                  // pattern='[aA-zZ]'
                   title="This must Contain Alphabet" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.preference === null || !data.preference.length)
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
                  required
                  placeholder='Description'
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
                <Label className='form-label' for='isActive'>
                  Active Status
                </Label>
                <Controller
                  id='isActive'
                  control={control}
                  name='isActive'
                  render={({ field }) => (
                    <Select
                    required
                      isClearable
                      options={colourOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.isActive === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col  md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='specialGroupID'>
            Special  Group ID
            </Label>
            <Controller
              id="specialGroupID"
              control={control}
              name="specialGroupID"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={specialGroupID}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.specialGroupID === null,
                  })}
                  {...field}
                  
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
    <div className="ag-theme-alpine" style={{ height: 520}}>
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
{/* <App/> */}
    </div>
  )
}

export default Specials