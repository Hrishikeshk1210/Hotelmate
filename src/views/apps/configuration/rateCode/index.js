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
} from "reactstrap";

// ** Custom Components
import Wizard from "@components/wizard";

// // ** Steps
import RateCode from "./rateCode";
// import RateDetails from "./rateDetails"
import RateCodeRoomRate from "./rateCodeRoomRate";
// import CardDetails from "./cardDetails"
// import AccountDetails from './steps/AccountDetails'

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import { Card } from "reactstrap";

import { AgGridReact } from "ag-grid-react";

import "/node_modules/ag-grid-community/styles/ag-grid.css";
import "/node_modules/ag-grid-community/styles/ag-theme-alpine.css";

import { useEffect, useMemo, useCallback } from "react";
import { Input, Form, Row, Col } from "reactstrap";
const WizardModern = () => {
  // console.log(data1)

  // AGgrid
  // const [rowData, setRowData] = useState();
  const [filldata, setfilldata] = useState(" ");
  const [autofill, setautofill] = useState(false);
  const [editable, seteditable] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [enableEditBtn, setenableEditBtn] = useState(true);
  // const gridRef = useRef();

  const [show, actionButton] = useState(false);

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // { headerName: 'Salutation', field: 'salutation', suppressSizeToFit: true, maxWidth:190 },
    {
      headerName: "Rate Code",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 140,
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
    },
    {
      headerName: "Description",
      field: "description",
      suppressSizeToFit: true,
      maxWidth: 140,
      cellStyle: { "text-align": "center", "background-color": "pink" },
    },
    {
      headerName: "Begin Date",
      field: "beginSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
    },
    {
      headerName: "SellDate",
      field: "endSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      cellStyle: { "text-align": "center", "background-color": "pink" },
    },
    {
      headerName: "Days Applicable",
      field: "daysApplicable",
      maxWidth: 140,
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
    },
    {
      headerName: "Action",
      field: "numAvlRooms",
      suppressSizeToFit: true,
      maxWidth: 180,
      cellRendererFramework: (params) => (
        <Button color="primary" onClick={() => actionButton(!show)}>
          {" "}
          View Rates{" "}
        </Button>
      ),
    },
    // { headerName: 'Market ID', field: 'marketID', maxWidth: 140 },
    // { headerName: 'Package ', field: 'packageID', suppressSizeToFit: true, maxWidth: 140 },
    // { headerName: 'RateCategoryID', field: 'rateCategoryID', maxWidth: 140 },
    // { headerName: 'SourceID', field: 'sourceID', maxWidth: 100 },
    // { headerName: 'Tansaction Code ID', field: 'tansactionCodeID', maxWidth: 140 },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
    console.log(event["data"]);
    console.log(event["rowIndex"]);
    // setfilldata(event['data'])
    fetch("http://192.168.1.33:14700/RateCode?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData["data"]);
        console.log(rowData["data"]);
        console.log(rowData["data"][event["rowIndex"]]);
        setfilldata(rowData["data"][event["rowIndex"]]);
        console.log(filldata);
      });
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.33:14700/RateCode?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);

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
      id: "rateCode",
      title: "RateCode",
      subtitle: "Enter Your RateCode Details.",
      // icon: <FileText size={18} />,
      content: (
        <RateCode data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "rateCodeRoomRate",
      title: "Rate Code Room Rate",
      subtitle: "Enter Room Details",
      // icon: <MapPin size={18} />,
      content: <RateCodeRoomRate stepper={stepper} type="wizard-modern" />,
    },
    // {
    //   id: 'rateDetails',
    //   title: 'Rate Details',
    //   subtitle: 'Add Rate Details',
    //   // icon: <User size={18} />,
    //   content: <RateDetails data1={filldata} stepper={stepper} type='wizard-modern' />

    // },
    // {
    //   id: 'rateCodeRoomRate',
    //   title: 'Rate Code Room Rate',
    //   subtitle: 'Enter Room Details',
    //   // icon: <MapPin size={18} />,
    //   content: <RateCodeRoomRate stepper={stepper} type='wizard-modern' />
    // },
    // {
    //   id: 'cardDetails',
    //   title: 'Card Details',
    //   subtitle: 'Enter Card Details',
    //   // icon: <Link size={18} />,
    //   content: <CardDetails stepper={stepper} type='wizard-modern' />
    // }
  ];

  return (
    <div>
      <div>
        <div className="basic-modal">
          <Button align="left" color="primary" onClick={() => setBasicModal(!basicModal)} >
            Create New Rate Code
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
        {/* <Card> */}
        <br></br>
        <br></br>
        <div className="ag-theme-alpine" style={{ height: 540, width: 1200 }}>
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
        {/* </Card> */}
      </div>

      {/* <Card>
        <div className='vertically-centered-modal'>
          <Modal isOpen={show} toggle={() => actionButton(!show)} className='modal-xl'>
            <ModalHeader toggle={() => actionButton(!show)}> Welcome...  </ModalHeader>
            <ModalBody >
              <Card>
                <div className='modern-horizontal-wizard'>
                  <Wizard
                    type='modern-horizontal'
                    ref={ref}
                    steps={steps}
                    options={{
                      linear: false
                    }}
                    instance={el => setStepper(el)}
                  />
                </div>
                <h1>Salutation: {filldata['salutation']}</h1>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={() => setDisabledModal(!disabledModal)}>
                Continue
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Card> */}

      <Card>
        <Modal isOpen={show} toggle={() => actionButton(!show)} className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}>
            {" "}
            Welcome...{" "}
          </ModalHeader>
          <ModalBody>
            <Card>
              <Row>
                <Col>
                  <h5>
                    <b> Rate Code Basic Details </b>
                  </h5>
                  <h6>
                    rateCode: <b>{filldata["rateCode"]}</b>
                  </h6>
                  <h6> Add Accounts:<b> {filldata["addAccounts"]}</b> </h6>
                  <h6> Room Type: <b>{filldata["roomTypeID"]} </b> </h6>
                  <h6> Description: <b> {filldata["description"]}</b>  </h6>
                  <h6>Begin Date:<b>{filldata["beginSellDate"]} </b> </h6>
                  <h6>Sell Date:<b> {filldata["endSellDate"]}</b> </h6>
                </Col>

                <Col>
                  <h5> <b> Rate Code Details </b>  </h5>
                  <h6>MarketCode: <b> {filldata["marketID"]}</b></h6>
                  <h6>Source: <b> {filldata["sourceID"]}</b></h6>
                  
                  <h6>Package : <b>{filldata["packageID"]} </b> </h6>
                  <h6>Transaction Code:<b>{filldata["tansactionCodeID"]} </b> </h6>
                  {/* <h6> PKG Transaction Code:<b> {filldata["packageTransactionCodeID"]} </b> </h6> */}
                  <h6>Day: {filldata["daysApplicable"]}</h6>
                </Col>
              </Row>
<br></br>
              {/* <h6>RateCategory: {filldata['rateCategory']}</h6> */}
              {/* <h6>PrintRate: {filldata["printRate"]}</h6> */}
              {/* <h6>Discount: {filldata["discount"]}</h6> */}
              {/* <h6>DayUse: {filldata["dayUse"]}</h6> */}
              {/* <h6>Complementary: {filldata["complementary"]}</h6> */}
              {/* <h6>HouseUse: {filldata["houseUse"]}</h6> */}
           
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
