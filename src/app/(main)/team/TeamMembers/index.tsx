'use client'

import { createClient } from "@/utils/supabase/browser-client"
import { useState, useEffect } from "react"

const TeamMembers = () => {
    const [users, setUsers] = useState<{id: string, username: string, email: string, role: string | null}[]>([])

    useEffect(() => {
        const fetchTeamMembers = async () => {
            const supabase = await createClient()

            const { data } = await supabase.from("users")
                                            .select("id, username, email, role")
                                            .in("role", ["employee", "admin"])

            setUsers(data ?? [])
        }

        fetchTeamMembers()
    }, [])
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map(user => {

                let userRole = "Користувач"
                {user.role === "employee" ? userRole = "Працівник" : user.role === "admin" ? userRole = "Засновник" : ""}

                return(
                    <div key={user.id} className="bg-white shadow-xl rounded-xl border border-[#00000017] p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <span className="text-2xl font-bold text-gray-500">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">{userRole}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default TeamMembers