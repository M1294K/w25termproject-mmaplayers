import { Link } from 'react-router-dom';

export default function PlayerCard({ player }) {
    const isChampion = player.rating === 0;
    const isGoat = player.division === "GOAT";

    // ⭐ GOAT 또는 챔피언이면 동일한 스타일 적용
    const isLegend = isGoat || isChampion;

    return (
        <Link
            to={`/player/${player.id}`}
            className={`
                relative flex flex-col items-center p-4
                shadow-lg hover:shadow-2xl transition-transform duration-200 
                hover:-translate-y-2
                ${isLegend
                    ? "bg-gradient-to-br from-yellow-200 to-yellow-400 border-2 border-gray-600"
                    : "bg-white/90 border border-gray-600"}
            `}
        >

            <img
                src={`http://localhost:8080/api/proxy/image?url=${encodeURIComponent(player.imageSrc)}`}
                alt={player.name}
                className="w-24 h-40 object-cover"
            />

            <div className="mt-3 w-full text-center">
                {/* 이름 */}
                <p className={`truncate text-lg font-bold ${isLegend ? "text-yellow-900" : "text-gray-800"}`}>
                    {player.name}
                </p>

                {/* 등급 텍스트 */}
                <p className={`text-sm ${isLegend ? "text-yellow-900 font-extrabold" : "text-gray-800"}`}>
                    {isGoat ? "GOAT" : isChampion ? "챔피언" : `${player.rating} 위`}
                </p>
            </div>
        </Link>
    );
}
