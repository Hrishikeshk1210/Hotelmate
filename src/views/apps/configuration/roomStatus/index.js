// ** React Imports
import { useState } from "react";

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
  Card,
  Form,
  Row,
  Col,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Input,
  InputGroupText,
  InputGroup,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
// AG Grid
import { AgGridReact } from "ag-grid-react";
import "/node_modules/ag-grid-community/styles/ag-grid.css";
import "/node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useRef, useEffect, useMemo, useCallback } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const id = "1";

// import App from './datagrid'

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];
const colourOptions = [
  { value: "Smoking", label: "Smoking" },
  { value: "NonSmoking", label: "NonSmoking" },
];

const roomStatus = [
  { value: "Inspected", label: "Inspected" },
  { value: "Dirty", label: "Dirty" },
  { value: "Clean", label: "Clean" },
];

const reservationStatus = [
  { value: "1", label: "Reserved" },
  { value: "0", label: "Not Reserved" },
];

const roomNumber = [
  { value: "101", label: "101" },
  { value: "102", label: "102" },
  { value: "103", label: "103" },
  { value: "104", label: "104" },
  { value: "105", label: "105" },
  { value: "106", label: "106" },
];

const frontOfficeStatus = [
  { value: "Vacant", label: "Vacant" },
  { value: "Occupied", label: "Occupied" },
];

const defaultValues = {
  // hotelID: '',
  roomNumber: "",
  roomStatus: null,
  frontOfficeStatus: null,
  reservationStatus: null,
  isActive: null,
  floorID: null,
  blockID: null,
  smokingType: null,
  roomTypeID: null,
};

let blockID = [
  fetch("http://192.168.1.33:14700/getfloorblockid?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      blockID = resp["data"];
      console.log(blockID);
    }),
];

let floorID = [
  fetch("http://192.168.1.33:14700/getRoomFloorID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      floorID = resp["data"];
      console.log(floorID);
    }),
];

let roomTypeID = [
  fetch("http://192.168.1.33:14700/getRoomRoomTypeID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      roomTypeID = resp["data"];
      console.log(roomTypeID);
    }),
];

const RoomManagement = () => {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  // AG Grid
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {
      headerName: "Room No.",
      field: "roomNumber",
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 125,
    },
    {
      headerName: "Room Status",
      field: "roomStatus",
      cellStyle: { "text-align": "center", "background-color": "pink" },
      maxWidth: 125,
    },
    {
      headerName: "FO Status",
      field: "frontOfficeStatus",
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      suppressSizeToFit: true,
      maxWidth: 125,
    },
    {
      headerName: "Reservation Status",
      field: "reservationStatus",
      cellStyle: { "text-align": "center", "background-color": "pink" },
      maxWidth: 125,
    },
    {
      headerName: "Room Type",
      field: "roomType",
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 125,
    },
    {
      headerName: "Floor ",
      field: "floor",
      cellStyle: { "text-align": "center", "background-color": "pink" },
      maxWidth: 125,
    },

    // {headerName: 'Active Status',field: 'isActive',cellStyle: {'text-align': 'center','background-color': '#F1E39B'},maxWidth: 125 },
    // {headerName: 'Smoking Details',field: 'isSmokingDetails',cellStyle: {'text-align': 'center','background-color': 'pink'},maxWidth: 125 },
    {
      headerName: "Block",
      field: "block",
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 125,
    },
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
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.33:14700/room?hotelID=" + id)
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData["data"]);
        console.log(rowData["data"]);
      });
  }, []);

  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    if (data.floorID !== null && data.blockID !== null) {
      console.log(data);
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        roomNumber: data.roomNumber,
        roomStatus: data.roomStatus.value,
        frontOfficeStatus: data.frontOfficeStatus.value,
        reservationStatus: data.reservationStatus.value,
        isActive: data.isActive.label,
        floorID: data.floorID.value,
        blockID: data.blockID.value,
        isSmokingDetails: data.smokingType.value,
        roomTypeID: data.roomTypeID.value,
      });
      console.log(createmarketGroup);
      let res = fetch("http://192.168.1.33:14700/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      }).then((res) => {
        console.log(res);
        if (res["status"] == 200) {
          fetch("http://192.168.1.33:14700/room?hotelID=" + id)
            .then((result) => result.json())
            .then((rowData) => {
              setRowData(rowData["data"]);
              console.log(rowData["data"]);
            });
        }
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Room Management Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: '',
      roomNumber: "",
      roomStatus: null,
      frontOfficeStatus: null,
      reservationStatus: null,
      isActive: null,
      floorID: null,
      blockID: null,
      smokingType: null,
      roomTypeID: null,
    });
  };

  return (
    <div>
      <div>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>                   
            <AccordionHeader targetId="1">
             
            <h4> <b>Add Room Status </b> </h4> 
            </AccordionHeader>
           
            <AccordionBody accordionId="1">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Room Status</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="roomNumber">
                            Room Number
                          </Label>
                          <InputGroup className="input-group-merge">
                            <Controller
                              id="roomNumber"
                              name="roomNumber"
                              control={control}
                              render={({ field }) => (
                                <Cleave
                                  placeholder="Room Number"
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null &&
                                      (data.roomNumber === null ||
                                        !data.roomNumber.length),
                                  })}
                                />
                              )}
                            />
                          </InputGroup>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="roomStatus">
                            Room Status
                          </Label>
                          <Controller
                            id="roomStatus"
                            control={control}
                            name="roomStatus"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={roomStatus}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null && data.roomStatus === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="frontOfficeStatus">
                            Front Office Status
                          </Label>
                          <Controller
                            id="frontOfficeStatus"
                            control={control}
                            name="frontOfficeStatus"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={frontOfficeStatus}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null &&
                                    data.frontOfficeStatus === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>

                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="reservationStatus">
                            Reservation Status
                          </Label>
                          <Controller
                            id="reservationStatus"
                            control={control}
                            name="reservationStatus"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={reservationStatus}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null &&
                                    data.reservationStatus === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>

                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="isActive">
                            Active Status
                          </Label>
                          <Controller
                            id="isActive"
                            control={control}
                            name="isActive"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={activeoptions}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null && data.isActive === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="floorID">
                            Foor ID
                          </Label>
                          <Controller
                            id="floorID"
                            control={control}
                            name="floorID"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={floorID}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null && data.floorID === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>

                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="blockID">
                            Block ID
                          </Label>
                          <Controller
                            id="blockID"
                            control={control}
                            name="blockID"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={blockID}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null && data.blockID === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="smokingType">
                            Smoking Type
                          </Label>
                          <Controller
                            id="smokingType"
                            control={control}
                            name="smokingType"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={colourOptions}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null && data.smokingType === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>

                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="roomTypeID">
                            Room Type ID
                          </Label>
                          <Controller
                            id="roomTypeID"
                            control={control}
                            name="roomTypeID"
                            render={({ field }) => (
                              <Select
                                isClearable
                                options={roomTypeID}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid":
                                    data !== null && data.roomTypeID === null,
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
    </div>
  );
};

export default RoomManagement;
