import {useFormik} from 'formik'
import {Button} from '../../Button/Button'
import {TextInput} from '../../form/TextInput/TextInput'
import * as Yup from 'yup'

export interface FormParams {
  price: string
  quantity: string
}

interface BuyFormProps {
  minPrice: number
  maxPrice: number
  maxQuantity: number
  onSubmit: (values: FormParams) => void
}

export const BuyForm = ({minPrice, maxPrice, maxQuantity, onSubmit}: BuyFormProps) => {
  const BuySchema = Yup.object().shape({
    price: Yup.number()
      .typeError('you must specify a number')
      .positive()
      .min(minPrice, `Minimum ${minPrice} USD`)
      .max(maxPrice, `Maximum ${maxPrice} USD`)
      .required('Price is required'),
    quantity: Yup.number()
      .min(1, 'Must be greater than 0')
      .max(maxQuantity, `Must be less than ${maxQuantity}`)
      .required('Quantity is requried'),
  })
  const formik = useFormik({
    validationSchema: BuySchema,
    initialValues: {
      price: '',
      quantity: '',
    },
    onSubmit: (values, {resetForm, setSubmitting}) => {
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
        placeholder={`${minPrice} - ${maxPrice}`}
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.price}
        isTouched={formik.touched.price}
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
    </form>
  )
}
