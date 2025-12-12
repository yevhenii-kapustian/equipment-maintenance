import ChangeUsersRole from "./ChangeUsersRole"
import { getUsersType } from "@/utils/supabase/queries"

const UsersRoleSection = ({users}: {users: getUsersType}) => {
    return(
        <section>
            <h3 className="text-4xl font-semibold">
                Роль користувачів
            </h3>

            <div className="mt-10 px-10 grid grid-cols-5 grid-rows-1 text-center font-semibold capitalize">
                <p>індекс</p>
                <p>Ім'я</p>
                <p>Електронна пошта</p>
                <p>Роль</p>
                <p></p>
            </div>
            <ChangeUsersRole users={users}/>
        </section>
    )
}

export default UsersRoleSection