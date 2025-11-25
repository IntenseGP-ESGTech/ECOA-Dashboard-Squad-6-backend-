import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Edit2, BookOpen, Users, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./trilha_aprendizado.css";
import FormTrilha from "./FormTrilha";
import FormModulo from "./FormModulo";

/**
 * EXEMPLO DE USO E DOCUMENTAÇÃO DO COMPONENTE
 * 
 * Este arquivo demonstra como usar o componente TrilhaAprendizado
 * em diferentes cenários e como estendê-lo com funcionalidades adicionais.
 */

/**
 * ============================================================================
 * 1. USO BÁSICO DO COMPONENTE
 * ============================================================================
 */

// Para usar em uma rota:
// <Route path="/trilha-aprendizado" element={<TrilhaAprendizado />} />

/**
 * ============================================================================
 * 2. ESTRUTURA DE DADOS
 * ============================================================================
 */

const ESTRUTURA_TRILHA = {
  id: 1,                          // Identificador único (gerado pelo backend)
  nome: "React Avançado",          // Nome da trilha
  descricao: "Aprenda React...",   // Descrição completa
  responsavel: "João",             // Responsável pela trilha
  dataC: "2025-01-15",            // Data de criação (formato ISO)
  dataPrevista: "2025-06-30",    // Data prevista de conclusão
  status: "em-andamento",         // Pode ser: "pendente", "em-andamento", "concluido"
  modulos: [                       // Array de módulos
    {
      id: 1,
      nome: "Introdução",
      duracao: "4 semanas",
      concluido: true
    }
  ]
};

/**
 * ============================================================================
 * 3. CAMPOS DO FORMULÁRIO DE TRILHA
 * ============================================================================
 */

const CAMPOS_TRILHA = {
  nome: {
    tipo: "text",
    obrigatorio: true,
    placeholder: "Ex: Desenvolvimento Web com React",
    descricao: "Nome descritivo da trilha",
    validacao: "Mínimo 3 caracteres"
  },
  descricao: {
    tipo: "textarea",
    obrigatorio: true,
    placeholder: "Descreva os objetivos e conteúdo...",
    descricao: "Descrição detalhada dos tópicos",
    validacao: "Mínimo 10 caracteres"
  },
  responsavel: {
    tipo: "text",
    obrigatorio: true,
    placeholder: "Nome do responsável",
    descricao: "Quem será responsável pela trilha",
    validacao: "Campo obrigatório"
  },
  dataC: {
    tipo: "date",
    obrigatorio: false,
    descricao: "Data de criação (auto-preenchida)",
    disabled: true
  },
  dataPrevista: {
    tipo: "date",
    obrigatorio: true,
    descricao: "Data prevista de conclusão",
    validacao: "Deve ser maior que hoje"
  },
  status: {
    tipo: "select",
    obrigatorio: false,
    opcoes: ["pendente", "em-andamento", "concluido"],
    descricao: "Estado atual da trilha"
  }
};

/**
 * ============================================================================
 * 4. CAMPOS DO FORMULÁRIO DE MÓDULO
 * ============================================================================
 */

const CAMPOS_MODULO = {
  nome: {
    tipo: "text",
    obrigatorio: true,
    placeholder: "Ex: Introdução ao React",
    descricao: "Nome do módulo",
    validacao: "Mínimo 3 caracteres"
  },
  duracao: {
    tipo: "text",
    obrigatorio: true,
    placeholder: "Ex: 4 semanas, 20 horas",
    descricao: "Duração estimada do módulo",
    validacao: "Deve incluir tempo (semanas/horas)"
  }
};

/**
 * ============================================================================
 * 5. CORES E STATUS
 * ============================================================================
 */

const STATUS_CONFIG = {
  pendente: {
    label: "Pendente",
    cor: "#6c757d",
    classe: "status-pendente",
    descricao: "Trilha ainda não iniciada"
  },
  "em-andamento": {
    label: "Em Andamento",
    cor: "#ffc107",
    classe: "status-em-andamento",
    descricao: "Trilha em progresso"
  },
  concluido: {
    label: "Concluído",
    cor: "#28a745",
    classe: "status-concluido",
    descricao: "Trilha finalizada"
  }
};

/**
 * ============================================================================
 * 6. CÁLCULOS E UTILITÁRIOS
 * ============================================================================
 */

// Calcular percentual de progresso
export const calcularProgresso = (trilha) => {
  if (!trilha.modulos || trilha.modulos.length === 0) return 0;
  const concluidos = trilha.modulos.filter(m => m.concluido).length;
  return Math.round((concluidos / trilha.modulos.length) * 100);
};

// Formatar data para formato brasileiro
export const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Validar data prevista
export const validarDataPrevista = (data) => {
  const hoje = new Date();
  return new Date(data) > hoje;
};

/**
 * ============================================================================
 * 7. EXEMPLO DE INTEGRAÇÃO COM API
 * ============================================================================
 */

/*
// Exemplo de como chamar a API:

const handleSaveTrilha = async (formData) => {
  try {
    if (editingTrilha) {
      // Atualizar trilha existente
      const response = await fetch(`/api/trilhas/${editingTrilha.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const updated = await response.json();
      setTrilhas(trilhas.map(t => t.id === updated.id ? updated : t));
    } else {
      // Criar nova trilha
      const response = await fetch('/api/trilhas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newTrilha = await response.json();
      setTrilhas([...trilhas, newTrilha]);
    }
    setShowFormTrilha(false);
  } catch (error) {
    console.error('Erro ao salvar trilha:', error);
    alert('Erro ao salvar trilha: ' + error.message);
  }
};
*/

/**
 * ============================================================================
 * 8. EXEMPLO DE FILTROS AVANÇADOS
 * ============================================================================
 */

// Filtrar por múltiplos critérios
export const filtrarTrilhas = (trilhas, filtros) => {
  return trilhas.filter(trilha => {
    const matchStatus = !filtros.status || trilha.status === filtros.status;
    const matchSearch = !filtros.search || 
      trilha.nome.toLowerCase().includes(filtros.search.toLowerCase()) ||
      trilha.descricao.toLowerCase().includes(filtros.search.toLowerCase());
    const matchResponsavel = !filtros.responsavel || 
      trilha.responsavel === filtros.responsavel;
    
    return matchStatus && matchSearch && matchResponsavel;
  });
};

// Ordenar trilhas
export const ordenarTrilhas = (trilhas, ordenacao) => {
  const copia = [...trilhas];
  
  switch(ordenacao) {
    case 'nome-asc':
      return copia.sort((a, b) => a.nome.localeCompare(b.nome));
    case 'nome-desc':
      return copia.sort((a, b) => b.nome.localeCompare(a.nome));
    case 'data-desc':
      return copia.sort((a, b) => new Date(b.dataC) - new Date(a.dataC));
    case 'progresso-desc':
      return copia.sort((a, b) => calcularProgresso(b) - calcularProgresso(a));
    default:
      return copia;
  }
};

/**
 * ============================================================================
 * 9. EXEMPLO DE RELATÓRIO DE TRILHAS
 * ============================================================================
 */

export const gerarRelatoriaTrilhas = (trilhas) => {
  const total = trilhas.length;
  const concluidas = trilhas.filter(t => t.status === 'concluido').length;
  const emAndamento = trilhas.filter(t => t.status === 'em-andamento').length;
  const pendentes = trilhas.filter(t => t.status === 'pendente').length;
  
  const totalModulos = trilhas.reduce((sum, t) => sum + (t.modulos?.length || 0), 0);
  const modulosConcluidos = trilhas.reduce((sum, t) => 
    sum + (t.modulos?.filter(m => m.concluido).length || 0), 0
  );
  
  return {
    resumo: {
      totalTrilhas: total,
      trilhasConcluidas: concluidas,
      trilhasEmAndamento: emAndamento,
      trilhasPendentes: pendentes,
      percentualConclusao: total > 0 ? Math.round((concluidas / total) * 100) : 0
    },
    modulos: {
      total: totalModulos,
      concluidos: modulosConcluidos,
      percentualConclusao: totalModulos > 0 ? Math.round((modulosConcluidos / totalModulos) * 100) : 0
    },
    responsaveis: [...new Set(trilhas.map(t => t.responsavel))]
  };
};

/**
 * ============================================================================
 * 10. EXEMPLO DE EXPORTAÇÃO DE DADOS
 * ============================================================================
 */

// Exportar trilhas como JSON
export const exportarJSON = (trilhas) => {
  const dataStr = JSON.stringify(trilhas, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trilhas_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

// Exportar para CSV
export const exportarCSV = (trilhas) => {
  let csv = 'Nome,Descrição,Responsável,Status,Data Criação,Data Prevista,Módulos\n';
  
  trilhas.forEach(trilha => {
    csv += `"${trilha.nome}","${trilha.descricao}","${trilha.responsavel}","${trilha.status}","${trilha.dataC}","${trilha.dataPrevista}","${trilha.modulos.length}"\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trilhas_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

/**
 * ============================================================================
 * 11. EXEMPLO DE NOTIFICAÇÕES
 * ============================================================================
 */

export const notificacoes = {
  sucesso: (mensagem) => {
    console.log('✅', mensagem);
    // Aqui você poderia integrar com uma biblioteca de toast/notificação
  },
  erro: (mensagem) => {
    console.error('❌', mensagem);
    // Aqui você poderia integrar com uma biblioteca de toast/notificação
  },
  aviso: (mensagem) => {
    console.warn('⚠️', mensagem);
    // Aqui você poderia integrar com uma biblioteca de toast/notificação
  }
};

/**
 * ============================================================================
 * 12. VALIDAÇÕES
 * ============================================================================
 */

export const validarTrilha = (trilha) => {
  const erros = [];
  
  if (!trilha.nome || trilha.nome.trim().length < 3) {
    erros.push('Nome deve ter pelo menos 3 caracteres');
  }
  
  if (!trilha.descricao || trilha.descricao.trim().length < 10) {
    erros.push('Descrição deve ter pelo menos 10 caracteres');
  }
  
  if (!trilha.responsavel || trilha.responsavel.trim().length < 3) {
    erros.push('Responsável inválido');
  }
  
  if (!trilha.dataPrevista) {
    erros.push('Data prevista é obrigatória');
  } else if (new Date(trilha.dataPrevista) <= new Date()) {
    erros.push('Data prevista deve ser no futuro');
  }
  
  return {
    valido: erros.length === 0,
    erros
  };
};

export const validarModulo = (modulo) => {
  const erros = [];
  
  if (!modulo.nome || modulo.nome.trim().length < 3) {
    erros.push('Nome do módulo deve ter pelo menos 3 caracteres');
  }
  
  if (!modulo.duracao || modulo.duracao.trim().length < 2) {
    erros.push('Duração inválida');
  }
  
  return {
    valido: erros.length === 0,
    erros
  };
};

/**
 * ============================================================================
 * RESUMO DE FUNCIONALIDADES DISPONÍVEIS
 * ============================================================================
 * 
 * ✅ CRUD Completo:
 *    - Create: Criar nova trilha e módulos
 *    - Read: Listar, buscar e filtrar trilhas
 *    - Update: Editar trilhas e status de módulos
 *    - Delete: Remover trilhas e módulos
 * 
 * ✅ Gerenciamento de Módulos:
 *    - Adicionar módulos a trilhas
 *    - Marcar como concluído
 *    - Remover módulos
 *    - Ver progresso
 * 
 * ✅ Busca e Filtros:
 *    - Busca por texto (nome/descrição)
 *    - Filtro por status
 *    - Ordenação customizável
 * 
 * ✅ Interface Responsiva:
 *    - Desktop, Tablet, Mobile
 *    - Modais interativos
 *    - Animações suaves
 * 
 * ✅ Utilitários:
 *    - Cálculo de progresso
 *    - Formatação de datas
 *    - Validações
 *    - Exportação de dados
 * 
 * ============================================================================
 */

export {};
