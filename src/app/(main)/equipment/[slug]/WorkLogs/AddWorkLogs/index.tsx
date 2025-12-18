'use client'

import DescriptionInput from "./DescriptionInput"
import ImagePreview from "./ImagePreview"
import UploadButton from "./UploadButton"
import { useAddWorkLogsForm } from "./useAddWorkLogsForm"

const AddWorkLogs = ({ equipmentId }: { equipmentId: string }) => {
    const { 
            files, setFiles, description, setDescription, formErrors, isPending,
            removeFile, handleSave,
    } = useAddWorkLogsForm(equipmentId)

    return (
      <div className="w-full space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
            <UploadButton onFilesSelected={fileList => setFiles(prev => [...prev, ...Array.from(fileList)])} />
            {formErrors.files && (
              <p className="mt-2 text-sm text-red-500">{formErrors.files}</p> 
            )}
        </div>

        {files.length > 0 && (
          <ImagePreview files={files} onRemove={removeFile} />
        )}

        <DescriptionInput value={description} onChange={setDescription} error={formErrors.description} />

        <button onClick={handleSave} disabled={isPending} 
                className="w-full rounded-xl bg-black py-2.5 text-sm font-medium
                        text-white transition hover:bg-gray-900
                          disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Збереження…' : 'Зберегти'}
        </button>
      </div>
    )
}

export default AddWorkLogs