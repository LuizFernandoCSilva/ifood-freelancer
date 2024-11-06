import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { email, password });
    try {
      const response = await api.post("auth/login", { email, password });
      const token = response.data.token; // Supondo que o token seja retornado
      localStorage.setItem("email", email); // Armazena o email
      localStorage.setItem("authToken", token); // Armazena o token
      navigate("/home", { replace: true }); // Usa replace para substituir o histórico
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login, tente novamente!");
      return;
    }
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Bem vindo(a)!</h1>
        <div className="input-field">
          <label className={email ? "filled" : ""}>
            <span className={`label ${email ? "active" : ""}`}>E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </label>
        </div>
        <div className="input-field">
          <label className={password ? "filled" : ""}>
            <span className={`label ${password ? "active" : ""}`}>Senha</span>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                WebkitTextSecurity: showPassword ? "none" : "disc",
              }}
            />
          </label>
          <span
            onClick={togglePasswordVisibility}
            className="toggle-password-visibility"
            style={{
              position: "absolute",
              right: "20px",
              top: "45%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <Link to="/forgot-password">Esqueceu sua senha?</Link>
        </div>
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/register">Registrar</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
