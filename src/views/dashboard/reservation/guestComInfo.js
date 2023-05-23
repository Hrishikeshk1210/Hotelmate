
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import {useState, useRef, useEffect, useMemo, useCallback} from 'react';

function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Salutation', field: 'salutation', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Name', field: 'firstName', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Last Name', field: 'lastName', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Guest Status', field: 'guestStatus', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Address One', field: 'addressOne', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Address Two', field: 'addressTwo', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Country', field: 'country', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'State', field: 'state', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'City', field: 'city', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Postal Code', field: 'postalCode', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'GST ID ', field: 'gstID', suppressSizeToFit: true },
    { headerName: 'Anniversary', field: 'anniversary', suppressSizeToFit: true },
    { headerName: 'Nationality', field: 'nationality', suppressSizeToFit: true },
    { headerName: 'DOB ', field: 'dob', suppressSizeToFit: true },
    { headerName: 'Phone Number', field: 'phoneNumber', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Email', field: 'email', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Notes', field: 'notes', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'guestType', field: 'guestType', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Active Status', field: 'isActive', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'vipID', field: 'vipID', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'IDType', field: 'IDType', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'IDNumber ', field: 'idNumber', suppressSizeToFit: true },   
    { headerName: 'Issue Place ', field: 'issuePlace', suppressSizeToFit: true },
    { headerName: 'Membership Type', field: 'membershipType', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Membership No', field: 'membershipNo', suppressSizeToFit: true },
    { headerName: 'Name On Card', field: 'nameOnCard', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Membership Since', field: 'membershipSince', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Membership level', field: 'level', suppressSizeToFit: true },
    { headerName: 'Expiry Date', field: 'expiryDate', suppressSizeToFit: true, maxWidth: 160 },
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
    fetch('http://192.168.1.33:14700/getGuestProfileNew?hotelID=1')
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