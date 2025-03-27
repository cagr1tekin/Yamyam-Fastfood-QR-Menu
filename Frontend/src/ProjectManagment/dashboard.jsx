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
    window.location.href = '/#/Login'; 
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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>YamYam Admin Panel</h1>
        <button onClick={handleLogout}>Çıkış Yap</button>
      </header>

      <form className="add-food-form" onSubmit={editFood ? (e) => { e.preventDefault(); handleUpdate(); } : handleSubmit}>
        <div className="form-group">
          <label>Yemek Adı:</label>
          <input
            type="text"
            name="name"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Açıklama:</label>
          <textarea
            name="description"
            value={newFood.description}
            onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Fotoğraf Linki:</label>
          <input
            type="text"
            name="photo"
            value={newFood.photo}
            onChange={(e) => setNewFood({ ...newFood, photo: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Fiyat:</label>
          <input
            type="number"
            name="price"
            value={newFood.price}
            onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Kategori:</label>
          <select
            name="type"
            value={newFood.type}
            onChange={(e) => setNewFood({ ...newFood, type: e.target.value })}
            required
          >
            <option value="">Kategori Seç</option>
            <option value="Menus">Menüler</option>
            <option value="Burgers">Burgerlar</option>
            <option value="Burritos">Burritolar</option>
            <option value="ByProducts">Yan Ürünler</option>
            <option value="Sauces">Soslar</option>
            <option value="Drinks">İçecekler</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          {editFood ? "Güncelle" : "Ekle"}
        </button>
      </form>

      <div className="food-list">
        {menuData.map((food) => (
          <div key={food._id} className="food-item">
            <div className="food-item-header">
              <span className="food-item-name">{food.name}</span>
              <span className="food-item-price">{food.price}₺</span>
            </div>
            <p className="food-item-description">{food.description}</p>
            <div className="food-item-category">Kategori: {food.type}</div>
            {food.photo && (
              <div className="food-item-photo">
                <img src={food.photo} alt={food.name} />
              </div>
            )}
            <div className="food-item-actions">
              <button className="edit-button" onClick={() => handleEdit(food)}>
                Düzenle
              </button>
              <button className="delete-button" onClick={() => handleDelete(food._id)}>
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;