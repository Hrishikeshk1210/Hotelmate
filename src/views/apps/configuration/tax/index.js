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
// import App from "./extrasDataTable";

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
  Col,
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
import Moment from "moment";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const id = "1";

const taxoptions = [
  { value: "beforeDiscount", label: "Before Discount" },
  { value: "afterDiscount", label: "After Discount" },
];

const slaboptions = [
  { value: "flatAmount", label: "Flat Amount" },
  { value: "flatPercentage", label: "Flat Percentage" },
  { value: "Slab", label: "Slab" },
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];

const guestStatus = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];

const defaultValues = {
  // hotelID: "",
  taxName: "",
  taxCode: "",
  appliesFrom: "",
  exemptAfter: "",
  postingType: null,
  amount: "",
  applyOnPax: "",
  taxPercentage: "",
  noOFSlabs: "",
  fromAmount: "",
  toAmount: "",
  percentage: "",
  applyTax: "",
  applyTaxOnRackRate: "",
  note: "",
  isActive: null,
};

const TaxCode = () => {
  const [open, setOpen] = useState('')
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Tax Name", field: "taxName", suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 160,  },
    { headerName: "Tax Code", field: "taxCode", suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth:140 },
    { headerName: "Applies From", field: "appliesFrom", suppressSizeToFit: true, cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth:140 },
    // { headerName: "Exempt After",
    //   field: "exemptAfter",
    //   suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth:140 },
    { headerName: "Posting Type", field: "postingType",cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth:140  },
    // { headerName: "Amount", field: "Amount",cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth:140  },
    // { headerName: "Apply On Pax", field: "applyOnPax", suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth:140  },
    { headerName: "Tax Percentage", field: "taxPercentage" ,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth:140 },
    { headerName: "No OF Slabs", field: "noOfSlabs" ,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth:140 },
    // { headerName: "Apply Tax", field: "applyTax",cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth:140  },
    { headerName: "Apply Tax On RackRate", field: "applyTaxOnRackRate" ,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth:200 },
    // { headerName: "Note", field: "note" ,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth:140 },
    // { headerName: "Is Active", field: "isActive" ,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth:140 },
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
    fetch("http://192.168.1.33:14700/getTax?hotelID=" + id)
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData["data"]);
        console.log(rowData["data"]);
      });
  }, []);

  const [selectedValue, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);

    console.log(event.value); // print the selected value to console
    if (selectedValue == "flatAmount") {
      console.log("hi");
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else if (selectedValue == "flatPercentage") {
      console.log("hi");
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else if (selectedValue == "Slab") {
      console.log("hi");
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else {
      //         setitemOptions({ value: "0", label: "InActive" })
    }
  };

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
    data["postingType"] = selectedValue;
    console.log(data);
    if (
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
        taxName: data.taxName,
        taxCode: data.taxCode,
        appliesFrom: Moment(String(new Date(data.appliesFrom[0]))).format(
          "YYYY-MM-DD"
        ),
        exemptAfter: data.exemptAfter,
        postingType: data.postingType,
        amount: data.amount,
        applyOnPax: data.applyOnPax,
        taxPercentage: data.taxPercentage,
        noOFSlabs: data.noOFSlabs,
        //  "fromAmount":data.from,
        //  "toAmount":data.to,
        //  "percentage":data.slabstaxPercentage,
        //  "fromAmount":data.fromamount,
        //  "toAmount":data.toamount,
        applyTax: data.applyTax.value,
        applyTaxOnRackRate: data.applyTaxOnRackRate,
        note: data.note,
        isActive: data.isActive.value,
      });
      console.log(createExtra);
      let res = fetch("http://192.168.1.33:14700/addTax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createExtra,
      }).then((res) => {
        console.log(res);
        if (res["status"] == 200) {
          fetch("http://192.168.1.33:14700/getTax?hotelID=1")
            .then((result) => result.json())
            .then((rowData) => {
              setRowData(rowData["data"]);
              console.log(rowData["data"]);
              console.log();
              let createtax = JSON.stringify({
                // "hotelID": data.hotelID,
                fromAmount: data.fromAmount,
                toAmount: data.toAmount,
                percentage: data.slabstaxPercentage,
                taxID: rowData["data"][0]["id"],

                // "transactionCodeID": rowData['data'][0]['id'],
              });
              console.log(createtax);
              let res = fetch("http://192.168.1.33:14700/addTaxGeneration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: createtax,
              }).then((res) => {
                console.log(res);
              });
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
            <h4>Tax Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      taxName: "",
      taxCode: "",
      appliesFrom: "",
      exemptAfter: "",
      postingType: null,
      amount: "",
      applyOnPax: "",
      taxPercentage: "",
      noOFSlabs: "",
      fromAmount: "",
      toAmount: "",
      percentage: "",
      applyTax: null,
      applyTaxOnRackRate: "",
      note: "",
      isActive: null,
    });
  };

  const [message, setValue] = useState("");

  const handleChange = (event) => {
    console.log("Fetching values");
    console.log(event.value);
    console.log(document.getElementById("noOFSlabs").value);
    // handleTextboxClick()
    handleTextboxClick(document.getElementById("noOFSlabs").value);
    setValue(event.target.value);
  };


  const Textbox = () => {
    return (
      <div>
        <Col md="2" sm="5" className="mb-1">
          <div className="mb-1">
            {/* <Label className='form-label' for='taxName'>
 Tax Name
 </Label> */}
            <Controller
              defaultValue=""
              control={control}
              id="taxName"
              name="taxName"
              render={({ field }) => (
                <Input
                  placeholder="slab"
                  pattern="[A-Za-z_]{1,15}"
                  title="Tax Name can contain alphabets . It cannnot contain numbers and special characters."
                  required
                  invalid={errors.taxName && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>
      </div>
    );
  };

  return (
    <div>    
      <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Tax Code </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
        <CardHeader>
          <CardTitle tag="h4">Tax Code</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
            
              <Col md="3"sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="taxName">
                    Tax Name
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="taxName"
                    name="taxName"
                    render={({ field }) => (
                      <Input
                        placeholder="Tax Name"
                        pattern="[A-Za-z_]{1,15}"
                        title="Tax Name can contain alphabets . It cannnot contain numbers and special characters."
                        required
                        invalid={errors.taxName && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="taxCode">
                    Tax Code
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="taxCode"
                    name="taxCode"
                    render={({ field }) => (
                      <Input
                        placeholder="Tax Code"
                        pattern="[0-9_]{1,15}"
                        title="Tax Code can contain numbers . It cannnot contain alphabets and special characters."
                        required
                        invalid={errors.taxCode && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="appliesFrom">
                    Applies From
                  </Label>
                  <Controller
                    control={control}
                    id="appliesFrom"
                    name="appliesFrom"
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        options={{ allowInput: true }}
                        placeholder="YYYY-MM-DD "
                        className={classnames("form-control", {
                          "is-invalid":
                            data !== null && data.appliesFrom === null,
                        })}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="exemptAfter">
                    Exempt After
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="exemptAfter"
                    name="exemptAfter"
                    render={({ field }) => (
                      <Input
                        placeholder="Exempt After"
                        pattern="[0-9_]{1,15}"
                        title="Exempt After can contain numbers . It cannnot contain alphabets and special characters."
                        required
                        invalid={errors.exemptAfter && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="postingType">
                    Posting Type
                  </Label>
                  <Controller
                    id="postingType"
                    control={control}
                    name="postingType"
                    render={({ field }) => (
                      <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[1]}
                        name="postingType"
                        options={slaboptions}
                        isClearable
                        onChange={handleDropdownChange}
                      />
                    )}
                  />
                </div>
              </Col>

              {selectedValue === "flatAmount" && (
                <Col md="3"sm="12" className="mb-1">
                  <div className="mb-1">
                    <Label className="form-label" for="amount">
                      Amount
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="amount"
                      name="amount"
                      render={({ field }) => (
                        <Input
                          placeholder="Amount"
                          pattern="[0-9_]{1,15}"
                          title="Amount can contain numbers . It cannnot contain alphabets and special characters."
                          required
                          invalid={errors.amount && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
              )}

              {selectedValue === "flatPercentage" && (
                <Col md="3"sm="12" className="mb-1">
                  <div className="mb-1">
                    <Label className="form-label" for="taxPercentage">
                      taxPercentage
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="taxPercentage"
                      name="taxPercentage"
                      render={({ field }) => (
                        <Input
                          placeholder="taxPercentage"
                          pattern="[0-9]*"
                          title="Type Only Numbers"
                          required
                          invalid={errors.taxPercentage && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
              )}

              {selectedValue === "Slab" && (
                <div>
                  <Col md="3"sm="12" className="mb-1">
                    <div className="mb-1">
                      <Label className="form-label" for="noOFSlabs">
                        No OF Slabs
                      </Label>
                      <Controller
                        defaultValue=""
                        control={control}
                        id="noOFSlabs"
                        name="noOFSlabs"
                        render={({ field }) => (
                          <Input
                            placeholder="noOFSlabs"
                            pattern="[0-9_]{1,15}"
                            title="No OF Slabs can contain numbers . It cannnot contain alphabets and special characters."
                            required
                            id="noOFSlabs"
                            invalid={errors.noOFSlabs && true}
                            {...field}
                            onChange={handleChange}
                            value={2}
                          />
                        )}
                      />
                    </div>
                  </Col>
                  <Row>
                    <Row>
                      <Col md="2" sm="12" className="mb-1">
                        <div className="mb-1">
                          <Label className="form-label" for="fromAmount">
                            From
                          </Label>
                          <Controller
                            defaultValue=""
                            control={control}
                            id="fromAmount"
                            name="fromAmount"
                            render={({ field }) => (
                              <Input
                                placeholder="From Amount"
                                // pattern="[0-9]*" title="Type Only Numbers"
                                invalid={errors.fromAmount && true}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md="2" sm="12" className="mb-1">
                        <div className="mb-1">
                          <Label className="form-label" for="toAmount">
                            To
                          </Label>
                          <Controller
                            defaultValue=""
                            control={control}
                            id="toAmount"
                            name="toAmount"
                            render={({ field }) => (
                              <Input
                                placeholder="To Amount"
                                // pattern="[0-9]*" title="Type Only Numbers"
                                invalid={errors.toAmount && true}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md="2" sm="12" className="mb-1">
                        <div className="mb-1">
                          <Label
                            className="form-label"
                            for="slabstaxPercentage"
                          >
                            Tax Percentage
                          </Label>
                          <Controller
                            defaultValue=""
                            control={control}
                            id="slabstaxPercentage"
                            name="slabstaxPercentage"
                            render={({ field }) => (
                              <Input
                                placeholder="Tax Percentage"
                                pattern="[0-9]*"
                                title="Type Only Numbers"
                                invalid={errors.slabstaxPercentage && true}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                    </Row>

                  </Row>
                </div>
              )}

              <Col md="3"sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="applyOnPax">
                    Apply On Pax
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="applyOnPax"
                    name="applyOnPax"
                    render={({ field }) => (
                      <Input
                        placeholder=" Apply On Pax"
                        pattern="[A-Za-z_]{1,15}"
                        title=" Apply On Pax can contain alphabets . It cannnot contain numbers and special characters."
                        required
                        invalid={errors.applyOnPax && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="applyTax">
                    Apply Tax
                  </Label>
                  <Controller
                    id="applyTax"
                    control={control}
                    name="applyTax"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={taxoptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.applyTax === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="applyTaxOnRackRate">
                    Apply Tax On Rack Rate
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="applyTaxOnRackRate"
                    name="applyTaxOnRackRate"
                    render={({ field }) => (
                      <Input
                        placeholder=" Apply Tax On Rack Rate"
                        pattern="[A-Za-z_]{1,15}"
                        title=" Apply Tax On Rack Rate can contain alphabets . It cannnot contain numbers and special characters."
                        required
                        invalid={errors.applyTaxOnRackRate && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="note">
                    Note
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="note"
                    name="note"
                    render={({ field }) => (
                      <Input
                        placeholder=" Note"
                        pattern="[A-Za-z_]{1,15}"
                        title=" Note can contain alphabets . It cannnot contain numbers and special characters."
                        required
                        invalid={errors.note && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3"sm="12" className="mb-1">
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

export default TaxCode;
