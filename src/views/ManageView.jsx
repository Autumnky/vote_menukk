import React from 'react';
import { motion } from 'framer-motion';
import MenuForm from '../components/MenuForm';
import MenuList from '../components/MenuList';

export default function ManageView({ menus, onAddMenu, onDeleteMenu, onGoToVote }) {
  return (
    <motion.div
      key="manage-view"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Header ของหน้า */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            จัดการรายการอาหาร
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            เพิ่มตัวเลือกอาหารและเครื่องดื่มให้ทุกคนในออฟฟิศร่วมกันโหวต
          </p>
        </div>

        {menus.length > 0 && (
          <button
            type="button"
            onClick={onGoToVote}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-sm transition-all shrink-0"
          >
            <span>🗳️</span> ไปยังห้องโหวต ({menus.length})
          </button>
        )}
      </div>

      {/* ฟอร์มกรอกข้อมูลเมนู */}
      <MenuForm onAddMenu={onAddMenu} />

      {/* รายการเมนูที่บันทึกไว้แล้ว */}
      <MenuList menus={menus} onDeleteMenu={onDeleteMenu} />
    </motion.div>
  );
}