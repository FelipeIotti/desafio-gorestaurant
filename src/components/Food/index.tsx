import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface IFood {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string,
}

interface FoodProps {
  food: IFood[];
  handleDelete: (id:number)=> void;
  handleEditFood: (food:IFood[])=> void;
}

export function Food ({food,handleDelete,handleEditFood}: FoodProps) {

  async function toggleAvailable(id: number) {

    const  alteredFood = food.map(food=> food.id === id ? {
      id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      available: !food.available,
      image: food.image,
    }: food);

    await api.put(`/foods/${id}`, {alteredFood});

    
  }

  function setEditingFood () {
 
    handleEditFood(food);
  }

  return (
    <>
    {food.map(food=>(
      <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={toggleAvailable(food.id) && food.available}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
    ))}
    </>
  );

};

