// ** React Imports
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Moment from 'moment';


// ** Third Party Components
import Select from 'react-select'
import toast from 'react-hot-toast'
import classnames from 'classnames'
import { Check } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'

import { selectThemeColors } from '@utils'



// ** Reactstrap Imports
import { Card, Form, Row, Col, Label, Input, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'


const defaultValues = {
  cardNumber: null,
  cardHolderName: null,
  expiryDate: null
}

const ValidationThirdPartyComponents = () => {

  // function setGender(event){
  //     console.log(event.value);
  //   }

  const {
    setError,
    formState: { errors }
  } = useForm()


  const [paymentinfo, setpaymentinfo] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  function handleRadioChange(event) {
    if (event.target.value === 'Card') {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);

    }
    // console.log(event.target.value)
    setpaymentinfo(event.target.value)

  }

  function handleDropdownChange(event) {
    alert("Hello")
    // Do something with the selected value
  }




  // const [showDropdown, setShowDropdown] = useState(false);


  // function handleDropdownChange(event) {
  // }
  // // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    console.log(data)
    if (paymentinfo !== null && paymentinfo != '') {

      console.log(paymentinfo)

      if (paymentinfo == 'Card' && data.cardNumber !== null && data.cardHolderName !== null && data.expiryDate !== null) {
        console.log(paymentinfo)
        console.log("card payment")
        let cardpayment = JSON.stringify({
          "paymentInformation": paymentinfo,
          "cardNumber": data.cardNumber,
          "cardHolderName": data.cardHolderName,
          "expiryDate": (Moment(String(new Date(data.expiryDate[0]))).format('YYYY-MM-DD'))


        })
        console.log(cardpayment)
        let res = fetch("http://192.168.1.33:14700/resPaymentType", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: cardpayment
        }).then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
      }
      else {
        console.log("Other than card")
        console.log(paymentinfo)
        let payment = JSON.stringify({
          "paymentInformation": paymentinfo
        })


        let res = fetch("http://192.168.1.33:14700/resPaymentType", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: payment
        }).then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
      }


    }
  }

  const handleReset = () => {
    reset({

      cardNumber: null,
      cardHolderName: null,
      expiryDate: null
    })
  }

  return (

    <div>
      <Card>
        {/* <CardHeader>
                    <CardTitle tag='h4'>Source</CardTitle>
                </CardHeader> */}
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className='name'>
                <div className='demo-inline-spacing'>
                  <div className='form-check' >
                    <Label className='form-check-label' for='ex1-active'>
                      <Input type="radio" name='ex1' value="cash" onChange={handleRadioChange} />
                      Cash
                    </Label>

                    <br></br>
                    <br></br>
                    <Label className='form-check-label'>
                      <Input type="radio" name='ex1' value="Card" onChange={handleRadioChange} />
                      Card
                    </Label>
                    <br></br>
                    <br></br>
                    <Label className='form-check-label' for='ex1-active'>
                      <Input type="radio" name='ex1' value="UPI" onChange={handleRadioChange} />
                      UPI
                    </Label>
                  </div>
                </div>
              </Col>

            </Row>
            {showDropdown && (
              <div>
                <br></br>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md='4' sm='8' className='mb-1'>
                      {/* <Label className='form-label' for='cardNumber'>
                                    Card Number
                                </Label>
                                <Input type='number' name=' Card Number' id='cardNumber' placeholder='  Card Number' /> */}
                      <div className='mb-1'>
                        <Label className='form-label' for='cardNumber'>
                          Card Number
                        </Label>
                        <Controller
                          defaultValue=''
                          control={control}
                          id='cardNumber'
                          name='cardNumber'
                          render={({ field }) => <Input placeholder='Card Number '

                            pattern='[A-Z 0-9_]{1,15}'
                            title="Visa Number should not contain small alphabets and special characters." required
                            invalid={errors.cardNumber && true} {...field} />}
                        />
                      </div>
                    </Col>
                    <Col md='4' sm='8' className='mb-1'>
                      {/* <Label className='form-label' for='CompanyMulti'>
                                    Card Holder Name
                                </Label>
                                <Input type='text' name=' Card Holder' id='CompanyMulti' placeholder='  Card Holder' /> */}
                      <div className='mb-1'>
                        <Label className='form-label' for='cardHolderName'>
                          cardHolderName
                        </Label>
                        <InputGroup className="input-group-merge">
                          <Controller
                            defaultValue=''
                            control={control}
                            id='cardHolderName'
                            name='cardHolderName'
                            render={({ field }) => <Input
                              pattern='[A-Z 0-9_]{1,15}'
                              title="Visa Number should not contain small alphabets and special characters." required
                              invalid={errors.cardNumber && true}{...field} />}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md='4' sm='8' className='mb-1'>
                      {/* <Label className='form-label' for='CountryMulti'>
                                    Expiration Date
                                </Label>
                                <Input type='date' name='Rules' id='CompanyMulti' placeholder='Rules' /> */}


                      <div className='mb-1'>
                        <Label className='form-label' for='expiryDate'>
                          Expiry Date
                        </Label>
                        <Controller
                          control={control}
                          id='expiryDate'
                          name='expiryDate'
                          render={({ field }) => (
                            <Flatpickr
                              {...field}
                              options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                              className={classnames('form-control', {
                                'is-invalid': data !== null && data.expiryDate === null
                              })}
                            />
                          )}
                        />
                      </div>

                    </Col>
                  </Row>
                </Form>

              </div>
            )}
            <div className='button'>
              {/* <Button className='me-1' outline color='secondary' type='reset' onClick={handleReset} >
                        Reset
                    </Button> */}
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>

            </div>
          </Form>
        </CardBody>


      </Card>
    </div>
  )
}

export default ValidationThirdPartyComponents