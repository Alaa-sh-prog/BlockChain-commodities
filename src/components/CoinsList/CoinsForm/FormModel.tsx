import Tabs from './Tabs'
import {useState} from 'react'
import {BuyForm} from './Buy'
import {SellForm} from './Sell'

export const FormModel = () => {
  const [selectedTab1, setSelectedTab1] = useState<number>(0)

  const tabs = [
    {
      label: 'Buy',
      Component: BuyForm,
    },
    {
      label: 'Sell',
      Component: SellForm,
    },
  ]

  return (
    <div>
      <Tabs selectedTab={selectedTab1} onClick={setSelectedTab1} tabs={tabs} />
    </div>
  )
}
