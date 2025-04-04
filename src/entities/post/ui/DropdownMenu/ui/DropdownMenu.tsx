'use client'

import { Pencil, Trash2 } from 'lucide-react'

import s from './DropdownMenu.module.scss'

type DropdownMenuProps = {
  onEdit: () => void
  onDelete: () => void
}

export function DropdownMenu({ onEdit, onDelete }: DropdownMenuProps) {
  return (
    <div className={s.dropdown}>
      <button onClick={onEdit}>
        <Pencil size={14} /> Edit Post
      </button>
      <button onClick={onDelete}>
        <Trash2 size={14} /> Delete Post
      </button>
    </div>
  )
}
