# CRUD de Trilhas de Aprendizado - Front-end

## 📚 Visão Geral

Esta é a implementação do **Front-end (UI/UX)** para o CRUD de **Trilhas de Aprendizado**. A interface permite que os usuários criem, visualizem, editem e deletem trilhas de aprendizado com suporte a módulos.

---

## 🎯 Funcionalidades Implementadas

### ✅ Tela Principal (Listagem)
- **Listagem de Trilhas**: Exibe todas as trilhas de aprendizado em cards responsivos
- **Status Visuais**: Indica o status da trilha (Pendente, Em Andamento, Concluído)
- **Progresso Visual**: Barra de progresso mostrando o percentual de módulos concluídos
- **Busca**: Campo para filtrar trilhas por nome ou descrição
- **Filtros**: Filtrar por status da trilha

### ✅ Criar Trilha (Create)
- Modal interativo para adicionar nova trilha
- Campos obrigatórios:
  - **Nome da Trilha**: Identificador único e descritivo
  - **Descrição**: Detalhes sobre os objetivos da trilha
  - **Responsável**: Pessoa responsável pela trilha
  - **Data Prevista de Conclusão**: Prazo estimado
  - **Status**: Estado inicial (Pendente, Em Andamento, Concluído)
- Validação de campos
- Botões Cancelar/Criar

### ✅ Editar Trilha (Update)
- Modal pré-preenchido com dados da trilha selecionada
- Edição de todos os campos (exceto data de criação)
- Mantém os módulos associados

### ✅ Deletar Trilha (Delete)
- Confirmação de exclusão antes de deletar
- Remove a trilha e todos os seus módulos

### ✅ Gerenciar Módulos
- Visualizar módulos dentro de cada trilha
- **Adicionar Módulo**: Modal para incluir novo módulo
  - Nome do Módulo
  - Duração (ex: 4 semanas, 20 horas)
- **Marcar como Concluído**: Checkbox para indicar conclusão
- **Deletar Módulo**: Remover um módulo específico
- **Contador**: Mostra quantidade de módulos

---

## 🏗️ Estrutura de Pastas

```
src/screens/trilha_aprendizado/
├── index.jsx                  # Componente principal
├── FormTrilha.jsx            # Modal para criar/editar trilha
├── FormModulo.jsx            # Modal para adicionar módulo
├── trilha_aprendizado.css    # Estilos da tela principal
├── form-trilha.css           # Estilos do modal de trilha
└── form-modulo.css           # Estilos do modal de módulo
```

---

## 📊 Modelo de Dados

### Trilha de Aprendizado
```javascript
{
  id: Number,
  nome: String,                  // Ex: "Desenvolvimento Web com React"
  descricao: String,            // Descrição detalhada
  responsavel: String,          // Nome do responsável
  dataC: Date,                  // Data de criação
  dataPrevista: Date,           // Data prevista de conclusão
  status: String,               // "pendente" | "em-andamento" | "concluido"
  modulos: Module[]             // Array de módulos
}
```

### Módulo
```javascript
{
  id: Number,
  nome: String,                // Ex: "Introdução ao React"
  duracao: String,            // Ex: "4 semanas"
  concluido: Boolean          // Indica conclusão
}
```

---

## 🎨 Design & UX

### Estilo Visual
- **Tema Escuro**: Interface moderna com fundo escuro e transparências
- **Cores Primárias**: Azul (#0056b3) como cor principal
- **Cores de Status**:
  - Pendente: Cinza (#6c757d)
  - Em Andamento: Amarelo (#ffc107)
  - Concluído: Verde (#28a745)
- **Animações**: Transições suaves para melhor experiência

### Componentes Principais
- Cards responsivos com hover effects
- Modais com backdrop blur
- Barra de progresso animada
- Ícones do Lucide React

---

## 🔄 Fluxo de Uso

1. **Acessar Trilhas**
   - Clique em "Trilhas" no menu lateral do Dashboard
   - Rota: `/trilha-aprendizado`

2. **Listar Trilhas**
   - Todas as trilhas são exibidas em cards
   - Use busca e filtros para encontrar trilhas específicas

3. **Criar Nova Trilha**
   - Clique em "+ Nova Trilha"
   - Preencha o formulário
   - Clique em "Criar Trilha"

4. **Editar Trilha**
   - Clique no ícone ✏️ (editar) no card
   - Modifique os campos desejados
   - Clique em "Atualizar Trilha"

5. **Deletar Trilha**
   - Clique no ícone 🗑️ (deletar) no card
   - Confirme a exclusão

6. **Gerenciar Módulos**
   - Na seção "Módulos" de cada trilha
   - Clique em "+ Adicionar Módulo"
   - Preencha o formulário
   - Marque módulos como concluídos
   - Delete módulos conforme necessário

---

## 🚀 Como Usar

### Acessar a Tela
O componente está integrado ao Dashboard. Navegue para:
- **Rota**: `/trilha-aprendizado`
- **Menu**: Clique em "Trilhas" na barra lateral

### Exemplo de Uso em Componentes
```jsx
import TrilhaAprendizado from "./screens/trilha_aprendizado";

// Dentro de um Route
<Route path="/trilha-aprendizado" element={<TrilhaAprendizado />} />
```

---

## 📱 Responsividade

- **Desktop**: Grid com 3+ cards por linha
- **Tablet**: Grid com 2 cards por linha
- **Mobile**: 1 card por linha, layout otimizado

---

## 🔧 Dependências

- **React**: Para componentes
- **React Router DOM**: Para navegação
- **Lucide React**: Para ícones

---

## 📋 Dados de Teste

O componente vem com dados de exemplo pré-carregados:

1. **Desenvolvimento Web com React** - Em Andamento (3 módulos)
2. **Metodologia Ágil e Scrum** - Pendente (1 módulo)
3. **Design Thinking e Inovação** - Concluído (3 módulos)

---

## 🎯 Próximas Etapas (Back-end)

Após a conclusão do Front-end, será necessário implementar:

1. **API REST** com as seguintes rotas:
   - `GET /api/trilhas` - Listar todas as trilhas
   - `GET /api/trilhas/:id` - Obter trilha específica
   - `POST /api/trilhas` - Criar nova trilha
   - `PUT /api/trilhas/:id` - Atualizar trilha
   - `DELETE /api/trilhas/:id` - Deletar trilha
   - `GET /api/trilhas/:id/modulos` - Listar módulos de uma trilha
   - `POST /api/trilhas/:id/modulos` - Adicionar módulo
   - `DELETE /api/trilhas/:id/modulos/:moduloId` - Deletar módulo

2. **Banco de Dados** para persistência dos dados

3. **Autenticação** para controlar acesso

4. **Validação** no servidor

---

## ✨ Características Adicionais

- **Confirmação de Ações**: Diálogos de confirmação para delete
- **Validação de Formulário**: Validação de campos obrigatórios
- **Scroll Customizado**: Scroll personalizado em listas de módulos
- **Animações**: Transições suaves para melhor UX
- **Ícones Intuitivos**: Uso de ícones para melhor compreensão

---

## 📄 Licença

Este projeto faz parte do **ECOA Dashboard Squad 6**.

---

## 🤝 Autor

Desenvolvido com foco em UX e responsividade para engajar alunos em trilhas de aprendizado.
