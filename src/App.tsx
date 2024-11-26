import breeds from "./assets/breeds.json";

const getRandomCat = () => {
  let list_of_cats: Array<object> = [];

  for (let i = 0; i < 4; i++) {
    let random_value: number = Math.floor(Math.random() * (67 - 0 + 1)) + 0;
    let random_cat = breeds[random_value];
    list_of_cats.push(random_cat);
  }
  return list_of_cats;
};

export default function App() {
  // let key =
  //   "api_key=live_TaVgvxxbCwoPa7IGScs9j0a6dHzajK39eTjH6srcQEA07BvPkLihD8F7zEbM0MRq";
  console.log(getRandomCat());

  return (
    <>
      <p className="text-3xl">Cat Game</p>
    </>
  );
}
