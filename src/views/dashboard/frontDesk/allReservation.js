import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Button, Modal, ModalBody, ModalHeader,Card,Form,Label, CardBody,CardTitle,CardHeader,Row,Col, Input, DropdownMenu } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, Circle } from "react-feather";
import AddSharer from './addSharer';
import ChangeRoomlastForm from './ChangeRoomformlast';
import { selectThemeColors } from "@utils";
import "./frontDesk.scss"
import { format } from "date-fns";

import AssignRoom from './assignRoom';
import CheckIn from './check-in';
import RoomMove from './roomMove';
import CheckOut from './checkOut';
const id='1'
// var FullData = []
// fetch('http://192.168.1.33:14700/getBookingTran')
// .then(result => result.json())
// .then(rowData => {
// console.log(rowData)
// console.log(rowData['Reservations']['Reservation']['BookingTran']['SubBookingId'])

// FullData = [
//     {SubBookingId: rowData['Reservations']['Reservation']['BookingTran']['SubBookingId'],
//     TransactionId: rowData['Reservations']['Reservation']['BookingTran']['TransactionId'],
//     Createdatetime: rowData['Reservations']['Reservation']['BookingTran']['Createdatetime'],
//     Status: rowData['Reservations']['Reservation']['BookingTran']['Status'],
//     CurrentStatus: rowData['Reservations']['Reservation']['BookingTran']['CurrentStatus'],
//     PackageCode: rowData['Reservations']['Reservation']['BookingTran']['PackageCode'],
//     PackageName: rowData['Reservations']['Reservation']['BookingTran']['PackageName'],
//     RateplanCode: rowData['Reservations']['Reservation']['BookingTran']['RateplanCode'],
//     RateplanName: rowData['Reservations']['Reservation']['BookingTran']['RateplanName'],
//     RoomID: rowData['Reservations']['Reservation']['BookingTran']['RoomID'],
//     RoomName: rowData['Reservations']['Reservation']['BookingTran']['RoomName'],
//     Start: rowData['Reservations']['Reservation']['BookingTran']['Start'],
//     End: rowData['Reservations']['Reservation']['BookingTran']['End'],

// }
//   ]
//   console.log(FullData)
// })

const defaultValues = {
  subBookingId: "",
  guestName: "",
  assignedRoomType: "",
  floor: "",
  room  : "",
  comments: ""
};

let floor = [
  fetch('http://192.168.1.33:14700/getRoomFloorID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      floor = resp['data']
      console.log(floor)
    })
  ]
  
      
  let room = [
      fetch('http://192.168.1.33:14700/getroomnumberfromroommanagement')
          .then(result => result.json())
          .then(resp => {
          // console.log(resp['data'])
          room = resp['data']
          console.log(room)
          })
      ]

function AllReservation(props) {
    // var FullData = []
  const [rowData, setRowData] = useState();
  const [form, setSharer] = useState();
  const [checkIn, setCheckIn] = useState();
  const [show, setShow] = useState();
  const [assign, setAssign] = useState(false)
  const [filldata,setfilldata] = useState('');
  const [componentRendered, setComponentRendered] = useState(false);
  const [roomMove, setRoomMove] = useState();
  const [checkOut, setCheckOut] = useState()



  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

var Today = format(new Date(), "yyyy-MM-dd")


  const gridRef = useRef();


  // const ButtonRenderer = (id) => {
  //   // fetch('http://192.168.1.33:14700/getBookingTran')
  //   // .then(result => result.json())
  //   // .then(rowData => {
  //   //     console.log(rowData['data'][0]['PmsStatus'])
  //   //     const value=rowData['data'][0]['PmsStatus'];
  //   // console.log(rowData)
  //   // console.log(value)
  //   console.log('If Entered') ;
  //    <Button>Hi</Button>
  // };
  

  
  const [columnDefs, setColumnDefs] = useState([

    // {headerName: 'SubBookingId',field: 'SubBookingId',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'TransactionId',field: 'TransactionId',suppressSizeToFit: true},
    // {headerName: 'Createdatetime',field: 'Createdatetime'},
    // {headerName: 'Status',field: 'Status'},
    // {headerName: 'CurrentStatus',field: 'CurrentStatus'},
    // {headerName: 'PackageCode',field: 'PackageCode'},
    // {headerName: 'PackageCode',field: 'PackageName'},
    // {headerName: 'RateplanCode',field: 'RateplanCode'},
    // {headerName: 'RateplanName',field: 'RateplanName'},
    // // {headerName: 'RoomID',field: 'RoomID'},
    // // {headerName: 'RoomName',field: 'RoomName'},
    // {headerName: 'Start',field: 'Start'},
    // {headerName: 'End',field: 'End'},
    // {headerName: 'PMS Status',field: 'PmsStatus'},
    {headerName: 'Booking ID',field: 'SubBookingId',suppressSizeToFit: true,maxWidth: 140},
    {headerName: 'Guest',field: 'fullName', valueGetter(params) {
        return params.data.FirstName + ' ' + params.data.LastName;
    }, suppressMenu: true,suppressSizeToFit: true,maxWidth: 140},
    // {headerName: 'Source',field: 'Source',suppressSizeToFit: true},
    {headerName: 'Room Type',field: 'RoomTypeName',suppressSizeToFit: true,maxWidth: 140},
    {headerName: 'Start',field: 'Start',suppressSizeToFit: true,maxWidth: 140},
    {headerName: 'End',field: 'End',suppressSizeToFit: true,maxWidth: 140},
    // {headerName: 'Current Status',field: 'CurrentStatus'},
    // {headerName: 'RoomID',field: 'RoomID'},
    // {headerName: 'RateplanName',field: 'RateplanName'},
    {headerName: 'Status',field: 'PmsStatus',suppressSizeToFit: true,maxWidth: 140},
    {headerName: 'Room No.',field: 'RoomNumber',suppressSizeToFit: true,maxWidth: 140},
    
    {
        headerName: "Action",
        // cellRendererFramework: ButtonRenderer(id),
        cellRenderer: (params) => {
          if (params.data.PmsStatus === 'Created') 
            {
                return <Button color='primary'  onClick={() => setAssign(!assign) } >Assign Room</Button>
            }      
            else if(params.data.PmsStatus === 'Assigned')
            {
              
                return <Button color='success'  style={{ width: 128}} onClick={() => setCheckIn(!checkIn)}>Check In</Button>
            }
            else if(params.data.PmsStatus === 'Checked In')
            {
                return <Button color='warning'  style={{ width: 128}} onClick={() => setShow(!show)} >Others</Button>
            }
            if(params.data.End === Today &&params.data.PmsStatus==='Checked In')
            {
                return <Button color='danger'  style={{ width: 128}} onClick={() => setCheckOut(!checkOut)} >Check Out</Button>
            }
            
            // else if(params.data.PmsStatus === 'Change Room')
            // {
            //     return <Button color='warning'  style={{ width: 128}} onClick={() => setShow(!show)} >Change Room</Button>
            // }
         
            
          }
          
      },
    // {
    //     headerName: 'Action', field: 'PmsStatus ', suppressSizeToFit: true, maxWidth: 200, cellRendererFramework: (params) =>
    //       <Button color='primary' onClick={() => setSharer(!form)}>Assign Room</Button>
    //   },

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

  const handleReset = () => {
    reset({
        subBookingId: "",
        guestName: "",
        assignedRoomType: "",
        floor: "",
        room: "",
        comments: ""
    });
  };
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
    console.log(event['data'])
    console.log(event['rowIndex'])
    fetch('http://192.168.1.33:14700/getBookingTran')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    setfilldata(rowData['data'][event['rowIndex']])
    console.log(filldata)
  })
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/getBookingTran')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData)
    // console.log(rowData['Reservations']['Reservation']['BookingTran']['SubBookingId'])
    
    // var FullData = [
    //     {SubBookingId: rowData['Reservations']['Reservation']['BookingTran']['SubBookingId']}
    //   ]
    //   console.log(FullData)
 
})
  }, []);

  if (componentRendered) {
    alert("Component execution completed!");
    console.log(componentRendered)
  }
  const handleComponentRendered = () => {
    setComponentRendered(true);
    console.log(componentRendered)
    console.log("hi")

  };

  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);



  return (
    <div>
      <div>
      <Col md='3' sm='12' className='mb-1'>
      <Label className='form-label' for='fullName'>
            Room No.
      </Label>
      <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
          </Col>
      </div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 520}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs} 
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
        {/* Add Assign Room */}
        <div>
    <Modal isOpen={assign} toggle={() => setAssign(!assign)} className='modal-xl'>
        <ModalHeader className='modal-xl' toggle={() => setAssign(!assign)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-2 mx-20'>
          <div>
            {/* <AssignRoom/> */}
            {filldata.length!=0 && <AssignRoom data1={filldata} />}
          </div>
        </ModalBody>
      </Modal>
      </div>
       
      <div>
    <Modal isOpen={checkIn} toggle={() => setCheckIn(!checkIn)} className='demo-inline-spacing'>
        <ModalHeader className='bg-transparent' toggle={() => setCheckIn(!checkIn)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <div>
          {filldata.length!=0 && <CheckIn data1={filldata} />}
          </div>
        </ModalBody>
      </Modal>
      </div>
      <div>
    <Modal isOpen={roomMove} toggle={() => setRoomMove(!roomMove)} className='demo-inline-spacing'>
        <ModalHeader className='bg-transparent' toggle={() => setRoomMove(!roomMove)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <div>
          {filldata.length!=0 && <RoomMove data1={filldata} />}
          </div>
        </ModalBody>
      </Modal>
      </div>

      <div>
    <Modal isOpen={checkOut} toggle={() => setCheckOut(!checkOut)} className='demo-inline-spacing'>
        <ModalHeader className='bg-transparent' toggle={() => setCheckOut(!checkOut)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <div>
          {filldata.length!=0 && <CheckOut data1={filldata} />}
          </div>
        </ModalBody>
      </Modal>
      </div>

      <div className='vertically-centered-modal'>
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered'>
  <ModalHeader toggle={() => setShow(!show)}>Other Action Options</ModalHeader>
  <ModalBody>
  <div  className='othersbutton'>
  <Row>
   <Col md='6' sm='12' className='mb-1'>
   <Button className='change' color='warning' onClick={() => setRoomMove(!roomMove)}>ROOM MOVE</Button>
   </Col>
   <Col md='6' sm='12' className='mb-1'>
   <Button className='packages' color='success'>ADD PACKAGES</Button>
    </Col>
   <Col md='6' sm='12' className='mb-1'>
   <Button className='sharer' onClick={() => setSharer(!form)}>ADD SHARER</Button>
   </Col>
   </Row>
   </div>
  </ModalBody>
</Modal>
</div>
    </div>
  );
}

export default AllReservation;