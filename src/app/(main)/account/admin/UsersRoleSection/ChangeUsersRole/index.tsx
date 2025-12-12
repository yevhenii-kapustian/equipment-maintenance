'use client'

import { getUsersType } from "@/utils/supabase/queries"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { EditRole } from "@/actions/admin"
import { toast } from "sonner"
import { ArrowDown, ArrowUp } from "lucide-react"

const ChangeUsersRole = ({ users }: { users: getUsersType }) => {
    const roles = ["admin", "employee"]

    const [isOpen, setIsOpen] = useState<string | null>(null)
    const [selectedRole, setSelectedRole] = useState<Record<string, string | null>>({})

    const { mutate, isPending } = useMutation({
        mutationFn: EditRole,
        onSuccess: () => {
            toast.success("Роль успішно оновлено")
        },
    })

    const handleSave = (userId: string) => {
        const role = selectedRole[userId] !== undefined ? selectedRole[userId] : null
        mutate({ userId, role })
    }

    return (
        <div className="mt-5 py-2 px-10 flex flex-col gap-3 bg-gray-50 rounded-2xl text-center">
            {users.map((user, index) => {
                const displayedRole = selectedRole[user.id] === null 
                                            ? "user"
                                            : selectedRole[user.id] ?? user.role ?? "user"

                return (
                    <div key={user.id} className="grid grid-cols-5 gap-5 items-center py-2">
                        <p>{index + 1}</p>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                
                        <div className="h-full relative">
                            <button onClick={() => setIsOpen(isOpen === user.id ? null : user.id)}
                                className="w-full h-full flex items-center justify-center gap-3 border border-[#bebebe] rounded-2xl cursor-pointer"
                            >
                                {displayedRole} <span>{isOpen === user.id ? <ArrowDown color="#bebebe" size={14} /> : <ArrowUp size={14} /> }</span>
                            </button>
                
                            {isOpen === user.id && (
                                <div className="p-2 absolute left-0 top-8 z-1 w-full flex flex-col gap-2 bg-white rounded-xl shadow-xl">
                                    {roles.map((role) => (
                                        <button key={role} className="cursor-pointer"
                                            onClick={() => { 
                                                setSelectedRole((prev) => ({ ...prev, [user.id]: role}))
                                                setIsOpen(null)
                                            }}
                                        >
                                            {role}
                                        </button>
                                    ))}

                                    <button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedRole((prev) => ({ ...prev, [user.id]: null }))
                                            setIsOpen(null)
                                        }}
                                    >
                                        user
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <button type="button" disabled={isPending} onClick={() => handleSave(user.id)}
                            className="px-3 py-1 cursor-pointer animation-btn gray-btn"
                        >
                            Save
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default ChangeUsersRole