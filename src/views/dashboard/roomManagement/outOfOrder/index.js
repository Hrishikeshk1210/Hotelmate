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
// import App from "./roomTypeDataTable";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

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
  Col
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
const id = '1';

const roomTypeOptions = [
  { value: "KSUP", label: "KSUP" },
  { value: "TSUP", label: "TSUP" },
  { value: "KDLX", label: "KDLX" },
  { value: "TDLX", label: "TDLX" },
  { value: "KCLB", label: "KCLB" },
  { value: "PM", label: "PM" },
  { value: "TCLB", label: "TCLB" },
  { value: "EXE", label: "EXE" },
];



const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
  // hotelID: "",
      roomType: "",
      maxAdults: "",
      maxChildren: "",
      totalNumOfRooms: "",
      isActive: null,
      roomClassID: null,
}


let roomClassID = [
  fetch('http://192.168.1.33:14700/getroomtyperoomclassid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      roomClassID = resp['data']
      console.log(roomClassID)
    })
  ]

  

const RoomType = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Room Type',field: 'roomType'},
    {headerName: 'Maximum Adults',field: 'maxAdults'},
    {headerName: 'Mximum Children',field: 'maxChildren'},
    {headerName: 'Total Number Of Rooms',field: 'totalNumOfRooms'},
    {headerName: 'Is Active',field: 'isActive'},
    {headerName: 'Room ClassID	',field: 'roomClassID'},

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
    fetch('http://192.168.1.33:14700/getroomtype?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  }, []);

  // ** State
  const [data, setData] = useState(null);
    const [value, setValue] = useState('')


  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (
      // data.hotelID !== null &&
      data.roomType !== null &&
      data.maxAdults !== null &&
      data.maxChildren!==null &&
      data.totalNumOfRooms!==null &&
      data.isActive !== null &&
      data.roomClassID !== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "roomType": data.roomType,
        "maxAdults": data.maxAdults,
        "maxChildren": data.maxChildren,
        "totalNumOfRooms": data.totalNumOfRooms,
        "isActive": data.isActive.value,
        "roomClassID": data.roomClassID.value,
        
      });
      console.log(createasset);
      let res = fetch("http://192.168.1.33:14700/addroomtype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/getroomtype?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          console.log(rowData['data'])
        })
        }
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
           <h4>Room Type Submitted Successfull</h4>
          </div>
        </div>
      );
    }
  };


  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    reset({
      // hotelID: "",
      roomType: "",
      maxAdults: "",
      maxChildren: "",
      totalNumOfRooms: "",
      isActive: null,
      roomClassID: null,
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Room Type</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="hotelID">
              Hotel ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="hotelID"
                name="hotelID"
                control={control}
                placeholder="hotel ID"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.hotelID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}
                 {/* <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </form> */}

          <Col  md='4' sm='12'>
          <div >
            <Label className="form-label" for="roomType">
            Room Type
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
                id='roomType'
                name='roomType'
                control={control}
                placeholder='roomType'
                render={({ field }) =>  <Input placeholder="Room Type" pattern="[1-9]" title="Type Only Numbers" required className={classnames({
                  "is-invalid": data !== null && (data.roomType === null || !data.roomType.length)
                })} {...field}/>}
                 
                
              />
            </InputGroup>
          </div>
          </Col>
        
         
          <Col  md='4' sm='12'>
          <div className="mb-1">
            <Label className="form-label" for="maxAdults">
              Maximum Adults
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
                id='maxAdults'
                name='maxAdults'
                control={control}
                placeholder='maxAdults'
                render={({ field }) =>
                <Input placeholder="Maximum Adults"pattern="[0-9]*" title="Type Only Numbers" required className={classnames({
                  "is-invalid": data !== null && (data.maxAdults === null || !data.maxAdults.length)
                })} {...field}/>}
                
              />
            </InputGroup>
          </div>
          </Col>
          <Col  md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='maxChildren'>
              Maximum Childrens
            </Label>
            <InputGroup className='input-group-merge'>
              <Controller
                id='maxChildren'
                name='maxChildren'
                control={control}
                
                render={({ field }) => (
                  <Input
                  pattern="[0-9]*" title="Type Only Numbers" required
                  placeholder='Maximum Children'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.maxChildren === null || !data.maxChildren.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='totalNumOfRooms'>
            Total Number Of Rooms
            </Label>
            <InputGroup className='input-group-merge'>
             
              <Controller
                id='totalNumOfRooms'
                name='totalNumOfRooms'
                control={control}

                render={({ field }) => (
                  <Input
                  pattern="[0-9]*" title="Type Only Numbers" required
                  placeholder='total Number Of Rooms'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.totalNumOfRooms=== null || !data.totalNumOfRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='4' sm='12'>
          <div className="mb-1">
            <Label className="form-label" for="isActive">
              Is Active
            </Label>
            <Controller
              id="isActive"
              control={control}
              name="isActive"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={activeoptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.isActive === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='roomClassID'>
            Room Class ID
            </Label>
            <Controller
              id="roomClassID"
              control={control}
              name="roomClassID"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={roomClassID}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.roomClassID === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
            <Button
              outline
              color="secondary"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
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

export default RoomType;
