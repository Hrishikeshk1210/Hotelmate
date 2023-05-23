import {Modal,ModalHeader,ModalBody,Row,Col,Button } from 'react'
import React, { Fragment, useState } from 'react'

const Buttons = () => {
    const [centeredModal, setCenteredModal] = useState(true)

    return(
        <div className='vertically-centered-modal'>
        <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
      <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Other Action Options</ModalHeader>
      <ModalBody>
      <div  className='othersbutton'>
      <Row>
      <Col md='6' sm='12' className='mb-1'>
       <Button className='assign' color='primary' onClick={() => setShow(!show)}>ASSIGN ROOM
       </Button>
       </Col>
       <Col md='6' sm='12' className='mb-1'>
       <Button className='change' color='warning' onClick={handleClick}>CHANGE ROOM</Button>
       </Col>
       <Col md='6' sm='12' className='mb-1'>
       <Button className='packages' color='success'>ADD PACKAGES</Button>
        </Col>
       <Col md='6' sm='12' className='mb-1'>
       <Button className='sharer' onClick={() => setShow(!show)}>ADD SHARER</Button>
       </Col>
       </Row>
       </div>
      </ModalBody>
    </Modal>
    </div>
    )
}

export default Buttons