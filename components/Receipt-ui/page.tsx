import React from 'react'
import From_me from './ui/from-ui/from_me'
import From_customer from './ui/from-ui/from_customer'
import DynamicBoxes from './DynamicBoxes'
import Receipt from './ui/Receipt'

export default function Receipt_page() {
  return (
    <div>
      <From_me />
      <From_customer />
      <Receipt />
    </div>
  )
}
