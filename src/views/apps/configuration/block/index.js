// ** React Imports
import React, { Fragment, useState } from 'react';


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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader,Input, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';


import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
// import App from "./datagrid"
// const colourOptions = [
//   { value: 'status', label: '---Select Status---' },
//   { value: 'active', label: 'Active' },
//   { value: 'inactive', label: 'In Active' },
//   // { value: 'red', label: 'Red' },// AG Grid
// const id = '1';
//   // { value: 'orange', label: 'Orange' }
// ]

const defaultValues = {
 
  block: ''

}

const Block = () => {
  // const [accordion1Submitted, setAccordion1Submitted] = useState(false);
  const [cardData, setCardData] = useState(null)
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Block ',field: 'block',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    
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
    fetch('http://192.168.1.33:14700/block?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);


  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    setCardData(data)
    if ( data.block.length) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "block": data.block,
      })
      console.log(createmarketGroup)
      let res = fetch("http://192.168.1.33:14700/block", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/block?hotelID=1')
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
            <ul className='list-unstyled mb-0'>
              {/* <li>
                <strong>Hotel ID</strong>: {data.hotelID}
              </li> */}
              <li>
                <strong>Block</strong>: {data.block}
              </li>

            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
    
      block: ''
    })
  }

  return (
    <div>

<div>
<UncontrolledAccordion>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Block </b></h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag='h4'>Block</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='block'>
                  Block
                </Label>
                <InputGroup className='input-group-merge'>
                  
                  <Controller
                    id='block'
                    name='block'
                    control={control}
                    placeholder='block'
                    render={({ field }) => 
                      <Input placeholder='Block'
                      pattern='[aA-zZ]'
                      title="Block can contain Alphabets . It cannnot contain special characters." required
                       {...field} />}
                  />
                </InputGroup>
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
    {cardData && (
  <div>
    <Card>
    <h2>Submitted Data:</h2>
    Block: {cardData.block}
    </Card>
  </div>
)}
        </AccordionBody>
      </AccordionItem>
      </UncontrolledAccordion>
</div>
<br></br>
   




    <div className="ag-theme-alpine" style={{ height: 550}}>
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

export default Block
