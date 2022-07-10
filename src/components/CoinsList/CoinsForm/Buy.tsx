import {useFormik} from 'formik'
import {Button} from '../../Button/Button'
import {TextInput} from '../../form/TextInput/TextInput'
import * as Yup from 'yup'
import CustomAlert from '../../Alert'
import {useState} from 'react'

const BuySchema = Yup.object().shape({
  price: Yup.number()
    .typeError('you must specify a number')
    .positive()
    .min(15, 'Minimum 15 USD')
    .max(20000, 'Minimum 20000 USD')
    .required('Price is required'),
  quantity: Yup.number().min(1, 'Must be greater than 0').required('Quantity is requried'),
})

export const BuyForm = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const formik = useFormik({
    validationSchema: BuySchema,
    initialValues: {
      price: '',
      quantity: '',
    },
    onSubmit: (values, {resetForm, setSubmitting}) => {
      setSubmitting(true)
      setShowAlert(true)
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
      resetForm()
    },
  })

  return (
    <form className='form-control' onSubmit={formik.handleSubmit}>
      <TextInput
        label='Price'
        name='price'
        type='text'
        className='mb-3'
        placeholder='15.0 - 20000.0'
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.price}
        isTouched={formik.touched.price}
        endAdornment={<i className='bi bi-upload fs-3'></i>}
      />

      <TextInput
        label='Quantitle'
        name='quantity'
        type='number'
        min={0}
        className='mb-3'
        placeholder='Quantity'
        value={formik.values.quantity}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.quantity}
        isTouched={formik.touched.quantity}
        endAdornment={<i className='bi bi-upload fs-3'></i>}
      />
      <Button
        disabled={
          formik.isSubmitting || (formik.values.price === '' && formik.values.quantity === '')
        }
        variant='primary'
        type='submit'
        fullWidth
      >
        {formik.isSubmitting && <div className='spinner-border' role='status'></div>}
        Buy
      </Button>
      <CustomAlert
        onHide={() => setShowAlert(false)}
        open={showAlert}
        text='Done!'
        variant='success'
      />
    </form>
  )
}
