'use client'

import ErrorMessage from "@/components/ErrorMessage"

type DescriptionInputProps = {
    value: string
    onChange: (val: string) => void
    error?: string
}

const DescriptionInput = ({ value, onChange, error }: DescriptionInputProps) => (
    <div className="space-y-1">
        <input value={value} onChange={e => onChange(e.target.value)} placeholder="Опис"
                className="w-full rounded-xl border border-gray-300 px-3 py-2
                        text-sm outline-none transition
                        focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
        />
        {error && <ErrorMessage message={error} />}
    </div>
)

export default DescriptionInput