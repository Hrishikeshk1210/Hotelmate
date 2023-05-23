// ** Custom Components
import React, { useState } from 'react'
import "./frontDesk.scss"
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Label, CardText,CardFooter , Nav,TabPane,NavItem,NavLink,TabContent,} from 'reactstrap'
import { Printer, RefreshCcw, RefreshCw } from 'react-feather'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const TopCards = () => {

  let navigate = useNavigate();

  const [rowData, setRowData] = useState();
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('http://192.168.1.33:14700/getroominventory?date='+dateState)
  //   .then(result => result.json())
  //   .then((data) => {
  //     console.log(data);
  //     setRowData(data);
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //  });
  // }, []); 
  
const [dateState, setDateState] = useState(new Date());
         useEffect(() => {
      setInterval(() => setDateState(new Date()), 30000);
    }, []);

    function Refresh(){
      // alert("Do You Really Want To Assign Room")
      setTimeout(() => { navigate('/dashboard/frontDesk');},100)
  
  
    }
    function NewReservation(){
      setTimeout(() => { navigate('/dashboard/reservation');},10)
    }
  return (
    
    <div className='frontdesk'>
      
      <h2><p>
                {' '}
                {dateState.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </p>
            <div><Printer size={14} className='printer'/><RefreshCw size={14} className='refresh' onClick={Refresh}/>
      <Button className='reservation-top-button' color='primary' onClick={NewReservation}>New Reservation</Button></div>
      </h2>
       <Row>
      <Col className='cardsize'>
        <Card  className='card'>
          <CardBody>
            <CardTitle tag='h4' className='card1'>
                40
              </CardTitle>
            <CardText>
              <h4>ARRIVALS</h4>
              
            </CardText>
          </CardBody>
          
        </Card>
      </Col>
      <Col className='cardsize'>
        <Card  className='card'>
          <CardBody>
            <CardTitle tag='h4' className='card2'>30</CardTitle>
            <CardText><h4>DEPARTURES
              </h4></CardText>
          </CardBody>
          <CardFooter>
            {/* <small className='text-muted'>Last updated 3 mins ago</small> */}
          </CardFooter>
        </Card>
      </Col>
      <Col className='cardsize'>
        <Card className='card'>
          <CardBody>
            <CardTitle tag='h4' className='card3'>40</CardTitle>
            <CardText>
              <h4>ROOMS AVAILABLE</h4>
            </CardText>
          </CardBody>
          <CardFooter>
            {/* <small className='text-muted'>Last updated 3 mins ago</small> */}
          </CardFooter>
        </Card>
      </Col>
      <Col className='cardsize'>
        <Card  className='card'>
          <CardBody>
            <CardTitle tag='h4' className='card4'>150</CardTitle>
            <CardText>
              <h4>ROOM OCCUPIED</h4>
            </CardText>
          </CardBody>
          <CardFooter>
            {/* <small className='text-muted'>Last updated 3 mins ago</small> */}
          </CardFooter>
        </Card>
      </Col>
    </Row>
        <h1 className='title'>Front Desk<Printer size={14} className='printer'/><RefreshCw size={14} className='refresh' onClick={Refresh}/></h1>
        
    
    </div>
    
  )
}

export default TopCards