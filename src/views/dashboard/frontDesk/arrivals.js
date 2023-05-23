import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import AddSharer from './addSharer';
// import { red } from '@material-ui/core/colors';
import classNames from 'classnames';
import { format } from "date-fns";
import AssignRoom from './assignRoom';
import CheckIn from './check-in';

const id='1'

var Today = format(new Date(), "yyyy-MM-dd")

function Arrivals() {
  const [rowData, setRowData] = useState();
  const [form, setSharer] = useState();
  const [checkIn, setCheckIn] = useState();
  const [show, setShow] = useState();
  const [assign, setAssign] = useState(false)
  const [filldata,setfilldata] = useState('');



  const gridRef = useRef();
  
  
  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'SubBookingId',field: 'SubBookingId',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Full Name',field: 'fullName', valueGetter(params) {
    //     return params.data.FirstName + ' ' + params.data.LastName;
    // }, suppressMenu: true},
    // // {headerName: 'Last Name',field: 'LastName', suppressSizeToFit: true},
    // // {headerName: 'Source',field: 'Source',suppressSizeToFit: true},
    // {headerName: 'Start',field: 'Start'},
    // {headerName: 'End',field: 'End'},
    // {headerName: 'Room Type',field: 'RoomTypeName'},
    // // {headerName: 'Current Status',field: 'CurrentStatus'},
    // // {headerName: 'RoomID',field: 'RoomID'},
    // // {headerName: 'RateplanCode',field: 'RateplanCode'},
    // // {headerName: 'RateplanName',field: 'RateplanName'},
    // // {headerName: 'RoomID',field: 'RoomID'},
    // {headerName: 'Room Number',field: 'RoomNumber'},
    // // {headerName: 'Start',field: 'Start'},
    // // {headerName: 'End',field: 'End'},
    // {headerName: 'PMS Status',field: 'PmsStatus'},

    // {
    //     headerName: "Action",
    //     // cellRendererFramework: ButtonRenderer(id),
    //     cellRenderer: (params) => {
    //       if (params.data.PmsStatus === 'Created') 
    //         {
    //             return <Button color='primary'  style={{ width: 128}} onClick={() => setAssign(!assign)} className='me-1' >Assign Room</Button>
    //         }      
    //         else if(params.data.PmsStatus === 'Assigned')
    //         {
              
    //             return <Button color='success'  style={{ width: 128}} onClick={() => setCheckIn(!checkIn)} className='me-1' >Check In</Button>
    //         }
    //         else if(params.data.PmsStatus === 'Checked In')
    //         {
    //             return <Button color='warning'  style={{ width: 128}} onClick={() => setShow(!show)} >Others</Button>
    //         }
    //         // else if(params.data.PmsStatus === 'CheckOut')
    //         // {
    //         //     return <Button color='danger' onClick={() => setSharer(!form)} >Check Out</Button>
    //         // }
    //         // else if(params.data.PmsStatus === 'Change Room')
    //         // {
    //         //     return <Button color='warning' onClick={() => setShow(!show)} >Change Room</Button>
    //         // }
            
    //       }
        
    //   },
    // {
    //     headerName: 'Action', field: 'PmsStatus ', suppressSizeToFit: true, maxWidth: 200, cellRendererFramework: (params) =>
    //       <Button color='primary' onClick={() => setSharer(!form)}>Assign Room</Button>
    //   },
    // {headerName: 'Booking ID',field: 'SubBookingId',suppressSizeToFit: true,maxWidth: 140},
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
            else if(params.data.PmsStatus === 'DueOut')
            {
                return <Button color='danger'  style={{ width: 128}} onClick={() => setSharer(!form)} >Check Out</Button>
            }
            // else if(params.data.PmsStatus === 'Change Room')
            // {
            //     return <Button color='warning'  style={{ width: 128}} onClick={() => setShow(!show)} >Change Room</Button>
            // }
         
            
          }
          
      },
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
    fetch('http://192.168.1.33:14700/gettoday?Start='+Today)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    setfilldata(rowData['data'][event['rowIndex']])
    console.log(filldata)
  })

  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/gettoday?Start='+Today)
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
      <div id="myGrid"
          style={{
            boxSizing: "border-box",
            height:520
          }}
          className="ag-theme-alpine" >
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
      
      
    </div>
  );
}

export default Arrivals;