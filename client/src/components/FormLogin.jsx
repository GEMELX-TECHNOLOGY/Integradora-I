import { useState } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";
import { useUser } from "@/context/UserContext"; // Asegúrate de importar el hook

function FormLogin({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useUser(); // Accede a loginUser desde el contexto

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        const userResponse = await api.get("/api/v1/user/", {
          headers: { Authorization: `Bearer ${res.data.access}` },
        });

        loginUser(res.data.access, userResponse.data); // Usa loginUser aquí

        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="input-wrapper mb-4">
        <label htmlFor="username" className="block font-semibold">
          Usuario
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div className="input-wrapper mb-4">
        <label htmlFor="password" className="block font-semibold">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="Contraseña"
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div className="extra-options flex justify-between items-center mb-4">
       
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex login-btn bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 justify-center items-center"
      >
        Iniciar sesión
      </button>
    </form>
  );
}

export default FormLogin;
