// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** Images
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'

// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, Input, Card, Form, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
// ** React Imports
import { useState,useEffect } from 'react'

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


// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'


import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';



const defaultValues = {

    reservation: '',
    visaNumber: '',
    guestProfileID: '',
    issueDate: null,
    ExpiryDate: null

}

const rateCode = [
    { value: 'RackRate1', label: 'RackRate1' },
    { value: 'RackRate2', label: 'RackRate2' },
    { value: 'RackRate3', label: 'RackRate3' },
]

const packageType = [
    { value: 'EP', label: 'EP' },
    { value: 'CP', label: 'CP' },
   
]

const rtcOptions= [
    { value: 'TDLX', label: 'TDLX' },
    
   
]

const roomTypeOptions = [
    { value: "KSUP", label: "KSUP" },
    { value: "EXE", label: "EXE" },
    { value: "TSUP", label: "TSUP" },
    { value: "KDLX", label: "KDLX" },
    { value: "TDLX", label: "TDLX" },
    { value: "KCLB", label: "KCLB" },
    { value: "PM", label: "PM" },
];


const TableBorderless = () => {

    // // var FullData = []
    // fetch('http://192.168.1.33:14700/add_bookinfo_reservation')
    //     .then(result => result.json())
    //     .then(rowData => {
    //         console.log(rowData)
    //         console.log(rowData['Data']['RoomTypeWiseDetails']['roominfo']['roomTypeID'])
    
            // FullData = [
            //     {
            //         roomTypeID: rowData['Data']['RoomTypeWiseDetails']['1']['roominfo']['roomTypeID'],
            //         baseprice: rowData['Data']['RoomTypeWiseDetails']['1']['roominfo']['baseprice'],
            //         extraadultprice: rowData['Data']['RoomTypeWiseDetails']['1']['roominfo']['extraadultprice'],
            //         childrenprice: rowData['Data']['RoomTypeWiseDetails']['1']['roominfo']['childrenprice'],
            //         total: rowData['Data']['RoomTypeWiseDetails']['1']['roominfo']['total'],
            //         numAvlRooms: rowData['Data']['RoomTypeWiseDetails']['1']['roominfo']['numAvlRooms'],
            //         PackageName: rowData['Data']['packageCode'],
            //     }
            // ]
            // console.log(FullData)
        // })
    
    // const [columnDefs, setColumnDefs] = useState([
    //     { headerName: 'Room Type ID', field: 'roomTypeID', suppressSizeToFit: true, maxWidth: 200 },
    //     { headerName: 'BaseRate ', field: 'baseprice', suppressSizeToFit: true },
    //     { headerName: 'extraadultprice', field: 'extraadultprice', suppressSizeToFit: true, maxWidth: 200 },
    //     { headerName: 'childrenprice', field: 'childrenprice', suppressSizeToFit: true, maxWidth: 200 },
    //     { headerName: 'Package', field: 'PackageName', suppressSizeToFit: true, maxWidth: 200 },
    //     { headerName: 'Total Rate', field: 'total', suppressSizeToFit: true, maxWidth: 200 },
    //     { headerName: 'Avalablity', field: 'numAvlRooms', suppressSizeToFit: true, maxWidth: 200 },
    // ]);

    // ** Hooks
    const {
        setError,
        formState: { errors }
    } = useForm()



    // ** State
    const [data, setData] = useState(null)
    const [rowData, setRowData] = useState(null)

    // ** Hooks
    const { reset, handleSubmit, control } = useForm({ defaultValues })

// ////////////////////////Display dates between two Dates
//     useEffect(() => {
//         fetch('http://localhost:14702/getCheckIn?hotelID=1' )
//         .then(result => result.json())
//         .then(rowData => {
//             setRowData(rowData['data'])
//             console.log(rowData['data'])
//             let startDate = rowData['data']
//             console.log(startDate)
//         })
// });
// // console.log( rowData['data'])
// // const startDate = new Date( rowData[0]);
// console.log(startDate)
//     const endDate = new Date('2023-04-11');
//     const dates = [];

//     for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
//         dates.push(new Date(date));
//       }

//       console.log(dates.map(date => date.toDateString()));


    return (

        
        <div>
               <div>
            {/* <button onClick={buttonListener}>Push Me</button> */}
            {/* <div className="ag-theme-alpine" style={{ height: 520 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    // paginationAutoPageSize = 'true'
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div> */}
        </div>
            <Card>
                {/* <CardTitle> Daily Details</CardTitle> */}
        <Table borderless responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>RateCode</th>
                    <th>Package</th>
                    <th>Rate Amount</th>
                    <th>RoomType</th>
                    <th>RTC</th>
                    <th>Adults</th>
                    <th>Child</th>
                    <th> Disc Amt.</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='issueDate'>
                                    Issue Date
                                </Label> */}
                                <Controller
                                    control={control}
                                    id='issueDate'
                                    name='issueDate'
                                    render={({ field }) => (
                                        <Flatpickr
                                            {...field}
                                            options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                                            className={classnames('form-control', {
                                                'is-invalid': data !== null && data.issueDate === null
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rackRate'>
                                    Rack Rate 1
                                </Label> */}
                                <Controller
                                    id='rackRate'
                                    control={control}
                                    name='rackRate'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={rateCode}
                                            classNamePrefix='select'
                                            theme={selectThemeColors}
                                            className={classnames('react-select', { 'is-invalid': data !== null && data.rackRate === null })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}

                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='package'>
                                    Package
                                </Label> */}
                                <Controller
                                    id='package'
                                    control={control}
                                    name='package'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={packageType}
                                            classNamePrefix='select'
                                            theme={selectThemeColors}
                                            className={classnames('react-select', { 'is-invalid': data !== null && data.package === null })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rate'>
                                     Amt
                                </Label> */}
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='rate'
                                    name='rate'
                                    render={({ field }) => <Input placeholder='Amount'

                                        
                                        invalid={errors.rate && true} {...field} />}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className="mb-1">
                                {/* <Label className="form-label" for="roomType">
                                    Room Type
                                </Label> */}
                                <Controller
                                    id="roomType"
                                    control={control}
                                    name="roomType"
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={roomTypeOptions}
                                            classNamePrefix="select"
                                            theme={selectThemeColors}
                                            className={classnames("react-select", {
                                                "is-invalid": data !== null && data.roomType === null,
                                            })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rtc'>
                                    Rate Amt
                                </Label> */}
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='rtc'
                                    name='rtc'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={rtcOptions}
                                            classNamePrefix="select"
                                            theme={selectThemeColors}
                                            className={classnames("react-select", {
                                                "is-invalid": data !== null && data.rtc === null,
                                            })}
                                            {...field}
                                        />
                                    )}
                                    />
                            </div>
                        {/* </Col> */}

                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className="mb-1">
                                {/* <Label className="form-label" for="adults">
              Maximum Adults
            </Label> */}
                                <InputGroup className="input-group-merge">
                                    <InputGroupText
                                        className={classnames({
                                            "is-invalid": data !== null && (data.adults === null || !data.adults.length)
                                        })}
                                    ></InputGroupText>
                                    <Controller
                                        id="adults"
                                        name="adults"
                                        control={control}
                                        placeholder="adults"
                                        render={({ field }) => (
                                            <Cleave
                                                {...field}
                                                className={classnames("form-control", {
                                                    "is-invalid":
                                                        data !== null && (data.adults === null || !data.adults.length)
                                                })}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='child'>
                                    Maximum Childrens
                                </Label> */}
                                <InputGroup className='input-group-merge'>
                                    <InputGroupText
                                        className={classnames({
                                            'is-invalid': data !== null && (data.child == null || !data.child.length)
                                        })}
                                    >
                                    </InputGroupText>
                                    <Controller
                                        id='child'
                                        name='child'
                                        control={control}
                                        placeholder='child'
                                        render={({ field }) => (
                                            <Cleave
                                                {...field}
                                                className={classnames('form-control', {
                                                    'is-invalid': data !== null && (data.child === null || !data.child.length)
                                                })}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                    {/* <Col md='6' sm='12'> */}
              <div className='mb-1'>
                {/* <Label className='form-label' for='discAmt'>
                  Rate Category
                </Label> */}
                <Controller
                    defaultValue=''
                    control={control}
                    id='discAmt'
                    name='discAmt'
                    render={({ field }) => <Input placeholder='discAmt'

                      invalid={errors.discAmt && true} {...field} />}
                  />
                </div>
              {/* </Col> */}

                    </td>
                    <td>
                        {/* <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </td>
                </tr>
                <tr>
                <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='issueDate'>
                                    Issue Date
                                </Label> */}
                                <Controller
                                    control={control}
                                    id='issueDateOne'
                                    name='issueDateOne'
                                    render={({ field }) => (
                                        <Flatpickr
                                            {...field}
                                            options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                                            className={classnames('form-control', {
                                                'is-invalid': data !== null && data.issueDateOne === null
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rackRate'>
                                    Rack Rate 1
                                </Label> */}
                                <Controller
                                    id='rackRateOne'
                                    control={control}
                                    name='rackRateOne'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={rateCode}
                                            classNamePrefix='select'
                                            theme={selectThemeColors}
                                            className={classnames('react-select', { 'is-invalid': data !== null && data.rackRateOne === null })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}

                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='package'>
                                    Package
                                </Label> */}
                                <Controller
                                    id='packageOne'
                                    control={control}
                                    name='packageOne'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={packageType}
                                            classNamePrefix='select'
                                            theme={selectThemeColors}
                                            className={classnames('react-select', { 'is-invalid': data !== null && data.packageOne === null })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rate'>
                                     Amt
                                </Label> */}
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='rateOne'
                                    name='rateOne'
                                    render={({ field }) => <Input placeholder='Amount'

                                        
                                        invalid={errors.rate && true} {...field} />}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className="mb-1">
                                {/* <Label className="form-label" for="roomType">
                                    Room Type
                                </Label> */}
                                <Controller
                                    id="roomTypeOne"
                                    control={control}
                                    name="roomTypeOne"
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={roomTypeOptions}
                                            classNamePrefix="select"
                                            theme={selectThemeColors}
                                            className={classnames("react-select", {
                                                "is-invalid": data !== null && data.roomTypeOne === null,
                                            })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rtc'>
                                    Rate Amt
                                </Label> */}
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='rtcOne '
                                    name='rtcOne '
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={rtcOptions}
                                            classNamePrefix="select"
                                            theme={selectThemeColors}
                                            className={classnames("react-select", {
                                                "is-invalid": data !== null && data.rtcOne  === null,
                                            })}
                                            {...field}
                                        />
                                    )}
                                    />
                            </div>
                        {/* </Col> */}

                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className="mb-1">
                                {/* <Label className="form-label" for="adults">
              Maximum Adults
            </Label> */}
                                <InputGroup className="input-group-merge">
                                    <InputGroupText
                                        className={classnames({
                                            "is-invalid": data !== null && (data.adults === null || !data.adults.length)
                                        })}
                                    ></InputGroupText>
                                    <Controller
                                        id="adultsOne "
                                        name="adults"
                                        control={control}
                                        placeholder="adults "
                                        render={({ field }) => (
                                            <Cleave
                                                {...field}
                                                className={classnames("form-control", {
                                                    "is-invalid":
                                                        data !== null && (data.adultsOne  === null || !data.adultsOne .length)
                                                })}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='child'>
                                    Maximum Childrens
                                </Label> */}
                                <InputGroup className='input-group-merge'>
                                    <InputGroupText
                                        className={classnames({
                                            'is-invalid': data !== null && (data.child == null || !data.child.length)
                                        })}
                                    >
                                    </InputGroupText>
                                    <Controller
                                        id='childOne '
                                        name='childOne '
                                        control={control}
                                        placeholder='child'
                                        render={({ field }) => (
                                            <Cleave
                                                {...field}
                                                className={classnames('form-control', {
                                                    'is-invalid': data !== null && (data.childOne  === null || !data.childOne .length)
                                                })}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                    {/* <Col md='6' sm='12'> */}
              <div className='mb-1'>
                {/* <Label className='form-label' for='discAmt'>
                  Rate Category
                </Label> */}
                <Controller
                    defaultValue=''
                    control={control}
                    id='discAmtOne '
                    name='discAmtOne '
                    render={({ field }) => <Input placeholder='discAmt'

                      invalid={errors.discAmtOne  && true} {...field} />}
                  />
                </div>
              {/* </Col> */}

                    </td>
                    <td>
                        {/* <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </td>
                </tr>
                <tr>
                <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='issueDate'>
                                    Issue Date
                                </Label> */}
                                <Controller
                                    control={control}
                                    id='issueDateTwo'
                                    name='issueDateTwo'
                                    render={({ field }) => (
                                        <Flatpickr
                                            {...field}
                                            options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                                            className={classnames('form-control', {
                                                'is-invalid': data !== null && data.issueDateTwo === null
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rackRate'>
                                    Rack Rate 1
                                </Label> */}
                                <Controller
                                    id='rackRateTwo'
                                    control={control}
                                    name='rackRateTwo'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={rateCode}
                                            classNamePrefix='select'
                                            theme={selectThemeColors}
                                            className={classnames('react-select', { 'is-invalid': data !== null && data.rackRateTwo === null })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}

                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='package'>
                                    Package
                                </Label> */}
                                <Controller
                                    id='packageTwo'
                                    control={control}
                                    name='packageTwo'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={packageType}
                                            classNamePrefix='select'
                                            theme={selectThemeColors}
                                            className={classnames('react-select', { 'is-invalid': data !== null && data.packageTwo === null })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rate'>
                                    Rate Amt
                                </Label> */}
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='rateTwo'
                                    name='rateTwo'
                                    render={({ field }) => <Input placeholder='Amount'

                                        
                                        invalid={errors.rate && true} {...field} />}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className="mb-1">
                                {/* <Label className="form-label" for="roomType">
                                    Room Type
                                </Label> */}
                                <Controller
                                    id="roomTypeTwo"
                                    control={control}
                                    name="roomTypeTwo"
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={roomTypeOptions}
                                            classNamePrefix="select"
                                            theme={selectThemeColors}
                                            className={classnames("react-select", {
                                                "is-invalid": data !== null && data.roomType === null,
                                            })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='rtc'>
                                    Rate Amt
                                </Label> */}
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='rtc'
                                    name='rtc'
                                    render={({ field }) => (
                                        <Select
                                            isClearable
                                            options={roomTypeOptions}
                                            classNamePrefix="select"
                                            theme={selectThemeColors}
                                            className={classnames("react-select", {
                                                "is-invalid": data !== null && data.rtc === null,
                                            })}
                                            {...field}
                                        />
                                    )}
                                    />
                            </div>
                        {/* </Col> */}

                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className="mb-1">
                                {/* <Label className="form-label" for="adults">
              Maximum Adults
            </Label> */}
                                <InputGroup className="input-group-merge">
                                    <InputGroupText
                                        className={classnames({
                                            "is-invalid": data !== null && (data.adults === null || !data.adults.length)
                                        })}
                                    ></InputGroupText>
                                    <Controller
                                        id="adults"
                                        name="adults"
                                        control={control}
                                        placeholder="adults"
                                        render={({ field }) => (
                                            <Cleave
                                                {...field}
                                                className={classnames("form-control", {
                                                    "is-invalid":
                                                        data !== null && (data.adults === null || !data.adults.length)
                                                })}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                        {/* <Col md='6' sm='12' className='mb-1'> */}
                            <div className='mb-1'>
                                {/* <Label className='form-label' for='child'>
                                    Maximum Childrens
                                </Label> */}
                                <InputGroup className='input-group-merge'>
                                    <InputGroupText
                                        className={classnames({
                                            'is-invalid': data !== null && (data.child == null || !data.child.length)
                                        })}
                                    >
                                    </InputGroupText>
                                    <Controller
                                        id='child'
                                        name='child'
                                        control={control}
                                        placeholder='child'
                                        render={({ field }) => (
                                            <Cleave
                                                {...field}
                                                className={classnames('form-control', {
                                                    'is-invalid': data !== null && (data.child === null || !data.child.length)
                                                })}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </div>
                        {/* </Col> */}
                    </td>
                    <td>
                    {/* <Col md='6' sm='12'> */}
              <div className='mb-1'>
                {/* <Label className='form-label' for='discAmt'>
                  Rate Category
                </Label> */}
                <Controller
                    defaultValue=''
                    control={control}
                    id='discAmt'
                    name='discAmt'
                    render={({ field }) => <Input placeholder='discAmt'

                      invalid={errors.discAmt && true} {...field} />}
                  />
                </div>
              {/* </Col> */}

                    </td>
                    <td>
                        {/* <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </td>
                </tr>
                
            </tbody>
        </Table>
        </Card>
        </div>
    )
}

export default TableBorderless
