import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Edit2, BookOpen, Users, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./trilha_aprendizado.css";
import FormTrilha from "./FormTrilha";
import FormModulo from "./FormModulo";

function TrilhaAprendizado() {
  const [trilhas, setTrilhas] = useState([]);
  const API = 'http://localhost:3001';

  // Carrega trilhas do backend
  useEffect(() => {
    async function fetchTrilhas() {
      try {
        const res = await fetch(`${API}/trilhas`);
        if (res.ok) {
          const data = await res.json();
          setTrilhas(data);
        } else {
          console.error('Erro ao buscar trilhas', res.status);
        }
      } catch (err) {
        console.error('Erro na requisição de trilhas', err);
      }
    }
    fetchTrilhas();
  }, []);

  const [showFormTrilha, setShowFormTrilha] = useState(false);
  const [showFormModulo, setShowFormModulo] = useState(false);
  const [editingTrilha, setEditingTrilha] = useState(null);
  const [selectedTrilhaForModulo, setSelectedTrilhaForModulo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusLabel = (status) => {
    switch(status) {
      case 'em-andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
      case 'concluido': return 'Concluído';
      default: return status;
    }
  };

  const getProgressPercentage = (trilha) => {
    if (trilha.modulos.length === 0) return 0;
    const concluidos = trilha.modulos.filter(m => m.concluido).length;
    return Math.round((concluidos / trilha.modulos.length) * 100);
  };

  const handleAddTrilha = () => {
    setEditingTrilha(null);
    setShowFormTrilha(true);
  };

  const handleEditTrilha = (trilha) => {
    setEditingTrilha(trilha);
    setShowFormTrilha(true);
  };

  const handleSaveTrilha = async (formData) => {
    try {
      if (editingTrilha) {
        const res = await fetch(`${API}/trilhas/${editingTrilha.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const updated = await res.json();
          setTrilhas(trilhas.map(t => t.id === updated.id ? updated : t));
        }
      } else {
        const res = await fetch(`${API}/trilhas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const created = await res.json();
          setTrilhas(prev => [...prev, created]);
        }
      }
    } catch (err) {
      console.error('Erro salvando trilha', err);
    } finally {
      setShowFormTrilha(false);
      setEditingTrilha(null);
    }
  };

  const handleDeleteTrilha = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esta trilha?")) return;
    try {
      const res = await fetch(`${API}/trilhas/${id}`, { method: 'DELETE' });
      if (res.status === 204) {
        setTrilhas(prev => prev.filter(t => t.id !== id));
      } else {
        console.error('Erro ao deletar trilha', res.status);
      }
    } catch (err) {
      console.error('Erro na requisição delete trilha', err);
    }
  };

  const handleAddModulo = (trilha) => {
    setSelectedTrilhaForModulo(trilha);
    setShowFormModulo(true);
  };

  const handleSaveModulo = async (moduloData) => {
    if (!selectedTrilhaForModulo) return;
    try {
      const res = await fetch(`${API}/trilhas/${selectedTrilhaForModulo.id}/modulos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduloData)
      });
      if (res.ok) {
        const created = await res.json();
        setTrilhas(prev => prev.map(t => t.id === selectedTrilhaForModulo.id ? { ...t, modulos: [...t.modulos, created] } : t));
      }
    } catch (err) {
      console.error('Erro adicionando módulo', err);
    } finally {
      setShowFormModulo(false);
      setSelectedTrilhaForModulo(null);
    }
  };

  const handleDeleteModulo = async (trilhaId, moduloId) => {
    if (!window.confirm("Tem certeza que deseja deletar este módulo?")) return;
    try {
      const res = await fetch(`${API}/trilhas/${trilhaId}/modulos/${moduloId}`, { method: 'DELETE' });
      if (res.status === 204) {
        setTrilhas(prev => prev.map(t => t.id === trilhaId ? { ...t, modulos: t.modulos.filter(m => m.id !== moduloId) } : t));
      }
    } catch (err) {
      console.error('Erro deletando módulo', err);
    }
  };

  const handleToggleModuloConcluido = async (trilhaId, moduloId) => {
    try {
      const res = await fetch(`${API}/trilhas/${trilhaId}/modulos/${moduloId}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        const updated = await res.json();
        setTrilhas(prev => prev.map(t => t.id === trilhaId ? { ...t, modulos: t.modulos.map(m => m.id === updated.id ? updated : m) } : t));
      }
    } catch (err) {
      console.error('Erro toggling módulo', err);
    }
  };

  const filteredTrilhas = trilhas.filter(trilha => {
    const matchesSearch = trilha.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trilha.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && trilha.status === statusFilter;
  });

  return (
    <div className="dashboard-background">
      <div className="trilha-container">
        <div className="trilha-header">
          <h1>Trilhas de Aprendizado</h1>
          <p>Crie e gerencie trilhas de aprendizado para engajar seus alunos</p>
        </div>

        <div className="trilha-content">
          <button className="add-trilha-button" onClick={handleAddTrilha}>
            <Plus size={16} /> Nova Trilha
          </button>

          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar trilhas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-options">
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="em-andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </div>

          <div className="trilhas-grid">
            {filteredTrilhas.map(trilha => {
              const progress = getProgressPercentage(trilha);
              return (
                <div className="trilha-card" key={trilha.id}>
                  <div className="trilha-card-header">
                    <h3 className="trilha-title">
                      <BookOpen size={20} />
                      {trilha.nome}
                    </h3>
                    <div className="trilha-actions">
                      <button 
                        className="action-button edit"
                        onClick={() => handleEditTrilha(trilha)}
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="action-button delete"
                        onClick={() => handleDeleteTrilha(trilha.id)}
                        title="Deletar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="trilha-description">{trilha.descricao}</p>

                  <div className="trilha-meta">
                    <span><Users size={14} /> Responsável: {trilha.responsavel}</span>
                    <span className={`status-badge status-${trilha.status}`}>
                      {getStatusLabel(trilha.status)}
                    </span>
                  </div>

                  <div className="trilha-meta">
                    <span><Clock size={14} /> Criado: {new Date(trilha.dataC).toLocaleDateString('pt-BR')}</span>
                    <span><Clock size={14} /> Prazo: {new Date(trilha.dataPrevista).toLocaleDateString('pt-BR')}</span>
                  </div>

                  <div className="trilha-progress">
                    <div className="progress-label">
                      <span>Progresso dos Módulos</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="modulos-section">
                    <h4>Módulos ({trilha.modulos.length})</h4>
                    <div className="modulos-list">
                      {trilha.modulos.length > 0 ? (
                        trilha.modulos.map(modulo => (
                          <div className="modulo-item" key={modulo.id}>
                            <div className="modulo-info">
                              <input
                                type="checkbox"
                                checked={modulo.concluido}
                                onChange={() => handleToggleModuloConcluido(trilha.id, modulo.id)}
                                className="modulo-checkbox"
                              />
                              <div className="modulo-details">
                                <p className={modulo.concluido ? 'modulo-name concluido' : 'modulo-name'}>
                                  {modulo.nome}
                                </p>
                                <p className="modulo-duration">{modulo.duracao}</p>
                              </div>
                              {modulo.concluido && <CheckCircle size={16} className="modulo-check" />}
                            </div>
                            <button
                              className="modulo-delete"
                              onClick={() => handleDeleteModulo(trilha.id, modulo.id)}
                              title="Deletar módulo"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="no-modulos">Nenhum módulo adicionado</p>
                      )}
                    </div>
                    <button
                      className="add-modulo-button"
                      onClick={() => handleAddModulo(trilha)}
                    >
                      <Plus size={14} /> Adicionar Módulo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTrilhas.length === 0 && (
            <div className="no-results">
              <BookOpen size={48} />
              <p>Nenhuma trilha encontrada</p>
            </div>
          )}

          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={16} /> Voltar para o Dashboard
          </Link>
        </div>
      </div>

      {showFormTrilha && (
        <FormTrilha
          trilha={editingTrilha}
          onSave={handleSaveTrilha}
          onClose={() => {
            setShowFormTrilha(false);
            setEditingTrilha(null);
          }}
        />
      )}

      {showFormModulo && selectedTrilhaForModulo && (
        <FormModulo
          trilha={selectedTrilhaForModulo}
          onSave={handleSaveModulo}
          onClose={() => {
            setShowFormModulo(false);
            setSelectedTrilhaForModulo(null);
          }}
        />
      )}
    </div>
  );
}

export default TrilhaAprendizado;
