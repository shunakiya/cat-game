import breeds from "./assets/breeds.json";

const getRandomCat = () => {
  let list_of_cats: Array<object> = [];

  for (let i = 0; i < 4; i++) {
    let random_value: number = Math.floor(Math.random() * (66 - 0 + 1)) + 0;
    let random_cat: object = breeds[random_value];
    list_of_cats.push(random_cat);
  }
  return list_of_cats;
};

function chosenCat(cats: any) {
  let random_index_value: number = Math.floor(Math.random() * 4);
  return cats[random_index_value];
}

export default function App() {
  let cats: Array<any> = getRandomCat();
  console.log(chosenCat(cats));

  const buttonColors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
  ];

  return (
    <>
      <p className="text-3xl">Cat Game</p>
      <div className="mt-4">
        <ul>
          {cats.map((cat, index) => (
            <li key={index} className="mb-2">
              <button
                className={`border-[1px] py-2 px-2 rounded-xl shadow-xl text-zinc-700 ${
                  buttonColors[index % buttonColors.length]
                }`}
                key={index}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
