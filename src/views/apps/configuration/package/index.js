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
  Input,
  Card,
  Form,
  Row,
  Col,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
// import ModalForm from "./modalForm"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const id = "1";

// import App from './datagrid'
// const transactionCode = [
// { value: '1', label: 'Active' },
// { value: '0', label: 'InActive' },
// // { value: 'red', label: 'Red' },
// // { value: 'orange', label: 'Orange' }
// ]

const defaultValues = {
  // hotelID: '',
  packageCode: "",
  description: "",
  beginSellDate: "",
  endSellDate: "",
  basePrice: "",
  taxAmount: "",
  totalAmount: "",
  calculationRule: "",
  postingRhythm: "",
  rateInclusion: "",
  isActive: null,
  packageGroupID: null,
  transactionCodeID: null,
};

const colourOptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "In Active" },
];

let packages = [
  fetch("http://192.168.1.33:14700/getRateCodePackageID?hotelID=1 ")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      packages = resp["data"];
      console.log(packages);
    }),
];

let transactionCode = [
  fetch("http://192.168.1.33:14700/getRateCodeTransactionID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      transactionCode = resp["data"];
      console.log(transactionCode);
    }),
];

let packagetransactionCode = [
  fetch("http://192.168.1.33:14700/getRateCodeTransactionID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'] pending)
      packagetransactionCode = resp["data"];
      console.log(packagetransactionCode);
    }),
];

const rateCode = () => {
    const [open, setOpen] = useState('')
    const toggle = id => {
      open === id ? setOpen() : setOpen(id)
    }
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [selectedOption, setSelectedOption] = useState("");

  // const handleDropdownChange = (event) => {
  // setSelectedOption(event.target.value);
  // }

  // const [columnDefs, setColumnDefs] = useState([
  // { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 140 },
  // { headerName: 'Market Code', field: 'rateCode', suppressSizeToFit: true },
  // { headerName: 'Description', field: 'description' },
  // { headerName: 'Active Status', field: 'isActive' },
  // { headerName: 'Market Group ID', field: 'transactionCode' },

  // ]);

  // const [columnDefs, setColumnDefs] = useState([
  // { headerName: 'Room Type ', field: 'roomTypeID', suppressSizeToFit: true, maxWidth: 140 },
  // { headerName: 'One Adult Price', field: 'oneAdultPrice' },
  // { headerName: 'Two Adult Price', field: 'twoAdultPrice' },
  // { headerName: 'Three Adult Price', field: 'threeAdultPrice' },
  // { headerName: 'Extra Adult Price ', field: 'extraAdultPrice' },
  // { headerName: 'Extra Child Price', field: 'extraChildPrice' },
  // {
  // headerName: 'Action', field: 'numAvlRooms', suppressSizeToFit: true, maxWidth: 200, cellRendererFramework: (params) =>
  // <Button color='primary' onClick={() => actionButton(!show)}> Modify Rates </Button>
  // },
  // ]);
  const [show, actionButton] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "packageCode",
      field: "packageCode",
      suppressSizeToFit: true,
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 140,
    },
    {
      headerName: "Description",
      field: "description",
      suppressSizeToFit: true,
      cellStyle: { "text-align": "center", "background-color": "pink" },
      maxWidth: 140,
    },
    {
      headerName: "Begin Date ",
      field: "beginSellDate",
      suppressSizeToFit: true,
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 140,
    },
    {
      headerName: "End Date",
      field: "endSellDate",
      suppressSizeToFit: true,
      cellStyle: { "text-align": "center", "background-color": "pink" },
      maxWidth: 140,
    },
    {
      headerName: "basePrice ",
      field: "basePrice",
      suppressSizeToFit: true,
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 120,
    },
    //  { headerName: 'taxAmount', field: 'taxAmount', suppressSizeToFit: true },
    {
      headerName: "totalAmount",
      field: "totalAmount",
      cellStyle: { "text-align": "center", "background-color": "pink" },
      maxWidth: 120,
    },
    //  { headerName: 'calculationRule', field: 'calculationRule' },
    //  { headerName: 'postingRhythm ', field: 'postingRhythm' },
    //  { headerName: 'rateInclusion', field: 'rateInclusion' },
    //  { headerName: 'isActive', field: 'isActive' },
    {
      headerName: "Package Group ID ",
      field: "packageGroup",
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 180,
    },
    //  { headerName: 'Transaction Code ID', field: 'transactionCodeID', suppressSizeToFit: true },
  ]);

  ////roomTypeID, rateCodeID,oneAdultPrice, twoAdultPrice, threeAdultPrice, extraAdultPrice, extraChildPrice

  const defaultColDef = useMemo(() => ({
    suppressSizeToFit: true,
    autoHeight: true,
    resizable: true,
    editable: true,
    sortable: true,
    filter: true,
    singleClickEdit: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.33:14700/getPackage?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
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
    if (data.rateCode !== null && data.transactionCode !== null) {
      console.log(data);
      let createrateCode = JSON.stringify({
        // "hotelID": data.hotelID,
        packageCode: data.packageCode,
        description: data.description,
        beginSellDate: data.beginDate,
        endSellDate: data.sellDate,
        basePrice: data.basePrice,
        taxAmount: data.taxAmount,
        totalAmount: data.totalPrice,
        calculationRule: data.calculationRule,
        postingRhythm: data.postingRhythm,
        rateInclusion: data.rateInclusion,
        isActive: data.activeStatus.value,
        packageGroupID: data.package.value,
        transactionCodeID: data.transactionCode.value,
      });
      console.log(data.rateCode);
      console.log(createrateCode);
      let res = fetch("http://192.168.1.33:14700/addpackage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createrateCode,
      }).then((res) => {
        console.log(res);
        if (res["status"] == 200) {
          fetch("http://192.168.1.33:14700/getPackage?hotelID=1")
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
            <h4>Form Submitted!</h4>
            <h4>Market Code Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: '',
      packageCode: "",
      description: "",
      beginSellDate: "",
      endSellDate: "",
      basePrice: "",
      taxAmount: "",
      totalAmount: "",
      calculationRule: "",
      postingRhythm: "",
      rateInclusion: "",
      isActive: null,
      packageGroupID: null,
      transactionCodeID: null,
    });
  };

  return (
    <div>
      <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Package </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
        <CardHeader>
          <CardTitle tag="h4">Package </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Row>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="packageCode">
                      Package Code
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="packageCode"
                      name="packageCode"
                      render={({ field }) => (
                        <Input
                          placeholder="Package Code"
                          pattern="[0-9]{1,15}"
                          title="Package Code can contain numbers . It cannnot contain alphabets and special characters."
                          required
                          invalid={errors.packageCode && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="description">
                      Description
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="description"
                      name="description"
                      render={({ field }) => (
                        <Input
                          placeholder="Description"
                          pattern="[A-Za-z0-9_]{1,15}"
                          title="Description should not contain special characters and should only contain 15 characters"
                          invalid={errors.description && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="beginDate">
                      Begin Date
                    </Label>
                    <Controller
                      control={control}
                      id="beginDate"
                      name="beginDate"
                      render={({ field }) => (
                        <Flatpickr
                          // selected={this.state.startDate}
                          // onChange={this.handleChange}
                          // minDate={moment().toDate()}
                          // placeholderText="Select a day"

                          {...field}
                          options={{ allowInput: true }}
                          placeholder="YYYY-MM-DD "
                          className={classnames("form-control", {
                            "is-invalid":
                              data !== null && data.beginDate === null,
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="sellDate">
                      Sell Date
                    </Label>
                    <Controller
                      control={control}
                      id="sellDate"
                      name="sellDate"
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          options={{ allowInput: true }}
                          placeholder="YYYY-MM-DD "
                          className={classnames("form-control", {
                            "is-invalid":
                              data !== null && data.sellDate === null,
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="basePrice">
                      Base Price
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="basePrice"
                      name="basePrice"
                      render={({ field }) => (
                        <Input
                          placeholder=" Base Price"
                          pattern="[0-9]{1,15}"
                          title=" Base Price can contain numbers . It cannnot contain alphabets and special characters."
                          required
                          invalid={errors.basePrice && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="taxAmount">
                      Tax Amount
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="taxAmount"
                      name="taxAmount"
                      render={({ field }) => (
                        <Input
                          placeholder=" Tax Amount"
                          pattern="[0-9]{1,15}"
                          title=" Tax Amount can contain numbers . It cannnot contain alphabets and special characters."
                          required
                          invalid={errors.taxAmount && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="totalPrice">
                      Total Price
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="totalPrice"
                      name="totalPrice"
                      render={({ field }) => (
                        <Input
                          placeholder="Total Price"
                          pattern="[0-9]{1,15}"
                          title="Total Price can contain numbers . It cannnot contain alphabets and special characters."
                          required
                          invalid={errors.totalPrice && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="calculationRule">
                      Calculation Rule
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="calculationRule"
                      name="calculationRule"
                      render={({ field }) => (
                        <Input
                          placeholder="calculationRule"
                          pattern="[A-Za-z0-9_]{1,15}"
                          title="Calculation Rule should not contain special characters and should only contain 15 characters"
                          invalid={errors.calculationRule && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="postingRhythm">
                      Posting Rhythm
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="postingRhythm"
                      name="postingRhythm"
                      render={({ field }) => (
                        <Input
                          placeholder="postingRhythm"
                          pattern="[A-Za-z0-9_]{1,15}"
                          title="Calculation Rule should not contain special characters and should only contain 15 characters"
                          invalid={errors.postingRhythm && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="rateInclusion">
                      Rate Inclusion
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="rateInclusion"
                      name="rateInclusion"
                      render={({ field }) => (
                        <Input
                          placeholder="Rate Inclusion"
                          pattern="[A-Za-z0-9_]{1,15}"
                          title="rateInclusion should not contain special characters and should only contain 15 characters"
                          invalid={errors.rateInclusion && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="activeStatus">
                      Active Status
                    </Label>
                    <Controller
                      id="activeStatus"
                      control={control}
                      name="activeStatus"
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={colourOptions}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select", {
                            "is-invalid":
                              data !== null && data.activeStatus === null,
                          })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="package">
                      Package
                    </Label>
                    <Controller
                      id="package"
                      control={control}
                      name="package"
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={packages}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select", {
                            "is-invalid":
                              data !== null && data.package === null,
                          })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="transactionCode">
                      Transaction Code
                    </Label>
                    <Controller
                      id="transactionCode"
                      control={control}
                      name="transactionCode"
                      render={({ field }) => (
                        <Select
                          required
                          isClearable
                          options={transactionCode}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select", {
                            "is-invalid":
                              data !== null && data.transactionCode === null,
                          })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                {/* {selectedOption === 'option1' && (
 <div className='mb-1'>
 <Label className='form-label' for='discountamt'>
 Discount Amount
 </Label>
 <Controller
 defaultValue=''
 control={control}
 id='discountamt'
 name='discountamt'
 render={({ field }) => <Input placeholder='DiscountAmount'
 pattern='[0-9_]{1,15}'
 title="Discount Amount can contain numbers . It cannnot contain alphabets and special characters." required
 invalid={errors.discountamt && true} {...field} />}
 />
 </div>
 <div className='mb-1'>
 <Label className='form-label' for='discountpercentage'>
 Discount Percentage
 </Label>
 <Controller
 defaultValue=''
 control={control}
 id='discountpercentage'
 name='discountpercentage'
 render={({ field }) => <Input placeholder=' Discount Percentage'
 pattern='[0-9_]{1,15}'
 title="Discount Percentagecan contain numbers . It cannnot contain alphabets and special characters." required
 invalid={errors.discountpercentage && true} {...field} />}
 />
 </div>
 )} */}
              </Row>
            </div>

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
              singleClickEdit="true"
              defaultColDef={defaultColDef}
              headerColor="ddw-primary"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default rateCode;
