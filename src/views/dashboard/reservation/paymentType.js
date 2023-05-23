// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Select from 'react-select'
import toast from 'react-hot-toast'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { Check } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, Form, Row, Col, Label, Button, CardBody,Input, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
import Moment from 'moment';

const defaultValues = {
    // hotelID: '',
    paymentInformation: null,
    cardNumber: '',
    cardHolderName: '',
    expiryDate: ''
}


// const packageoptions = [
//   { value: 'HappyHours', label: 'HappyHours' },
//   { value: 'BreakFast', label: 'BreakFast' },

// ]



let paymentName = []
fetch('http://192.168.1.33:14700/getPayment?hotelID=1')
    .then(result => result.json())
    .then(resp => {
        // console.log(resp['data'])
        paymentName = resp['data']
        // console.log(paymentName)
    })


const ValidationThirdPartyComponents = () => {


    const {
        setError,
        formState: { errors }
      } = useForm()
    
    


    // const [options, setOptions] = useState([]);
    // useEffect(() => {
    //   fetch('http://localhost:8000/CompanyName?hotelID=1')
    //     .then(response => response.json())
    //     .then(data => setOptions(data))
    //     .catch(error => console.error(error));
    // }, []);

    // ** State
    const [data, setData] = useState(null)

    // ** Hooks
    const { reset, handleSubmit, control } = useForm({ defaultValues })



    const onSubmit = data => {
        setData(data)
        console.log(data)
        if (data.packageName !== null) {
            let createmarketGroup = JSON.stringify({
                "paymentInformation": data.payment.label,
                "cardNumber": data.cardNumber,
                "cardHolderName": data.cardHolderName,
                "expiryDate": (Moment(String(new Date(data.expiryDate[0]))).format('YYYY-MM-DD'))
      
            })
            console.log(createmarketGroup)
            let res = fetch("http://192.168.1.33:14700/resPaymentType", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: createmarketGroup
            }).then((res) => {
                console.log(res)
            });
            toast(
                <div className='d-flex'>
                    <div className='me-1'>
                        <Avatar size='sm' color='success' icon={<Check size={12} />} />
                    </div>
                    <div className='d-flex flex-column'>
                        <h6>Form Submitted!</h6>
                        <ul className='list-unstyled mb-0'>
                            <p> </p>
                        </ul>
                    </div>
                </div>
            )
        }
    }

    const handleReset = () => {
        reset({
            // hotelID: '',      
            // payment: '',
            paymentInformation: null,
            cardNumber: '',
            cardHolderName: '',
            expiryDate: ''
        })
    }

    return (
        <div>
            <Card>
                {/* <CardHeader>
          <CardTitle tag='h4'>Extra</CardTitle>
        </CardHeader> */}
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>

                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='payment' >
                                        Select Payment Type
                                    </Label>
                                    <Controller
                                        id='payment'
                                        control={control}
                                        name='payment'
                                        render={({ field }) => (
                                            <Select
                                                isClearable
                                                options={paymentName}
                                                classNamePrefix='select'
                                                theme={selectThemeColors}
                                                className={classnames('react-select', { 'is-invalid': data !== null && data.payment === null })}
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                           <Row> 
                            <Col md='4' sm='8' className='mb-1'>
                                     <div className='mb-1'>
                                    <Label className='form-label' for='cardNumber'>
                                        Card Number
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='cardNumber'
                                        name='cardNumber'
                                        render={({ field }) => <Input placeholder='Card Number'

                                            // pattern='[0-9_]{1,15}'
                                            // title="Card Number should not contain small alphabets and special characters." 
                                            invalid={errors.cardNumber && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8' className='mb-1'>                               
                                <div className='mb-1'>
                                    <Label className='form-label' for='cardHolderName'>
                                        Card Holder Name
                                    </Label>
                                    <InputGroup className="input-group-merge">
                                        <Controller
                                            defaultValue=''
                                            control={control}
                                            id='cardHolderName'
                                            name='cardHolderName'
                                            render={({ field }) => <Input placeholder='Card Holder Name'
                                                // pattern='[Aa-Zz ]{1,15}'
                                                // title="Card Holder Name should  contain alphabets. Cannot contain numbers and special characters." 
                                                invalid={errors.cardNumber && true}{...field} />}
                                        />
                                    </InputGroup>
                                </div>
                            </Col>
                            <Col md='4' sm='8' className='mb-1'>
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

                            {/* <div>
      <Label className='form-label' for='payment' >
                    Select payment
                  </Label>
      <select>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div> */}


                            <div className='d-flex'>
                                <Button className='me-1' color='primary' type='submit'>
                                    Submit
                                </Button>
                                <Button outline color='secondary' type='reset' onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}

export default ValidationThirdPartyComponents
