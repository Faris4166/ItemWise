'use client'
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

type Props = {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductCard({ product, onUpdate, onDelete }: Props) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<Product>(product);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ✅ upload รูปใหม่ (ถ้าเลือก)
  const uploadImage = async () => {
    if (!file) return data.image;

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const result = await res.json();
    return result.path as string;
  };

  const handleSave = async () => {
    const imagePath = await uploadImage();

    onUpdate({
      ...data,
      image: imagePath,
    });

    setEdit(false);
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="border p-3 rounded">
      <Image
        src={preview ?? product.image}
        width={300}
        height={200}
        alt={product.name}
      />

      {edit ? (
        <>
          <input
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />

          <input
            type="number"
            value={data.price}
            onChange={e => setData({ ...data, price: +e.target.value })}
          />

          <input
            type="number"
            value={data.quantity}
            onChange={e => setData({ ...data, quantity: +e.target.value })}
          />

          {/* ✅ เปลี่ยนรูป */}
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const f = e.target.files?.[0];
              if (!f) return;
              setFile(f);
              setPreview(URL.createObjectURL(f));
            }}
          />

          <button onClick={handleSave}>✅ บันทึก</button>
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>ราคา: {product.price}</p>
          <p>จำนวน: {product.quantity}</p>
        </>
      )}

      <div className="flex gap-2 mt-2">
        <button onClick={() => setEdit(true)}>✏️ แก้ไข</button>
        <button onClick={() => onDelete(product.id)}>🗑 ลบ</button>
      </div>
    </div>
  );
}
