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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const id = '1';

// import App from "./datagrid"
// const colourOptions = [
//     { value: '1', label: 'Active' },
//   { value: '0', label: 'In Active' },

// ]

const defaultValues = {
    // hotelID: '',
    vipType: '',
    vipLevel: '',

}

const vipType = () => {
    const [open, setOpen] = useState('')
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
    // ** Hooks
    const {
        setError,
        formState: { errors }
    } = useForm()

    // AG Grid
    const [rowData, setRowData] = useState();

    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'vip Type', field: 'vipType', suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 160  },
        { headerName: 'vipLevel', field: 'vipLevel', suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 160 },



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
        fetch('http://192.168.1.33:14700/getvip?hotelID=1')
            .then(result => result.json())
            .then(rowData => setRowData(rowData['data']))
    }, []);

    // ** State
    const [data, setData] = useState(null)

    // ** Hooks
    const { reset, handleSubmit, control } = useForm({ defaultValues })

    const onSubmit = data => {
        setData(data)
        if (data.vipType.length && data.vipLevel.length) {
            console.log(data)
            let createvipType = JSON.stringify({
                // "hotelID": data.hotelID,
                "vipType": data.vipType,
                "vipLevel": data.vipLevel,

            })
            console.log(createvipType)
            let res = fetch("http://192.168.1.33:14700/addvip", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: createvipType
            }).then((res) => {
                console.log(res);
                if (res['status'] == 200) {
                    fetch('http://192.168.1.33:14700/getvip?hotelID=1')
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
                        <h4>Market Group Submitted Successfull</h4>
                    </div>
                </div>
            )
        }
    }

    const handleReset = () => {
        reset({
            // hotelID: '',
            vipType: '',
            vipLevel: '',

        })
    }

    return (
        <div>

            <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add VIP Details </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
                <CardHeader>
                    <CardTitle tag='h4'>VIP </CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                          
                            <Col md='4' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='vipType'>
                                        Vip Type
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='vipType'
                                        name='vipType'
                                        render={({ field }) => <Input placeholder='vipType' pattern='[A-Za-z0-9_]{1,15}'
                                            title="vipLevel should not contain special characters and should only contain 15 characters"
                                            invalid={errors.vipType && true} {...
                                            field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='vipLevel'>
                                        VIP Level
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='vipLevel'
                                        name='vipLevel'
                                        render={({ field }) => <Input placeholder='vipLevel' pattern='[A-Za-z0-9_]{1,15}'
                                            title="vipLevel should not contain special characters and should only contain 15 characters"
                                            invalid={errors.vipLevel && true} {...
                                            field} />}
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

export default vipType