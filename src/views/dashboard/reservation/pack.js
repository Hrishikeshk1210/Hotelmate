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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'


const defaultValues = {
  // hotelID: '',
  // description: '',
  // packages: null,
  packageName:''
}


// const packageoptions = [
//   { value: 'HappyHours', label: 'HappyHours' },
//   { value: 'BreakFast', label: 'BreakFast' },

// ]

  

let packageName = []
fetch('http://192.168.1.33:14700/getPackageDescription?hotelID=1')
  .then(result => result.json())
  .then(resp => {
    // console.log(resp['data'])
    packageName = resp['data']
    // console.log(packageName)
  })


const ValidationThirdPartyComponents = () => {

  



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
          "packageName": data.packages.label,
      })
      console.log(createmarketGroup)
      let res = fetch("http://192.168.1.33:14700/addTempPackage", {
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
      // packages: '',
      packageName:''
    })
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Package</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>

              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='packages' >
                    Select Packages
                  </Label>
                  <Controller
                    id='packages'
                    control={control}
                    name='packages'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={packageName}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.packages === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              
      {/* <div>
      <Label className='form-label' for='packages' >
                    Select Packages
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
