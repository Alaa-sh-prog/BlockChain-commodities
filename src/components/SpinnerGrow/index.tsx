import {useMemo} from 'react'

export const SpinnerGrow = () => {
  const Spinner = useMemo(() => {
    return (
      <div className='text-center'>
        <div className='spinner-grow text-secondary' role='status'></div>
        <div className='spinner-grow text-secondary' role='status'></div>
        <div className='spinner-grow text-secondary' role='status'></div>
        <div className='spinner-grow text-secondary' role='status'></div>
        <div className='spinner-grow text-secondary' role='status'></div>
        <div className='spinner-grow text-secondary' role='status'></div>
        <div className='spinner-grow text-secondary' role='status'></div>
        <div className='spinner-grow text-secondary' role='status'></div>
      </div>
    )
  }, [])

  return Spinner
}
