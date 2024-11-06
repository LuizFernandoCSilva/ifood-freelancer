import { useState, useEffect } from "react";
import { FaDoorOpen, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // Armazenar o nome do backend
  const [email, setEmail] = useState(""); // Armazenar o email do localStorage

  const fetchData = async () => {
    try {
      const storedEmail = localStorage.getItem("email"); // Pega o email do localStorage
      if (!storedEmail) {
        console.error("Email não encontrado no localStorage");
        return;
      }
      setEmail(storedEmail); // Atualiza o estado com o email encontrado no localStorage

      const response = await api.get("/home", {
        headers: {
          email: storedEmail, // Envia o email no cabeçalho
        },
      });

      setName(response.data.name); // Atualiza o estado com o nome recebido
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Carrega os dados ao montar o componente
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <div className="home-container">
      {/* Botão de logout no canto superior direito */}
      <button onClick={handleLogout} className="logout-button">
        <FaDoorOpen size={24} />
      </button>

      {/* Header com barra de pesquisa */}
      <header className="header">
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar (Ex: Pedreiro)"
            className="search-bar"
          />
        </div>
      </header>

      <div className="content">
        {/* Lista de profissionais ou contratantes */}
        <section className="list-section">
          <div className="list-item">
            <h3>Profissional</h3>
            <p>Área de atuação, disponibilidade, localização</p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <button className="view-button">Verificar oferta!</button>
          </div>
          <div className="list-item">
            <h3>Contratante</h3>
            <p>Área de atuação, disponibilidade, localização</p>
            <div className="rating">⭐⭐⭐⭐</div>
            <button className="view-button">Verificar oferta!</button>
          </div>
        </section>

        {/* Painel de detalhes do profissional ou contratante */}
        <aside className="details-section">
          <div className="profile-pic"></div>
          <h4>{name}</h4> {/* Exibindo o nome recebido do backend */}
          <p>Email: {email}</p>{" "}
          {/* Exibindo o email recuperado do localStorage */}
          <p>Telefone: (xx) xxxx-xxxx</p>
          <p>Endereço: Rua Exemplo, 123</p>
          <p>Área de atuação: Pedreiro</p>
          <p>Disponibilidade: Disponível</p>
          <p>Descrição: Descrição do perfil</p>
        </aside>
      </div>
    </div>
  );
}

export default Home;
