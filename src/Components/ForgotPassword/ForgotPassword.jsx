import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Recuperação de senha para o email:", email);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Recuperar Senha</h1>
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
        <button type="submit">Enviar e-mail de recuperação</button>
        <button type="button" className="back-button" onClick={() => navigate("/")}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
