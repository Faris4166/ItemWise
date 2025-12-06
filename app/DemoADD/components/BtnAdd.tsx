'use client';
import { useState } from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';

type Props = {
    onAdd: (product: Product) => void
}

export default function BtnAdd() {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [preview]
  return (
    <div>
      
    </div>
  )
}
