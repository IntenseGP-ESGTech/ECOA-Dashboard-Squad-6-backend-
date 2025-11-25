// ============================================================================
// EXEMPLO DE COMO INTEGRAR COM A API (Back-end)
// ============================================================================
// Este arquivo mostra como modificar os componentes para usar uma API real
// em vez de dados locais (mock data).

// ============================================================================
// 1. CRIAR ARQUIVO DE SERVIÇO (api/trilhaService.js)
// ============================================================================

const API_BASE_URL = "http://localhost:3000/api";

export const trilhaService = {
  // Listar todas as trilhas
  async getTrilhas() {
    try {
      const response = await fetch(`${API_BASE_URL}/trilhas`);
      if (!response.ok) throw new Error("Erro ao buscar trilhas");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },

  // Obter trilha por ID
  async getTrilhaById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/trilhas/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar trilha");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },

  // Criar nova trilha
  async createTrilha(trilhaData) {
    try {
      const response = await fetch(`${API_BASE_URL}/trilhas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trilhaData),
      });
      if (!response.ok) throw new Error("Erro ao criar trilha");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },

  // Atualizar trilha
  async updateTrilha(id, trilhaData) {
    try {
      const response = await fetch(`${API_BASE_URL}/trilhas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trilhaData),
      });
      if (!response.ok) throw new Error("Erro ao atualizar trilha");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },

  // Deletar trilha
  async deleteTrilha(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/trilhas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar trilha");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },

  // ===== MÓDULOS =====
  // Adicionar módulo a uma trilha
  async addModulo(trilhaId, moduloData) {
    try {
      const response = await fetch(`${API_BASE_URL}/trilhas/${trilhaId}/modulos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduloData),
      });
      if (!response.ok) throw new Error("Erro ao adicionar módulo");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },

  // Deletar módulo
  async deleteModulo(trilhaId, moduloId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trilhas/${trilhaId}/modulos/${moduloId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Erro ao deletar módulo");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },

  // Atualizar módulo
  async updateModulo(trilhaId, moduloId, moduloData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trilhas/${trilhaId}/modulos/${moduloId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(moduloData),
        }
      );
      if (!response.ok) throw new Error("Erro ao atualizar módulo");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },
};

// ============================================================================
// 2. MODIFICAR index.jsx PARA USAR A API
// ============================================================================

/*
import { useState, useEffect } from "react";
import { trilhaService } from "./trilhaService";

function TrilhaAprendizado() {
  const [trilhas, setTrilhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar trilhas ao montar o componente
  useEffect(() => {
    loadTrilhas();
  }, []);

  const loadTrilhas = async () => {
    try {
      setLoading(true);
      const data = await trilhaService.getTrilhas();
      setTrilhas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrilha = async (formData) => {
    try {
      if (editingTrilha) {
        await trilhaService.updateTrilha(editingTrilha.id, formData);
      } else {
        await trilhaService.createTrilha(formData);
      }
      loadTrilhas(); // Recarregar lista
      setShowFormTrilha(false);
      setEditingTrilha(null);
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  const handleDeleteTrilha = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta trilha?")) {
      try {
        await trilhaService.deleteTrilha(id);
        loadTrilhas(); // Recarregar lista
      } catch (err) {
        alert("Erro: " + err.message);
      }
    }
  };

  const handleSaveModulo = async (moduloData) => {
    if (selectedTrilhaForModulo) {
      try {
        await trilhaService.addModulo(selectedTrilhaForModulo.id, moduloData);
        loadTrilhas(); // Recarregar lista
        setShowFormModulo(false);
        setSelectedTrilhaForModulo(null);
      } catch (err) {
        alert("Erro: " + err.message);
      }
    }
  };

  const handleToggleModuloConcluido = async (trilhaId, moduloId, concluido) => {
    try {
      await trilhaService.updateModulo(trilhaId, moduloId, { 
        concluido: !concluido 
      });
      loadTrilhas(); // Recarregar lista
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  // ... resto do componente
}
*/

// ============================================================================
// 3. ROTAS DE API ESPERADAS NO BACK-END
// ============================================================================

/*
Rotas RESTful esperadas:

GET /api/trilhas
- Retorna lista de todas as trilhas
- Response: Array de Trilhas

GET /api/trilhas/:id
- Retorna trilha específica com seus módulos
- Response: Trilha com Módulos

POST /api/trilhas
- Cria nova trilha
- Body: { nome, descricao, responsavel, dataPrevista, status }
- Response: Trilha criada com ID

PUT /api/trilhas/:id
- Atualiza trilha
- Body: { nome, descricao, responsavel, dataPrevista, status }
- Response: Trilha atualizada

DELETE /api/trilhas/:id
- Deleta trilha e seus módulos
- Response: { mensagem: "Trilha deletada com sucesso" }

GET /api/trilhas/:id/modulos
- Lista todos os módulos de uma trilha
- Response: Array de Módulos

POST /api/trilhas/:id/modulos
- Adiciona módulo a uma trilha
- Body: { nome, duracao }
- Response: Módulo criado com ID

PUT /api/trilhas/:id/modulos/:moduloId
- Atualiza módulo
- Body: { nome, duracao, concluido }
- Response: Módulo atualizado

DELETE /api/trilhas/:id/modulos/:moduloId
- Deleta módulo
- Response: { mensagem: "Módulo deletado com sucesso" }
*/

// ============================================================================
// 4. ESTRUTURA DO BANCO DE DADOS
// ============================================================================

/*
TRILHAS
- id: PK (UUID)
- nome: VARCHAR(255) NOT NULL
- descricao: TEXT NOT NULL
- responsavel: VARCHAR(255) NOT NULL
- data_criacao: DATETIME DEFAULT CURRENT_TIMESTAMP
- data_prevista: DATE NOT NULL
- status: ENUM('pendente', 'em-andamento', 'concluido') DEFAULT 'pendente'
- created_at: DATETIME DEFAULT CURRENT_TIMESTAMP
- updated_at: DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

MODULOS
- id: PK (UUID)
- trilha_id: FK -> TRILHAS.id (ON DELETE CASCADE)
- nome: VARCHAR(255) NOT NULL
- duracao: VARCHAR(100) NOT NULL
- concluido: BOOLEAN DEFAULT FALSE
- ordem: INT
- created_at: DATETIME DEFAULT CURRENT_TIMESTAMP
- updated_at: DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

INDEX:
- trilha_id em MODULOS
- status em TRILHAS
*/

// ============================================================================
// 5. EXEMPLO DE RESPONSE DO BACK-END
// ============================================================================

const exampleGetTrilhasResponse = [
  {
    id: "1",
    nome: "Desenvolvimento Web com React",
    descricao: "Aprenda React do zero ao avançado com projetos práticos",
    responsavel: "Carlos Silva",
    dataC: "2025-01-15",
    dataPrevista: "2025-06-30",
    status: "em-andamento",
    modulos: [
      { id: "1", nome: "Introdução ao React", duracao: "4 semanas", concluido: true },
      { id: "2", nome: "Componentes e Props", duracao: "3 semanas", concluido: true },
      { id: "3", nome: "Hooks e Estado", duracao: "4 semanas", concluido: false },
    ]
  }
];

// ============================================================================
// 6. TRATAMENTO DE ERROS
// ============================================================================

/*
Códigos de erro esperados:

400 Bad Request - Dados inválidos
401 Unauthorized - Não autenticado
403 Forbidden - Sem permissão
404 Not Found - Recurso não existe
409 Conflict - Conflito (ex: nome duplicado)
500 Internal Server Error - Erro do servidor

Exemplo de resposta de erro:
{
  error: true,
  message: "Erro descritivo",
  code: "ERROR_CODE",
  statusCode: 400
}
*/

// ============================================================================
// 7. HOOKS CUSTOMIZADOS (Opcional)
// ============================================================================

/*
import { useState, useCallback } from "react";
import { trilhaService } from "./trilhaService";

export const useTrilhas = () => {
  const [trilhas, setTrilhas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrilhas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await trilhaService.getTrilhas();
      setTrilhas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { trilhas, loading, error, fetchTrilhas };
};
*/

export {};
