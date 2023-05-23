
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import {useState, useRef, useEffect, useMemo, useCallback} from 'react';

function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Room Type ', field: 'roomTypeID', suppressSizeToFit: true, maxWidth: 160 },
      { headerName: 'One Adult Price', field: 'oneAdultPrice' },
      { headerName: 'Two Adult Price', field: 'twoAdultPrice' },
      { headerName: 'Three Adult Price', field: 'threeAdultPrice' },
      { headerName: 'Extra Adult Price ', field: 'extraAdultPrice' },
      { headerName: 'Extra Child Price', field: 'extraChildPrice' },
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
    console.log(localStorage.getItem['id'])
    fetch(`http://192.168.1.33:14700/getRoomRates?hotelID=1&rateCodeID=${localStorage.getItem('id')}`)
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);
  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 250}}>
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