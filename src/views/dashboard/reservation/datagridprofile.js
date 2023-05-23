

import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

function App() {

    const [rowData, setRowData] = useState();

    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'firstName', field: 'firstName', suppressSizeToFit: true, maxWidth: 160 },
        { headerName: ' Last Name', field: 'lastName', suppressSizeToFit: true },
        { headerName: 'phoneNumber', field: 'phoneNumber' },
        { headerName: 'emailID', field: 'emailID' },
        { headerName: 'IDType', field: 'IDType' },
        { headerName: 'IDNumber', field: 'IDNumber' },
        { headerName: 'addressOne', field: 'addressOne' },
        { headerName: 'addressTwo', field: 'addressTwo' },
        { headerName: 'country', field: 'country' },
        { headerName: 'state', field: 'state' },
        { headerName: 'postalCode', field: 'postalCode' },
        { headerName: 'GSTNumber', field: 'GSTNumber' },
        

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
        fetch('http://192.168.1.33:14700/GuestProfile?hotelID=1')
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