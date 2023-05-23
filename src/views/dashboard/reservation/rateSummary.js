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
    rateCodeId: '',
    dailyDetails: '',
    roomRevenue: '',
    roomTax: '',
    packageRevenue: '',
    packageTax: '',
    totalTaxGenerated:'',
}


// const packageoptions = [
//   { value: 'HappyHours', label: 'HappyHours' },
//   { value: 'BreakFast', label: 'BreakFast' },

// ]

let dailyDetailsCode = [
    fetch('http://192.168.1.33:14700/getdailyDetailsName?hotelID=1')
        .then(result => result.json())
        .then(resp => {
            // console.log(resp['data'])
            dailyDetailsCode = resp['data']
            // console.log(dailyDetailsCode)
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
            let createpackageRevenueGroup = JSON.stringify({
                "extraDescription": data.rateCodeId.label,
                "dailyDetails": data.dailyDetails,
                "roomRevenue": data.roomRevenue,
                "roomTax": data.roomTax,
                "packageRevenue": data.packageRevenue,
                "packageTax": data.packageTax,
                "totalTaxGenerated": data.totalTaxGenerated,
            })
            console.log(createpackageRevenueGroup)
            let res = fetch("http://192.168.1.33:14700/addTempExtra", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: createpackageRevenueGroup
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
            rateCodeId: '',
            dailyDetails: '',
            roomRevenue: '',
            roomTax: '',
            packageRevenue: '',
            packageTax: '',
            totalTaxGenerated:'',
        })
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Rate Summary</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>

                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='rateCodeId' >
                                    Rate Code ID
                                    </Label>
                                    <Controller
                                        id='rateCodeId'
                                        control={control}
                                        name='rateCodeId'
                                        render={({ field }) => (
                                            <Select
                                                isClearable
                                                options={extraName}
                                                classNamePrefix='select'
                                                theme={selectThemeColors}
                                                className={classnames('react-select', { 'is-invalid': data !== null && data.rateCodeId === null })}
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='dailyDetails'>
                                        Daily Details
                                    </Label>
                                    <Controller
                                        id='dailyDetails'
                                        control={control}
                                        name='dailyDetails'
                                        render={({ field }) => (
                                            <Select
                                                isClearable
                                                options={dailyDetailsCode}
                                                classNamePrefix='select'
                                                theme={selectThemeColors}
                                                className={classnames('react-select', { 'is-invalid': data !== null && data.dailyDetails === null })}
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='roomRevenue'>
                                        Room Revenue
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='roomRevenue'
                                        name='roomRevenue'
                                        render={({ field }) => <Input placeholder='roomRevenue' invalid={errors.roomRevenue && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='roomTax'>
                                        roomTax
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='roomTax'
                                        name='roomTax'
                                        render={({ field }) => <Input placeholder=' roomTax' invalid={errors.roomTax && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='packageRevenue'>
                                        Package Revenue
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='packageRevenue'
                                        name='packageRevenue'
                                        render={({ field }) => <Input placeholder=' packageRevenue ' invalid={errors.packageRevenue && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='  packageTax'>
                                       Package Tax
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='  packageTax'
                                        name='  packageTax'
                                        render={({ field }) => <Input placeholder='Package Tax' invalid={errors.packageTax && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='totalTaxGenerated'>
                                    totalTaxGenerated
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='  totalTaxGenerated'
                                        name='  totalTaxGenerated'
                                        render={({ field }) => <Input placeholder='totalTaxGenerated' invalid={errors.totalTaxGenerated && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='8'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='total'>
                                    Total
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='  total'
                                        name='  total'
                                        render={({ field }) => <Input placeholder='Total' invalid={errors.total && true} {...field} />}
                                    />
                                </div>
                            </Col>


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
