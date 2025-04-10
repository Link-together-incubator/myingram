'use client'

import { Copy, Pencil, Trash2, UserMinus2 } from 'lucide-react'

import s from './DropdownMenu.module.scss'

type DropdownMenuProps = {
  onEdit: () => void
  onDelete: () => void
  isAuthor: boolean
}

export function DropdownMenu({
  onEdit,
  onDelete,
  isAuthor,
}: DropdownMenuProps) {
  return (
    <div className={s.dropdown}>
      {isAuthor ? (
        <>
          <button onClick={onEdit}>
            <Pencil size={14} /> Edit Post
          </button>
          <button onClick={onDelete}>
            <Trash2 size={14} /> Delete Post
          </button>
        </>
      ) : (
        <>
          <button onClick={() => alert('Unfollow clicked')}>
            <UserMinus2 size={14} /> Unfollow
          </button>
          <button onClick={() => alert('Link copied')}>
            <Copy size={14} /> Copy Link
          </button>
        </>
      )}
    </div>
  )
}
