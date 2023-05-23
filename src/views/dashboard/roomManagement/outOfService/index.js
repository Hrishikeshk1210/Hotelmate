// ** React Imports
import { Fragment, useState } from "react";
import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Moment from 'moment';
import { format } from "date-fns";
// import App from "./roomTypeDataTable";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
 Input,
 Card,
 Form,
 Label,
 Button,
 CardBody,
 CardTitle,
 CardHeader,
 InputGroup,
 InputGroupText,
 Row,
 Col,
 Modal,
 ModalBody,
 ModalHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'
import { useNavigate } from "react-router-dom";

import { useRef, useEffect, useMemo, useCallback} from 'react';
import { grid } from "@mui/system";
import { release } from "process";
const id = '1';

const status = [
 { value: "Out Of Order", label: "Out Of Order" },
 { value: "Out Of Service", label: "Out Of Service" },
 
];






const defaultValues = {
 // hotelID: "",
 roomID: "",
 fromDate: null,
 startTime:"",
 toDate: null,
 endTime:"",
 status:null,
 returnStatus:"",
 remarks: "",
 reason: null,
}


let reason = [

 fetch('http://192.168.1.33:14700/getReason?hotelID=1')
 .then(result => result.json())
 .then(resp => {
 console.log(resp['data'])
 reason = resp['data']

 })

]

// let roomArr=[];
// let roomIDArr=[];

const outOfOrderOrService = () => {
 var Today = format(new Date(), "dd-MM-yyyy")
 console.log(Today)

 // AG Grid
 const [rowData, setRowData] = useState();
 const [service, setService] = useState();
 const [outService, setOutService] = useState();
 const [openForm, setOpenForm] = useState();
 const [basic, setBasic] = useState(new Date());
 const [room, setRoom] = useState([]);
 const [roomIDs,setRoomID]=useState()
 const [release,setRelease]=useState()
 const [filldata,setfilldata]=useState({})

 let navigate = useNavigate();


 

 const onDiscard = () => {


 // clearErrors()
 setOpenForm(false)
 reset()
 }


 const gridRef1 = useRef();
 const gridRef2 = useRef();


 const [columnDefs, setColumnDefs] = useState([
 // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
 // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
 {headerName: 'Room No.',field: 'roomNumber',maxWidth: 140},
 {headerName: 'Status',field: 'status',maxWidth: 140},
 {headerName: 'From Date',field: 'fromDate',maxWidth: 140},
 {headerName: 'To Date',field: 'toDate',maxWidth: 140},
 {headerName: 'Reason',field: 'reasonCode',maxWidth: 140},
 {headerName: 'Remarks',field: 'remarks',maxWidth: 140},
 {headerName: 'Actions', cellRendererFramework: (params) =>
 <Button color='primary' onClick={() => setRelease(!release)}>Release</Button>,maxWidth: 150},
 {headerName: 'Return Status',field: 'returnStatus',maxWidth: 140},
 {headerName: 'Start Time',field: 'startTime',maxWidth: 140},
 {headerName: 'End Time',field: 'endTime',maxWidth: 140},





 ]);

 const [columnDefsOutService, setColumnDefsOutOfService] = useState([
 // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
 // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
 {headerName: 'Room Number',field: 'roomNumber', checkboxSelection:true,headerCheckboxSelection:true ,maxWidth: 150,},
 {headerName: 'Room Status',field: 'roomStatus',maxWidth: 150},
 {headerName: 'Front Office Status',field: 'frontOfficeStatus',maxWidth: 150},
 {headerName: 'Reservation Status',field: 'reservationStatus',maxWidth: 150},
 {headerName: 'RoomTypeID',field: 'roomTypeID',maxWidth: 150},
 {headerName: 'Floor',field: 'floorID',maxWidth: 150, filter: 'agMultiColumnFilter',
 
 filterParams: {
 filters: [
 {
 filter: 'agTextColumnFilter',
 display: 'accordion',
 title: 'Expand Me for Text Filters'
 },
 {
 filter: 'agSetColumnFilter',
 display: 'accordion'
 }
 ]
 }}, 


 ]);

 const defaultColDef = useMemo( ()=> (
 {
 sortable: true, 
 // filter: true,
 filterParams :{
 buttons : ['apply','reset']
 },
 floatingFilter:true
 }
 ));


 



 const cellClickedListener = useCallback( event => {
 console.log('cellClicked', event);
 console.log(event['data'])
 console.log(event['rowIndex'])
 fetch('http://192.168.1.33:14700/getOutOfOrderOrService?hotelID='+id)
 .then(result => result.json())
 .then(rowData => {setRowData(rowData['data'])
 console.log(rowData['data'])
 setfilldata(rowData['data'][event['rowIndex']])
 console.log(filldata)
 
 })
 }, []);

 // if(filldata['toDate']> Today){
 // console.log("Hello")
 // // setOutService(open)
 // }else{
 // console.log("Bye")
 // }
 
 useEffect(() => {
 fetch('http://192.168.1.33:14700/getOutOfOrderOrService?hotelID='+id)
 .then(result => result.json())
 .then(rowData => {setRowData(rowData['data'])
 console.log(rowData['data'])
 })
 fetch('http://192.168.1.33:14700/room?hotelID='+id)
 .then(result => result.json())
 .then(outService => {setOutService(outService['data'])
 console.log(outService['data'])
 })
 }, []);

 

 // ** State
 const [data, setData] = useState(null);
 const [value, setValue] = useState('')
 const [checkboxData,setCheckBox]=useState( )


 // ** Hooks
 const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });


 //// OncheckBox Click
 const onSelectionChanged = (event) =>{
 let allRooms=event.api.getSelectedRows()
 let roomArr=[];
 let roomIDArr=[]

 // const column = gridRef2.current.getColumn("floorID");
const filterInstance = gridRef2.current.api.getFilterInstance("floorID");
const filterModel = filterInstance.getModel();
console.log(filterInstance);
// console.log(filterModel['filterModels'][0]['filter']);
if(filterInstance.activeFilterIndices.length!=0){
let FloorNo=filterModel['filterModels'][0]['filter'];
console.log(FloorNo)
 // console.log(event.api.getSelectedRows())
 // console.log(allRooms[0]['id'])
 
 allRooms.forEach(element => {
 if(FloorNo!==null){
 if(FloorNo==element.floorID){
 roomArr.push(element.roomNumber)
 roomIDArr.push(element.id)

 }
 }
 });
 console.log(roomArr)
 console.log(roomIDArr)
// setCheckBox(event.api.getSelectedRows())
// console.log(checkboxData)
}
else{
 
allRooms.forEach(element => {

 roomArr.push(element.roomNumber)
 roomIDArr.push(element.id)

 console.log(roomArr)
 console.log(roomIDArr)
});
}
setRoomID(roomIDArr)
setRoom(roomArr)
}

 const onSubmit = (data) => {
 setData(data);
 console.log(data)
 if (
 data.fromDate !== null &&
 data.toDate !== null &&
 data.roomID !== null
 ) {
 console.log(data);
 
 console.log(room)
 let createasset = JSON.stringify({
 // "hotelID": data.hotelID,
 "roomID": roomIDs,
 "fromDate":(Moment(String(new Date(data.fromDate[0]))).format('YYYY-MM-DD')),
 "startTime":data.startTime,
 "toDate":(Moment(String(new Date(data.toDate[0]))).format('YYYY-MM-DD')),
 "endTime":data.endTime,
 "status":data.status.value,
 "returnStatus":'Dirty',
 "remarks":data.remarks,
 "reasonID":data.reason.value

 
 
 });
 console.log(createasset);
 let res = fetch("http://192.168.1.33:14700/addOutOfOrderAndService", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: createasset,
 }).then((res) => {
 console.log(res);
 if(res['status']==200){
 fetch('http://192.168.1.33:14700/getOutOfOrderOrService?hotelID='+id)
 .then(result => result.json())
 .then(rowData => {setRowData(rowData['data'])
 console.log(rowData['data'])
 })
 }
 });
 toast(
 <div className="d-flex">
 <div className="me-1">
 <Avatar size="sm" color="success" icon={<Check size={12} />} />
 </div>
 <div className="d-flex flex-column">
 <h6>Form Submitted!</h6>
 <h4>Out Of Order / Service</h4>
 </div>
 </div>
 );
 }
 };



//// For Disabling Past Date
const today = Moment().format('YYYY-MM-DD');
 const options = {
 minDate: today
 };


 //// For Filter
 const onFilterTextBoxChanged1 = useCallback(() => {
 gridRef1.current.api.setQuickFilter(
 document.getElementById('filter-text-box1').value
 );
 }, []);

 
 // const onFilterTextBoxChanged2 = useCallback(() => {
 // gridRef2.current.api.setQuickFilter(
 // document.getElementById('filter-text-box2').value
 
 // );
 // }, []);

 


 function Alert(){
 
 setTimeout(() => { navigate('/dashboard/roomManagement/outOfService');},1000)
 
 
 }




 const handleChange = event => {
 setValue(event.target.value)
 }

 const handleReset = () => {
 reset({
 // hotelID: "",
 
 });
 };

 return (
 <div>
 <Card>
 <CardHeader>
 <Button color="primary" onClick={setService}>Add Out Of Service / Order</Button>
 </CardHeader>
 </Card>
 <Col md='3' sm='12' className='mb-1'>
 <Label className='form-label' for='fullName'>
 Room ID
 </Label>
 <Input
 type="text"
 id="filter-text-box1"
 placeholder="Filter..."
 onInput={onFilterTextBoxChanged1}
 />
 </Col>
 
 <div className="ag-theme-alpine" style={{ height: 520}}>
 
 <AgGridReact 
 ref={gridRef1}
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
 <div>
 <Fragment>
 <Modal isOpen={openForm} toggle={() => setOpenForm(!openForm)} onClosed={onDiscard}className='modal-lg'>
 <ModalHeader className='modal-lg' toggle={() => setOpenForm(!openForm)}></ModalHeader>
 <ModalBody className='pb-3 px-sm-1 mx-20'>
 <div>
 <Card>
 <CardHeader>
 <CardTitle tag="h4">Out Of Service / Order</CardTitle>
 </CardHeader>
 <CardBody>
 <Form onSubmit={handleSubmit(onSubmit)}>
 <Row>
 {/* <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="roomID">
 Room ID
 </Label> 
 <Controller
 id='roomID'
 control={control}
 name='roomID'
 render={({ field }) => (
 <Input
 placeholder='RoomID'
 isClearable
 // options={subBookingId}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.roomID === null })}
 {...field}
 />
 )}
 />
 
 </div>
 </Col> */}
 
 <Card>
 {/* <p>Room Number:{room}</p> */}
 <p>
 Room Number:{" "}
 {room.map((num) => (
 <b>{num} </b>
 ))}
 </p>
 {/* <p>
 Room Number:{" "}
 {room.split("").map((num) => (
 <b key={num}>{num} </b>
 ))}
 </p> */}
 </Card>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="fromDate">
 From Date
 </Label>
 <Controller
 control={control}
 id='fromDate'
 name='fromDate'
 render={({ field }) => (
 <Flatpickr
 // required
 options={options}
 placeholder='YYYY-MM-DD'
 {...field}
 // options={{ allowInput: true }}
 className={classnames('form-control', {
 'is-invalid': data !== null && data.fromDate === null
 })}
 />
 )}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' id='startTime'>
 Start Time
 </Label>
 <Flatpickr
 className='form-control'
 value={basic}
 id='startTime'
 options={{
 enableTime: true,
 noCalendar: true,
 dateFormat: 'H:i',
 // time_24hr: true
 }}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='toDate'>
 To Date
 </Label>
 <Controller
 control={control}
 id='toDate'
 name='toDate'
 render={({ field }) => (
 <Flatpickr
 placeholder='YYYY-MM-DD'
 {...field}
 options={options}
 // options={{ allowInput: true }}
 className={classnames('form-control', {
 'is-invalid': data !== null && data.toDate === null
 })}
 />
 )}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' id='endTime'>
 End Time
 </Label>
 <Flatpickr
 className='form-control'
 value={basic}
 id='endTime'
 options={{
 enableTime: true,
 noCalendar: true,
 dateFormat: 'H:i',
 // time_24hr: true
 }}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="status">
 Status
 </Label>
 <Controller
 id='status'
 control={control}
 name='status'
 render={({ field }) => (
 <Select
 isClearable
 options={status}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.status === null })}
 {...field}

 />
 )}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="returnStatus">
 Return Status
 </Label> 
 <Controller
 id='returnStatus'
 control={control}
 name='returnStatus'
 render={({ field }) => (
 <Input
 placeholder='Return Status'
 isClearable
 disabled={true}
 // options={returnSt}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.status === null })}
 {...field}
 value={'Dirty'}
 />
 )}
 />
 
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="remarks">
 Remarks
 </Label> 
 <Controller
 id='remarks'
 control={control}
 name='remarks'
 render={({ field }) => (
 <Input
 placeholder='Remarks'
 isClearable
 // options={subBookingId}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.remarks === null })}
 {...field}
 />
 )}
 />
 
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='reason'>
 Reason
 </Label>
 <Controller
 id='reason'
 control={control}
 name='reason'
 render={({ field }) => (
 <Select
 isClearable
 options={reason}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.reason === null })}
 {...field}
 />
 )}
 />
 </div>
 <Col md='4' sm='12' className='mb-1'>
 {/* <div className="d-flex">
 <Button type='submit' className='mt-2' color='primary' >
 Submit
 </Button>
 </div>
 <div className="d-flex">
 <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>
 Clear
 </Button>
 </div> */}

 <div className="d-flex">
 <Button className="me-1" color="primary" type="submit" onClick={Alert} >
 Submit
 </Button>
 {/* <Button type='reset' color='danger' outline onClick={onDiscard}>
 Close
 </Button> */}
 </div>

 </Col>
 </Col>
 </Row>
 </Form>
 </CardBody>
 </Card>
 </div>
 </ModalBody>
 </Modal>
 {/* </Fragment>
 <Fragment> */}



 <Modal isOpen={service} toggle={() => setService(!service)} className='modal-xl'>
 <ModalHeader className='modal-xl' toggle={() => setService(!service)}></ModalHeader>
 <ModalBody className='pb-3 px-sm-1 mx-20'>
 <div>
 <Card>
 <CardBody>
 <Button color="primary" onClick={setOpenForm}>Add Out Of Service / Order </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 {/* <Button color="primary" onClick={setOpenForm}>Add Out Of Order</Button> */}
 </CardBody>
 </Card>
 {/* <Col md='3' sm='12' className='mb-1'>
 <Label className='form-label' for='fullName'>
 Floor
 </Label>
 <Input
 type="text"
 id="filter-text-box2"
 placeholder="Filter..."
 onInput={onFilterTextBoxChanged2}
 />
 </Col> */}
 <div className="ag-theme-alpine" style={{ height: 520}}>
 <AgGridReact 
 ref={gridRef2}
 rowData={outService} columnDefs={columnDefsOutService}
 animateRows={true} 
 onCellClicked={cellClickedListener}
 // paginationAutoPageSize = 'true'
 rowSelection='multiple'
 onSelectionChanged={onSelectionChanged}
 rowMultiSelectWithClick={true}
 paginationPageSize= '10'
 pagination = 'true'
 defaultColDef={defaultColDef}
 headerColor="ddw-primary"
 
 />
 </div>
 </div>
 </ModalBody>
 </Modal>


 {/* For Release */}
 <Modal isOpen={release} toggle={() => setRelease(!release)} className='modal-lg'>
 <ModalHeader className='modal-lg' toggle={() => setRelease(!release)}></ModalHeader>
 <ModalBody className='pb-3 px-sm-1 mx-20'>
 <div>
 <Card>
 <CardHeader>
 <CardTitle tag="h4">Out Of Service / Order</CardTitle>
 </CardHeader>
 <CardBody>
 <Form onSubmit={handleSubmit(onSubmit)}>
 <Row>
 {/* <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="roomID">
 Room ID
 </Label> 
 <Controller
 id='roomID'
 control={control}
 name='roomID'
 render={({ field }) => (
 <Input
 placeholder='RoomID'
 isClearable
 // options={subBookingId}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.roomID === null })}
 {...field}
 />
 )}
 />
 
 </div>
 </Col> */}
 <Card>
 <p>Room Number:<b>{filldata['roomNumber']}</b></p>
 {/* <p>
 Room Number:{" "}
 {room.map((num) => (
 <b>{num} </b>
 ))}
 </p> */}
 {/* <p>
 Room Number:{" "}
 {room.split("").map((num) => (
 <b key={num}>{num} </b>
 ))}
 </p> */}
 </Card>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="fromDate">
 From Date
 </Label>
 <Controller
 control={control}
 id='fromDate'
 name='fromDate'
 render={({ field }) => (
 <Flatpickr
 // required
 options={options}
 placeholder='YYYY-MM-DD'
 {...field}
 // options={{ allowInput: true }}
 className={classnames('form-control', {
 'is-invalid': data !== null && data.fromDate === null
 })}
 value={filldata['fromDate']}
 />
 )}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' id='startTime'>
 Start Time
 </Label>
 <Input
 className='form-control'
 // value={basic}
 id='startTime'
 // options={{
 // enableTime: true,
 // noCalendar: true,
 // dateFormat: 'H:i',
 // // time_24hr: true
 // }}
 value={filldata['startTime']}

 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='toDate'>
 To Date
 </Label>
 <Controller
 control={control}
 id='toDate'
 name='toDate'
 render={({ field }) => (
 <Flatpickr
 placeholder='YYYY-MM-DD'
 {...field}
 options={options}
 // options={{ allowInput: true }}
 className={classnames('form-control', {
 'is-invalid': data !== null && data.toDate === null
 })}
 value={filldata['toDate']}

 />
 )}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' id='endTime'>
 End Time
 </Label>
 <Input
 className='form-control'
 // value={basic}
 id='endTime'
 options={{
 enableTime: true,
 noCalendar: true,
 dateFormat: 'H:i',
 // time_24hr: true
 }}
 value={filldata['endTime']}

 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="status">
 Status
 </Label>
 <Controller
 id='status'
 control={control}
 name='status'
 render={({ field }) => (
 <Input
 isClearable
 options={status}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.status === null })}
 {...field}
 value={filldata['status']}

 />
 )}
 />
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="returnStatus">
 Return Status
 </Label> 
 <Controller
 id='returnStatus'
 control={control}
 name='returnStatus'
 render={({ field }) => (
 <Input
 placeholder='Return Status'
 isClearable
 disabled={true}
 // options={returnSt}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.status === null })}
 {...field}
 value={filldata['returnStatus']}
 />
 )}
 />
 
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="remarks">
 Remarks
 </Label> 
 <Controller
 id='remarks'
 control={control}
 name='remarks'
 render={({ field }) => (
 <Input
 placeholder='Remarks'
 isClearable
 // options={subBookingId}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.remarks === null })}
 {...field}

 />
 )}
 />
 
 </div>
 </Col>
 <Col md='4' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='reason'>
 Reason
 </Label>
 <Controller
 id='reason'
 control={control}
 name='reason'
 render={({ field }) => (
 <Input
 isClearable
 options={reason}
 classNamePrefix='select'
 theme={selectThemeColors}
 className={classnames('react-select', { 'is-invalid': data !== null && data.reason === null })}
 {...field}
 value={filldata['reasonCode']}

 />
 )}
 />
 </div>
 <Col md='4' sm='12' className='mb-1'>
 {/* <div className="d-flex">
 <Button type='submit' className='mt-2' color='primary' >
 Submit
 </Button>
 </div>
 <div className="d-flex">
 <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>
 Clear
 </Button>
 </div> */}

 <div className="d-flex">
 <Button className="me-1" color="primary" type="submit" >
 Submit
 </Button>
 {/* <Button type='reset' color='danger' outline onClick={onDiscard}>
 Close
 </Button> */}
 </div>

 </Col>
 </Col>
 </Row>
 </Form>
 </CardBody>
 </Card>
 </div>
 </ModalBody>
 </Modal>
 </Fragment>
 </div>
 
 </div>
 );
};

export default outOfOrderOrService;