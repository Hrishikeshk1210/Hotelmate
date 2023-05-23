import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Button, Modal, ModalBody, ModalHeader,Row,Col } from 'reactstrap';
import AddSharer from './addSharer';
import AssignRoom from './assignRoom';
import CheckIn from './check-in';
import RoomMove from './roomMove';
const id='1'


function InHouseGuest() {
  const [rowData, setRowData] = useState();
  const [form, setSharer] = useState();
  const [checkIn, setCheckIn] = useState();
  const [show, setShow] = useState();
  const [checkOut, setCheckOut] = useState();
  const [assign, setAssign] = useState();
  const [filldata,setfilldata] = useState('');
  const [roomMove, setRoomMove] = useState();




  const gridRef = useRef();
  
  
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
    // {headerName: 'SubBookingId',field: 'SubBookingId',suppressSizeToFit: true,maxWidth: 140},
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
                return <Button color='primary'  onClick={() => setAssign(!assign)}>Assign Room</Button>
            }      
            else if(params.data.PmsStatus === 'Assigned')
            {
              
                return <Button color='success'  style={{ width: 128}} onClick={() => setCheckIn(!checkIn)}>Check In</Button>
            }
            else if(params.data.PmsStatus === 'Checked In')
            {
                return <Button color='warning'  style={{ width: 128}} onClick={() => setShow(!show)} >Others</Button>
            }
            else if(params.data.End === Today)
            {
                return <Button color='danger'  style={{ width: 128}} onClick={() => setCheckOut(!checkOut)} >Check Out</Button>
            }
            else if(params.data.PmsStatus === 'Change Room')
            {
                return <Button color='warning'  style={{ width: 128}} onClick={() => setShow(!show)} >Change Room</Button>
            }
         
            
          }
        
      },

  ]);


  let Status = 'Checked In'
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
    fetch('http://192.168.1.33:14700/getInHouseGuest?PmsStatus='+Status+'')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    setfilldata(rowData['data'][event['rowIndex']])
    console.log(filldata)
  })
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/getInHouseGuest?PmsStatus='+Status+'')
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



  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
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
      <div>
    <Modal isOpen={assign} toggle={() => setAssign(!assign)} className='demo-inline-spacing'>
        <ModalHeader className='bg-transparent' toggle={() => setAssign(!assign)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
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

export default InHouseGuest;