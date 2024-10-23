import { useState, useContext } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";
import { UserContext } from "@/context/UserContext";

function FormLogin({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
        console.log(res.data)
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
        <div>
          <input type="checkbox" id="remember" className="mr-1" />
          <label htmlFor="remember" className="text-sm">
            Recordarme
          </label>
        </div>
        <a href="#" className="text-blue-500 text-sm hover:underline">
          ¿Has olvidado tu contraseña?
        </a>
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
