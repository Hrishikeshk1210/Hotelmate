
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import {Card, useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { CardBody } from 'reactstrap';

function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'checkIn',field: 'checkIn',suppressSizeToFit: true,maxWidth:200},
    {headerName: 'checkOut ',field: 'checkOut',suppressSizeToFit: true},
    {headerName: 'adults',field: 'adults',suppressSizeToFit: true,maxWidth: 200},
    {headerName: 'children',field: 'children',suppressSizeToFit: true,maxWidth: 200},
    {headerName: 'quantity',field: 'quantity',suppressSizeToFit: true,maxWidth: 200},
    
    {headerName: 'roomType',field: 'roomType',suppressSizeToFit: true,maxWidth: 200},
    {headerName: 'Base Rate',field: 'baseRate',suppressSizeToFit: true,maxWidth: 200},
    {headerName: 'TotalRate',field: 'totalRate',suppressSizeToFit: true,maxWidth: 200},
    {headerName: 'packages',field: 'packages',suppressSizeToFit: true,maxWidth: 200},

    {headerName: 'quantity',field: 'quantity',suppressSizeToFit: true,maxWidth: 200},

    {headerName: 'quantity',field: 'quantity',suppressSizeToFit: true,maxWidth: 200},













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
    fetch('http://192.168.1.33:14700/confirmedReservation?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);

  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
     
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 220}}>
        
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

