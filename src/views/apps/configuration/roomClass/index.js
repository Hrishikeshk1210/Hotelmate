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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
// import './roomClass.scss'
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const id = '1';

const colourOptions = [
   { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },
  // { value: 'red', label: 'Red' },
  // { value: 'orange', label: 'Orange' }
]

const defaultValues = {
  // hotelID: '',
  roomClass: '',
  isActive: null,
}




const SourceCode = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        // { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
        { headerName: 'Room Class', field: 'roomClass', cellStyle: { 'text-align': 'center','background-color': '#F1E39B' }, headerClass: "text-center"  , suppressSizeToFit: true ,maxWidth: 140 },
        { headerName: 'Active Status', field: 'isActive' , cellStyle: { 'text-align': 'center', 'background-color': 'pink' },   headerClass: "text-center",maxWidth: 140  },

    ]);

    const onGridReady = (params) => {
      setGridApi(params.api);
      params.api.forEachNode((node) => {
        node.columnApi.getAllColumns().forEach((column) => {
          const cellRenderer = params.api.getCellRendererInstances({ column, rowNodes: [node] })[0];
          cellRenderer.getGui().classList.add('ag-full-border');
        });
      });
    };
    // 
    
    // const gridApi = useRef();


    const defaultColDef = useMemo(() => (
        {
            sortable: true,
            filter: true,
            filterParams: {
                buttons: ['apply', 'reset'] 
            },
            columnDefs: columnDefs,
             rowData: rowData,
             defaultColDef: {
             headerClass: "text-center"
            }
        }
    ));

    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    useEffect(() => {
        fetch('http://192.168.1.33:14700/getroomclass?hotelID=1')
            .then(result => result.json())
            .then(rowData => setRowData(rowData['data']))
            
    }, []);

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if ( data.marketCode!==null && data.marketGroupID!==null) {
      console.log(data)
      let createmarketCode = JSON.stringify({
        // "hotelID": data.hotelID,
        "roomClass": data.roomClass,
        "isActive": data.isActive.value,
      })
      console.log(createmarketCode)
      let res = fetch("http://192.168.1.33:14700/addroomclass", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketCode
      }).then((res) => {
        console.log(res)
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/getroomclass?hotelID=1')
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
            <h4>Room Class Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      // hotelID: '',
      roomClass: '',
      isActive: null,
    })
  }

  return (
    <div>


    <div>
<UncontrolledAccordion>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Room Class  </b></h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag='h4'>Room Class</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>          
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='roomClass'>
                  Room Class
                </Label>
                <InputGroup className='input-group-merge'>
                  
                  <Controller
                    id='roomClass'
                    name='roomClass'
                    control={control}
              
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        placeholder='Room Class'
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.roomClass === null || !data.roomClass.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
           
            <Col md='6' sm='12'>
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

export default SourceCode;
