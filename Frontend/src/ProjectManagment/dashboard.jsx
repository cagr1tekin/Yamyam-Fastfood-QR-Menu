import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
  const [menuData, setMenuData] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    photo: ""
  });
  const [editFood, setEditFood] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/foods`);
        setMenuData(response.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchMenuData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login'; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/foods/createFood`,
        {
          ...newFood,
          price: parseFloat(newFood.price),
        }
      );
      setMenuData([...menuData, response.data]);
      setNewFood({ name: "", description: "", price: "", type: "", photo: "" });
      alert("Yiyecek başarıyla eklendi!");
    } catch (error) {
      console.error("Yiyecek ekleme hatası:", error);
      alert("Yiyecek eklenirken bir hata oluştu!");
    }
  };

  const handleEdit = (food) => {
    setEditFood(food);
    setNewFood(food);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/foods/updateFood/${editFood._id}`,
        newFood
      );
      const updatedMenu = menuData.map((item) =>
        item._id === editFood._id ? response.data : item
      );
      setMenuData(updatedMenu);
      setEditFood(null);
      setNewFood({ name: "", description: "", price: "", type: "", photo: ""});
      alert("Yiyecek başarıyla güncellendi!");
    } catch (error) {
      console.error("Yiyecek güncelleme hatası:", error);
      alert("Yiyecek güncellenirken bir hata oluştu!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/foods/deleteFood/${id}`);
      setMenuData(menuData.filter((food) => food._id !== id));
      alert("Yiyecek başarıyla silindi!");
    } catch (error) {
      console.error("Yiyecek silme hatası:", error);
      alert("Yiyecek silinirken bir hata oluştu!");
    }
  };

  const handleRedirect = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="App">
      <h1>Admin Panel</h1>
      
      <form onSubmit={editFood ? (e) => { e.preventDefault(); handleUpdate(); } : handleSubmit}>
        <input
          type="text"
          name="name"
          value={newFood.name}
          onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
          placeholder="Yiyecek Adı"
          required
        />
        <input
          type="text"
          name="description"
          value={newFood.description}
          onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
          placeholder="Açıklama"
          required
        />
        <input
          type="text"
          name="photo"
          value={newFood.photo}
          onChange={(e) => setNewFood({ ...newFood, photo: e.target.value })}
          placeholder="Fotoğraf Linki(imgur vs.)"
          required
        />
        <input
          type="number"
          name="price"
          value={newFood.price}
          onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
          placeholder="Fiyat"
          required
        />
        <select
          name="type"
          value={newFood.type}
          onChange={(e) => setNewFood({ ...newFood, type: e.target.value })}
          required
        >
          <option value="">Kategori Seç</option>
          <option value="Menus">Menü</option>
          <option value="Burgers">Burger</option>
          <option value="Burritos">Burrito</option>
          <option value="ByProducts">Yan Ürünler</option>
          <option value="Sauces">Soslar</option>
          <option value="Drinks">İçecekler</option>
        </select>
        <button type="submit">{editFood ? "Güncelle" : "Ekle"}</button>
      </form>
      <div>
            <h1>Admin Paneli</h1>
            <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      <ul>
        {menuData.map((food) => (
          <li key={food._id}>
            {food.name} - {food.price}TL ({food.type})
            <button onClick={() => handleEdit(food)}>Düzenle</button>
            <button onClick={() => handleDelete(food._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;