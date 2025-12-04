import { Link } from 'react-router-dom';

export default function PlayerCard({ player }) {
    const isChampion = player.rating === 0;
    const isGoat = player.division === "GOAT";
    const isLegend = isGoat || isChampion;
    const isKorean = player.organization === "Korean";

    return (
        <Link
            to={`/player/${player.id}`}
            className={`
                relative flex flex-col items-center p-4
                shadow-xl hover:shadow-2xl transition-transform duration-200 
                hover:-translate-y-2

                ${isKorean
                    ? "bg-gradient-to-br from-white to-gray-100 border-2 border-black text-black"
                    : isLegend
                        ? "bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-yellow-700"
                        : "bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-500"
                }

                rounded-sm
            `}
        >

            <img
                src={`http://localhost:8080/api/proxy/image?url=${encodeURIComponent(player.imageSrc)}`}
                alt={player.name}
                className="w-24 h-40 object-cover"
            />

            <div className="mt-3 w-full text-center">

                <p className={`truncate text-lg font-bold tracking-wide ${isKorean ? "text-black" : isLegend ? "text-yellow-900" : "text-gray-900"}`}>
                    {player.name}
                </p>

                <p className={`text-sm ${isKorean ? "text-black font-bold" : isLegend ? "text-yellow-900 font-extrabold" : "text-gray-700"}`}>
                    {isGoat ? "GOAT" : isChampion ? "챔피언" : `${player.rating} 위`}
                </p>
            </div>
        </Link>

    );
}
