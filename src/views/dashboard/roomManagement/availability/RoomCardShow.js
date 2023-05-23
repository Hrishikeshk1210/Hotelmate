// ** Third Party Components
import InputNumber from 'rc-input-number'
import { Plus, Minus } from 'react-feather'
import React, { Component } from 'react';
// ** Custom Components
import Avatar from "@components/avatar";

import { useNavigate } from "react-router-dom";

// ** React Imports
import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import * as ReactDOM from 'react-dom';
import { User, X } from 'react-feather'

import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

// ** Reactstrap Imports
import {
  Input,
  Card,
  Form,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
import {AgGridReact} from 'ag-grid-react';
let RestaurantOptions = [
    fetch('http://192.168.1.33:14676/getrestaurantlist')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      RestaurantOptions = resp['data']
      console.log(RestaurantOptions)
    })
  ]

let tablestatus = [

    // fetch('http://192.168.1.33:14676/gettablestatus?hotelID=1&storeID='+localStorage.getItem('storeID'))
    // .then(result => result.json())
    // .then(resp => {
    //   console.log(resp['data'])
    //   tablestatus = resp['data']
    
    // })

]
  let Roomcount = [
  //   fetch('http://192.168.1.33:14676/gettablecount?hotelID=1&storeID='+storeid)
  //   .then(result => result.json())
  //   .then(resp => {
  //     console.log(resp['data'])
  //     Tablecount = resp['data']
  //     console.log(Tablecount[0]['tableCount'])
  //   })
  ]
  
let id=1;

const defaultValues = {
  TableNo: '',
  pax: '',
  Type: '',
  guestName:'',
  Departments:'',
  KOTType:''
}

const TypeOptions = [
  { value: "NC KOT", label: "NC KOT" },
  { value: "Normal", label: "KOT" }
];

const roomStatus = [
  { value: 'Out Of Service', label: 'Out Of Service' },
  { value: 'Out Of Order', label: 'Out Of Order' },
  { value: 'Dirty', label: 'Dirty' },
  { value: 'Inspected', label: 'Inspected' },
]

let DeptOptions = [
    fetch('http://192.168.1.33:14676/getdepartments?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      console.log(resp['data'])
      DeptOptions = resp['data']
      console.log(DeptOptions)
    })
]
const ValidationThirdPartyComponents = ({floorid}) => {

// console.log(sessionStorage.getItem('Rest_name'))


  let navigate = useNavigate(); 
  const [assign, setAssign] = useState(false)

  const [orderbtn, setorderbtn] = useState(true);
  const [modaldata,setmodaldata] = useState('')
  const [checkdata,setcheckdata] = useState(false)
  const [tableorders,settableorders] = useState();
  const [reloadtable, setreloadtable] = useState(false);
  const [selectedRows, setSelectedRows] = useState([])
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null);
  const [selectedValue, setSelectedOption] = useState('');
  const [showNCfields,setNCfields]  = useState(false)
    const [selecteditem,setselecteditem] = useState("");
  const [rowData, setRowData] = useState();
  const [orderIDdisplay,setorderIDdisplay] = useState(false)
  const [tableData, setTableData] = useState([
    // {id: 1, menuitem: 'item1', qty: 1},
    // {id: 2, menuitem: 'item2', qty: 1},
  ]);

   // ** Hooks
   const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);

    console.log(event.value); // print the selected value to console
    if (selectedValue == 'KOT') {
        console.log("hi")
    }
    else if (selectedValue == 'NC KOT') {
        console.log("hello")
        setNCfields(true)
    }
    else  {
        
    }
};
const onSubmit = (data) => {
  setData(data);
  console.log(data)
  let orderdata={}
  if (data.pax !== null && selectedValue!='' && localStorage.getItem('TableSelected')!=null) {
    console.log(data);
    if(selectedValue=='NC KOT'){
      orderdata = JSON.stringify({
        "hotelID":1,
        "storeID": localStorage.getItem('storeID'),
        "tableNo": localStorage.getItem('TableSelected'),
        "pax": data.pax,
        "orderType": selectedValue,
        "guestName" :data.guestName,
        "dept":data.Departments.value,
        "NCKOTType":data.KOTType.value
    })}
    else{
     orderdata = JSON.stringify({
      "hotelID":1,
      "storeID": localStorage.getItem('storeID'),
      "tableNo": localStorage.getItem('TableSelected'),
      "pax": data.pax,
      "orderType": selectedValue,
      "guestName" :'',
      "dept":'',
      "NCKOTType":''
    });
  }
    console.log(orderdata);
    // let res = fetch("http://192.168.1.33:14676/addHotelOrderID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: orderdata,
    // }).then((res) => {
    //   console.log(res);
    //   if(res['status']==200){
    //     toast(
    //       <div className="d-flex">
    //         <div className="me-1">
    //           <Avatar size="sm" color="success" icon={<Check size={12} />} />
    //         </div>
    //         <div className="d-flex flex-column">
    //           <h6>Form Submitted!</h6>
    //         </div>
    //       </div>
    //     );
    //     setTimeout(() => {navigate('/apps/posconfiguration/Addorder')},1000);

    //   }
    //   else{
    //     window.location.reload(true);
    //   }
    // });
    
    let res = fetch('http://192.168.1.33:14676/addHotelOrderID', {
      method: 'POST',
      body: orderdata,
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((res) => res.json())
      .then((post) => {
          console.log(post)
          localStorage.setItem('orderID',post['data']['orderID'])
          if(post['statuscode']==200){
                toast(
                  <div className="d-flex">
                    <div className="me-1">
                      <Avatar size="sm" color="success" icon={<Check size={12} />} />
                    </div>
                    <div className="d-flex flex-column">
                      <h6>Form Submitted!</h6>
                    </div>
                  </div>
                );
                setTimeout(() => {navigate('/apps/posconfiguration/Addorder')},100);
        
              }
              else{
                // window.location.reload(true);
                // alert("test")
                navigate('/apps/posconfiguration/Tableselection')
              }
 })
      .catch((err) => {
         console.log(err.message);
      });
  }
};


  useEffect(() => {
    console.log(localStorage.getItem('RestaurantSelected'))
    console.log(localStorage.getItem('storeID'))
    fetch('http://192.168.1.33:14700/getRoomInformation?floorID='+floorid)
    .then(result => result.json())
    .then(resp => {
      console.log(resp['data'])
      Roomcount = resp['data']
      

    }).then(data=>{
    fetch('http://192.168.1.33:14676/getAllTableOrderStatus?hotelID=1&storeID='+localStorage.getItem('storeID'))
    .then(result => result.json())
    .then(resp => {
      console.log(resp['data'])
      tablestatus = resp['data']
      setcheckdata(true)
    })
  })
  },[]);  


    
      function getButtonsUsingForLoop(num) {
        // console.log(Roomcount.length)
        // console.log(tablestatus[0])
        let color='';
        const array = []
    
        for(var i = 1; i <= num; i++){
            // console.log(i)
            // console.log(tablestatus[i-1])
          // console.log(RestaurantOptions[i])
          // console.log((RestaurantOptions[i]['value']))
        //   let Restaurant = RestaurantOptions[i]['restaurantName']
        // if(tablestatus.length==num){
        if(Roomcount[i-1]['roomStatus']=='Occupied'){
            color = 'primary'
        }
        else if(Roomcount[i-1]['roomStatus']=='Dirty'){
            color='danger'
        }
        else if(Roomcount[i-1]['roomStatus']=='Out Of Order'){
            color='info'

        }
        else if(Roomcount[i-1]['roomStatus']=='Out Of Service'){
            color='warning'

        }
      // }
        else if (Roomcount[i-1]['roomStatus']=='Inspected'){
            color='success'
        }
        const tableid=i
        const roomno = Roomcount[i-1]['roomNumber']
        const roomtype = Roomcount[i-1]['roomType']
        const fstatus = Roomcount[i-1]['frontOfficeStatus']
        const roomstatus = Roomcount[i-1]['roomStatus']
          array.push(
            <Button color ={color} className="me-0.5" style={{ 'margin-right' : '10px',height:'180px',width:'140px',
            'margin-bottom' :'10px'}}
            id={tableid}
            name="bt"
            // onClick={alert("test")}
            // onClick={handleClick}
            onClick={() => {
              handleClick(roomno,roomtype,fstatus,roomstatus)
             }}
            >
            <p>{Roomcount[i-1]['roomNumber']}</p>
            <p>{Roomcount[i-1]['roomType']}</p>
            <p>{Roomcount[i-1]['frontOfficeStatus']}</p>
            <p>{Roomcount[i-1]['roomStatus']}</p>
            

            
          </Button>)
        }
    
        return array
      }
      function handleClick(roomno,roomtype,fstatus,roomstatus){
        console.log(roomno,roomtype,fstatus,roomstatus)
        let myJson={"roomno":roomno,"roomtype":roomtype,"fstatus":fstatus,"roomstatus":roomstatus}
        setmodaldata(myJson) 
        setAssign(true)
          // fetch('http://192.168.1.33:14676/getTableOrderStatus?hotelID=1&storeID='+localStorage.getItem('storeID')+'&tableNo='+count)
          // .then(result => result.json())
          // .then(resp => {
          //   console.log(resp['data'])
          //   console.log(resp['data']['TableOrderID'])

          //   if(resp['data']['TableOrderID'] != 0){
          //     localStorage.setItem('orderID',resp['data']['TableOrderID'])
          //     console.log('http://192.168.1.33:14676/gettableorderlist?hotelID=1&storeID='+localStorage.getItem('storeID')+'&tableNo='+count)
          //     fetch('http://192.168.1.33:14676/gettableorderlist?hotelID=1&storeID='+localStorage.getItem('storeID')+'&tableNo='+count)
          //     .then(result => result.json())
          //     .then(result => {
          //       console.log(result['data'])
          //       settableorders(result['data'])
          //        console.log(tableorders)
          //        setreloadtable(true)
          //        setorderbtn(false)
          //     })
          //   }
          //   else{
          //     localStorage.setItem('orderID','')

          //     settableorders([])
          //     setreloadtable(true)
          //     setShow(true)

            // }
            // localStorage.setItem('orderID',resp['data']['TableOrderID'])

        //   })
        // console.log(count)
        
        }
      const handleSelect = id => {
        const selectedRowsArr = selectedRows
        if (!selectedRowsArr.includes(id)) {
            selectedRowsArr.push(id)
        } else if (selectedRowsArr.includes(id)) {
            selectedRowsArr.splice(selectedRowsArr.indexOf(id), 1)
        } else {
            return null
        }
        setSelectedRows([...selectedRowsArr])
    }
    const handleSelectAll = () => {
        let selectedRowsArr = selectedRows
        if (selectedRowsArr.length < tableData.length) {
            let ids = []
            for (let i = 0; i < tableData.length; i++) {
                ids.push(i)
            }

            selectedRowsArr = ids
        } 
        else if (selectedRowsArr.length === tableData.length) {
            selectedRowsArr = []
        } 
        else {
            return null
        }

        setSelectedRows(selectedRowsArr)
    }

      function CartTable() {
        console.log(tableorders)
        return (
            <table >
                <thead >
                    <tr>
                        <th style={{ margin: '6px 0', paddingLeft: '10px' }} >
                            <div className='form-check'>
                                <Input
                                    type='checkbox'
                                    id='select-all'
                                    label=''
                                    checked={!!selectedRows.length}
                                    onChange={() => handleSelectAll()}
                                />
                            </div>
                        </th>
                        <th style={{ margin: '6px 0', paddingLeft: '10px' }} >ID</th>
                        <th style={{ margin: '6px 0', paddingLeft: '10px' }} >Menuitem</th>
                        <th style={{ margin: '6px 0', paddingLeft: '10px' }} >Qty</th>
                        <th style={{ margin: '6px 0', paddingLeft: '10px' }} >Amount</th>

                    </tr>
                </thead>
                <tbody>
                    {tableorders.map((row, index) => (
                        <tr key={index}>
                            <td style={{ margin: '6px 0', paddingLeft: '10px' }} >
                                <div className='form-check'>
                                    <Input
                                        id={index}
                                        type='checkbox'
                                        onChange={() => handleSelect(index)}
                                        checked={!!selectedRows.includes(index)}
                                    />
                                </div>
                            </td>
                            <td style={{ margin: '6px 0', paddingLeft: '10px' }}  id={"itemID" + index}>{row.itemID}</td>
                            <td style={{ margin: '6px 0', paddingLeft: '10px' }}  id={"itemName" + index}>{row.itemName}</td>
                            <td style={{ margin: '6px 0', paddingLeft: '10px' }}  id={"qty" + index}>{row.qty}</td>
                            <td style={{ margin: '6px 0', paddingLeft: '10px' }}  id={"amt" + index}>{row.amount}</td>

                        </tr>

                    ))}
                </tbody>
            </table>
        )
    }      


function billprint(){
  console.log("Navigate")
  localStorage.setItem("tableNumber",localStorage.getItem('TableSelected'))
  navigate('/apps/posconfiguration/DisplayBill')
}    
  return (
    <div>
    <Row className='match-height'>

    <Col xl='12' >
    <Card>
      
      <br/>
      <h4 style={{ margin: '6px 0', paddingLeft: '10px' }}>Select Table</h4>
      <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px' }}>

        {checkdata && getButtonsUsingForLoop(Roomcount.length)}  
        </div>  
        <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px' }}>
        <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='success'  size='sm' >Inspected</Button.Ripple>
        <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='danger' size='sm'  >Dirty</Button.Ripple>
        <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='primary'  size='sm' >Clean/Occupied</Button.Ripple>
        <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='info' size='sm'  >Out of order</Button.Ripple>  
        <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='warning'  size='sm' >Out of service</Button.Ripple>
        </div>
    </Card>
    </Col>    

</Row>

<Modal isOpen={assign} toggle={() => setAssign(!assign)} className='demo-inline-spacing'>
        <ModalHeader className='bg-transparent' toggle={() => setAssign(!assign)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <div>
            {/* <AssignRoom/> */}
            {modaldata.length!=0 && 
            <>
            <h2>Room Data  </h2>
            <h6>Room Number : {modaldata['roomno']} </h6>
            <h6>Room Type : {modaldata['roomtype']}</h6>
            <h6>Room Status : {modaldata['roomstatus']}</h6>
            <h6>Front Office Status : {modaldata['fstatus']}</h6>
            <Col md='4' sm='12' className='mb-1'>

            <Select
                        isClearable
                        options={roomStatus}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.roomStatus === null })}
                        // {...field}
                        disabled={true}
                        // value={data1['SubBookingId']}
                      />      
                      </Col> 
                                <Col md='4' sm='12' className='mb-1'>

                       <div className="d-flex">
            <Button className="me-1" color="primary" type="submit" >
              Submit
            </Button>
            </div>
            </Col>
                 </>
            }
          </div>
        </ModalBody>
      </Modal>
</div>
  )}

export default ValidationThirdPartyComponents;