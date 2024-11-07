import React, { useState } from 'react';
import { FaDoorOpen, FaSearch, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const professionals = [
        { name: 'João - Contratante', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐⭐' },
        { name: 'Pedro - Profissional', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐' },
        { name: 'Maria - Profissional', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐⭐' },
        { name: 'Ana - Contratante', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐' },
        { name: 'Carlos - Profissional', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐' },
        { name: 'Lucas - Contratante', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐⭐' },
        { name: 'Fernanda - Profissional', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐' },
        { name: 'Paulo - Contratante', details: 'Área de atuação, disponibilidade, localização', rating: '⭐' },
        { name: 'Juliana - Profissional', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐' },
        { name: 'Ricardo - Contratante', details: 'Área de atuação, disponibilidade, localização', rating: '⭐⭐⭐⭐⭐' },    
];



function ProfessionalList({ professionals, onShowOffer }) {
    return (
        <section className="list-section" style={{ flex: '3', borderRight: '1px solid #ddd', paddingRight: '20px', overflowY: 'scroll', maxHeight: '600px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold', color: '#8B4513' }}>
                Ofertas mais próximas de você:
            </h2>
            {professionals.map((professional, index) => (
                <div key={index} className="list-item" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#ddd', borderRadius: '50%', marginRight: '15px' }}></div>
                    <div style={{ flex: '1' }}>
                        <h3 style={{ margin: '0 0 8px' }}>{professional.name}</h3>
                        <p>{professional.details}</p>
                        <div className="rating">{professional.rating}</div>
                    </div>
                    <button
                        className="view-button"
                        style={{ padding: '10px 20px', backgroundColor: '#8B4513', color: '#fff', borderRadius: '4px', border: 'none', fontWeight: 'bold' }}
                        onClick={() => onShowOffer(professional)}
                    >
                        Verificar Oferta!
                    </button>
                </div>
            ))}
        </section>
    );
}


function OfferModal({ professional, onClose, onNext }) {
    const isContractor = professional.name.includes('Contratante'); 

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '90%',
                position: 'relative',
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                }}>X</button>
                <h2>{professional.name}</h2>
                <p>{professional.details}</p>
                <p><strong>Descrição:</strong> {professional.description}</p>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {isContractor ? (
                        <button onClick={() => onNext(professional)} style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            borderRadius: '4px',
                            border: 'none',
                            fontWeight: 'bold',
                            marginTop: '20px',
                            cursor: 'pointer',
                        }}>
                            Dar uma mãozinha
                        </button>
                    ) : (
                        <button onClick={() => onNext(professional)} style={{
                            padding: '10px 20px',
                            backgroundColor: '#8B4513',
                            color: '#fff',
                            borderRadius: '4px',
                            border: 'none',
                            fontWeight: 'bold',
                            marginTop: '20px',
                            cursor: 'pointer',
                        }}>
                            Pedir uma mãozinha
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function HelpFormModal({ professional, onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '90%',
                position: 'relative',
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                }}>X</button>
                <h2>{professional.name}</h2>
                <p>OFERTA:</p>
                <textarea
                    placeholder="Descrição"
                    style={{
                        width: '100%',
                        height: '100px',
                        marginTop: '10px',
                        marginBottom: '20px',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                    }}
                ></textarea>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        borderRadius: '4px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}>
                        ENVIAR
                    </button>
                </div>
            </div>
        </div>
    );
}

function Home() {
    const navigate = useNavigate();
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [isHelpFormOpen, setIsHelpFormOpen] = useState(false);

    const handleLogout = () => {
        navigate("/"); 
    };

    const handleShowOffer = (professional) => {
        setSelectedProfessional(professional);
    };

    const handleCloseOffer = () => {
        setSelectedProfessional(null);
    };

    const handleNextToHelpForm = (professional) => {
        setIsHelpFormOpen(true);
    };

    const handleCloseHelpForm = () => {
        setIsHelpFormOpen(false);
        setSelectedProfessional(null);
    };

    return (
        <div className="home-container" style={{ position: 'relative' }}>
            {/* Botão de Logout */}
            <button
                onClick={handleLogout}
                className="logout-button"
                style={{
                    position: 'absolute',
                    top: '25px',
                    right: '40px',
                    zIndex: '10', // Certifique-se de que ele fique acima do conteúdo com blur
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                <FaDoorOpen size={24} />
            </button>

            {/* Cabeçalho e Barra de Pesquisa */}
            <header
                className="header"
                style={{
                    filter: (selectedProfessional || isHelpFormOpen) ? 'blur(4px)' : 'none',
                }}
            >
                <div className="search-bar-container">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Pesquisar (Ex: Pedreiro)" className="search-bar" />
                </div>
            </header>

            {/* Conteúdo Principal */}
            <div
                className="content"
                style={{
                    display: 'flex',
                    filter: (selectedProfessional || isHelpFormOpen) ? 'blur(4px)' : 'none',
                }}
            >
                <ProfessionalList professionals={professionals} onShowOffer={handleShowOffer} />
                <aside className="details-section" style={{ flex: '1', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginLeft: '20px', maxHeight: 'fit-content', position: 'relative' }}>
                    <button style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <FaEdit size={20} color="#8B4513" />
                    </button>
                    <div className="profile-pic" style={{ width: '100px', height: '100px', backgroundColor: '#ddd', borderRadius: '50%', marginBottom: '20px' }}></div>
                    <h4>Nome</h4>
                    <p>Email: example@example.com</p>
                    <p>Telefone: (xx) xxxx-xxxx</p>
                    <p>Endereço: Rua Exemplo, 123</p>
                    <p>Área de atuação: Pedreiro</p>
                    <p>Disponibilidade: Disponível</p>
                    <p>Descrição: Descrição do perfil</p>
                </aside>
            </div>

            {/* Modais */}
            {selectedProfessional && !isHelpFormOpen && (
                <OfferModal
                    professional={selectedProfessional}
                    onClose={handleCloseOffer}
                    onNext={handleNextToHelpForm}
                />
            )}

            {isHelpFormOpen && (
                <HelpFormModal
                    professional={selectedProfessional}
                    onClose={handleCloseHelpForm}
                />
            )}
        </div>
    );
}


export default Home;
