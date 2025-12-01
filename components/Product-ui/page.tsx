import React from 'react'
import ProductCard from './ui/ProductCard'
import AddProductForm from './ui/AddProductForm'
import { Pagination_UI } from '../Pagination'

export default function page() {
  return (
    <div className='flex flex-col gap-2'>
      <AddProductForm />
      <ProductCard />
      <Pagination_UI />
    </div>
  )
}
