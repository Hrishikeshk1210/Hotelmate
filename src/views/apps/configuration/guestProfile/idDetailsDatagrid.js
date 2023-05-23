
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import {useState, useRef, useEffect, useMemo, useCallback} from 'react';

function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Name', field: 'name', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'IDType', field: 'IDType', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'adharNumber ', field: 'adharNumber', suppressSizeToFit: true },
    { headerName: 'panNumber ', field: 'panNumber', suppressSizeToFit: true },
    { headerName: 'driving License Number ', field: 'drivingLicenseNumber', suppressSizeToFit: true },
    { headerName: 'passportNumber ', field: 'passportNumber', suppressSizeToFit: true },
    { headerName: 'Issue Place ', field: 'issuePlace', suppressSizeToFit: true },

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
    fetch('http://192.168.1.33:14700/getiddetails?hotelID=1')
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