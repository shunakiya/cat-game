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
  const [chosenCat, setChosenCat] = useState<Cat | null>(null);
  const [catImage, setCatImage] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

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
      console.error("error fetching cat image:", error);
    }
  };

  const checkAnswer = (selectedCat: Cat) => {
    if (selectedCat.id === chosenCat?.id) {
      setScore(score + 1);
      console.log("correct cat!");
      initializeGame();
    } else {
      console.log("wrong cat");
      initializeGame();
    }
  };

  const buttonColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-3xl">Cat Game</p>
        <div className="gap-4 mx-auto">
          {catImage && <img src={catImage} className="h-40 my-3" />}
          <ul>
            {cats.map((cat, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => checkAnswer(cat)}
                  className={`border-[1px] py-2 px-2 rounded-xl shadow-xl text-zinc-100 ${
                    buttonColors[index % buttonColors.length]
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p>{score}/10</p>
      </div>
    </div>
  );
}
