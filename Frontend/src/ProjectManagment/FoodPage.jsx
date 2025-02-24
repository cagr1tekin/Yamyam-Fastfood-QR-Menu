import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodPage({ type }) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/foods?type=${type}`
        );
        setMenus(response.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchMenus();
  }, [type]);

  return (
    <div className="App">
      <div className="menu">
        {menus.map((item, index) => (
          <div key={index} className="menuOptions">
            <div className="foodImg">
              <img src={item.photo} alt="Görsel bulunamadı fakat çok seveceksiniz!!" />
              
            </div>
            <div className="foodBottomContent">
              <div className="foodName"><span>{item.name}</span></div>
              <div className="foodDescription"><span>{item.description}</span></div>
              <div className="foodPrice"><span>₺{item.price}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodPage;
