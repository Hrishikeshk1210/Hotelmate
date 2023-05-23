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

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem,
  Input, Card, Form, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Row, Col
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
// AG Grid
import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import Moment from 'moment';


import VisaDetails from "./visaDetails";
import MembershipDetails from "./membershipDetails";
import BasicDetails from "./basicDetails"
import IDDetails from "./idDetails"


const id = '1';



let companyname = []
fetch('http://localhost:14700/companyName?hotelID=1')
  .then(result => result.json())
  .then(resp => {
    // console.log(resp['data'])
    companyname = resp['data']
    // console.log(companyname)
  })



const defaultValues = {
  // hotelID: "", 
  lastRateID: null,
  lastRoomID: null,
  negotiated: null,
};

const Extras = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Tax Name', field: 'taxName', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Tax Code', field: 'taxCode', suppressSizeToFit: true },
    { headerName: 'Applies From', field: 'appliesFrom', suppressSizeToFit: true },
    { headerName: 'Exempt After', field: 'exemptAfter', suppressSizeToFit: true },
    { headerName: 'Posting Type', field: 'postingType' },
    { headerName: 'Amount', field: 'Amount' },
    { headerName: 'Apply On Pax', field: 'applyOnPax', suppressSizeToFit: true },
    { headerName: 'Tax Percentage', field: 'taxPercentage' },
    { headerName: 'No OF Slabs', field: 'noOfSlabs' },
    { headerName: 'Apply Tax', field: 'applyTax' },
    { headerName: 'Apply Tax On Rack Rate', field: 'applyTaxOnRackRate' },
    { headerName: 'Note', field: 'note' },
    { headerName: 'Is Active', field: 'isActive' },
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
    fetch('http://localhost:14700/getTax?hotelID=' + id)
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
        console.log(rowData['data'])
      })
  }, []);

  const [selectedValue, setSelectedOption] = useState('');

  // const handleDropdownChange = (event) => {
  //   setSelectedOption(event.value);
  //   console.log("hii")
  //   console.log(event.value)
  // }


  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);

    console.log(event.value); // print the selected value to console
    if (selectedValue == 'flatAmount') {
      console.log("hi")
      //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else if (selectedValue == 'flatPercentage') {
      console.log("hi")
      //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else if (selectedValue == 'Slab') {
      console.log("hi")
      //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else {

      //         setitemOptions({ value: "0", label: "InActive" })
    }
  };




  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues });

  const [showDropdown, setShowDropdown] = useState(false);

  function handleRadioChange(event) {
    if (event.target.value === 'corporate') {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }




  const onSubmit = (data) => {
    setData(data);
    data['postingType'] = selectedValue
    console.log(data)
    if (

      data.firstNameBasic.length &&
      data.lastNameBasic !== null &&
      data.idType !== null &&
      data.phoneNumber.length &&
      // data.hotelID !== null &&
      data.taxName !== null &&
      data.taxCode !== null &&
      data.appliesFrom !== null &&
      data.exemptAfter !== null &&
      data.postingType !== null &&
      data.amount !== null &&
      data.applyOnPax !== null &&
      data.taxPercentage !== null &&
      data.noOFSlabs !== null &&
      data.applyTax !== null &&
      data.applyTaxOnRackRate !== null &&
      data.note !== null &&
      data.isActive !== null

    ) {
      console.log(data);
      let createExtra = JSON.stringify({
        // "hotelID": data.hotelID,
       
        "state": data.state.value,
        "postalCode": data.postalcode,
        "GSTNumber": data.gst,

      });
      console.log(createExtra);
      let res = fetch("http://localhost:14700/addTax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createExtra,
      }).then((res) => {
        console.log(res);
        if (res['status'] == 200) {
          fetch('http://localhost:14700/getTax?hotelID=1')
            .then(result => result.json())
            .then(rowData => {
              setRowData(rowData['data'])
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
            <h4>Tax Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
       // hotelID: "", 
  lastRateID: null,
 
    });
  };


  const [message, setValue] = useState('');





  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Guest Profile</CardTitle>
        </CardHeader>
      </Card>

      <UncontrolledAccordion>
        <AccordionItem >
          <AccordionHeader targetId='1'>Basic Details</AccordionHeader>
          <AccordionBody accordionId='1'>
            <BasicDetails />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem >
          <AccordionHeader targetId='2'>ID Details </AccordionHeader>
          <AccordionBody accordionId='2'>
            <IDDetails/>
          </AccordionBody>
        </AccordionItem>        

        <AccordionItem>
          <AccordionHeader targetId='3'>Membership Details </AccordionHeader>
          <AccordionBody accordionId='3'>
            <MembershipDetails />
          </AccordionBody>
        </AccordionItem>


      </UncontrolledAccordion>




      {/* <Card>        
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>

            </div>
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                Submit
              </Button>
              <Button  outline  color="secondary" type="reset" onClick={handleReset} >
                Reset
              </Button>
            </div>

          </Form>
        </CardBody>
      </Card> */}
      <Card>
        {/* <div className="ag-theme-alpine" style={{ height: 520 }}>
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
        </div> */}
      </Card>
      {/* <App/> */}
    </div>
  );
};

export default Extras;
