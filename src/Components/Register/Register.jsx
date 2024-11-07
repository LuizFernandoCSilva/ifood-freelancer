import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState("profissional");
  const [username, setUsername] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      userType,
      username,
      cpfCnpj,
      email,
      password,
    };
    
    console.log("Dados de Registro:", formData); // Verifique os dados antes de enviar
  
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Usuário registrado com sucesso:", data.message);
      } else {
        console.error("Erro ao registrar usuário:", data.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>

        <div className="select-field">
          <label>Tipo de Usuário:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="profissional">Profissional</option>
            <option value="contratante">Contratante</option>
          </select>
        </div>

        <div className="input-field">
          <label className={username ? "filled" : ""}>
            <span className={`label ${username ? "active" : ""}`}>Nome</span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div className="input-field">
          <label className={cpfCnpj ? "filled" : ""}>
            <span className={`label ${cpfCnpj ? "active" : ""}`}>CPF/CNPJ</span>
            <input
              type="text"
              required
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
            />
          </label>
        </div>

        <div className="input-field">
          <label className={email ? "filled" : ""}>
            <span className={`label ${email ? "active" : ""}`}>E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            />
          </label>
        </div>

        <button type="submit">Registrar</button>
        <div className="login-link">
          <p>
            Já tem uma conta? <Link to="/">Acessar</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
