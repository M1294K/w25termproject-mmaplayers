import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPlayerDetail } from '../api/playersApi'

export default function PlayerDetail() {
    const { playerId } = useParams()

    const { data: player, isLoading } = useQuery({
        queryKey: ["player", playerId],
        queryFn: () => getPlayerDetail(playerId),
    })

    if (isLoading) return <p className="text-center mt-10 text-white">불러오는 중...</p>;

    const isChampion = player.rating === 0;
    const isGoat = player.division === "GOAT";
    const isLegend = isGoat || isChampion; // ⭐ GOAT가 최우선, 그다음 챔피언

    // ⭐ 단체별 테마 색상 (리스트와 동일)
    const orgThemes = {
        UFC: {
            bg: "bg-gradient-to-br from-red-700 to-red-900",
            text: "text-red-100",
            accent: "border-red-400",
        },
        ONE: {
            bg: "bg-gradient-to-br from-gray-900 to-black",
            text: "text-gray-300",
            accent: "border-gray-500",
        },
        BKFC: {
            bg: "bg-gradient-to-br from-yellow-500 to-yellow-700",
            text: "text-yellow-100",
            accent: "border-yellow-500",
        },
        BlackCombat: {
            bg: "bg-gradient-to-br from-amber-600 to-amber-800",
            text: "text-amber-100",
            accent: "border-amber-500",
        }
    };

    const theme = orgThemes[player.organization] || orgThemes.UFC;

    return (
        <div className={`p-8 min-h-screen ${theme.bg} ${theme.text} flex flex-col items-center`}>

            {/* ========== 상단 대표 카드 ========== */}
            <div
                className={`
                    w-full max-w-2xl p-6 mb-8 shadow-xl border
                    ${isLegend ? "border-yellow-400 bg-yellow-200/10" : theme.accent}
                    flex flex-col items-center bg-black/20
                `}
            >
                <img
                    src={player.imageSrc}
                    alt={player.name}
                    className="w-38 h-56 object-cover mb-4"
                />

                {/* 이름 + 챔피언/GOAT 색 강조 */}
                <h2
                    className={`
                        text-4xl font-extrabold tracking-wide drop-shadow-md
                        ${isLegend ? "text-yellow-300" : ""}
                    `}
                >
                    {player.name}
                </h2>

                {/* 조직 · 체급 · 순위 */}
                <p className={`mt-2 text-lg opacity-80`}>
                    {player.organization} · {player.division}
                    {(!isChampion && !isGoat) && ` · ${player.rating} 위`}
                </p>

                {/* 챔피언 또는 GOAT 표시 */}
                {isLegend && (
                    <span className="mt-2 text-yellow-300 font-bold tracking-wide">
                        {isGoat ? "GOAT" : "챔피언"}
                    </span>
                )}
            </div>

            {/* ========== 상세 정보 박스 ========== */}
            <div className="w-full max-w-3xl bg-white text-gray-900 shadow-xl border border-gray-300 p-8 space-y-10">

                {/* 전적 */}
                <section>
                    <h3 className="text-2xl font-bold mb-3 border-b pb-1">전적</h3>
                    <p className="text-gray-800 text-lg">
                        {player.win} 승 · {player.lose} 패 · {player.draw} 무승부
                    </p>
                </section>

                {/* 기본 정보 */}
                <section>
                    <h3 className="text-2xl font-bold mb-3 border-b pb-1">기본 정보</h3>

                    <div className="grid grid-cols-2 gap-4 text-gray-800 text-lg">
                        <p>키: {player.height} cm</p>
                        <p>몸무게: {player.weight} kg</p>
                        <p>리치: {player.reach} cm</p>
                        <p>국적: {player.nation || "정보 없음"}</p>
                    </div>
                </section>

                {/* 명언 */}
                <section>
                    <h3 className="text-2xl font-bold mb-3 border-b pb-1">명언</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {player.saying || "등록된 명언이 없습니다."}
                    </p>
                </section>
            </div>

            {/* 뒤로가기 */}
            <Link
                to="/"
                className="
                    mt-10 px-6 py-3 text-lg font-bold 
                    bg-black text-white hover:bg-gray-900 transition
                "
            >
                ← 돌아가기
            </Link>
        </div>
    )
}
