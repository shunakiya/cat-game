import { Cat } from "../Cat";

interface CatInfoCardProps {
  cat: Cat;
  isCorrect: boolean;
}

export default function CatInfoCard({ cat, isCorrect }: CatInfoCardProps) {
  return (
    <div>
      <div
        className={`border p-4 rounded-xl shadow-xl ${
          isCorrect ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <p className="text-xl font-medium">{cat.name}</p>
        <p>{cat.description}</p>
        <p>Origin: {cat.origin}</p>
        <p>Hypoallergenic: {cat.hypoallergenic}</p>
      </div>
    </div>
  );
}
