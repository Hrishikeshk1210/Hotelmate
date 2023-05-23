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
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input,InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
// const id = '1';
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
// import App from './datagrid'

const defaultValues = {
  // hotelID: '',
  floor:'',
  blockID: null
  
}


let blockID = [
fetch('http://192.168.1.33:14700/getfloorblockid?hotelID=1')
  .then(result => result.json())
  .then(resp => {
    // console.log(resp['data'])
    blockID = resp['data']
    console.log(blockID)
  })
]



const Floor = () => {

  
  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()


  // window.location.reload(true);
  // Ag Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Floor ',field: 'floor',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Block',field: 'block',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
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
    fetch('http://192.168.1.33:14700/floor?hotelID=1&floor=1&blockID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);
  

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  const [value, setValue] = useState('')

  const onSubmit = data => {
    setData(data)
    console.log(data)
    if ( 
      data.floor !== null &&
      data.blockID !== null
       ) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "floor": data.floor,
        "blockID": data.blockID.value
             })
      console.log(createmarketGroup)
      console.log("hi")
      let res = fetch("http://192.168.1.33:14700/floor", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/floor?hotelID=1&floor=1&blockID=1')
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
            <h4>Floor Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    reset({
      // hotelID: '',
      floor:'',
      blockID: null
    })
  }

  return (
    <div>
  

    <div>
<UncontrolledAccordion>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b> Add Floor</b></h4></AccordionHeader>
        <AccordionBody accordionId='1'>       
        <Card>
      <CardHeader>
        <CardTitle tag='h4'>Floor</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>          
                <Col md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='floor'>
                    Floor
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='floor'
                    name='floor'
                    render={({ field }) => <Input placeholder='Floor'
                      pattern='[0-9]{1,15}'
                      title="Floor can contain numbers . It cannnot contain alphabets and special characters." required
                      invalid={errors.floor && true} {...field} />}
                  />
                </div>
              </Col>
            

            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='blockID'>
                BlockID
                </Label>
                <Controller
              id="blockID"
              control={control}
              name="blockID"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={blockID}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.blockID === null,
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

        </AccordionBody>
      </AccordionItem>
      </UncontrolledAccordion>
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

export default Floor;
