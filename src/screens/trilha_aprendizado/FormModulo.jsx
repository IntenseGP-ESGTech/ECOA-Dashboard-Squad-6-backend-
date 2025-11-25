import { useState } from "react";
import { X } from "lucide-react";
import "./form-modulo.css";

function FormModulo({ trilha, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    duracao: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.duracao.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adicionar Módulo à Trilha</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="trilha-context">
          <p><strong>Trilha:</strong> {trilha.nome}</p>
        </div>

        <form onSubmit={handleSubmit} className="modulo-form">
          <div className="form-group">
            <label htmlFor="nome">Nome do Módulo *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Introdução ao React"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duracao">Duração (Ex: 4 semanas, 20 horas) *</label>
            <input
              type="text"
              id="duracao"
              name="duracao"
              value={formData.duracao}
              onChange={handleChange}
              placeholder="Ex: 4 semanas"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Adicionar Módulo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormModulo;
