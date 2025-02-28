import { useState } from "react";
import Menus from "./Menus";
import Burritos from "./Burritos";
import Burgers from "./Burgers";
import ByProducts from "./ByProducts";
import Drinks from "./Drinks";
import Sauces from "./Sauces";
import Navigation from "../Components/Navigation";

function Categories() {
  const [activeCategory, setActiveCategory] = useState("");
  const [showCategories, setShowCategories] = useState(true);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowCategories(false);
  };

  const resetCategories = () => {
    setActiveCategory("");
    setShowCategories(true);
  };

  return (
    <div className="App">
      
      <Navigation toggleCategories={resetCategories} />

      {showCategories && (
        <div className="categories">
          <div onClick={() => handleCategoryClick("Menus")} className={`categoriesOptions ${activeCategory === "Menus" ? "active" : ""}`} id="optionsMenus">
            <div className="triangle"></div>
            <span>Menu</span>
          </div>
          <div onClick={() => handleCategoryClick("Burritos")} className={`categoriesOptions ${activeCategory === "Burritos" ? "active" : ""}`} id="optionsBurritos">
            <div className="triangle"></div>
            <span>Burrito</span>
          </div>
          <div onClick={() => handleCategoryClick("Burgers")} className={`categoriesOptions ${activeCategory === "Burgers" ? "active" : ""}`} id="optionsBurgers">
            <div className="triangle"></div>
            <span>Burger</span>
          </div>
          <div onClick={() => handleCategoryClick("ByProducts")} className={`categoriesOptions ${activeCategory === "ByProducts" ? "active" : ""}`} id="optionsByProducts">
            <div className="triangle"></div>
            <span>Sides</span>
          </div>
          <div onClick={() => handleCategoryClick("Drinks")} className={`categoriesOptions ${activeCategory === "Drinks" ? "active" : ""}`} id="optionsDrinks">
            <div className="triangle"></div>
            <span>Drink</span>
          </div>
          <div onClick={() => handleCategoryClick("Sauces")} className={`categoriesOptions ${activeCategory === "Sauces" ? "active" : ""}`} id="optionsSauces">
            <div className="triangle"></div>
            <span>Sauce</span>
          </div>
        </div>
      )}

      <div className="category-content">
        {activeCategory === "Menus" && <Menus />}
        {activeCategory === "Burritos" && <Burritos />}
        {activeCategory === "Burgers" && <Burgers />}
        {activeCategory === "ByProducts" && <ByProducts />}
        {activeCategory === "Drinks" && <Drinks />}
        {activeCategory === "Sauces" && <Sauces />}
      </div>
    </div>
  );
}

export default Categories;
