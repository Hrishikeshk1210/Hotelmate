import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
const date='2021-01-01 00:00:00'
function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160,  },
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Room Type',field: 'roomType'},
    {headerName: 'Date',field: 'date', suppressSizeToFit: true, maxWidth: 500},
    {headerName: 'Number Of Units',field: 'noOfUnits'},

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
    fetch('http://192.168.1.33:14700/getroominventoryforecast?date='+date)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
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