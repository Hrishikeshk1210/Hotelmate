
import {AgGridReact} from 'ag-grid-react'

import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

// ** Reactstrap Imports
import {
  AccordionBody, AccordionHeader, AccordionItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,
 Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Label, Accordion, InputGroup, NavLink
} from 'reactstrap'

import {useState, useRef, useEffect, useMemo, useCallback} from 'react'

// localStorage.removeItem('reservationid')

function App() {

  const [rowData, setRowData] = useState()
  const [filldata, setfilldata] = useState('')

  const gridRef = useRef()

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'guestID ', field: 'id', suppressSizeToFit: true},
    {headerName: 'Check In', field: 'checkIn', suppressSizeToFit: true, maxWidth: 160},  
    {headerName: 'Check Out', field: 'checkOut', suppressSizeToFit: true, maxWidth: 160},
    {headerName: 'adults ', field: 'adults', suppressSizeToFit: true},
    {headerName: 'children ', field: 'children', suppressSizeToFit: true},
    {headerName: 'Number of Rooms ', field: 'quantity', suppressSizeToFit: true},
    {headerName: 'Source', field: 'source', suppressSizeToFit: true, maxWidth: 160},
    {headerName: 'Company Name ', field: 'companyName', suppressSizeToFit: true},   
    {headerName: 'RoomType', field: 'roomType', suppressSizeToFit: true, maxWidth:200},
    {headerName: 'BaseRate ', field: 'baseRate', suppressSizeToFit: true},
    {headerName: 'Total Rate', field: 'totalRate', suppressSizeToFit: true, maxWidth: 200},   
    {headerName: 'Availability', field: 'availability', suppressSizeToFit: true, maxWidth:200},
    {headerName: 'PackageName ', field: 'packageName', suppressSizeToFit: true},   
    {headerName: 'Payment Information', field: 'paymentInformation', suppressSizeToFit: true, maxWidth: 200},    
    {headerName: 'cardNumber', field: 'cardNumber', suppressSizeToFit: true, maxWidth: 200},
    {headerName: 'cardHolderName ', field: 'cardHolderName', suppressSizeToFit: true},
    {headerName: 'expiryDate', field: 'expiryDate', suppressSizeToFit: true, maxWidth:200},
    // {headerName: 'pickUpDetails ', field: 'pickUpDetails', suppressSizeToFit: true},
    {headerName: 'pickUpTime ', field: 'pickUpTime', suppressSizeToFit: true},
    {headerName: 'pickUpLocation ', field: 'pickUpLocation', suppressSizeToFit: true},
    {headerName: 'dropDetails ', field: 'dropDetails', suppressSizeToFit: true},
    {headerName: 'Drop Time ', field: 'dropTime', suppressSizeToFit: true},
    {headerName: 'Drop Location ', field: 'dropLocation', suppressSizeToFit: true}
  ])

  const defaultColDef = useMemo(() => (
    {
      sortable: true, 
      filter: true,
      filterParams :{
        buttons : ['apply', 'reset']
      }
    }
  ))

  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event)
  }, [])

  useEffect(() => {
    fetch(`http://192.168.1.33:14700/getCompleteReservation?reservationID=${localStorage.getItem('reservationid')}`)
    .then(result => result.json())
    .then(rowData => {
      setRowData(rowData['data'])
      setfilldata(rowData['data'])
      console.log(rowData['data'])
    })
  }, [])

  console.log(filldata)

// console.log(filldata[0].ETA)
  // const buttonListener = useCallback(e => {
  //   gridRef.current.api.deselectAll()
  // }, [])

  return (
    <div>
      {console.log(filldata)}
      <Card>
        <CardBody>
          { filldata.length ? (
                <div>
                  <Row>
                  <Col md='3' sm='12'>
                    <h3>
                      Stay Information
                    </h3>
                  checkIn : {filldata[0]['checkIn']} <br></br>
                  checkOut : {filldata[0]['checkOut']} <br></br>
                  adults : {filldata[0]['adults']}<br></br>
                  children : {filldata[0]['children']}<br></br>
                  quantity : {filldata[0]['quantity']}<br></br>
                  ETA : {filldata[0]['ETA']}<br></br>
                  ETD : {filldata[0]['ETD']}<br></br>
                  Company Name : {filldata[0]['rateCode']}<br></br>
                  </Col>
                  <Col md='3' sm='12'>
                    <h3>
                      Booking Information
                    </h3>
                  resType : {filldata[0]['resType']}<br></br>
                  package : {filldata[0]['package']}<br></br>
                  booker : {filldata[0]['booker']}<br></br>
                  extraDescription : {filldata[0]['extraDescription']}<br></br>
                  source : {filldata[0]['source']}<br></br>
                  agent : {filldata[0]['agent']}<br></br>
                  origin : {filldata[0]['origin']}<br></br>
                  market : {filldata[0]['market']}<br></br>
                  features : {filldata[0]['features']}<br></br>
                  </Col>
                  <Col md='3' sm='12'>
                    <h3>
                      Payment Information
                    </h3>
                  Payment Type: {filldata[0]['paymentInformation']}<br></br>
                  cardNumber : {filldata[0]['cardNumber']}<br></br>
                  cardHolderName : {filldata[0]['cardHolderName']}<br></br>
                  expiryDate : {filldata[0]['expiryDate']}<br></br>
                  </Col>
                  <Col md='3' sm='12'>
                    <h3>
                      PickUp and Drop Details
                    </h3>
                  pickUpDate : {filldata[0]['pickUpDate']}<br></br>
                  pickUpTime : {filldata[0]['pickUpTime']}<br></br>
                  pickUpStationCode : {filldata[0]['pickUpStationCode']}<br></br>
                  pickUpCarrierCode : {filldata[0]['pickUpCarrierCode']}<br></br>
                  pickUpTransportType : {filldata[0]['pickUpTransportType']}<br></br>
                  pickupRemarks : {filldata[0]['pickupRemarks']}<br></br>
                  dropDate : {filldata[0]['dropDate']}<br></br>
                  dropTime : {filldata[0]['dropTime']}<br></br>
                  dropStationCode : {filldata[0]['dropStationCode']}<br></br>
                  dropCarrierCode : {filldata[0]['dropCarrierCode']}<br></br>
                  dropTransportType : {filldata[0]['dropTransportType']}<br></br>
                  dropRemarks : {filldata[0]['dropRemarks']}<br></br>
                  packageCode : {filldata[0]['packageCode']}<br></br>
                  </Col>
                  </Row>
              </div>
          ) : (
                <p> <h1> Please Fill Details to view your reservation !!!! </h1> </p>
          )}
          {/* {
          filldata.length && 
          filldata[0]['checkIn']
          filldata[0][checkIn']

          } */}
        </CardBody>
        
      </Card>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      {/* <div className="ag-theme-alpine" style={{ height: 520}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div> */}
    </div>
  )
}

export default App