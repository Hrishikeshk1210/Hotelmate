// ** React Imports
import { useRef, useState } from 'react'
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'

// ** Custom Components
import Wizard from '@components/wizard'

// // ** Steps
import CompanyInformation from "./companyInformation"
import BTC from "./btc"
import Booker from "./booker";
// import CardDetails from "./cardDetails"
// import AccountDetails from './steps/AccountDetails'

// ** Icons Imports
import { FileText, User, MapPin, Link } from 'react-feather'
import { Card } from 'reactstrap';



import { AgGridReact } from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import { useEffect, useMemo, useCallback } from 'react';

const WizardModern = () => {
  // console.log(data1)

  // AGgrid
  // const [rowData, setRowData] = useState();
  const [filldata, setfilldata] = useState(' ');
  const [autofill, setautofill] = useState(false);
  const [editable, seteditable] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [enableEditBtn, setenableEditBtn] = useState(true)
  // const gridRef = useRef();


  const [show, actionButton] = useState(false);

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Accounts Name', field: 'accountName', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Account Type', field: 'accountType', suppressSizeToFit: true },
    {      headerName: 'Action', field: 'numAvlRooms', suppressSizeToFit: true, maxWidth: 140, cellRendererFramework: (params) =>
        <Button color='primary' onClick={() => actionButton(!show)}> View </Button>    },
    { headerName: 'Rate Code', field: 'rateCode', suppressSizeToFit: true, maxWidth: 100 },
    // { headerName: 'Address One', field: 'addressLine1', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Country', field: 'country', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'Commision ', field: 'commision', suppressSizeToFit: true, maxWidth: 110 },
    { headerName: 'State', field: 'state', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'City', field: 'city', suppressSizeToFit: true, maxWidth: 160 },
    // { headerName: 'Email', field: 'email', suppressSizeToFit: true, maxWidth: 130 },
    // { headerName: 'Phone Number', field: 'phoneNumber', suppressSizeToFit: true, maxWidth: 120 },
    // { headerName: 'Address Two', field: 'addressLine2', suppressSizeToFit: true, maxWidth: 160 },
   
    { headerName: 'Postal Code', field: 'postalCode', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Active Status', field: 'isActive', suppressSizeToFit: true, maxWidth: 190 },
    { headerName: 'GST ID ', field: 'gstID', suppressSizeToFit: true, maxWidth: 110 },
    { headerName: 'IATA', field: 'IATA', suppressSizeToFit: true, maxWidth: 110 },
    // { headerName: 'Secondary Email', field: 'secondaryEmail', suppressSizeToFit: true, maxWidth: 110 },
    // { headerName: 'Notes', field: 'notes', suppressSizeToFit: true, maxWidth: 100 },   
    { headerName: 'Account Manager ID', field: 'accountManagerID', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Financial Associate ID', field: 'financialAssociateID', suppressSizeToFit: true, maxWidth: 160 },



    // { headerName: 'Active Status', field: 'isActive', suppressSizeToFit: true, maxWidth: 160 },
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
    console.log(event['data'])
    console.log(event['rowIndex'])
    // setfilldata(event['data'])
    fetch('http://192.168.1.33:14700/getAccounts?hotelID=1')
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
        console.log(rowData['data'])
        console.log(rowData['data'][event['rowIndex']])
        setfilldata(rowData['data'][event['rowIndex']])
        console.log(filldata)
      })
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.33:14700/getAccounts?hotelID=1')
      .then(result => result.json())
      .then(rowData => setRowData(rowData['data']))
  }, []);

  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);







  const [basicModal, setBasicModal] = useState(false)

  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'companyInformation',
      title: ' Basic Company Information',
      subtitle: 'Enter Your Company Information.',
      // icon: <FileText size={18} />,
      content: <CompanyInformation data1={filldata} stepper={stepper} type='wizard-modern' />
    },
    // {
    //   id: 'btc',
    //   title: 'BTC Details',
    //   subtitle: 'Add BTC Details',
    //   // icon: <User size={18} />,
    //   content: <BTC data1={filldata} stepper={stepper} type='wizard-modern' />
    // },
    {
      id: 'booker',
      title: 'Booker',
      subtitle: 'Enter Booker Details',
      // icon: <MapPin size={18} />,
      content: <Booker stepper={stepper} type='wizard-modern' />
    },
    // {
    //   id: 'cardDetails',
    //   title: 'Card Details',
    //   subtitle: 'Enter Card Details',
    //   // icon: <Link size={18} />,
    //   content: <CardDetails stepper={stepper} type='wizard-modern' />
    // }
  ]

  return (
    <div>
      <div>
        <div className='basic-modal'>
          <Button color='primary' outline  onClick={() => setBasicModal(!basicModal)}>
            Create Company Information
          </Button>
          <br></br>
          <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)} className='modal-xl'>
            <ModalHeader toggle={() => setBasicModal(!basicModal)}>Basic Modal</ModalHeader>
            <ModalBody>
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
          <div className="ag-theme-alpine" style={{ height: 280 }}>
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
          </div>
        </Card>
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
        <Modal isOpen={show} toggle={() => actionButton(!show)} >
          <ModalHeader toggle={() => actionButton(!show)}> Welcome...  </ModalHeader>
          <ModalBody >
            <Card>

              <h6>Company ID: {filldata['companyID']}</h6>
              <h6>Account Name: {filldata['accountName']}</h6>
              <h6>accountType: {filldata['accountType']}</h6>
              <h6>Commision: {filldata['commision']}</h6>
              <h6>Email: {filldata['email']}</h6>
              <h6>Phone Number: {filldata['phoneNumber']}</h6>
              <h6>Aaddress One: {filldata['addressLine1']}</h6>
              <h6>Address Two: {filldata['addressLine2']}</h6>
              <h6>Country: {filldata['country']}</h6>
              <h6>State: {filldata['state']}</h6>
              <h6>City: {filldata['city']}</h6>
              <h6>PostalCode: {filldata['postalCode']}</h6>
              <h6>GST ID: {filldata['gstID']}</h6>
              <h6>IATA: {filldata['IATA']}</h6>
              <h6>BTC Approved: {filldata['isBTCApproved']}</h6>
              <h6>Secondary Email: {filldata['secondaryEmail']}</h6>
              <h6>RateCode : {filldata['rateCode']}</h6>
              <h6>Notes: {filldata['notes']}</h6>
              <h6>accountManagerID: {filldata['accountManagerID']}</h6>
              <h6>financialAssociateID: {filldata['financialAssociateID']}</h6>

            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => setDisabledModal(!disabledModal)}>
              Continue
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
    </div>
  )
}

export default WizardModern
