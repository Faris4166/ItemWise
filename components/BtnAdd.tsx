'use client'
import { useState } from 'react'
import { Product } from '@/types/product'
import Image from 'next/image'

type Props = {
  onAdd: (product: Product) => void
}

export default function BtnAdd({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    price: 0,
    quantity: 0,
  })

  const handleUpload = async () => {
    if (!file) return null

    const fd = new FormData()
    fd.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: fd,
    })

    const data = await res.json()
    return data.path
  }

  const handleSubmit = async () => {
    const imagePath = await handleUpload()

    if (!imagePath) return

    onAdd({
      id: Date.now(),
      ...form,
      image: imagePath,
    })

    setOpen(false)
    setFile(null)
    setPreview(null)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>
        ➕ เพิ่มสินค้า
      </button>

      {open && (
        <div className="border p-4 mt-4">
          <input placeholder="ชื่อสินค้า"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input type="number" placeholder="ราคา"
            onChange={e => setForm({ ...form, price: +e.target.value })}
          />

          <input type="number" placeholder="จำนวน"
            onChange={e => setForm({ ...form, quantity: +e.target.value })}
          />

          {/* ✅ เลือกรูป */}
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const f = e.target.files?.[0]
              if (!f) return
              setFile(f)
              setPreview(URL.createObjectURL(f))
            }}
          />

          {/* ✅ preview */}
          {preview && (
            <Image
              src={preview}
              width={150}
              height={150}
              alt="preview"
            />
          )}

          <button onClick={handleSubmit}>
            บันทึก
          </button>
        </div>
      )}
    </>
  )
}
