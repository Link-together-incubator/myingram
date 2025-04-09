'use client'

import { CirclePlus } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'

import { Input } from '@/shared/ui'

interface FileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  multiple?: boolean
  accept?: string
}

export const FileInput = ({
  onChange,
  multiple = true,
  accept = 'image/*',
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <Input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button onClick={openFileDialog}>
        <CirclePlus width={30} height={30} color={'white'} />
      </button>
    </>
  )
}
