import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MAX_FILE_SIZE_KB = 350; // จำกัดขนาดไฟล์รูปไม่เกิน 350KB เพื่อเซฟพื้นที่ LocalStorage

export default function MenuForm({ onAddMenu }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  // ฟังก์ชันจัดการอัปโหลดและแปลงภาพเป็น Base64
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImageError('');

    if (!file) {
      setImageBase64(null);
      return;
    }

    // ตรวจสอบขนาดไฟล์
    const fileSizeKB = file.size / 1024;
    if (fileSizeKB > MAX_FILE_SIZE_KB) {
      setImageError(`ขนาดไฟล์ใหญ่เกินไป (${fileSizeKB.toFixed(1)} KB) แนะนำไม่เกิน ${MAX_FILE_SIZE_KB} KB`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // แปลงไฟล์เป็น Base64 Data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.onerror = () => {
      setImageError('เกิดข้อผิดพลาดในการอ่านไฟล์รูปภาพ');
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImageBase64(null);
    setImageError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    onAddMenu({
      name,
      price: parseFloat(price) || 0,
      imageUrl: imageBase64,
    });

    // Reset ฟอร์มหลังเพิ่มสำเร็จ
    setName('');
    setPrice('');
    handleClearImage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
    >
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span>✨</span> เพิ่มเมนูใหม่สำหรับเปิดโหวต
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ชื่อเมนู */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            ชื่อเมนูอาหาร / เครื่องดื่ม <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น ข้าวมันไก่ทอด, ชาเขียวปั่น"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* ราคา */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            ราคาโดยประมาณ (บาท) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="เช่น 55"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* อัปโหลดรูปภาพ */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            รูปภาพเมนู (ไม่บังคับ - มีไอคอนสุ่มให้)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer"
          />
          {imageError && (
            <p className="mt-1 text-xs text-rose-500">{imageError}</p>
          )}
        </div>

        {/* พรีวิวรูปภาพก่อนบันทึก */}
        {imageBase64 && (
          <div className="relative inline-block mt-2">
            <img
              src={imageBase64}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border border-slate-200 shadow-sm"
            />
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md transition-colors"
              title="ลบรูป"
            >
              ✕
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-semibold rounded-xl shadow-sm shadow-orange-500/30 transition-all duration-150 flex items-center justify-center gap-2"
        >
          <span>➕</span> เพิ่มเข้าสู่รายการ
        </button>
      </form>
    </motion.div>
  );
}