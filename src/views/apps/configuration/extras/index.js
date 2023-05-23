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
import App from "./extrasDataTable";


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
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const id = '1';

const typeOptions = [
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Amount', label: 'Amount' },
  { value: 'Pieces', label: 'Pieces' },
  { value: 'Trips', label: 'Trips' },
]

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];




let groupID = [
  fetch('http://192.168.1.33:14700/getforeignkeygroupid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      groupID = resp['data']
      console.log(groupID)
    })
  ]

  let subGroupID = [
    fetch('http://192.168.1.33:14700/getforeignkeysubgroup?hotelID=1')
      .then(result => result.json())
      .then(resp => {
        // console.log(resp['data'])
        subGroupID = resp['data']
        console.log(subGroupID)
      })
    ]


const defaultValues = {
  // hotelID: "",
      extraCode: '',
      description: "",
      groupID: null,
      subGroupID: null,
      remarks: "",
      type: null,
      percentage: "",
      amount: "",
      pieces: '',
      trips: "",
      isActive: null
};

const Extras = () => {
  const [open, setOpen] = useState('')
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const [selectedValue, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);

    console.log(event.value); // print the selected value to console
    if (selectedValue == 'Percentage') {
        console.log("hi")
        //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else if (selectedValue == 'Amount') {
        console.log("hi")
        //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else if (selectedValue == 'Pieces') {
      console.log("hi")
      //         setitemOptions([{ value: "1", label: "Active" }]) 
  }
    else if (selectedValue == 'Trips') {
        console.log("hi")
        //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else  {
        
        //         setitemOptions({ value: "0", label: "InActive" })
    }
};

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Extra Code',field: 'extraCode',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Description',field: 'description',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
    {headerName: 'Group ID',field: 'groupCode',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Sub-Group ID',field: 'subGroup',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
    // {headerName: 'Remarks',field: 'remarks',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Type',field: 'type',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    // {headerName: 'Percentage',field: 'percentage'},
    // {headerName: 'Amount',field: 'amount'},
    // {headerName: 'Pieces',field: 'pieces'},
    // {headerName: 'Trips',field: 'trips'},
    {headerName: 'Is Active',field: 'isActive',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
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
    fetch('http://192.168.1.33:14700/getextra?hotelID='+id)
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
    console.log(selectedValue)
    data['type']=selectedValue
    console.log(data)
    console.log(data.type)
    if (
      // data.hotelID !== null &&
      data.extraCode !== null &&
      data.description !== null &&
      data.groupID!==null &&
      data.subGroupID!==null &&
      data.remarks !== null &&
      data.type !== null &&
      data.percentage !== null &&
      data.amount !== null &&
      data.pieces !== null &&
      data.trips !== null &&
      data.isActive !== null

    ) {
      console.log(data);
      let createExtra = JSON.stringify({
        // "hotelID": data.hotelID,
        "extraCode": data.extraCode,
        "description": data.description,
        "groupID": data.groupID.value,
        "subGroupID": data.subGroupID.value,
        "remarks": data.remarks,
        "type": data.type,
        "percentage": data.percentage,
        "amount": data.amount,
        "pieces": data.pieces,
        "trips": data.trips,
        "isActive": data.isActive.value,
      });
      console.log(createExtra);

      let res = fetch("http://192.168.1.33:14700/addextra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createExtra,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/getextra?hotelID='+id)
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
            <h4>Extras Added Successfull</h4>
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
      extraCode: '',
      description: "",
      groupID: null,
      subGroupID: null,
      remarks: "",
      type: null  ,
      percentage: "",
      amount: "",
      pieces: '',
      trips: "",
      isActive: null
    });
  };  

  return (
    <div>
       <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Extras </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag="h4">Extras</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>       
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
             
            <Label className='form-label' for='extraCode'>
              Extra Code
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='extraCode'
              name='extraCode'
              render={({ field }) => <Input required placeholder="Extra Code" className={classnames({
                "is-invalid": data !== null && (data.extraCode === null || !data.extraCode.length)
              })} {...field}/>}
            />
            </InputGroup>
            
          </div>
          </Col>
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='description'>
              Description
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='description'
              name='description'
              render={({ field }) => <Input required placeholder="Description" className={classnames({
                "is-invalid": data !== null && (data.description === null || !data.description.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="groupID">
            Group ID
            </Label>
            <Controller
                  id='groupID'
                  control={control}
                  name='groupID'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={groupID}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.groupID === null })}
                      {...field}
                    />
                  )}
                />
          </div>
          </Col>
          <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="subGroupID">
            Sub Group ID
            </Label>
            <Controller
                  id='subGroupID'
                  control={control}
                  name='subGroupID'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={subGroupID}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.subGroupID === null })}
                      {...field}
                    />
                  )}
                />
          </div>
          </Col>
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='remarks'>
              Remarks
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='remarks'
              name='remarks'
              render={({ field }) => <Input placeholder="Remarks" className={classnames({
                "is-invalid": data !== null && (data.remarks === null || !data.remarks.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>

          {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="type">
              Type
            </Label>
            <Controller
              id="type"
              control={control}
              name="type"
              render={({...field}) => (
                <Select
                isClearable
                options={typeOptions}
                classNamePrefix='select'
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.type === null })}
                {...field}
              />
              )}
            />
          </div>
          </Col> */}
          <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="type">
            type
            </Label>
            <Controller
                  id='type'
                  control={control}
                  name='type'
                  render={({ field }) => (
                    <Select
                      name="type"
                      className="react-select"
                      options={typeOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      // className={classnames('react-select', { 'is-invalid': data !== null && data.type === null })}
                      
                      isClearable
                      onChange={handleDropdownChange}
                      
                    />
                  )}
                />
          </div>
          </Col>
          {selectedValue === 'Percentage' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="percentage">
             Percentage
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.percentage === null || !data.percentage.length)
                })}
              ></InputGroupText>
              <Controller
                id="percentage"
                name="percentage"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers"
                  placeholder="Percentage"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.percentage === null || !data.percentage.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          {selectedValue === 'Amount' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='amount'>
            Amount
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.amount=== null || !data.amount.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='amount'
                name='amount'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers"
                  placeholder='Amount'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.amount === null || !data.amount.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          {selectedValue === 'Pieces' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='pieces'>
            Pieces
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.pieces=== null || !data.pieces.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='pieces'
                name='pieces'
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder='Pieces'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.pieces === null || !data.pieces.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          {selectedValue === 'Trips' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='trips'>
            Trips
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.trips=== null || !data.trips.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='trips'
                name='trips'
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder='Trips'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.trips === null || !data.trips.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          
          <Col md='3' sm='12' className='mb-1'>
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
          </Row>
        </Form>
      </CardBody>
    </Card>
        </AccordionBody>
      </AccordionItem>
      </Accordion>
</div>

    <br></br>
    <div>
    <Card>
    <div className="ag-theme-alpine" style={{ height: 540}}>
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
    </Card>
    </div>    
    </div>
  );
};

export default Extras;
