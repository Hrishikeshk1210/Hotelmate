// ** React Imports
import { useRef, useState } from "react";
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  CardBody,
} from "reactstrap";

// ** Custom Components
import Wizard from "@components/wizard";

// // ** Steps
import BasicDetails from "./basicDetails";
import IDDetails from "./idDetails";
import MembershipDetails from "./membershipDetails";
import History from "./history";
// import CardDetails from "./cardDetails"
// import Preference from './preference'

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import { Card } from "reactstrap";

import { AgGridReact } from "ag-grid-react";

import "/node_modules/ag-grid-community/styles/ag-grid.css";
import "/node_modules/ag-grid-community/styles/ag-theme-alpine.css";

import { useEffect, useMemo, useCallback } from "react";
import { Input, Form, Row, Col } from 'reactstrap'


const WizardModern = () => {
  // console.log(data1)

  // AGgrid
  // const [rowData, setRowData] = useState();
  const [filldata, setfilldata] = useState({});
  const [autofill, setautofill] = useState(false);
  const [editable, seteditable] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [enableEditBtn, setenableEditBtn] = useState(true);
  // const gridRef = useRef();

  const [show, actionButton] = useState(false);
  const [showEdit, editButton] = useState(false);

  const [rowData, setRowData] = useState();

  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    // { headerName: 'Salutation', field: 'salutation', suppressSizeToFit: true, maxWidth:190 },
    // { headerName: 'Name', field: 'name', suppressSizeToFit: true, maxWidth: 160 },

    {headerName: "Name", field: "fullName",  valueGetter(params) {return params.data.salutation + " " + params.data.name;},
      suppressMenu: true, suppressSizeToFit: true, maxWidth: 120,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}},
    {headerName: "Email", field: "email", suppressSizeToFit: true, maxWidth: 220,cellStyle: {'text-align': 'center','background-color': 'pink'}    },
    {headerName: "Phone Number", field: "phoneNumber", suppressSizeToFit: true, maxWidth: 120,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}    },
    { headerName: "Company",field: "accountName",suppressSizeToFit: true, maxWidth: 120,cellStyle: {'text-align': 'center','background-color': 'pink'}},
    {  headerName: "GST ID ", field: "gstID", suppressSizeToFit: true, maxWidth: 110,cellStyle: {'text-align': 'center','background-color': '#F1E39B'} },
    { headerName: "Nationality",      field: "nationality", suppressSizeToFit: true, maxWidth: 90,cellStyle: {'text-align': 'center','background-color': 'pink'}  },
    { headerName: "DOB ",  field: "dob",suppressSizeToFit: true, maxWidth: 110,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}    },
    {headerName: "Address One",field: "addressOne",suppressSizeToFit: true,  maxWidth: 160,cellStyle: {'text-align': 'center','background-color': 'pink'}  },

    { headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,
      cellRendererFramework: (params) => (
        <Button  color="primary"  onClick={() => {filldata.length != 0 && actionButton(!show); }} >  {" "}  View{" "}
        </Button>
      ),
    },
    // { headerName: 'Action', field: 'numAvlRooms', suppressSizeToFit: true, maxWidth: 140, cellRendererFramework: (params) =>
    //     <Button color='primary' onClick={() => { filldata.length != 0 && editButton(!showEdit) }}> Edit </Button>},
    // { headerName: "vipID",  field: "vipID",  suppressSizeToFit: true, maxWidth: 100,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}   },
    // {
    //   headerName: "Address Two",
    //   field: "addressTwo",
    //   suppressSizeToFit: true,
    //   maxWidth: 160,
    // },
    // {
    //   headerName: "Anniversary",
    //   field: "anniversary",
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "State",
    //   field: "state",
    //   suppressSizeToFit: true,
    //   maxWidth: 160,
    // },
    // {
    //   headerName: "Notes",
    //   field: "notes",
    //   suppressSizeToFit: true,
    //   maxWidth: 160,
    // },
    // {
    //   headerName: "City",
    //   field: "city",
    //   suppressSizeToFit: true,
    //   maxWidth: 160,
    // },
    // {
    //   headerName: "Postal Code",
    //   field: "postalCode",
    //   suppressSizeToFit: true,
    //   maxWidth: 160,
    // },
    // {
    //   headerName: "Guest Preferences",
    //   field: "guestpreferencenotes",
    //   suppressSizeToFit: true,
    //   maxWidth: 160,
    // },
    // {
    //   headerName: "IDType",
    //   field: "idDetails.IDType",
    //   suppressSizeToFit: true,
    //   maxWidth: 160,
    // },
    // {
    //   headerName: "ID Number ",
    //   field: "idDetails.idNumber",
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "ID Issue Date ",
    //   field: "idDetails.issueDate",
    //   suppressSizeToFit: true,
    // },
    // {headerName: "Name",field: "name",suppressSizeToFit: true,maxWidth: 160,},
    // {headerName: "Membership Type",field: "membershipDetails.membershipType", suppressSizeToFit: true, maxWidth: 160, },
    // { headerName: "Membership No",field: "membershipDetails.membershipNo", suppressSizeToFit: true,    },
    // {headerName: "Membership Since", field: "membershipDetails.membershipSince",suppressSizeToFit: true,maxWidth: 160,    },
    // { headerName: "Membership level", field: "membershipDetails.membershipLevel",  suppressSizeToFit: true, },
    // { headerName: 'Expiry Date', field: 'membershipDetails.expiryDate', suppressSizeToFit: true, maxWidth: 160 },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  useEffect(() => {
    fetch("http://192.168.1.33:14700/getGuestProfileNew?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
    console.log(event["data"]);
    setfilldata(event["data"])
    console.log(event["rowIndex"]);
  }, []);
  
  console.log(filldata['membershipDetails']);


  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const [basicModal, setBasicModal] = useState(false);

  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "basicDetails",
      title: "Basic Details",
      subtitle: "Enter Your Basic Details.",
      // icon: <FileText size={18} />,
      content: (
        <BasicDetails data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "idDetails",
      title: "ID Details",
      subtitle: "Add ID Details",
      // icon: <User size={18} />,
      content: (
        <IDDetails data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "membershipDetails",
      title: "Membership Details",
      subtitle: "Enter Membership Details",
      // icon: <MapPin size={18} />,
      content: (
        <MembershipDetails
          data1={filldata}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "history",
      title: "History Details",
      subtitle: "view Details",
      // icon: <MapPin size={18} />,
      content: (
        <History data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    // {
    //   id: 'cardDetails',
    //   title: 'Card Details',
    //   subtitle: 'Enter Card Details',
    //   // icon: <Link size={18} />,
    //   content: <CardDetails stepper={stepper} type='wizard-modern' />
    // }
    // {
    //   id: 'preference',
    //   title: 'Guest Prefernces',
    //   subtitle: 'Enter Prefernces Details',
    //   // icon: <Link size={18} />,
    //   content: <Preference stepper={stepper} type='wizard-modern' />
    // }
  ];

  return (
    <div>
      <div>
        <div className="basic-modal">
          <Button
            color="primary"
            // style={{ marginLeft: "auto" }}
            // outline
            onClick={() => setBasicModal(!basicModal)}>
            Create New Profile
          </Button>
          <br></br>
          <Modal
            isOpen={basicModal}
            toggle={() => setBasicModal(!basicModal)}
            className="modal-xl"
          >
            <ModalHeader toggle={() => setBasicModal(!basicModal)}>
              Basic Modal
            </ModalHeader>
            <ModalBody>
              <div className="modern-horizontal-wizard">
                <Wizard
                  type="modern-horizontal"
                  ref={ref}
                  steps={steps}
                  options={{
                    linear: false,
                  }}
                  instance={(el) => setStepper(el)}
                />
              </div>
              {/* <h1>Salutation: {data1['salutation']}</h1> */}
            </ModalBody>
            {/* <ModalFooter>
            <Button color='primary' onClick={() => setBasicModal(!basicModal)}>
              Accept
            </Button>
          </ModalFooter> */}
          </Modal>
        </div>
      </div>

      <div>
        <Card>
          <br></br>
          <br></br>
          <div className="ag-theme-alpine" style={{ height: 540 }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              animateRows={true}
              rowSelection="multiple"
              onCellClicked={cellClickedListener}
              // paginationAutoPageSize = 'true'
              paginationPageSize="10"
              pagination="true"
              defaultColDef={defaultColDef}
              headerColor="ddw-primary"
            />
          </div>
        </Card>
      </div>

      <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
            className="modal-xl"
          >
            <ModalHeader toggle={() => editButton(!showEdit)}>
              {" "}
              Welcome...{" "}
            </ModalHeader>
            <ModalBody>
              <Card>
                <div className="modern-horizontal-wizard">
                  <Wizard
                    type="modern-horizontal"
                    ref={ref}
                    steps={steps}
                    options={{
                      linear: false,
                    }}
                    instance={(el) => setStepper(el)}
                  />
                </div>
                {/* <h1>Salutation: {filldata['salutation']}</h1> */}
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => setDisabledModal(!disabledModal)}
              >
                Continue
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Card>

      <Card>
        <Modal isOpen={show} toggle={() => actionButton(!show)} className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}>
            {" "}
            Welcome...{" "}
          </ModalHeader>
          <ModalBody>
            <Card>
              <div className="d-flex">
                <Button
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                  color="primary"
                  onClick={() => {
                    filldata.length != 0 && editButton(!showEdit);
                  }}
                >
                  Edit
                </Button>
              </div>
              <Card> 
                <CardBody>

                  <Row>
                    <Col>
                    <div>
                    <h5>
                      <b> Basic Details </b>
                    </h5>
                    <br></br>
                    <h6>Salutation :      <b> {filldata["salutation"]} </b></h6>
                    <h6>Name: <b>{filldata["name"]} </b></h6>
                    <h6>Email: <b>{filldata["email"]}</b>  </h6>
                    <h6>Phone Number: <b> {filldata["phoneNumber"]}</b> </h6>
                    <h6>GST ID: <b>{filldata["gstID"]}</b> </h6>
                    <h6>Nationality: <b> {filldata["nationality"]}</b> </h6>
                    <h6>DOB: <b> {filldata["dob"]}</b></h6>
                    {/* <h6>Notes:<b>{filldata["notes"]} </b> </h6>
                    <h6> Guest Preference Notes: <b>{filldata["guestpreferencenotes"]} </b> </h6>
                    <h6>VIP ID :<b>{filldata["vipID"]} </b> </h6> */}
                  </div>
                    
                    </Col>
                  
                  <Col>
                  <div >
                    <h5>
                      <b> Address Details</b>
                    </h5>
                    <br></br>

                    <h6>Address One:      <b>{filldata["addressOne"]}</b> </h6>
                    <h6>Address Two:      <b>{filldata["addressTwo"]}</b> </h6>
                    <h6>Anniversary Date: <b>{filldata["anniversary"]}</b> </h6>
                    <h6>Company ID:       <b>{filldata["companyID"]}</b> </h6>
                    <h6>Country:          <b>{filldata["country"]}</b> </h6>
                    <h6>State:            <b>{filldata["state"]}</b> </h6>
                    <h6>City:             <b>{filldata["city"]}</b> </h6>
                    <h6>PostalCode:       <b>{filldata["postalCode"]}</b> </h6>
                  </div>                  
                  </Col>

                 </Row>
                 <br></br>
                 <Row>
                    {/* <Col>
                    <div>
                    <h5>
                      <b> Membership Details</b>
                    </h5>
                    <br></br>
                    {console.log(filldata.membershipDetails.membershipNo)}
                    <h6> Membership Type: {filldata["membershipDetails"]["membershipType"]}</h6>
                    <h6> Membership Number: {filldata['membetshipDetails']}</h6>
                    <h6> Membership Level: {filldata["level"]}</h6>
                    <h6> Membership Since: {filldata["membershipSince"]}</h6>
                    <h6> Membership Expiry: {filldata["expiryDate"]}</h6>
                  </div>
                    
                    </Col> */}

                  </Row>
                  

                </CardBody>
              </Card>

             
              {/* <h6> ID Type: {filldata['data.idDetails.IDType']}</h6>
              <h6> ID Number: {filldata['idNumber']}</h6>
              <h6> Expiry Date: {filldata['expiryDate']}</h6>
              */}
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setDisabledModal(!disabledModal)}
            >
              Continue
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
    </div>
  );
};

export default WizardModern;
