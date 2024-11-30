import { useState, useEffect } from "react";
import breeds from "./assets/breeds.json";
import { Cat } from "./Cat";

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const getRandomCats = (): Cat[] => {
  let list_of_cats: Cat[] = [];
  for (let i = 0; i < 4; i++) {
    let random_value: number = Math.floor(Math.random() * breeds.length);
    let random_cat: Cat = breeds[random_value] as Cat;
    list_of_cats.push(random_cat);
  }
  return list_of_cats;
};

const chooseRandomCat = (cats: Cat[]): Cat => {
  let random_index_value: number = Math.floor(Math.random() * cats.length);
  return cats[random_index_value];
};

export default function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [_, setChosenCat] = useState<Cat | null>(null);
  const [catImage, setCatImage] = useState<string | null>(null);

  useEffect(() => {
    const initializeGame = async () => {
      const randomCats = getRandomCats();
      setCats(randomCats);
      const chosen = chooseRandomCat(randomCats);
      setChosenCat(chosen);

      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${chosen.id}`
        );
        const data: CatImage[] = await response.json();
        if (data.length > 0) {
          setCatImage(data[0].url);
        }
      } catch (error) {
        console.error("Error fetching cat image:", error);
      }
    };

    initializeGame();
  }, []);

  const buttonColors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-3xl">Cat Game</p>
        <div className="gap-4">
          {catImage && <img src={catImage} className="h-32 my-3" />}
          <ul>
            {cats.map((cat, index) => (
              <li key={index} className="mb-2">
                <button
                  className={`border-[1px] py-2 px-2 rounded-xl shadow-xl text-zinc-700 ${
                    buttonColors[index % buttonColors.length]
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
