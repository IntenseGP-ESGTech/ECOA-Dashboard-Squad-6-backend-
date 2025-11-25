# ✅ CHECKLIST RÁPIDO - TRILHAS DE APRENDIZADO

## 🎯 Verificação Rápida (5 minutos)

Execute estes testes para verificar se tudo está funcionando:

---

## ✅ INSTALAÇÃO

- [ ] Projeto clonado/aberto em VS Code
- [ ] `npm install` foi executado
- [ ] Nenhum erro de dependência

Comando:
```bash
npm install
```

---

## ✅ EXECUÇÃO

- [ ] Servidor de desenvolvimento iniciado
- [ ] Acessar `http://localhost:5173`
- [ ] Página carrega sem erros

Comando:
```bash
npm run dev
```

---

## ✅ NAVEGAÇÃO

- [ ] Fazer login (com dados de teste)
- [ ] Clicar em "Trilhas" no menu lateral
- [ ] Página de trilhas carrega corretamente
- [ ] Ver lista de 3 trilhas de exemplo

Rota: `http://localhost:5173/trilha-aprendizado`

---

## ✅ FUNCIONALIDADES BÁSICAS

### Listar (READ)
- [ ] Ver 3 trilhas na tela
- [ ] Cada trilha mostra nome, descrição, responsável
- [ ] Status é exibido com cor apropriada
- [ ] Barra de progresso aparece
- [ ] Módulos são listados

### Buscar (FILTER)
- [ ] Digitar "React" no campo de busca
- [ ] Resultado filtra apenas "React Avançado"
- [ ] Digitar outra palavra filtra corretamente
- [ ] Limpar busca retorna todos

### Filtrar por Status (FILTER)
- [ ] Selecionar "Em Andamento"
- [ ] Mostra apenas trilhas em andamento
- [ ] Selecionar "Concluído"
- [ ] Mostra apenas trilhas concluídas
- [ ] "Todos" mostra tudo novamente

### Criar (CREATE)
- [ ] Clique "+ Nova Trilha"
- [ ] Modal abre corretamente
- [ ] Preencha os campos
- [ ] Clique "Criar Trilha"
- [ ] Trilha aparece na lista

### Editar (UPDATE)
- [ ] Clique ícone ✏️ em uma trilha
- [ ] Modal abre com dados pré-preenchidos
- [ ] Modifique um campo (ex: nome)
- [ ] Clique "Atualizar Trilha"
- [ ] Trilha é atualizada na lista

### Deletar (DELETE)
- [ ] Clique ícone 🗑️ em uma trilha
- [ ] Aparece confirmação
- [ ] Confirme a exclusão
- [ ] Trilha desaparece da lista

---

## ✅ GERENCIAMENTO DE MÓDULOS

### Adicionar Módulo
- [ ] Clique "+ Adicionar Módulo" em uma trilha
- [ ] Modal abre
- [ ] Preencha nome e duração
- [ ] Clique "Adicionar Módulo"
- [ ] Módulo aparece na lista

### Marcar Concluído
- [ ] Clique no checkbox do módulo
- [ ] Módulo fica com strikethrough
- [ ] Ícone de check aparece
- [ ] Barra de progresso aumenta

### Deletar Módulo
- [ ] Clique ícone 🗑️ do módulo
- [ ] Módulo desaparece
- [ ] Progresso atualiza

---

## ✅ INTERFACE

### Design
- [ ] Cores são consistentes
- [ ] Cards têm boa aparência
- [ ] Textos são legíveis
- [ ] Espaçamento adequado

### Responsividade
- [ ] Redimensione para 800px (tablet)
- [ ] Cards ocupam 2 colunas
- [ ] Redimensione para 500px (mobile)
- [ ] Cards ocupam 1 coluna
- [ ] Menu funciona no mobile

### Animações
- [ ] Modal abre com transição
- [ ] Cards têm hover effect
- [ ] Barra de progresso anima
- [ ] Botões respondem ao clique

---

## ✅ MODAIS

### Modal de Trilha
- [ ] Abre/fecha corretamente
- [ ] Formulário valida campos obrigatórios
- [ ] Mostra erro se deixar em branco
- [ ] Data prevista é obrigatória
- [ ] Botão cancelar funciona

### Modal de Módulo
- [ ] Abre com contexto correto
- [ ] Mostra nome da trilha pai
- [ ] Valida campos obrigatórios
- [ ] Botão cancelar funciona

---

## ✅ DADOS

### Trilhas Pré-carregadas
- [ ] Trilha 1: "React Avançado" - Em Andamento
- [ ] Trilha 2: "Metodologia Ágil" - Pendente
- [ ] Trilha 3: "Design Thinking" - Concluído

### Módulos Pré-carregados
- [ ] Trilha 1: 3 módulos (2 concluídos)
- [ ] Trilha 2: 1 módulo (não concluído)
- [ ] Trilha 3: 3 módulos (todos concluídos)

### Progresso
- [ ] Trilha 1: 65% (2 de 3)
- [ ] Trilha 2: 0% (0 de 1)
- [ ] Trilha 3: 100% (3 de 3)

---

## ✅ INTEGRAÇÃO COM PROJETO

### App.jsx
- [ ] Importação de TrilhaAprendizado
- [ ] Rota `/trilha-aprendizado` adicionada
- [ ] Proteção de rota funcionando

### Dashboard
- [ ] Ícone "Trilhas" no sidebar
- [ ] Clique funciona corretamente
- [ ] Link para trilha-aprendizado

### Navegação
- [ ] Voltar para Dashboard funciona
- [ ] Pode navegar entre telas

---

## ✅ CONSOLE

- [ ] Sem erros no console (F12)
- [ ] Sem warnings de React
- [ ] Sem erros de CSS

---

## ✅ PERFORMANCE

- [ ] Página carrega rápido
- [ ] Cliques respondem imediatamente
- [ ] Sem lag ao rolar
- [ ] Modais abrem rapidamente

---

## 🐛 SE ALGO NÃO FUNCIONAR

### Trilhas não aparecem
```bash
1. Abra o console (F12)
2. Procure por erros
3. Verifique se TrilhaAprendizado está importado
4. Verifique se a rota está correta em App.jsx
```

### Modal não abre
```bash
1. Verifique console para erros
2. Clique novamente no botão
3. Recarregue a página (F5)
```

### Estilos não aparecem
```bash
1. Verifique se os arquivos CSS existem
2. Verifique os imports em cada componente
3. Limpe cache: Ctrl+Shift+Delete
4. Recarregue: Ctrl+F5
```

### Página em branco
```bash
1. Abra console (F12)
2. Procure por erros em vermelho
3. Verifique URL: http://localhost:5173/trilha-aprendizado
4. Verifique se está autenticado
```

---

## 📞 SUPORTE RÁPIDO

| Problema | Solução |
|----------|---------|
| Módulo não aparece | Clique "+ Adicionar Módulo" e preencha |
| Progresso não atualiza | Marque/desmarque checkbox |
| Trilha não salva | Verifique validação de campos |
| Página branca | Abra console e verifique erros |
| Responsividade ruim | Redimensione navegador |

---

## ✨ PRÓXIMOS PASSOS

1. **Conectar com API**
   - Use `INTEGRACAO_API.js` como referência
   - Implemente chamadas HTTP

2. **Banco de Dados**
   - Crie tabelas para trilhas e módulos
   - Implemente queries

3. **Back-end**
   - Crie rotas RESTful
   - Implemente validações

---

## 📋 DOCUMENTAÇÃO

Leia também:
- 📄 README.md - Documentação completa
- 📄 GUIA_TESTES.md - Testes detalhados
- 📄 INTEGRACAO_API.js - Integração com back-end
- 📄 EXEMPLOS_USO.js - Funções auxiliares

---

## ✅ TUDO FUNCIONANDO?

Se marcou tudo com ✅, o projeto está **100% operacional**!

Se algum ✅ não foi marcado:
1. Leia a documentação correspondente
2. Verifique console para erros
3. Consulte a seção de troubleshooting

---

**Checklist Rápido Concluído!**

Agora você pode começar a usar e testar o CRUD de Trilhas de Aprendizado. 🚀
