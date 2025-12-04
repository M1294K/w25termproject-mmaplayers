import { useQuery } from '@tanstack/react-query'
import PlayerCard from '../components/PlayerCard'
import { getAllPlayersList } from '../api/playersApi'

export default function PlayerList() {

    const { data: players, isLoading, isError, error } = useQuery({
        queryKey: ['players'],
        queryFn: getAllPlayersList,
    })

    if (isLoading) return <p className="text-center mt-10 text-xl">Loading...</p>
    if (isError) return <p className="text-center mt-10">오류: {error.message}</p>

    // 단체별 체급 리스트
    const weightClasses = {
        UFC: ["Heavy", "LightHeavy", "Middle", "Welter", "Light", "Feather", "Bantam", "Fly", "GOAT"],
        ONE: ["Heavy", "LightHeavy", "Middle", "Welter", "Light", "Feather", "Bantam", "Fly", "Straw"],
        BKFC: ["Heavy", "Cruiser", "LightHeavy", "Middle", "Welter", "Light", "Feather", "Bantam", "Fly"],
        Korean: ["Heavy", "LightHeavy", "Middle", "Welter", "Light", "Feather", "Bantam", "Fly", "GOAT"],
        K1: ["WGP","Krush"],
    };

    //  게임 스타일 테마
    const orgThemes = {
        UFC: {
            gradient: "from-red-600 to-red-700",
            text: "text-white",
            badge: "bg-red-700",
        },
        ONE: {
            gradient: "from-gray-900 to-black",
            text: "text-white",
            badge: "bg-gray-700",
        },
        BKFC: {
            gradient: "from-amber-500 to-amber-700",
            text: "text-white",
            badge: "bg-amber-600",
        },
        Korean: {
            gradient: "from-white to-gray-100",
            text: "text-black",
            badge: "bg-[#0037A6] text-white border border-black shadow-md",
        },
        K1: {
            gradient: "from-white to-gray-100",
            text: "text-red",
            badge: "bg-red-700 text-white border border-red shadow-md",
        },

    };

    const organizations = Object.keys(weightClasses)

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800">

            <h1 className="text-5xl font-extrabold text-center mb-16 text-white drop-shadow-lg tracking-wide">
                격투기 선수 도감 (2025.11.26 기준)
            </h1>

            {organizations.map(org => {
                const orgPlayers = players.filter(p => p.organization === org)
                if (orgPlayers.length === 0) return null

                const theme = orgThemes[org]

                return (
                    <div
                        key={org}
                        className={`
                    mb-20 p-6 shadow-2xl bg-gradient-to-br ${theme.gradient}
                    border border-white/10 
                    rounded-none
                `}
                    >
                        <h2 className={`text-4xl font-extrabold text-center mb-10 ${theme.text} drop-shadow`}>
                            {org}
                        </h2>

                        {weightClasses[org].map(weight => {
                            const weightPlayers = orgPlayers
                                .filter(p => p.division === weight)
                                .sort((a, b) => a.rating - b.rating)

                            if (weightPlayers.length === 0) return null

                            return (
                                <div key={`${org}-${weight}`} className="mb-14">

                                    <div className="text-center">
                                        <span
                                            className={`
                                        px-5 py-1 text-lg font-bold shadow-lg tracking-wide 
                                        ${theme.badge} text-white 
                                        border border-white/20
                                        rounded-sm
                                    `}
                                        >
                                            {weight}
                                        </span>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                        {weightPlayers.map(p => (
                                            <PlayerCard key={p.id} player={p} />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>

    )
}
