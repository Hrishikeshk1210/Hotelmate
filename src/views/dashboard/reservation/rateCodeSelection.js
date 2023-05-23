
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import {Card, useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Button, CardBody } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

function App() {

  // fetch('http://192.168.1.33:14700/getRateCodeSelection?hotelID=1')
  // .then(result => result.json())
  // .then(rowData => {setRowData(rowData['data'])})
  // // console.log(rowData['data']

  const [rowData, setRowData] = useState();

  const gridRef = useRef();
  const [data, setData] = useState(null)
  const actionButton1=(rowval)=>{
    console.log(rowval['data'])
    // console.log(params);
    // alert(`${params.value}`)
    // setData(data)
    // if (data.RoomType !== null && data.oneAdultPrice !== null  && data.numAvlRooms!== null) {
      
        // console.log(data)
        let createmarketGroup = JSON.stringify({
          "roomType": rowval['data']['roomTypeID'],
          "baseRate": rowval['data']['oneAdultPrice'],
          "totalRate": rowval['data']['totalrate'],
          "availability": rowval['data']['numAvlRooms'],   
        })

        console.log(createmarketGroup)
        console.log("Hi")
        let res = fetch("http://192.168.1.33:14700/addTempRateCodeSelection", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: createmarketGroup
        }).then((res) => {
          console.log(res)
        });
      // }
      toast(
        <div className='d-flex'>
          <p> Submitted</p>
        </div>
      ) 
  }

  const actionButton=(rowval)=>{
    console.log(rowval['data'])
    // console.log(params);
    // alert(`${params.value}`)
    // setData(data)
    // if (data.RoomType !== null && data.oneAdultPrice !== null  && data.numAvlRooms!== null) {
      
        // console.log(data)
        let createmarketGroup = JSON.stringify({
          "roomType": rowval['data']['roomTypeID'],
          "baseRate": rowval['data']['oneAdultPrice'],
          "totalRate": rowval['data']['totalrate'],
          "availability": rowval['data']['numAvlRooms'],   
        })

        console.log(createmarketGroup)
        console.log("Hi")
        let res = fetch("http://192.168.1.33:14700/addTempRateCodeSelection", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: createmarketGroup
        }).then((res) => {
          console.log(res)
        });
      // }
      toast(
        <div className='d-flex'>
          <p> Submitted</p>
        </div>
      ) 
  }

  const defaultValues = {
    roomTypeID: '',
    oneAdultPrice: '',
    totalrate: '',
    numAvlRooms: '',
   
  }

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'RoomType',field: 'roomTypeID',suppressSizeToFit: true,maxWidth:200},
    {headerName: 'BaseRate ',field: 'oneAdultPrice',suppressSizeToFit: true},
    {headerName: 'Total Rate',field: 'totalrate',suppressSizeToFit: true,maxWidth: 200},
    {headerName: 'Breakup',field: 'numAvlRooms',suppressSizeToFit: true,maxWidth: 200,cellRendererFramework:(params)=>
        <Button  className='me-1' color='flat-secondary' onClick={()=>actionButton1(params)}> View Breakup </Button>},
    {headerName: 'Avalablity',field: 'numAvlRooms',suppressSizeToFit: true,maxWidth: 200},
    {headerName: 'Action',field: 'numAvlRooms', suppressSizeToFit: true,maxWidth: 200 ,cellRendererFramework:(params)=>
        <Button color='primary' onClick={()=>actionButton(params)}> Add </Button>},
    // {headerName: 'Action',field: 'quantity',suppressSizeToFit: true,maxWidth: 200},
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
    fetch('http://192.168.1.33:14700/getRateCodeSelection?hotelID=1')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data']
    )})
  }, []);

  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);


   

   // ** Hooks
   const { reset, handleSubmit, control } = useForm({ defaultValues })   
 
   const handleReset = () => {
     reset({
      roomTypeID: '',
      oneAdultPrice: '',
      totalrate: '',
      numAvlRooms: '',
     })
   }
 

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
            // pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
     
    </div>
  );
}

export default App;

