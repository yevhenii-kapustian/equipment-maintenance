import TeamMembers from "./TeamMembers"

const TeamPage = () => {
    return (
        <section>
            <h1 className="text-5xl font-semibold">Команда</h1>
            <span className='my-10 block w-full h-1 border-t border-[#e0e0e0]' />
            <h2 className="mb-5 text-3xl opacity-70">Усі діючі працівники:</h2>
            <TeamMembers />
        </section>
    )
}

export default TeamPage