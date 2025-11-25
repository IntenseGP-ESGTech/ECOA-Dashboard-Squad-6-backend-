import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./form-trilha.css";

function FormTrilha({ trilha, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    responsavel: "",
    dataC: new Date().toISOString().split('T')[0],
    dataPrevista: "",
    status: "pendente"
  });

  useEffect(() => {
    if (trilha) {
      setFormData({
        nome: trilha.nome,
        descricao: trilha.descricao,
        responsavel: trilha.responsavel,
        dataC: trilha.dataC,
        dataPrevista: trilha.dataPrevista,
        status: trilha.status
      });
    }
  }, [trilha]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.descricao.trim() || !formData.responsavel.trim() || !formData.dataPrevista) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{trilha ? "Editar Trilha" : "Nova Trilha de Aprendizado"}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="trilha-form">
          <div className="form-group">
            <label htmlFor="nome">Nome da Trilha *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Desenvolvimento Web com React"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição *</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva os objetivos e conteúdo da trilha..."
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="responsavel">Responsável *</label>
            <input
              type="text"
              id="responsavel"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              placeholder="Nome do responsável pela trilha"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataC">Data de Criação</label>
              <input
                type="date"
                id="dataC"
                name="dataC"
                value={formData.dataC}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataPrevista">Data Prevista de Conclusão *</label>
              <input
                type="date"
                id="dataPrevista"
                name="dataPrevista"
                value={formData.dataPrevista}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pendente">Pendente</option>
              <option value="em-andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              {trilha ? "Atualizar Trilha" : "Criar Trilha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormTrilha;
