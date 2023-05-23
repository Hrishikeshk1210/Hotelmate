// // import React, { useCallback, useMemo, useRef, useState } from 'react';
// // import { render } from 'react-dom';
// // import { AgGridReact } from 'ag-grid-react';
// // import 'ag-grid-enterprise';
// // import 'ag-grid-community/styles/ag-grid.css';
// // import 'ag-grid-community/styles/ag-theme-alpine.css';
// // import '/node_modules/ag-grid-community/styles/ag-grid.css';
// // import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// // import { format } from "date-fns";
// // import { Button } from 'bootstrap';


// // const GridExample = () => {
// //   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
// //   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
// //   const [rowData, setRowData] = useState();


// //   var blk1 = format(new Date(), 'MMM'+" "+'dd')
// // let yesterday = new Date(blk1)
// // yesterday.setDate(yesterday.getDate() + 1)
// // var blk2 = format(new Date(yesterday), 'MMM'+" "+'dd')
// // yesterday = new Date(blk2)
// // yesterday.setDate(yesterday.getDate() + 1)
// // var blk3 = format(new Date(yesterday), 'MMM'+" "+'dd')
// // yesterday = new Date(blk3)
// // yesterday.setDate(yesterday.getDate() + 1)
// // var blk4 = format(new Date(yesterday), 'MMM'+" "+'dd')
// // yesterday = new Date(blk4)
// // yesterday.setDate(yesterday.getDate() + 1)
// // var blk5 = format(new Date(yesterday), 'MMM'+" "+'dd')
// // yesterday = new Date(blk5)
// // yesterday.setDate(yesterday.getDate() + 1)
// // var blk6 = format(new Date(yesterday), 'MMM'+" "+'dd')
// // yesterday = new Date(blk6)
// // yesterday.setDate(yesterday.getDate() + 1)
// // var blk7 = format(new Date(yesterday), 'MMM'+" "+'dd')



// //   console.log(blk5)
// //   console.log(blk4)
// //   console.log(blk3)
// //   console.log(blk2)
// //   console.log(blk1)

// //   const [columnDefs, setColumnDefs] = useState([
// //  {
// //       headerName: 'All Room Types', field: 'roomType', rowGroup: true,  
// //     },
// //     {headerName: blk1, field: 'rateCode'}
// //     // {headerName: blk2,field: 'blk2'},
// //     // {headerName: blk3,field: 'blk3'},
// //     // {headerName: blk4,field: 'blk4'},
// //     // {headerName: blk5,field: 'blk5'},
// //     // {headerName: blk6,field: 'blk6'},
// //     // {headerName: blk7,field: 'blk7'},  
// //   ]);

// // //   console.log(columnDefs[0])


// // const defaultColDef = useMemo(() => {
// //   return {
// //     flex: 1,
// //     minWidth: 120,
// //     resizable: true,
// //     sortable: true,
// //   };
// // }, []);
// //   const autoGroupColumnDef = useMemo(() => {
// //     return {
// //       minWidth: 100,
// //     };
// //   }, []);

// //   const onGridReay = useCallback((params) => {
// //     fetch('http://192.168.1.33:14700/getavailabilitymatrix')
// //       .then((resp) => resp.json())
// //       .then(rowData => {setRowData(rowData['data'])
// //           console.log(rowData['data'])
// //         })
// //   }, []);

// //   return (
// //     <div style={{ height: 520}}>
// //       <div style={{ height: 520}} className="ag-theme-alpine">
// //       <div style={gridStyle} className="ag-theme-alpine-dark">
// //         <AgGridReact
// //           rowData={rowData}
// //           columnDefs={columnDefs}
// //           defaultColDef={defaultColDef}
// //           autoGroupColumnDef={autoGroupColumnDef}
// //           animateRows={true}
// //           onGridReady={onGridReay}
// //         />
// //       </div>
// //     </div>
// //     </div>
// //   );
// // };

// // render(<GridExample></GridExample>, document.querySelector('#root'));



// // import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';
// // import { render } from 'react-dom';
// // import { AgGridReact } from 'ag-grid-react';
// // import 'ag-grid-enterprise';
// // import 'ag-grid-community/styles/ag-grid.css';
// // import 'ag-grid-community/styles/ag-theme-alpine.css';

// // const GridExample = () => {
// //   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
// //   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
// //   const [rowData, setRowData] = useState();
// //   const [columnDefs, setColumnDefs] = useState([
// //     { field: 'roomTypeID', rowGroup: true, hide: true },
// //     // { field: 'year', rowGroup: true, hide: true },
// //     { field: 'rateCode', aggFunc: 'first'},
// //     { field: 'silver', aggFunc: 'max' },
// //     { field: 'bronze', aggFunc: 'avg' },
// //   ]);
// //   const defaultColDef = useMemo(() => {
// //     return {
// //       flex: 1,
// //       minWidth: 100,
// //       sortable: true,
// //       resizable: true,
// //     };
// //   }, []);
// //   const autoGroupColumnDef = useMemo(() => {
// //     return {
// //       minWidth: 200,
// //     };
// //   }, []);


// //   useEffect(() => {
// //     fetch('http://192.168.1.33:14700/RateCode?hotelID=1')
// //     .then((resp) => resp.json())
// //     .then(rowData =>{setRowData(rowData['data'])
// //     console.log(rowData['data'])
// //     })
// //   }, []);
// //   // const onGridReady = useCallback((params) => {
// //   //   fetch('http://192.168.1.33:14700/RateCode?hotelID=1')
// //   //     .then((resp) => resp.json())
// //   //     .then(rowData =>{setRowData(rowData['data'])
// //   //     console.log(rowData['data'])
// //   //     })
// //   // }, []);

 

// //   return (
// //     <div style={containerStyle}>
// //       <div style={gridStyle} className="ag-theme-alpine">
// //         <AgGridReact
// //           rowData={rowData}
// //           columnDefs={columnDefs}
// //           defaultColDef={defaultColDef}
// //           autoGroupColumnDef={autoGroupColumnDef}
// //           animateRows={true}
// //           // onGridReady={onGridReady}
          
// //         ></AgGridReact>
// //       </div>
// //     </div>
// //   );
// // };

// // function Test(){
// //   <div id="root">Loading React example…</div>
// // }

// // render(<GridExample/>, document.querySelector('#root'));
// // export default Test


// import 'ag-grid-enterprise'
// import {AgGridReact} from 'ag-grid-react';
// import '/node_modules/ag-grid-community/styles/ag-grid.css';
// import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
// import { format } from "date-fns";
// import SubMatrix from './subMatrix';
// const id = '1';
// function AvailabilityMatrix() {

//   const [rowData, setRowData] = useState();

//   const gridRef = useRef();


//   var blk1 = format(new Date(), 'MMM'+" "+'dd')
//   let yesterday = new Date(blk1)
//   yesterday.setDate(yesterday.getDate() + 1)
//   var blk2 = format(new Date(yesterday), 'MMM'+" "+'dd')
//   yesterday = new Date(blk2)
//   yesterday.setDate(yesterday.getDate() + 1)
//   var blk3 = format(new Date(yesterday), 'MMM'+" "+'dd')
//   yesterday = new Date(blk3)
//   yesterday.setDate(yesterday.getDate() + 1)
//   var blk4 = format(new Date(yesterday), 'MMM'+" "+'dd')
//   yesterday = new Date(blk4)
//   yesterday.setDate(yesterday.getDate() + 1)
//   var blk5 = format(new Date(yesterday), 'MMM'+" "+'dd')
//   yesterday = new Date(blk5)
//   yesterday.setDate(yesterday.getDate() + 1)
//   var blk6 = format(new Date(yesterday), 'MMM'+" "+'dd')
//   yesterday = new Date(blk6)
//   yesterday.setDate(yesterday.getDate() + 1)
//   var blk7 = format(new Date(yesterday), 'MMM'+" "+'dd')



//   const [columnDefs2, setColumnDefs2] = useState([
//     // {
//     //      headerName: 'All Room Types', field: 'roomType', rowGroup: true,  
//     //    },
//       //  {headerName: blk1, field: 'blk1'}
//        {headerName: blk2,field: 'blk2'},
//        {headerName: blk3,field: 'blk3'},
//        {headerName: blk4,field: 'blk4'},
//        {headerName: blk5,field: 'blk5'},
//        {headerName: blk6,field: 'blk6'},
//        {headerName: blk7,field: 'blk7'},  
//      ]);


//   const [columnDefs, setColumnDefs] = useState([
//     // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
//     // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
//     {headerName: 'Room Type',field: 'roomType', cellRenderer: "agGroupCellRenderer"},
//     {headerName: blk1,field: 'oneAdultPrice'},
//     {headerName: blk2,field: 'twoAdultPrice'},
//     {headerName: blk3,field: 'threeAdultPrice'},
//     {headerName: blk4,field: 'extraAdultPrice'},
//     {headerName: blk5,field: 'oneChildPrice'},
//     {headerName: blk6,field: 'oneAdultPrice'},
//     {headerName: blk7,field: 'oneAdultPrice'},
//     {headerName: 'groupID',field: 'groupID',suppressSizeToFit: true},
//     {headerName: 'subGroupID',field: 'subGroupID'},
//     {headerName: 'baseRate',field: 'baseRate'},
//     {headerName: 'taxPercentage',field: 'taxPercentage',suppressSizeToFit: true},
//     {headerName: 'discountAllowed',field: 'discountAllowed'},
//     {headerName: 'isAllowance',field: 'isAllowance'},
//     {headerName: 'isActive',field: 'isActive'},
//     {headerName: 'allowanceCodeID',field: 'allowanceCodeID'},
//     {headerName: 'isAllowance',field: 'isAllowance'},
//     {headerName: 'isActive',field: 'isActive'},
//   ]);
 
//   const defaultColDef = useMemo( ()=> (
//     {
//       sortable: true, 
//       filter: true,
//       filterParams :{
//       buttons : ['apply','reset']
//       }
//     }
//   ));

//   const cellClickedListener = useCallback( event => {
//     console.log('cellClicked', event);
//   }, []);

//   useEffect(() => {
//     fetch('http://192.168.1.33:14700/getavailabilitymatrix')
//     .then(result => result.json())
//     .then(rowData => {setRowData(rowData['data'])
//     console.log(rowData['data'])
//     })
//   }, []);    

//   const buttonListener = useCallback( e => {
//     gridRef.current.api.deselectAll();
//   }, []);

//   return (
//     <div>
//       <h4>Availability Matrix</h4>
//       {/* <button onClick={buttonListener}>Push Me</button> */}
//       <div className="ag-theme-alpine" style={{ height: 520}}>
//         <AgGridReact 
//             ref={gridRef}
//             rowData={rowData} columnDefs={columnDefs}
//             animateRows={true} rowSelection='multiple'
//             onCellClicked={cellClickedListener}
//             // paginationAutoPageSize = 'true'
//             paginationPageSize= '10'
//             pagination = 'true'
//             defaultColDef={defaultColDef}
//             headerColor="ddw-primary"
//             masterDetail={true}
//             detailCellRenderer={(props)=> <SubMatrix {...props} />}
            
//             />
//       </div>
//     </div>
//   );
// }

// export default AvailabilityMatrix;


// ** React Imports
import { useState } from "react";
import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Moment from 'moment';

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {Input,Card,Form,Label,Button,CardBody,CardTitle,CardHeader,InputGroup,InputGroupText,Row,Col
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
// import App from "./roomInventoryDataTable";
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';// import './Assettable.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';


const AvailabilityMatrix = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    // {headerName: 'Room ID',field: 'roomID'},
    {headerName: 'Inventory Date',field: 'date'},
    {headerName: 'KSUP',field: '0'},
    {headerName: 'TSUP',field: '1'},
    {headerName: 'KDLX',field: '2'},
    {headerName: 'TDLX',field: '3'},
    {headerName: 'KCLB',field: '4'},
    {headerName: 'TCLB',field: '5'},
    {headerName: 'EXE',field: '6'},


    // {headerName: 'Number of Avalable Rooms',field: 'numAvlRooms'},
    // {headerName: 'Number of Sell Control Rooms',field: 'numSellCtrlRooms'},
    // {headerName: 'Number of OOD Rooms',field: 'numOodRooms'},
    // {headerName: 'Number of Overbooked Rooms',field: 'numOverbookedRooms'},
    // {headerName: 'Sell Limit',field: 'sellLimit'},
    // {headerName: 'Room Type ID',field: 'roomTypeID',
    // headerValueGetter: function () {
    //   return roomTypeID;
    // }
    //  valueGetter: params => params.data.roomTypeID,
    // cellRendererFramework: params => {
    //   const { data } = params;
    //   const inventory_date = data.inventory_date;
    //   const numAvlRooms = data.numAvlRooms[inventory_date];
    //   return numAvlRooms;
    // }
    // },

  ]);
// console.log(roomTypeID)
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
    fetch('http://192.168.1.33:14700/getinventory?hotelID=1')
    .then(result => result.json())
    .then(rowData =>{
      // for(let i=0; i<10;i++){
      console.log(rowData['data'])
      let tabledata =[]
      let keylist = Object.keys(rowData['data'])
      // console.log(keylist)
      keylist.forEach(element =>{
        // console.log(rowData['data'][element]['roomtype'])
        // console.log(rowData['data'][element][0]['roomtype'])
        let myjson = {'date':rowData['data'][element]['date']}
        
        rowData['data'][element]['roomtype'].forEach((i,roomtype)=>{
             console.log(roomtype)
             myjson[roomtype] = rowData['data'][element]['roomcount'][i-1]
        })
        tabledata.push(myjson)
      })
console.log(tabledata)
setRowData(tabledata)
    }
    )
    
  }, []);
 

  // ** State
  const [data, setData] = useState(null);





  return (
    <div>
    
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
    {/* <App/> */}
    </div>
  );
};

export default AvailabilityMatrix;





