import {ReactNode} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {Button, ButtonVariant} from '../Button/Button'

interface CustomModelProps {
  show: boolean
  onHide: () => void
  onConfirm: () => void
  confirmText: string
  closeText?: string
  title: string
  body: string | ReactNode
  confirmVariant: ButtonVariant
}

export const CustomModel = ({
  title,
  body,
  show,
  onConfirm,
  onHide,
  confirmText,
  confirmVariant = 'primary',
  closeText = 'Cancel',
}: CustomModelProps) => {
  return (
    <Modal show={show} onHide={onHide} closeButton>
      <Modal.Header className='justify-content-center'>
        <Modal.Title className='text-center'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='justify-content-center'>{body}</Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button type='button' className='text-muted' onClick={onHide}>
          {closeText}
        </Button>
        <Button type='button' variant={confirmVariant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
