import {useFormik} from 'formik'
import {Button} from '../../Button/Button'
import {TextInput} from '../../form/TextInput/TextInput'
import * as Yup from 'yup'
import {FormParams} from './Buy'
interface SellFormProps {
  selected?: string[]
  onSubmit: (values: FormParams) => void
}
export const SellForm = ({onSubmit}: SellFormProps) => {
  const SellSchema = Yup.object().shape({
    price: Yup.number()
      .typeError('you must specify a number')
      .positive()
      .min(0.0001, 'Minimum 1 USD')
      .required('Price is required'),
    quantity: Yup.number().min(1, 'Must be greater than 0').required('Quantity is requried'),
  })
  const formik = useFormik({
    validationSchema: SellSchema,
    initialValues: {
      price: '',
      quantity: '',
    },
    onSubmit: (values, {setSubmitting, resetForm}) => {
      setSubmitting(true)
      onSubmit(values)
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
      />
      <Button
        disabled={
          formik.isSubmitting || (formik.values.price === '' && formik.values.quantity === '')
        }
        variant='danger'
        type='submit'
        fullWidth
      >
        {formik.isSubmitting && <div className='spinner-border' role='status'></div>}
        Sell
      </Button>
    </form>
  )
}
