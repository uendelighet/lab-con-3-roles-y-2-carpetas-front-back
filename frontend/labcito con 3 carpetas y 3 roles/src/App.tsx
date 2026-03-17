import { useState } from "react";
import axios from "axios";

function App() {
  
type Store = {
  id: number;
  name: string;
  address: string;
};

type Order = {
  id: number;
  status: string;
}; 
  const [stores, setStores] = useState<Store[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [storeId, setStoreId] = useState("");

  // CONSUMER → ver tiendas
  const loadStores = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/consumer/stores"
    );

    setStores(res.data);
  };

  // STORE → crear producto
  const addProduct = async () => {

    await axios.post(
      "http://localhost:5000/api/store/add-product",
      {
        name: name,
        price: Number(price),
        store_id: Number(storeId)
      }
    );

    alert("producto creado");
  };

  // DELIVERY → ver pedidos pendientes
  const loadOrders = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/delivery/pending-orders"
    );

    setOrders(res.data);
  };

  return (
    <div>

      <h1>Mini Rappi</h1>

      {/* CONSUMER */}
      <h2>Ver Tiendas</h2>

      <button onClick={loadStores}>
        Ver tiendas
      </button>

      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} - {store.address}
          </li>
        ))}
      </ul>

      {/* STORE */}

      <h2>Crear Producto</h2>

      <input
        placeholder="nombre"
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="precio"
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        placeholder="store id"
        onChange={(e)=>setStoreId(e.target.value)}
      />

      <button onClick={addProduct}>
        Crear producto
      </button>

      {/* DELIVERY */}

      <h2>Pedidos Pendientes</h2>

      <button onClick={loadOrders}>
        Ver pedidos
      </button>

      <ul>
        {orders.map((order)=>(
          <li key={order.id}>
            Pedido #{order.id} - {order.status}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;