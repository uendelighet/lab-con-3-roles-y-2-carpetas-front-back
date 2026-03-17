import { useState } from "react";
import axios from "axios";

// TIPOS (TypeScript feliz 🧘)
type Store = {
  id: number;
  name: string;
  address: string;
};

type Order = {
  id: number;
  status: string;
};

function App() {

  // estados
  const [stores, setStores] = useState<Store[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [storeId, setStoreId] = useState("");

  const [productId, setProductId] = useState("");

  // =========================
  // CONSUMER → ver tiendas
  // =========================
  const loadStores = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/consumer/stores"
      );
      setStores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // STORE → crear producto
  // =========================
  const addProduct = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/store/add-product",
        {
          name,
          price: Number(price),
          store_id: Number(storeId)
        }
      );

      alert("Producto creado 🚀");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CONSUMER → crear pedido
  // =========================
  const createOrder = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/consumer/create-order",
        {
          product_id: Number(productId)
        }
      );

      alert("Pedido creado 🧾");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELIVERY → ver pedidos
  // =========================
  const loadOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/delivery/pending-orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Mini Rappi</h1>

      {/* ========================= */}
      {/* CONSUMER */}
      {/* ========================= */}

      <h2>Tiendas</h2>

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

      {/* ========================= */}
      {/* STORE */}
      {/* ========================= */}

      <h2>Crear Producto</h2>

      <input
        placeholder="nombre"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="precio"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="store id"
        onChange={(e) => setStoreId(e.target.value)}
      />

      <button onClick={addProduct}>
        Crear producto
      </button>

      {/* ========================= */}
      {/* CONSUMER → PEDIDO */}
      {/* ========================= */}

      <h2>Crear Pedido</h2>

      <input
        placeholder="product id"
        onChange={(e) => setProductId(e.target.value)}
      />

      <button onClick={createOrder}>
        Crear pedido
      </button>

      {/* ========================= */}
      {/* DELIVERY */}
      {/* ========================= */}

      <h2>Pedidos Pendientes</h2>

      <button onClick={loadOrders}>
        Ver pedidos
      </button>

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Pedido #{order.id} - {order.status}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;