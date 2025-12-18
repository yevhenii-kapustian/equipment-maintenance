'use client'

import { useRef } from 'react'

type UploadButtonProps = {
  onFilesSelected: (images: FileList) => void
}

const UploadButton = ({ onFilesSelected }: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <input ref={inputRef} type="file" accept="image/png, image/jpeg" multiple hidden
            onChange={e => e.target.files && onFilesSelected(e.target.files)}
      />  
      <button onClick={() => inputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-1
                         rounded-2xl border-2 border-dashed border-gray-300
                        bg-gray-50 py-6 text-sm font-medium text-gray-600
                        transition hover:border-gray-500 hover:bg-gray-100"
      >
        <span className="text-lg">➕</span>
        <span>Завантажити зображення</span>
      </button>
    </>
  )
}

export default UploadButton