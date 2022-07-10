import {useFormik} from 'formik'
import {Button} from '../../Button/Button'
import {TextInput} from '../../form/TextInput/TextInput'
import * as Yup from 'yup'
import CustomAlert from '../../Alert'
import {useState} from 'react'

const SellSchema = Yup.object().shape({
  price: Yup.number()
    .typeError('you must specify a number')
    .positive()
    .min(1, 'Minimum 1 symbols')
    .required('Price is required'),
  quantity: Yup.number().min(1, 'Must be more than 10 characters').required('Quantity is requried'),
})

export const SellForm = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const formik = useFormik({
    validationSchema: SellSchema,
    initialValues: {
      price: '',
      quantity: '',
    },
    onSubmit: (values, {setSubmitting, resetForm}) => {
      setSubmitting(true)
      alert(JSON.stringify(values, null, 2))
      setShowAlert(true)
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
        placeholder='Price'
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.price}
        isTouched={formik.touched.price}
        endAdornment={<i className='bi bi-upload fs-3'></i>}
      />

      <TextInput
        label='Quantity'
        name='quantity'
        type='number'
        className='mb-3'
        min={0}
        placeholder='1'
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
        Sell
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
