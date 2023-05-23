
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import {useState, useRef, useEffect, useMemo, useCallback} from 'react';

function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'BookingID', field: 'bookingID', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Arrival Date', field: 'arrivalDate', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Checkout Date', field: 'departureDate', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Room', field: 'room', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Rate', field: 'rate', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Package ID', field: 'packageCode', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Market ID', field: 'marketID', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'CompanyID', field: 'accountName', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'City', field: 'city', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'Postal Code', field: 'postalCode', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'GST ID ', field: 'gstID', suppressSizeToFit: true },
    // { headerName: 'Anniversary', field: 'anniversary', suppressSizeToFit: true },
    // { headerName: 'Nationality', field: 'nationality', suppressSizeToFit: true },
    // { headerName: 'DOB ', field: 'dob', suppressSizeToFit: true },
    // { headerName: 'Phone Number', field: 'phoneNumber', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'Email', field: 'email', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'Notes', field: 'notes', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'guestType', field: 'guestType', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'Active Status', field: 'isActive', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'vipID', field: 'vipID', suppressSizeToFit: true, maxWidth: 160 },
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
    fetch('http://192.168.1.33:14700/getGuestHistoryDetails?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);

  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 280}}>
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
    </div>
  );
}

export default App;