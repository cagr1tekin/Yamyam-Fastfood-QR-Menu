import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function FoodPage({ type }) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/foods?type=${type}`
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
