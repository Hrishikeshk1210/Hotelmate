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
import App from "./transactionCodeDataTable";

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
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const id = '1';

const isAllowanceOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const discountAllowedOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
  
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
  // hotelID: "",
      transactionCode: "",
      description: "",
      groupID: null,
      subGroupID: null,
      baseRate	: "",
      taxPercentage: null,
      discountAllowed: null,
      isAllowance: null,
      isActive: null,
      allowanceCodeID: "",
};


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

    let taxPercentage = [
      fetch('http://192.168.1.33:14700/gettransactioncodetaxpercentage?hotelID=1')
        .then(result => result.json())
        .then(resp => {
          // console.log(resp['data'])
          taxPercentage = resp['data']
          console.log(taxPercentage)
        })
      ]


const TransactionCode = () => {
  const [open, setOpen] = useState('')
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  let json = {transactionCode:12}

  // AG Grid
  const [rowData, setRowData] = useState();
  const [filldata,setfilldata] = useState({transactionCode:''});
  const [autofill,setautofill] = useState(false);
  const [editable,seteditable] = useState(false);
  const [showForm,setShowForm] = useState(true);
  const [enableEditBtn,setenableEditBtn] = useState(true)
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Transaction Code',field: 'transactionCode',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 180 },
    {headerName: 'Description',field: 'description',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 180 },
    {headerName: 'Group',field: 'groupCode',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Sub Group',field: 'subGroup',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
    // {headerName: 'Base Rate',field: 'baseRate'},
    // {headerName: 'taxPercentage',field: 'taxPercentage',suppressSizeToFit: true},
    // {headerName: 'discountAllowed',field: 'discountAllowed'},
    // {headerName: 'isAllowance',field: 'isAllowance'},
    // {headerName: 'isActive',field: 'isActive'},
    // {headerName: 'allowanceCodeID',field: 'allowanceCodeID'},
    // {headerName: 'isAllowance',field: 'isAllowance'},
    // {headerName: 'isActive',field: 'isActive'},
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
    console.log(event['data'])
    console.log(event['rowIndex'])
    fetch('http://192.168.1.33:14700/gettransactioncode?hotelID='+id)
    .then(result => result.json()) 
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    setfilldata(rowData['data'][event['rowIndex']])
    console.log(filldata)
    })
    setautofill(true)
    setShowForm(false)
    seteditable(true)
    setTimeout(()=>{
      setShowForm(true)
    },200)
    setenableEditBtn(false)
    
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/gettransactioncode?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  }, []); 

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    console.log(data.taxPercentage.length)
    console.log(taxPercentage[1])
    if(data.taxPercentage.length==2){
       for(let i=0;i<2;i++){
        let createasset = JSON.stringify({
          // "hotelID": data.hotelID,
          
          "taxPercentage": data.taxPercentage.value,
          
        });
        console.log(createasset);
        let res = fetch("http://192.168.1.33:14700/addtransactioncode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: createasset,
        }).then((res) => {
          console.log(res);
          if(res['status']==200){
            fetch('http://192.168.1.33:14700/gettransactioncode?hotelID='+id)
            .then(result => result.json())
            .then(rowData => {setRowData(rowData['data'])
            console.log(rowData['data'])
            console.log(rowData['data'][0])
          })
          }
        });
       }
    }
    else{

    }
    if (
      // data.hotelID !== null &&
      data.transactionCode !== null &&
      data.description !== null &&
      data.groupID!==null &&
      data.subGroupID!==null &&
      data.baseRate !== null &&
      data.taxPercentage !== null &&
      data.discountAllowed !== null &&
      data.isAllowance !== null &&
      data.isActive !== null &&
      data.allowanceCodeID !== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "transactionCode": data.transactionCode,
        "description": data.description,
        "groupID": data.groupID.value,
        "subGroupID": data.subGroupID.value,
        "baseRate": data.baseRate,
        "taxPercentage": data.taxPercentage.value,
        "discountAllowed": data.discountAllowed.value,
        "isAllowance": data.isAllowance.value,
        "isActive": data.isActive.value,
        "allowanceCodeID": data.allowanceCodeID,
      });
      console.log(createasset);
      let res = fetch("http://192.168.1.33:14700/addtransactioncode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetch('http://192.168.1.33:14700/gettransactioncode?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])

          if(data.taxPercentage.length >= 1){
            console.log(data.taxPercentage.length)
            // setTimeout(() => {            
            for(let i=0;i<data.taxPercentage.length;i++){
              console.log(data.taxPercentage[i].value)
              console.log(rowData)
              console.log(rowData.length)
              console.log(rowData['data'])

              console.log(rowData['data'][0]['id'])

             let createtax = JSON.stringify({
               // "hotelID": data.hotelID,
               "transactionCodeID": rowData['data'][0]['id'],
               "taxID": data.taxPercentage[i].value
               
             });
             console.log(createtax)
             let res = fetch("http://192.168.1.33:14700/addtransactioncodetaxes", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: createtax,
                }).then((res) => {
                  console.log(res);
                })
  
          }
        // }, 5000);
        }
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
          <h4>Transaction Code Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      transactionCode: "",
      description: "",
      groupID: null,
      subGroupID: null,
      baseRate	: "",
      taxPercentage: null,
      discountAllowed: null,
      isAllowance: null,
      isActive: null,
      allowanceCodeID: "",
    });
  };
function EnableEdit(){
  seteditable(false)
  setShowForm(false)
    setTimeout(()=>{
      setShowForm(true)
    },100)
}
  function InputForm(){
    return(
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
    
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="transactionCode">
        Transaction Code
        </Label>
        <InputGroup className="input-group-merge">

          <Controller
            id="transactionCode"
            name="transactionCode"
            control={control}
            
            render={({ field }) => (
              <Cleave
              // value={243}
              placeholder="Transaction Code"
              disabled={editable}
              pattern="[0-9]*" title="Type Only Numbers" required
                {...field}
                className={classnames("form-control", {
                  "is-invalid":
                    data !== null && (data.transactionCode === null || !data.transactionCode.length)
                })}
                value={filldata['transactionCode']}
              />
            )}
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
          render={({ field }) => <Input placeholder="Description" className={classnames({
            "is-invalid": data !== null && (data.description === null || !data.description.length)
          })} {...field}
          value={filldata['description']}/>}
        />
        </InputGroup>
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="groupID">
        Group
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
        Sub Group
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
      <div className="mb-1">
        <Label className="form-label" for="baseRate">
        Base Rate
        </Label>
        <InputGroup className="input-group-merge">
   
          <Controller
            id="baseRate"
            name="baseRate"
            control={control}
            render={({ field }) => (
              <Cleave
              placeholder="Base Rate"
              pattern="[0-9]*" title="Type Only Numbers" 
                {...field}
                className={classnames("form-control", {
                  "is-invalid":
                    data !== null && (data.baseRate === null || !data.baseRate.length)
                })}
              />
            )}
          />
        </InputGroup>
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className='mb-1'>
        <Label className='form-label' for='taxPercentage'>
        Tax Code
        </Label>
        <Controller
              id='taxPercentage'
              control={control}
              name='taxPercentage'
              render={({ field }) => (
                <Select
                isMulti
                  isClearable
                  options={taxPercentage}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.taxPercentage === null })}
                  {...field}
                />
              )}
            />
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="discountAllowed">
          Discount Allowed
        </Label>
        <Controller
          id="discountAllowed"
          control={control}
          name="discountAllowed"
          render={({ field }) => (
            <Select
            required
              isClearable
              options={discountAllowedOptions}
              classNamePrefix="select"
              theme={selectThemeColors}
              className={classnames("react-select", {
                "is-invalid": data !== null && data.discountAllowed === null,
              })}
              {...field}
            />
          )}
        />
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="isAllowance">
          Is Allowance
        </Label>
        <Controller
          id="isAllowance"
          control={control}
          name="isAllowance"
          render={({ field }) => (
            <Select
            required
              isClearable
              options={isAllowanceOptions}
              classNamePrefix="select"
              theme={selectThemeColors}
              className={classnames("react-select", {
                "is-invalid": data !== null && data.isAllowance === null,
              })}
              {...field}
            />
          )}
        />
      </div>
      </Col>
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
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="city">
          Allowance Code
        </Label>
        <InputGroup className="input-group-merge">
   
          <Controller
            id="allowanceCodeID"
            name="allowanceCodeID"
            control={control}
            render={({ field }) => (
              <Cleave
              placeholder="Allowance Code ID"
              pattern="[0-9]*" title="Type Only Numbers" 
                {...field}
                className={classnames("form-control", {
                  "is-invalid":
                    data !== null && (data.allowanceCodeID === null || !data.allowanceCodeID.length)
                })}
              />
            )}
          />
        </InputGroup>
      </div>
      </Col>
      {/* <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="commissionOrServiceChargePercentage">
          Commission / Service Charge Percentage
        </Label>
        <InputGroup className="input-group-merge">
          <InputGroupText
            className={classnames({
              "is-invalid": data !== null && (data.commissionOrServiceChargePercentage === null || !data.commissionOrServiceChargePercentage.length)
            })}
          ></InputGroupText>
          <Controller
            id="commissionOrServiceChargePercentage"
            name="commissionOrServiceChargePercentage"
            control={control}
            render={({ field }) => (
              <Cleave
              placeholder="Commission / Service Charge Percentage"
              pattern="[0-9]*" title="Type Only Numbers" required
                {...field}
                className={classnames("form-control", {
                  "is-invalid":
                    data !== null && (data.commissionOrServiceChargePercentage === null || !data.commissionOrServiceChargePercentage.length)
                })}
              />
            )}
          />
        </InputGroup>
      </div>
      </Col> */}
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
    )
  }
  return (
    <div>

    <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Transaction Code </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag="h4">Transaction Code</CardTitle>
      </CardHeader>
      <CardBody>
        <Button.Ripple color='warning' disabled = {enableEditBtn} size='sm' onClick={EnableEdit}>Edit</Button.Ripple>
        {showForm && <InputForm/>}
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

export default TransactionCode;
