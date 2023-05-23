// // ** React Imports
// import { useState } from 'react'

// // ** Third Party Components
// import Select from 'react-select'
// import toast from 'react-hot-toast'
// import classnames from 'classnames'
// import Cleave from 'cleave.js/react'
// import { Check } from 'react-feather'
// import Flatpickr from 'react-flatpickr'
// import 'cleave.js/dist/addons/cleave-phone.us'
// import { useForm, Controller } from 'react-hook-form'

// // ** Custom Components
// import Avatar from '@components/avatar'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // ** Reactstrap Imports
// import { Input, Row, Col, Card, Form, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// // ** Styles
// import '@styles/react/libs/flatpickr/flatpickr.scss'
// import '@styles/react/libs/react-select/_react-select.scss'
// import '@styles/react/pages/page-form-validation.scss'

// // import "./guestProfile.scss"
// const colourOptions = [
//   { value: 'adharCard', label: 'Adhar Card' },
//   { value: 'panCard', label: 'PanCard' },
//   { value: 'drivingLicense', label: 'DrivingLicense' },

// ]

// const countryOptions = [
  
//   { value: 'Afghanistan', label: 'Afghanistan' },
//   { value: 'Albania', label: 'Albania' },
//   { value: 'Anguilla', label: 'Anguilla' },
//   { value: 'Antarctica', label: 'Antarctica' },
//   { value: 'Australia', label: 'Australia' },
//   { value: 'Bahamas', label: 'Bahamas' },
//   { value: 'India', label: 'India' },
//   { value: 'Others', label: 'Others' },

// ]

// const stateOptions = [
//   { value: 'Jammu Kashmir', label: 'Jammu Kashmir' },
//   { value: 'Karnataka', label: 'Karnataka' },
//   { value: 'Kerla', label: 'Kerla' },
//   { value: 'Maharastra', label: 'Maharastra' },
  
//   { value: 'TamilNaidu', label: 'TamilNaidu' },
//   { value: 'Telangana', label: 'Telangana' },
//   { value: 'Uttarpradesh', label: 'Uttarpradesh' },
//   // { value: 'India', label: 'India' },
//   // { value: 'Others', label: 'Others' },
//   //   { value: 'red', label: 'Red' },
//   //   { value: 'orange', label: 'Orange' }
// ]

// const defaultValues = {
//   firstNameBasic: '',
//   lastNameBasic: '',
//   salutation:'',
//   guestStatus:'',
//   addressOne: '',
//   addressTwo: '',
//   country: '',
//   state: '',
//   postalcode: '',
//   gst: '',
//   anniversary:'',
//   nationality:'',
//   dob:'',
//   phoneNumber: '',
//   emailBasic: '',
//   notes:'',
//   guestType:'',
//   lastVisit:'',
//   isActive:null,
//   isBacklisted:null,
//   companyID:null,
//   lastRateID:null,
//   lastRoomID:null,     
//   negotiated: null,
//   vipID:null,

// }

// const ValidationThirdPartyComponents = () => {
//   // ** Hooks
//   const {
//     setError,
//     formState: { errors }
//   } = useForm()



//   // ** State
//   const [data, setData] = useState(null)

//   // ** Hooks
//   const { reset, handleSubmit, control } = useForm({ defaultValues })

//   const onSubmit = data => {
//     setData(data)
//     if (data.firstNameBasic.length && data.lastNameBasic !== null && data.idType !== null  && data.phoneNumber.length) {
      
//         console.log(data)
//         let createmarketGroup = JSON.stringify({
//           "firstName": data.firstNameBasic,
//           "lastName": data.lastNameBasic,
//           "phoneNumber": data.phoneNumber,
//           "emailID": data.emailBasic,          
//           "IDType": data.idType.value,
//           "IDNumber":data.idNumber,
//           "addressOne": data.addressOne,          
//           "addressTwo": data.addressTwo,
//           "country": data.country.value,
//           "state": data.state.value,
//           "postalCode": data.postalcode,         
//           "GSTNumber": data.gst,
         
//         })
//         console.log(createmarketGroup)
//         let res = fetch("http://192.168.1.33:14700/guestProfile", {
//           method: "POST",
//           headers: { 'Content-Type': 'application/json' },
//           body: createmarketGroup
//         }).then((res) => {
//           console.log(res)
//         });
//       }
//       toast(
//         <div className='d-flex'>
//           <p> Submitted</p>
//         </div>
//       )
//     }
  

//   const handleReset = () => {
//     reset({
//       firstNameBasic: '',
//       lastNameBasic: '',
//       salutation:'',
//       guestStatus:'',
//       addressOne: '',
//       addressTwo: '',
//       country: '',
//       state: '',
//       postalcode: '',
//       gst: '',
//       anniversary:'',
//       nationality:'',
//       dob:'',
//       phoneNumber: '',
//       emailBasic: '',
//       notes:'',
//       guestType:'',
//       lastVisit:'',
//       isActive:null,
//       isBacklisted:null,
//       companyID:null,
//       lastRateID:null,
//       lastRoomID:null,     
//       negotiated: null,
//       vipID:null,
      
     

//     })
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle tag='h4'>Guest Profile Details</CardTitle>
//       </CardHeader>
//       <CardBody>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           < Row>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='firstNameBasic'>
//                   First Name
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='firstNameBasic'
//                   name='firstNameBasic'
//                   render={({ field }) => <Input placeholder='First Name' invalid={errors.firstNameBasic && true} {...field} />}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='lastNameBasic'>
//                   Last Name
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='lastNameBasic'
//                   name='lastNameBasic'
//                   render={({ field }) => <Input placeholder='Last Name' invalid={errors.lastNameBasic && true} {...field} />}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='phonenumber'>
//                   Phone Number
//                 </Label>
//                 <InputGroup className='input-group-merge'>
//                   <InputGroupText
//                     className={classnames({
//                       'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
//                     })}
//                   >
//                     IN (+91)
//                   </InputGroupText>
//                   <Controller
//                     id='phone-number'
//                     name='phoneNumber'
//                     control={control}
//                     placeholder='1 234 567 8900'
//                     render={({ field }) => (
//                       <Cleave
//                         {...field}
//                         className={classnames('form-control', {
//                           'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
//                         })}
//                         options={{ phone: true, phoneRegionCode: 'IN' }}
//                       />
//                     )}
//                   />
//                 </InputGroup>
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='emailBasic'>
//                   Email
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='emailBasic'
//                   name='emailBasic'
//                   render={({ field }) => (
//                     <Input
//                       type='email'
//                       placeholder='bruce.wayne@email.com'
//                       invalid={errors.emailBasic && true}
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='idType'>
//                   IdType
//                 </Label>
//                 <Controller
//                   id='idType'
//                   control={control}
//                   name='idType'
//                   render={({ field }) => (
//                     <Select
//                       isClearable
//                       options={colourOptions}
//                       classNamePrefix='select'
//                       theme={selectThemeColors}
//                       className={classnames('react-select', { 'is-invalid': data !== null && data.idType === null })}
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='idNumber'>
//                  ID Number
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='idNumber'
//                   name='idNumber'
//                   render={({ field }) => <Input placeholder=' ID Number' invalid={errors.idNumber && true} {...field} />}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='addressOne'>
//                   Address 1
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='addressOne'
//                   name='addressOne'
//                   render={({ field }) => <Input placeholder='Address 1' invalid={errors.addressOne && true} {...field} />}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='addressTwo'>
//                   Address 2
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='addressTwo'
//                   name='addressTwo'
//                   render={({ field }) => <Input placeholder='Address 2' invalid={errors.addressTwo && true} {...field} />}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='country'>
//                   Country
//                 </Label>
//                 <Controller
//                   id='country'
//                   control={control}
//                   name='country'
//                   render={({ field }) => (
//                     <Select
//                       isClearable
//                       options={countryOptions}
//                       classNamePrefix='select'
//                       theme={selectThemeColors}
//                       className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='state'>
//                   State
//                 </Label>
//                 <Controller
//                   id='state'
//                   control={control}
//                   name='state'
//                   render={({ field }) => (
//                     <Select
//                       isClearable
//                       options={stateOptions}
//                       classNamePrefix='select'
//                       theme={selectThemeColors}
//                       className={classnames('react-select', { 'is-invalid': data !== null && data.state === null })}
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='postalcode'>
//                   Postalcode
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='postalcode'
//                   name='postalcode'
//                   render={({ field }) => <Input placeholder='postalcode' invalid={errors.postalcode && true} {...field} />}
//                 />
//               </div>
//             </Col>
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='gst'>
//                   GST Number
//                 </Label>
//                 <Controller
//                   defaultValue=''
//                   control={control}
//                   id='gst'
//                   name='gst'
//                   render={({ field }) => <Input placeholder='gst' invalid={errors.gst && true} {...field} />}
//                 />
//               </div>
//             </Col>
//             {/* <h2>HEllo</h2>          */}
//           {/* <div className='buttons'> */}
//           <div className='d-flex'>
//             <Button className='me-1' color='primary' type='submit'>
//               Submit
//             </Button>
//             <Button outline color='secondary' type='reset' onClick={handleReset}>
//               Reset
//             </Button>
//           </div>
            
//           {/* </div> */}
//           </Row>
//         </Form>
//       </CardBody>
//     </Card>
//   )
// }

// export default ValidationThirdPartyComponents


<div>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">ID Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Row>
                      <Col md='6' sm='12' className='mb-1'>
                        <div className="mb-1">
                          <Label className="form-label" for="lastRateID">
                            Last Rate ID
                          </Label>
                          <Controller
                            id="lastRateID"
                            control={control}
                            name="lastRateID"
                            render={({ field }) => (
                              <Select
                                required
                                isClearable
                                options={lastRateID}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid": data !== null && data.lastRateID === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md='6' sm='12' className='mb-1'>
                        <div className="mb-1">
                          <Label className="form-label" for="lastRoomID">
                            Last Room ID
                          </Label>
                          <Controller
                            id="lastRoomID"
                            control={control}
                            name="lastRoomID"
                            render={({ field }) => (
                              <Select
                                required
                                isClearable
                                options={lastRoomID}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid": data !== null && data.lastRoomID === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md='6' sm='12' className='mb-1'>
                        <div className="mb-1">
                          <Label className="form-label" for="negotiatedRateID">
                            Negotiated Rate ID
                          </Label>
                          <Controller
                            id="negotiatedRateID"
                            control={control}
                            name="negotiatedRateID"
                            render={({ field }) => (
                              <Select
                                required
                                isClearable
                                options={negotiatedRateID}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid": data !== null && data.negotiatedRateID === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>

                      <Col md='6' sm='12' className='mb-1'>
                        <div className="mb-1">
                          <Label className="form-label" for="vipID">
                            VIP ID
                          </Label>
                          <Controller
                            id="vipID"
                            control={control}
                            name="vipID"
                            render={({ field }) => (
                              <Select
                                required
                                isClearable
                                options={vipID}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                className={classnames("react-select", {
                                  "is-invalid": data !== null && data.vipID === null,
                                })}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </div>
