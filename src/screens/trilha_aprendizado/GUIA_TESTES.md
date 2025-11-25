# 🚀 Guia de Instalação e Testes - Trilhas de Aprendizado

## 📋 Sumário
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Executar Projeto](#executar-projeto)
4. [Testar Funcionalidades](#testar-funcionalidades)
5. [Estrutura de Arquivos](#estrutura-de-arquivos)
6. [Checklist de Teste](#checklist-de-teste)

---

## 🔧 Pré-requisitos

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **React** >= 19.0.0
- **React Router DOM** >= 7.6.0
- **Lucide React** >= 0.511.0

Verifique as versões instaladas:
```bash
node --version
npm --version
```

---

## 📦 Instalação

### 1. Navegar para a pasta do projeto
```bash
cd "C:\Users\felip\OneDrive\Área de Trabalho\ECOA-Dashboard-Squad-6-backend--main\ECOA-Dashboard-Squad-6-backend--main"
```

### 2. Instalar dependências (se não feito ainda)
```bash
npm install
```

### 3. Verificar se todas as dependências foram instaladas
```bash
npm list
```

---

## 🎮 Executar Projeto

### Desenvolvimento (Com Hot Reload)
```bash
npm run dev
```

A aplicação será aberta em: `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

---

## 🧪 Testar Funcionalidades

### 1. Acessar a Tela de Trilhas
1. Abra `http://localhost:5173` no navegador
2. Faça login (dados de teste devem estar disponíveis)
3. Clique em "Trilhas" no menu lateral (ícone de livro)

### 2. Testar Listagem
✅ **Esperado**: Ver 3 trilhas de exemplo com:
- Nome, descrição, responsável
- Data de criação e prevista
- Status (Em Andamento, Pendente, Concluído)
- Progresso em % baseado nos módulos
- Lista de módulos com nome e duração

### 3. Testar Busca
1. Digite "React" no campo de busca
2. ✅ **Esperado**: Filtrar para mostrar apenas "Desenvolvimento Web com React"

### 4. Testar Filtros de Status
1. Selecione "Em Andamento" no dropdown
2. ✅ **Esperado**: Mostrar apenas trilhas com status "Em Andamento"

### 5. Testar Criar Nova Trilha
1. Clique em "+ Nova Trilha"
2. Preencha o formulário:
   - Nome: "Node.js Backend Avançado"
   - Descrição: "Aprenda APIs REST e bancos de dados"
   - Responsável: "João Santos"
   - Data Prevista: Selecione uma data futura
   - Status: "Pendente"
3. Clique em "Criar Trilha"
4. ✅ **Esperado**: Trilha aparece na lista

### 6. Testar Editar Trilha
1. Clique no ícone ✏️ (editar) em qualquer trilha
2. Modifique o nome para "React Completo"
3. Clique em "Atualizar Trilha"
4. ✅ **Esperado**: Nome da trilha é atualizado

### 7. Testar Adicionar Módulo
1. Clique em "+ Adicionar Módulo" em uma trilha
2. Preencha:
   - Nome: "Renderização Condicional"
   - Duração: "2 semanas"
3. Clique em "Adicionar Módulo"
4. ✅ **Esperado**: Novo módulo aparece na lista

### 8. Testar Marcar Módulo como Concluído
1. Clique no checkbox do módulo
2. ✅ **Esperado**: 
   - Módulo fica riscado
   - Ícone de check aparece
   - Barra de progresso aumenta

### 9. Testar Deletar Módulo
1. Clique no ícone 🗑️ ao lado do módulo
2. ✅ **Esperado**: Módulo é removido

### 10. Testar Deletar Trilha
1. Clique no ícone 🗑️ em uma trilha
2. Confirme a exclusão
3. ✅ **Esperado**: Trilha desaparece da lista

### 11. Testar Responsividade
1. Redimensione a janela do navegador
2. Em telas pequenas (mobile):
   - ✅ Cards em coluna única
   - ✅ Menu fica acessível
   - ✅ Botões ficam clicáveis

### 12. Testar Voltar para Dashboard
1. Clique em "← Voltar para o Dashboard"
2. ✅ **Esperado**: Retorna para a página principal

---

## 📂 Estrutura de Arquivos

```
trilha_aprendizado/
│
├── 📄 index.jsx                    # Componente principal
│   ├── Estado local das trilhas
│   ├── Funções CRUD
│   ├── Gerenciamento de módulos
│   └── Renderização da UI
│
├── 📄 FormTrilha.jsx               # Modal para criar/editar
│   ├── Form com validação
│   ├── Pré-preenchimento em edição
│   └── Callbacks ao salvar
│
├── 📄 FormModulo.jsx               # Modal para adicionar módulo
│   ├── Form simples
│   └── Contexto da trilha pai
│
├── 🎨 trilha_aprendizado.css       # Estilos principais
│   ├── Container e header
│   ├── Cards de trilha
│   ├── Módulos
│   ├── Filtros
│   └── Responsividade
│
├── 🎨 form-trilha.css              # Estilos do modal
│   ├── Overlay
│   ├── Formulário
│   └── Animações
│
├── 🎨 form-modulo.css              # Estilos do modal de módulo
│   ├── Modal pequeno
│   ├── Contexto da trilha
│   └── Responsividade
│
├── 📋 README.md                    # Documentação principal
├── 📋 GUIA_TESTES.md               # Este arquivo
└── 📋 INTEGRACAO_API.js            # Exemplo de integração com back-end
```

---

## ✅ Checklist de Teste

### Funcionalidades Básicas
- [ ] Acessar página de Trilhas
- [ ] Ver listagem de trilhas
- [ ] Buscar trilhas por termo
- [ ] Filtrar por status
- [ ] Criar nova trilha
- [ ] Editar trilha existente
- [ ] Deletar trilha com confirmação

### Gerenciamento de Módulos
- [ ] Visualizar módulos em trilha
- [ ] Adicionar novo módulo
- [ ] Marcar módulo como concluído
- [ ] Desmarcar módulo concluído
- [ ] Deletar módulo
- [ ] Ver progresso atualizado

### Interface e UX
- [ ] Cards com hover effect
- [ ] Modais abrem/fecham corretamente
- [ ] Validação de formulários funciona
- [ ] Cores de status corretas
- [ ] Barra de progresso atualiza
- [ ] Ícones aparecem corretamente

### Responsividade
- [ ] Desktop (1200px+): 3+ cards por linha
- [ ] Tablet (768px-1199px): 2 cards por linha
- [ ] Mobile (<768px): 1 card por linha
- [ ] Touch: Botões clicáveis no mobile

### Performance
- [ ] Página carrega rápido
- [ ] Sem erro no console
- [ ] Transições suaves
- [ ] Sem lag ao adicionar/remover items

### Validação
- [ ] Campos obrigatórios validados
- [ ] Data prevista não pode ser menor que hoje
- [ ] Não permite trilha sem nome/descrição
- [ ] Não permite módulo sem nome/duração

---

## 🐛 Possíveis Erros e Soluções

### Erro: "Cannot find module 'lucide-react'"
```bash
npm install lucide-react
```

### Erro: "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom
```

### Componente não aparece no Dashboard
Verifique se:
1. A importação está em `App.jsx`
2. A rota está correta em `App.jsx`
3. O link no sidebar está correto em `Dashboard/index.jsx`

### Estilos não aparecem
Verifique se:
1. Os arquivos CSS estão no mesmo diretório
2. Os imports CSS estão corretos em cada componente
3. Não há conflito com CSS global

---

## 📚 Dados de Teste Pré-carregados

### Trilha 1
- Nome: "Desenvolvimento Web com React"
- Status: Em Andamento (65%)
- Módulos: 3 (2 concluídos, 1 em andamento)

### Trilha 2
- Nome: "Metodologia Ágil e Scrum"
- Status: Pendente (0%)
- Módulos: 1 (não iniciado)

### Trilha 3
- Nome: "Design Thinking e Inovação"
- Status: Concluído (100%)
- Módulos: 3 (todos concluídos)

---

## 🔄 Próximos Passos

1. **Conectar com Back-end**
   - Use o arquivo `INTEGRACAO_API.js` como referência
   - Implemente as chamadas HTTP

2. **Persistência de Dados**
   - Implementar banco de dados
   - Criar API REST

3. **Autenticação**
   - Validar token do usuário
   - Controlar acesso às trilhas

4. **Melhorias Futuras**
   - Adicionar anexos/recursos por módulo
   - Sistema de comentários
   - Avaliação de trilhas
   - Certificados de conclusão
   - Relatórios de progresso

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador (F12)
2. Consulte a documentação principal (README.md)
3. Verifique a seção de integração (INTEGRACAO_API.js)

---

**Última atualização**: Novembro 2025
