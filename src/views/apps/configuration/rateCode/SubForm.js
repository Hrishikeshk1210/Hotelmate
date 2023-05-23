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
import {Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
import Components from "./components"
  const id = '1';

// import App from './datagrid'
const colourOptions = [
   { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },
  // { value: 'red', label: 'Red' },
  // { value: 'orange', label: 'Orange' }
]

const defaultValues = {
  // hotelID: '',
  rateCode: '',
  description: '',
  activeStatus: null,
  marketGroupID: null
}


let marketGroupID = [
  fetch('http://192.168.1.33:14700/getrateCodemarketgroupid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      marketGroupID = resp['data']
      console.log(marketGroupID)
    })
  ]


const rateCode = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
        { headerName: 'Market Code', field: 'rateCode', suppressSizeToFit: true },
        { headerName: 'Description', field: 'description' },
        { headerName: 'Active Status', field: 'isActive' },
        { headerName: 'Market Group ID', field: 'marketGroupID' },

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
        fetch('http://192.168.1.33:14700/rateCode?hotelID=1')
            .then(result => result.json())
            .then(rowData => setRowData(rowData['data']))
            
    }, []);

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if ( data.rateCode!==null && data.marketGroupID!==null) {
      console.log(data)
      let createrateCode = JSON.stringify({
        // "hotelID": data.hotelID,
        "rateCode": data.rateCode,
        "description": data.description,
        "isActive": data.activeStatus.value,
        "marketGroupID": data.marketGroupID.value
      })
      console.log(data.rateCode)
      console.log(createrateCode)
      let res = fetch("http://192.168.1.33:14700/rateCode", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createrateCode
      }).then((res) => {
        console.log(res)
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/rateCode?hotelID=1')
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
      activeStatus: null,
      marketGroupID:null
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
          <Row>            
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='rateCode'>
                  Rate Code
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.rateCode === null || !data.rateCode.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='rateCode'
                    name='rateCode'
                    control={control}
                    placeholder='rateCode'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.rateCode === null || !data.rateCode.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='description'>
                  Description
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.description === null || !data.description.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='description'
                    name='description'
                    control={control}
                    placeholder='description'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.description === null || !data.description.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='6' sm='12'>
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
                      options={{ allowInput: true }}  placeholder='YYYY-MM-DD '
                      className={classnames('form-control', {
                        'is-invalid': data !== null && data.beginDate === null
                      })}
                    />
                  )}
                />
              </div>

            </Col>

            <Col md='6' sm='12'>
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
                      options={{ allowInput: true }}  placeholder='YYYY-MM-DD '
                      className={classnames('form-control', {
                        'is-invalid': data !== null && data.sellDate === null
                      })}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='6' sm='12'>
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
            <Col  md='6' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='marketGroupID'>
            Market Group ID
            </Label>
            <Controller
              id="marketGroupID"
              control={control}
              name="marketGroupID"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={marketGroupID}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.marketGroupID === null,
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

        <Components/>
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

export default rateCode;
