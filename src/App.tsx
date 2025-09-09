import React, { useState } from "react";
import "./App.css";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

type SelectedRecipe = {
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  spoonacularScore: number;
  healthScore: number;
  aggregateLikes: number;
  pricePerServing: number;
  cheap: number;
  vegetarian: number;
  vegan: number;
  glutenFree: number;
  dairyFree: number;
  ketogenic: number;
  lowFodmap: number;
  cuisines: string[];
  dishTypes: string[];
  occasions: string[];
  diets: string[];
  extendedIngredients: {
    id: number;
    original: string;
  }[];
  analyzedInstructions: Instruction[];
  instructions?: string;
  nutrition?: Nutrition;
  winePairing?: WinePairing;
  creditsText: string;
};

type SimilarRecipe = {
  id: number;
  title: string;
};

type InstructionStep = {
  number: number;
  step: string;
  ingredients?: {
    id: number;
    name: string;
    image: string;
  }[];
  equipment?: {
    id: number;
    name: string;
    image: string;
  }[];
};

type Instruction = {
  name: string;
  steps: InstructionStep[];
};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type Nutrition = {
  nutrients: Nutrient[];
};

type WineProductMatch = {
  id: number;
  title: string;
  description: string;
  price: string;
  imageurl: string;
  averageRatings: number;
  ratingCount: number;
  score: number;
  link: string;
};

type WinePairing = {
  pairedWines: string[];
  pairingText: string;
  productMatches?: WineProductMatch[];
};
const App = () => {
  const [recipe, setRecipe] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<SelectedRecipe | null>(
    null
  );

  const [cuisine, setCuisine] = useState("");
  const [dishType, setDishType] = useState("");
  const [diet, setDiet] = useState("");

  const [similarRecipes, setSimilarRecipes] = useState<SimilarRecipe[]>([]);
  const [error, setError] = useState("");

  const [APIKEYNum, SetAPIKEYNum] = useState(0);
  const API_KEYS = [
    "e954320828c54051b4d2a5c3fe38ff5e",
    "0988f5f995c04ac9bb7aefbad9c1a40f",
    "601f98f3d7f74694916e97b8de122594",
    "bf0c669247ff4fa3bc6966a318de4c0f", //lojik86851@knilok.com
    "7ed49cbf8ada480c97884523c3e2c4cc", //faxiri8141@knilok.com
    "0726f9f6ab4d4a878d650caa3ff65a9d", //mebaho5139@knilok.com
    "d8b46d27c2ab417eb7e2d80bb4664b1c", //yivix88807@knilok.com
    "35b60f8fba8f4e5e9350c7dc90baf23b", //focatad872@knilok.com
    "a6940e4a7d214e3b8f5114e59bc2eac3", //vagoj90686@knilok.com
    "aa045138d4d84b71b4ceac9d5fe163a5", //a.n.i.c.hu.rmu.h.amm.ada.7.8@gmail.com
  ];
  const User = [
    "User-0",
    "User-1",
    "User-2",
    "User-3",
    "User-4",
    "User-5",
    "User-6",
    "User-7",
    "User-8",
    "User-9",
  ];

  const [search, setSearch] = useState("");

  const cuisines = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];
  const dishTypes = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
  ];
  const diets = [
    "vegan",
    "vegetarian",
    "pescetarian",
    "gluten free",
    "grain free",
    "dairy free",
    "high protein",
    "whole 30",
    "low sodium",
    "low carb",
    "paleo",
    "ketogenic",
    "FODMAP",
    "primal",
  ];

  const KeyChanger = () => {
    if (APIKEYNum === 9) {
      SetAPIKEYNum(0);
    } else {
      SetAPIKEYNum(APIKEYNum + 1);
    }
  };

  const Home = () => {
    setSearch("");
    setRecipe("");
    setRecipes([]);
    setSelectedRecipe(null);
    setSimilarRecipes([]);
  };

  const GoRight = () => {
    const element = document.getElementById("right-home");
    if (element) {
      element.scrollIntoView();
    }
  };
  const searchRecipes = async () => {
    setSearch(recipe);
    setSelectedRecipe(null);
    GoRight();
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&number=100&apiKey=${API_KEYS[APIKEYNum]}`
      );
      const data = await res.json();
      setRecipes(data.results);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const searchRecipesbyCuisine = async (type: string) => {
    setCuisine(type);
    setSelectedRecipe(null);
    GoRight();
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&number=100&apiKey=${API_KEYS[APIKEYNum]}`
      );
      const data = await res.json();
      setRecipes(data.results);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const searchRecipesbyDishType = async (type: string) => {
    setDishType(type);
    setSelectedRecipe(null);
    GoRight();
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?type=${type}&number=100&apiKey=${API_KEYS[APIKEYNum]}`
      );
      const data = await res.json();
      setRecipes(data.results);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const searchRecipesbyDiet = async (type: string) => {
    setDiet(type);
    setSelectedRecipe(null);
    GoRight();
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?diet=${type}&number=100&apiKey=${API_KEYS[APIKEYNum]}`
      );
      const data = await res.json();
      setRecipes(data.results);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchRecipe = async (id: number) => {
    GoRight();
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEYS[APIKEYNum]}`
      );
      const data = await res.json();
      setSelectedRecipe(data);

      const similarities = await fetch(
        `https://api.spoonacular.com/recipes/${id}/similar?number=3&apiKey=${API_KEYS[APIKEYNum]}`
      );
      const similarData = await similarities.json();
      setSimilarRecipes(similarData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div id="home">
      <div id="left-home">
        <div id="website-title">
          <h1>
            Kitchen
            <br />
            Compass
          </h1>
        </div>
        <div id="input-container">
          <input
            type="text"
            value={recipe}
            placeholder="Enter recipe"
            onChange={(e) => setRecipe(e.target.value)}
          />
        </div>
        <div id="button-container">
          <button onClick={KeyChanger}>{User[APIKEYNum]}</button>
          <button onClick={searchRecipes} disabled={!recipe.trim()}>
            Search
          </button>
          <button onClick={Home} disabled={recipes.length === 0}>Home</button>
          {selectedRecipe && (
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setSimilarRecipes([]);
              }}
            >
              Back
            </button>
          )}
        </div>
      </div>
      <div id="right-home">
        {!selectedRecipe && search && (
          <div className="right-body">
            <div className="right-body-title">
              <h2>{recipes.length} results</h2>
            </div>
            <div className="search-results">
              {recipes.map((r) => (
                <div className="recipe-result">
                  <div
                    className="recipe-image"
                    onClick={() => fetchRecipe(r.id)}
                  >
                    <img src={r.image} alt={r.title} />
                  </div>
                  <div className="recipe-title">
                    <p>{r.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedRecipe && (
          <div className="right-body">
            <div id="sr-header">
              <div id="sr">
                <div id="sr-image">
                  <img src={selectedRecipe.image} alt="" />
                </div>
                <div id="sr-title">
                  <h2>{selectedRecipe.title}</h2>
                </div>
              </div>
              <div className="sr-info">
                <div className="sr-info-title">
                  <h3>Basic Info</h3>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Cooking Time</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.readyInMinutes}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Servings</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.servings}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Source</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p id="url">
                      <a
                        href={selectedRecipe.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        URL
                      </a>
                    </p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Price per Serving</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>$ {(selectedRecipe.pricePerServing / 100).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="sr-info">
                <div className="sr-info-title">
                  <h3>Scores & Popularity</h3>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Spoonacular Score</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.spoonacularScore.toFixed(2)}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Health Score</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.healthScore}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Likes</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.aggregateLikes}</p>
                  </div>
                </div>
              </div>
              <div className="sr-info">
                <div className="sr-info-title">
                  <h3>Dietry Info</h3>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Vegetarian</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.vegetarian ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Vegan</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.vegan ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Gluten Free</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.glutenFree ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Dairy Free</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.dairyFree ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Ketogenic</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.ketogenic ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="sr-info-content">
                  <div className="sr-info-content-title">
                    <p>
                      <strong>Low FODMAP</strong>
                    </p>
                  </div>
                  <div className="sr-info-content-value">
                    <p>{selectedRecipe.lowFodmap ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="sr-header-2">
              <div id="sr-category">
                <div id="sr-category-title">
                  <h3>Categories</h3>
                </div>
                <div className="sr-category-content">
                  <div className="sr-category-name">
                    <p>
                      <strong>Cuisines</strong>
                    </p>
                  </div>
                  <div className="sr-category-value">
                    {selectedRecipe.cuisines.length > 0 ? (
                      selectedRecipe.cuisines.map((c) => (
                        <p onClick={() => searchRecipesbyCuisine(c)}>{c}</p>
                      ))
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>
                <div className="sr-category-content">
                  <div className="sr-category-name">
                    <p>
                      <strong>Dish Type</strong>
                    </p>
                  </div>
                  <div className="sr-category-value">
                    {selectedRecipe.dishTypes.length > 0 ? (
                      selectedRecipe.dishTypes.map((t) => (
                        <p onClick={() => searchRecipesbyDishType(t)}>{t}</p>
                      ))
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>
                <div className="sr-category-content">
                  <div className="sr-category-name">
                    <p>
                      <strong>Diets</strong>
                    </p>
                  </div>
                  <div className="sr-category-value">
                    {selectedRecipe.diets.length > 0 ? (
                      selectedRecipe.diets.map((d) => (
                        <p onClick={() => searchRecipesbyDiet(d)}>{d}</p>
                      ))
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>
                <div className="sr-category-content">
                  <div className="sr-category-name">
                    <p>
                      <strong>Occasions</strong>
                    </p>
                  </div>
                  <div className="sr-category-value">
                    {selectedRecipe.occasions.length > 0 ? (
                      selectedRecipe.occasions.map((o) => <p>{o}</p>)
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>
              </div>
              <div id="sr-ingredients">
                <h3>
                  {" "}
                  Ingredients({selectedRecipe.extendedIngredients.length})
                </h3>
                <ol>
                  {selectedRecipe.extendedIngredients.map((ing) => (
                    <li key={ing.id}>{ing.original}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div id="sr-body">
              <div id="sr-instructions">
                <h3>
                  Instructions(
                  {selectedRecipe.analyzedInstructions[0]?.steps.length}-steps)
                </h3>
                <ol>
                  {selectedRecipe.analyzedInstructions[0]?.steps.length ? (
                    selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))
                  ) : (
                    <p>
                      {selectedRecipe.instructions?.replace(
                        /<\/?[^>]+(>|$)/g,
                        ""
                      )}
                    </p>
                  )}
                </ol>
              </div>
            </div>
            <div id="sr-body-2">
              <div id="sr-nutrition">
                <h3>Nutrition</h3>
                <ul>
                  {selectedRecipe.nutrition?.nutrients
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((n) => (
                      <li key={n.name}>
                        <span className="title">{n.name}</span>
                        <span className="value">
                          {n.amount} {n.unit} (
                          {n.percentOfDailyNeeds.toFixed(1)}% DV)
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div id="sr-wine-credits">
                {selectedRecipe.winePairing && (
                  <div id="sr-wine-pairing">
                    <p>{selectedRecipe.winePairing.pairingText}</p>
                    {selectedRecipe.winePairing.productMatches?.map((w) => (
                      <p key={w.id}>
                        <strong>{w.title}</strong> - $ {w.price}
                      </p>
                    ))}
                  </div>
                )}
                {selectedRecipe.creditsText && (
                  <div id="sr-credits">
                    <h3>Credits</h3>
                    <p>{selectedRecipe.creditsText}</p>
                  </div>
                )}
                {similarRecipes.length > 0 && (
                  <div id="sr-similar">
                    <h3>Similar Recipes</h3>
                    <ul>
                      {similarRecipes.map((s) => (
                        <li key={s.id} onClick={() => fetchRecipe(s.id)}>
                          {s.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {!selectedRecipe && recipes && !search && (
          <div id="choices">
            <div className="category">
              <h3>Cuisine</h3>
              <div className="category-choices">
                {cuisines.slice().sort((a, b) => a.localeCompare(b)).map((c) => (
                  <p>{c}</p>
                ))}
              </div>
            </div>
            <div className="category">
              <h3>Dish Type</h3>
              <div className="category-choices">
                {dishTypes.slice().sort((a, b) => a.localeCompare(b)).map((dt) => (
                  <p>{dt}</p>
                ))}
              </div>
            </div>
            <div className="category">
              <h3>Diet</h3>
              <div className="category-choices">
                {diets.slice().sort((a, b) => a.localeCompare(b)).map((d) => (
                  <p>{d}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
