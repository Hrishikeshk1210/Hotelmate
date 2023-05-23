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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'


const defaultValues = {
    // hotelID: '',   
    extras: '',
    source: '',
    agent: '',
    origin: '',
    market: '',
    waitlistComment: '',
    billingInstructions:'',
}


// const packageoptions = [
//   { value: 'HappyHours', label: 'HappyHours' },
//   { value: 'BreakFast', label: 'BreakFast' },

// ]

let sourceCode = [
    fetch('http://192.168.1.33:14700/getSourceName?hotelID=1')
        .then(result => result.json())
        .then(resp => {
            // console.log(resp['data'])
            sourceCode = resp['data']
            // console.log(sourceCode)
        })
]

let extraName = []
fetch('http://192.168.1.33:14700/getExtraDescription?hotelID=1')
    .then(result => result.json())
    .then(resp => {
        // console.log(resp['data'])
        extraName = resp['data']
        console.log(extraName)
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
                "extraDescription": data.extras.label,
                "source": data.source,
                "agent": data.agent,
                "origin": data.origin,
                "market": data.market,
                "waitlistComment": data.waitlistComment,
                "billingInstructions": data.billingInstructions,
            })
            console.log(createmarketGroup)
            let res = fetch("http://192.168.1.33:14700/addTempExtra", {
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
            extras: '',
            source: '',
            agent: '',
            origin: '',
            market: '',
            waitlistComment: '',
            billingInstructions:'',
        })
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Extra</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>

                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='extras' >
                                        Select Extra
                                    </Label>
                                    <Controller
                                        id='extras'
                                        control={control}
                                        name='extras'
                                        render={({ field }) => (
                                            <Select
                                                isClearable
                                                options={extraName}
                                                classNamePrefix='select'
                                                theme={selectThemeColors}
                                                className={classnames('react-select', { 'is-invalid': data !== null && data.extras === null })}
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='source'>
                                        Source
                                    </Label>
                                    <Controller
                                        id='source'
                                        control={control}
                                        name='source'
                                        render={({ field }) => (
                                            <Select
                                                isClearable
                                                options={sourceCode}
                                                classNamePrefix='select'
                                                theme={selectThemeColors}
                                                className={classnames('react-select', { 'is-invalid': data !== null && data.source === null })}
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='agent'>
                                        Agent
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='agent'
                                        name='agent'
                                        render={({ field }) => <Input placeholder='Agent' invalid={errors.agent && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='origin'>
                                        Origin
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='origin'
                                        name='origin'
                                        render={({ field }) => <Input placeholder=' Origin' invalid={errors.origin && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='market'>
                                        Market
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='market'
                                        name='market'
                                        render={({ field }) => <Input placeholder=' Market ' invalid={errors.market && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='  waitlistComment'>
                                       Comment
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='  waitlistComment'
                                        name='  waitlistComment'
                                        render={({ field }) => <Input placeholder='Comment' invalid={errors.waitlistComment && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='billingInstructions'>
                                    Billing Instructions
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='  billingInstructions'
                                        name='  billingInstructions'
                                        render={({ field }) => <Input placeholder='Comment' invalid={errors.billingInstructions && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            {/* <div>
      <Label className='form-label' for='extras' >
                    Select extras
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
