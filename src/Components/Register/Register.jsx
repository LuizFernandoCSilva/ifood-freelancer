import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Services/api";

const Register = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userType) {
      alert("Por favor, selecione o tipo de usuário.");
      return; // Não prossegue se o tipo de usuário não for selecionado
    }

    const data = {
      name: username,
      cpfCnpj: cpfCnpj,
      email: email,
      password: password,
    };

    console.log("Dados de Registro:", data); // Verifique os dados antes de enviar

    try {
      // Usando o userType para definir a URL da requisição
      await api.post(`/user/create/${userType}`, data);
      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao criar usuário, tente novamente!");
    }

    // Limpar os estados após o envio
    setUsername("");
    setCpfCnpj("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>

        <div className="select-field">
          <label>Tipo de Usuário:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Selecione</option>
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
              type="password" // Alterado para "password"
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
