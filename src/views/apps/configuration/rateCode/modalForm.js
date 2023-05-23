// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import { X, Plus } from 'react-feather'

// ** Custom Components
import Repeater from '@components/repeater'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
// ** Custom Components
import Avatar from '@components/avatar'
import { Check } from 'react-feather'

const defaultValues = {
  roomTypeID: '',
  oneAdultPrice: '',
  twoAdultPrice: '',
  threeAdultPrice: '',
  extraAdultPrice: '',
  extraChildPrice: '',
}

const RepeatingForm = () => {
  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()

  // ** State
  const [count, setCount] = useState(1)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = e => {
    e.preventDefault()
    e.target.closest('form').remove()
  }

  const { reset, handleSubmit, control } = useForm({ defaultValues })
  // ** State
  const [data, setData] = useState(null)

  const onSubmit = data => {

    setData(data)
    console.log(data)
    if (
      data.oneAdultPrice !== null &&
      data.expiryDate !== null
    ) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "rateCodeID": localStorage.getItem('id'), 
        "roomTypeID": data.roomTypeID,
        "oneAdultPrice": data.oneAdultPrice,
        "twoAdultPrice": data.twoAdultPrice,
        "threeAdultPrice": data.threeAdultPrice,
        "extraAdultPrice": data.extraAdultPrice,
        "extraChildPrice": data.extraChildPrice,
      })
      console.log(createmarketGroup)
      localStorage.removeItem('guestID')

      console.log("hi")
      let res = fetch("http://192.168.1.33:14700/addrateCodeRoomRate", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res);
        if (res['status'] == 200) {
          fetch('http://192.168.1.33:14700/getRateCodeRoomRate?hotelID=1')
            .then(result => result.json())
            .then(rowData => {
              setRowData(rowData['data'])
              console.log(rowData['data'])
            })
        }

      });
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <h4>RateCode Details Added Successfull</h4>
          </div>
        </div>
      )
    }

  }

  return (
    <Card>
      {/* <CardHeader>
        <h4 className='card-title'>Rate Code</h4>
      </CardHeader> */}

      <CardBody>
        <Repeater count={count}>
          {i => (
            <Form key={i} onSubmit={handleSubmit(onSubmit)}>

              <Row className='justify-content-between align-items-center'>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="roomTypeID-${i}">
                      Room Type
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='roomTypeID-${i}'
                      name='roomTypeID'
                      render={({ field }) => <Input placeholder='  roomTypeID' invalid={errors.roomTypeID && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='oneAdultPrice-${i}'>
                      Adult Price One
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='oneAdultPrice-${i}'
                      name='oneAdultPrice'
                      render={({ field }) => <Input placeholder='Adult Price One' invalid={errors.oneAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>


                <Col md='3' sm='12' className='mb-1'>
                  <div className='mb-1'>
                    <Label className='form-label' for='twoAdultPrice-${i}'>
                      Adult Price Two
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='twoAdultPrice-${i}'
                      name='twoAdultPrice'
                      render={({ field }) => <Input placeholder='Adult Price Two' invalid={errors.twoAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="threeAdultPrice-${i}">    Adult Price Three
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='threeAdultPrice-${i}'
                      name='threeAdultPrice'
                      render={({ field }) => <Input placeholder='Adult Price Three' invalid={errors.  threeAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                </Row>
                <Row>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="extraAdultPrice-${i}">
                      Extra Adult Price
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='extraAdultPrice -${i}'
                      name='extraAdultPrice'
                      render={({ field }) => <Input placeholder='Extra Adult Price' invalid={errors.extraAdultPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="extraChildPrice-${i}">
                      Extra Child Price
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='extraChildPrice-${i}'
                      name='extraChildPrice'
                      render={({ field }) => <Input placeholder='Extra Child Price ' invalid={errors.extraChildPrice && true} {...field} />}
                    />
                  </div>
                </Col>
                </Row>


                <Col md={2}>
                  <Button color='danger' className='text-nowrap px-1' onClick={deleteForm} outline>
                    <X size={14} className='me-50' />
                    {/* <span>Delete</span> */}
                  </Button>
                  <Button className='me-1' color='primary' type='submit'>
                    Submit
                  </Button>
                </Col>
                <Col sm={12}>
                  <hr />
                </Col>
            </Form>
          )}
        </Repeater>
        <Button className='btn-icon' color='primary' onClick={increaseCount}>
          <Plus size={14} />
          <span className='align-middle ms-25'>Add New</span>
        </Button>
      </CardBody>
    </Card>
  )
}

export default RepeatingForm

