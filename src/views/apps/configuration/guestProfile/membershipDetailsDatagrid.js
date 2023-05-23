
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import {useState, useRef, useEffect, useMemo, useCallback} from 'react';

function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
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
    fetch('http://192.168.1.33:14700/getMembershipDetails?hotelID=1&guestID=1')
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