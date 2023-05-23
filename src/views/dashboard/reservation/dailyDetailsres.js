

import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

function App() {

    const [rowData, setRowData] = useState();

    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Date', field: 'inventory_date' },

        { headerName: 'rateCodeID', field: 'rateCodeID', suppressSizeToFit: true, maxWidth: 160 },
        { headerName: 'sourceID	', field: 'sourceID	', suppressSizeToFit: true },
        { headerName: 'packageCode', field: 'packageCode' },
        { headerName: 'extraCode', field: 'extraCode' },
        { headerName: 'roomTypeID', field: 'roomTypeID' },
        { headerName: 'baseprice', field: 'baseprice' },
        { headerName: 'extraadultprice', field: 'extraadultprice' },
        { headerName: 'childrenprice', field: 'childrenprice' },
        { headerName: 'total', field: 'total' },
    ]);

    const defaultColDef = useMemo(() => (
        {
            sortable: true,
            filter: true,
            filterParams: {
                buttons: ['apply', 'reset']
            }
        }
    ));

    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    useEffect(() => {
        fetch('http://192.168.1.33:14700/showdetails?hotelID=1')
            .then(result => result.json())
            .then(rowData => setRowData(rowData['data']))
    }, []);

    const buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);

    return (
        <div>
            {/* <button onClick={buttonListener}>Push Me</button> */}
            <div className="ag-theme-alpine" style={{ height: 520 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    // paginationAutoPageSize = 'true'
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div>
        </div>
    );
}

export default App;