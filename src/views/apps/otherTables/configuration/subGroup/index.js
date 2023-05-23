// ** React Imports
import { useState } from 'react'

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
import { Card, Form, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

import App from './datagrid'
const colourOptions = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },
  
]

const defaultValues = {
    subGroup: '',
    description: '',
    groupID:'',
    activeStatus: null
}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.subGroup!== null && data.description !== null && data.groupID !== null ) {
        console.log(data)
        let reservationGroup = JSON.stringify({
          "subGroup"   : data.subGroup,
          "description" : data.description,
          "groupID" : data.groupID,
          "activeStatus" : data.activeStatus.value
        })
        console.log(subGroup)
        let res = fetch("http://192.168.1.33:14700/subGroup", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: reservationGroup
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
              <li>
                <strong>Group Code</strong>: {data.subGroup}
              </li>
              <li>
                <strong>Active Status</strong>: { data.activeStatus.value}
              </li>
              
            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
        subGroup: '',
        description: '',
        groupID:'',
        activeStatus: ''
    })
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Sub Group</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>

        <div className='mb-1'>
            <Label className='form-label' for='subGroup'>
             Sub Group 
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.subGroup=== null || !data.subGroup.length)
                })}
              >               
              </InputGroupText>
              <Controller
                id='subGroup'
                name='subGroup'
                control={control}
                placeholder='subGroup'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.subGroup=== null || !data.subGroup.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                  />
                )}
              />
            </InputGroup>
          </div>
          
          <div className='mb-1'>
            <Label className='form-label' for='description'>
            Description
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.description === null || !data.description.length)
                })}
              >               
              </InputGroupText>
              <Controller
                id='description'
                name='description'
                control={control}
                placeholder='description'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.description === null || !data.description.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                  />
                )}
              />
            </InputGroup>
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='groupID'>
              Group ID
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.groupID=== null || !data.groupID.length)
                })}
              >               
              </InputGroupText>
              <Controller
                id='groupID'
                name='groupID'
                control={control}
                placeholder='groupID'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.groupID=== null || !data.groupID.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                  />
                )}
              />
            </InputGroup>
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='activeStatus'>
              Active Status
            </Label>
            <Controller
              id='activeStatus'
              control={control}
              name='activeStatus'
              render={({ field }) => (
                <Select
                  isClearable
                  options={colourOptions}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.activeStatus === null })}
                  {...field}
                />
              )}
            />
          </div>

          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Submit
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
                <App/>
    </div>
  )
}

export default ValidationThirdPartyComponents