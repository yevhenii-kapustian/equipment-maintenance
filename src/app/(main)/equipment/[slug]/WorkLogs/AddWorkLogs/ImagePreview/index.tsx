'use client'

import Image from 'next/image'

type ImagePreviewProps = {
  files: File[]
  onRemove: (index: number) => void
}

const ImagePreview = ({ files, onRemove }: ImagePreviewProps) => {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
            {files.map((file, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl">
                      <Image src={URL.createObjectURL(file)} alt="preview" width={500} height={500} className="h-[120px] w-full object-cover" />
                      <button onClick={() => onRemove(index)}
                              className="absolute right-1.5 top-1.5 flex h-6 w-6
                                         items-center justify-center rounded-full
                                        bg-black/60 text-xs text-white
                                        hover:bg-black/80"
                      >
                        ✕
                      </button>
                </div>
            ))}
      </div>
    )
}

export default ImagePreview