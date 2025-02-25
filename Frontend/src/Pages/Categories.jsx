import {useNavigate} from 'react-router-dom';
import '../Components/Navigation'

function Categories() {

    const navigate = useNavigate();

  return (
<>
    <div className='App'>
      <div className='categories'>
            <div onClick={() => navigate('/Menus')} className='categoriesOptions' id='optionsMenus'>
            
            <div className='triangle'></div>
            <span>menu</span>
            </div>
            <div onClick={() => navigate('/Burritos')} className='categoriesOptions' id='optionsBurritos'>
            <div className='triangle'></div>
            <span>burrito</span>
            </div>
            <div onClick={() => navigate('/Burgers')} className='categoriesOptions' id='optionsBurgers'>
            <div className='triangle'></div>
            <span>burger</span>
            </div>
            <div onClick={() => navigate('/ByProducts')} className='categoriesOptions' id='optionsByProducts'>
            <div className='triangle'></div>
            <span>sides</span>
            </div>
            <div onClick={() => navigate('/Drinks')} className='categoriesOptions' id='optionsDrinks'>
            <div className='triangle'></div>
            <span>drink</span>
            </div> 
            <div onClick={() => navigate('/Sauces')} className='categoriesOptions' id='optionsSauces'>
            <div className='triangle'></div>
             <span>sauce</span>
            </div> 
            
          </div>
    </div>
    
    </>  )
}

export default Categories