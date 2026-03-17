import { useState } from "react";
import axios from "axios";

function App() {

  // ================= AUTH =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [storeName, setStoreName] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password,
      name: nameUser,
      role,
      storeName
    });

    alert("Registrado 🚀");
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    setUserRole(res.data.user.role);
  };

  // ================= DATA =================
  const [stores, setStores] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const loadStores = async () => {
    const res = await axios.get("http://localhost:5000/api/consumer/stores");
    setStores(res.data);
  };

  const loadOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/delivery/pending-orders");
    setOrders(res.data);
  };

  // ================= UI =================
  return (
    <div>
      <h1>Mini Rappi</h1>

      {/* LOGIN / REGISTER */}
      {userRole === null && (
        <>
          <h2>Register</h2>

          <input placeholder="name" onChange={e => setNameUser(e.target.value)} />
          <input placeholder="email" onChange={e => setEmail(e.target.value)} />
          <input placeholder="password" onChange={e => setPassword(e.target.value)} />

          <select onChange={e => setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="consumer">Consumer</option>
            <option value="store">Store</option>
            <option value="delivery">Delivery</option>
          </select>

          {role === "store" && (
            <input
              placeholder="store name"
              onChange={e => setStoreName(e.target.value)}
            />
          )}

          <button onClick={register}>Register</button>

          <h2>Login</h2>
          <button onClick={login}>Login</button>
        </>
      )}

      {/* CONSUMER */}
      {userRole === "consumer" && (
        <>
          <h2>Tiendas</h2>
          <button onClick={loadStores}>Ver tiendas</button>

          <ul>
            {stores.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </>
      )}

      {/* STORE */}
      {userRole === "store" && (
        <h2>Panel tienda 🏪</h2>
      )}

      {/* DELIVERY */}
      {userRole === "delivery" && (
        <>
          <h2>Pedidos</h2>
          <button onClick={loadOrders}>Ver pedidos</button>

          <ul>
            {orders.map((o) => (
              <li key={o.id}>{o.status}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;