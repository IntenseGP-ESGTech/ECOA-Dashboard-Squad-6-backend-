# 🧪 COMO TESTAR - INSTRUÇÕES PASSO A PASSO

## 🎯 Objetivo
Testar o CRUD de Trilhas de Aprendizado no navegador e validar todas as funcionalidades.

---

## 📋 Pré-requisitos

1. ✅ Node.js instalado (v16+)
2. ✅ Projeto clonado
3. ✅ `npm install` executado
4. ✅ Nenhum erro de dependência

---

## 🚀 Passo 1: Iniciar o Servidor

### No Terminal:
```bash
cd "C:\Users\felip\OneDrive\Área de Trabalho\ECOA-Dashboard-Squad-6-backend--main\ECOA-Dashboard-Squad-6-backend--main"

npm run dev
```

### Esperado:
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🌐 Passo 2: Acessar a Aplicação

1. Abra o navegador (Chrome, Firefox, Edge)
2. Acesse: `http://localhost:5173`
3. Você deve ver a **página de login**

---

## 🔐 Passo 3: Fazer Login

1. Procure pelos campos de login
2. Digite credenciais (varia conforme o projeto)
3. Clique "Entrar" ou "Login"
4. Deve redirecionar para o Dashboard

---

## 📍 Passo 4: Navegar para Trilhas

### Opção 1: Via Menu Lateral
1. Veja o menu lateral esquerdo
2. Procure pelo ícone de **livro (📚)**
3. Veja o label **"Trilhas"**
4. Clique nele

### Opção 2: URL Direta
1. Na barra de endereço, acesse:
```
http://localhost:5173/trilha-aprendizado
```

### Esperado:
- Página carrega
- Ver título "Trilhas de Aprendizado"
- Ver subtítulo descritivo
- Ver 3 trilhas de exemplo

---

## ✅ Testes Funcionais

### TESTE 1: Visualizar Trilhas (READ)

**Ação:**
1. Veja a lista de trilhas

**Esperado:**
```
✓ 3 trilhas aparecem
✓ Cada trilha tem:
  - Nome (ex: "React Avançado")
  - Descrição
  - Responsável
  - Status (com cor)
  - Data de criação e prevista
  - Barra de progresso
  - Lista de módulos
```

---

### TESTE 2: Buscar Trilha

**Ação:**
1. Localize o campo de busca (🔍)
2. Digite: `React`

**Esperado:**
```
✓ Lista filtra para mostrar apenas "React Avançado"
✓ Outras trilhas desaparecem
✓ Resultado: 1 trilha encontrada
```

**Ação 2:**
1. Limpe o campo de busca

**Esperado:**
```
✓ Retorna todas as 3 trilhas
```

---

### TESTE 3: Filtrar por Status

**Ação:**
1. Localize o dropdown de status (📊)
2. Selecione: "Em Andamento"

**Esperado:**
```
✓ Mostra apenas trilhas com status "Em Andamento"
✓ Resultado: 1 trilha ("React Avançado")
```

**Ação 2:**
1. Selecione: "Concluído"

**Esperado:**
```
✓ Mostra apenas trilhas concluídas
✓ Resultado: 1 trilha ("Design Thinking")
```

**Ação 3:**
1. Selecione: "Todos os status"

**Esperado:**
```
✓ Retorna todas as 3 trilhas
```

---

### TESTE 4: Criar Nova Trilha (CREATE)

**Ação:**
1. Clique no botão "+ NOVA TRILHA"
2. Um modal deve abrir

**Esperado:**
```
✓ Modal aparece com fundo escuro
✓ Título: "Nova Trilha de Aprendizado"
✓ Botão X para fechar no canto superior direito
✓ Campos vazios
```

**Preencher Formulário:**
1. Nome: "Vue.js Completo"
2. Descrição: "Aprenda Vue.js do básico ao avançado com exemplos práticos"
3. Responsável: "Maria Santos"
4. Data de Criação: Aparece automaticamente (25/11/2025)
5. Data Prevista: 31/12/2025
6. Status: "Em Andamento"

**Submeter:**
1. Clique "Criar Trilha"

**Esperado:**
```
✓ Modal fecha
✓ Nova trilha "Vue.js Completo" aparece na lista
✓ Tem 0% de progresso (sem módulos)
✓ Status é "Em Andamento" (com cor amarela)
```

---

### TESTE 5: Editar Trilha (UPDATE)

**Ação:**
1. Encontre a trilha "Vue.js Completo" (que acabou de criar)
2. Clique no ícone ✏️ (editar)

**Esperado:**
```
✓ Modal abre com título "Editar Trilha"
✓ Campos pré-preenchidos com dados atuais
✓ "Vue.js Completo" está no campo nome
```

**Modificar:**
1. Altere o nome para "Vue 3 Avançado"
2. Mantenha outros campos

**Submeter:**
1. Clique "Atualizar Trilha"

**Esperado:**
```
✓ Modal fecha
✓ Nome da trilha na lista muda para "Vue 3 Avançado"
✓ Outros dados se mantêm iguais
```

---

### TESTE 6: Adicionar Módulo

**Ação:**
1. Localize a trilha "Vue 3 Avançado"
2. Role para baixo na seção "Módulos"
3. Clique em "+ Adicionar Módulo"

**Esperado:**
```
✓ Modal abre com título "Adicionar Módulo à Trilha"
✓ Mostra "Trilha: Vue 3 Avançado"
✓ Campos vazios para:
  - Nome do Módulo
  - Duração
```

**Preencher:**
1. Nome: "Introdução ao Vue 3"
2. Duração: "3 semanas"

**Submeter:**
1. Clique "Adicionar Módulo"

**Esperado:**
```
✓ Modal fecha
✓ Novo módulo aparece na lista da trilha
✓ Mostra checkbox desmarcado
✓ Mostra nome "Introdução ao Vue 3"
✓ Mostra duração "3 semanas"
✓ Barra de progresso atualiza para 0% (1 de 1, não concluído)
```

---

### TESTE 7: Marcar Módulo como Concluído

**Ação:**
1. Localize o módulo "Introdução ao Vue 3"
2. Clique no **checkbox** à esquerda do nome

**Esperado:**
```
✓ Checkbox marca (✓)
✓ Ícone verde de check aparece
✓ Texto fica riscado (strikethrough)
✓ Barra de progresso atualiza para 100%
✓ Mostra: "Progresso: 100%" | "██████░░░░ 100%"
```

**Desmarcar:**
1. Clique novamente no checkbox

**Esperado:**
```
✓ Checkbox desmarca
✓ Texto volta ao normal (sem strikethrough)
✓ Ícone de check desaparece
✓ Barra de progresso volta para 0%
```

---

### TESTE 8: Deletar Módulo

**Ação:**
1. Localize o módulo "Introdução ao Vue 3"
2. Clique no ícone 🗑️ (deletar)

**Esperado:**
```
✓ Módulo desaparece da lista
✓ Contador muda de "(1)" para "(0)"
✓ Barra de progresso volta para 0%
✓ Mensagem "Nenhum módulo adicionado" pode aparecer
```

---

### TESTE 9: Deletar Trilha

**Ação:**
1. Localize a trilha "Vue 3 Avançado"
2. Clique no ícone 🗑️ (deletar)

**Esperado:**
```
✓ Dialogo de confirmação aparece
✓ Pergunta: "Tem certeza que deseja deletar esta trilha?"
✓ Botões "Cancelar" e "Confirmar"
```

**Confirmar:**
1. Clique "Confirmar"

**Esperado:**
```
✓ Dialogo fecha
✓ Trilha "Vue 3 Avançado" desaparece da lista
✓ Voltam a aparecer apenas as 3 trilhas originais
```

---

### TESTE 10: Validação de Formulário

**Ação:**
1. Clique "+ NOVA TRILHA"
2. Modal abre

**Tentar submeter vazio:**
1. Clique "Criar Trilha" **sem preencher nada**

**Esperado:**
```
✓ Aparece mensagem: "Por favor, preencha todos os campos"
✓ Modal não fecha
✓ Campos obrigatórios ficam destacados (opcional)
```

---

### TESTE 11: Responsividade

**No Desktop (1200px+):**
1. Veja a quantidade de cards por linha

**Esperado:**
```
✓ 3+ cards por linha
✓ Layout horizontal com 3 colunas
```

**Redimensionar para Tablet (768px-1199px):**
1. Pressione F12 para abrir developer tools
2. Clique no ícone de responsividade (📱)
3. Selecione "iPad" ou digite 800px

**Esperado:**
```
✓ 2 cards por linha
✓ Botões ainda clicáveis
✓ Menu adapta
```

**Redimensionar para Mobile (<768px):**
1. Digite 500px ou menos

**Esperado:**
```
✓ 1 card por linha
✓ Modais adaptam para tela pequena
✓ Botões ocupam mais espaço
✓ Texto legível
```

---

### TESTE 12: Voltar para Dashboard

**Ação:**
1. Role até o fim da página
2. Clique no link "← Voltar para o Dashboard"

**Esperado:**
```
✓ Página muda para o Dashboard
✓ URL muda de /trilha-aprendizado para /dashboard
✓ Menu lateral ainda funciona
```

---

## 🔍 Verificar Console

**Pressione F12** para abrir Developer Tools

### Esperado:
```
✓ Nenhum erro em vermelho
✓ Nenhum warning de React
✓ Nenhum erro de CSS
```

---

## 📊 Verificação Final

### Dados Pré-carregados
```
✓ Trilha 1: "Desenvolvimento Web com React"
  - Status: Em Andamento (amarelo)
  - 3 módulos (2 concluídos) = 65%
  
✓ Trilha 2: "Metodologia Ágil e Scrum"
  - Status: Pendente (cinza)
  - 1 módulo (0 concluídos) = 0%
  
✓ Trilha 3: "Design Thinking e Inovação"
  - Status: Concluído (verde)
  - 3 módulos (3 concluídos) = 100%
```

---

## 🎯 Resumo dos Testes

| # | Teste | Status |
|---|-------|--------|
| 1 | Visualizar Trilhas | ✅ |
| 2 | Buscar Trilha | ✅ |
| 3 | Filtrar por Status | ✅ |
| 4 | Criar Trilha | ✅ |
| 5 | Editar Trilha | ✅ |
| 6 | Adicionar Módulo | ✅ |
| 7 | Marcar Concluído | ✅ |
| 8 | Deletar Módulo | ✅ |
| 9 | Deletar Trilha | ✅ |
| 10 | Validação | ✅ |
| 11 | Responsividade | ✅ |
| 12 | Voltar | ✅ |

---

## ❌ Se Algo Não Funcionar

### Trilha não aparece
```
1. Abra console (F12)
2. Veja se há erros em vermelho
3. Recarregue a página (Ctrl+R)
4. Tente novamente
```

### Modal não abre
```
1. Clique novamente
2. Aguarde 1-2 segundos
3. Se continuar, recarregue a página
```

### Dados não salvam
```
1. Verifique console para erros
2. Confira se campos foram preenchidos
3. Tente novamente
```

### Página branca
```
1. Abra console (F12)
2. Procure erros em vermelho
3. Verifique URL: localhost:5173/trilha-aprendizado
4. Recarregue (Ctrl+F5 - força atualizar)
```

---

## 🎉 Sucesso!

Se todos os testes passaram com ✅, o **CRUD está 100% funcional!**

---

## 📝 Notas

- Os dados são mantidos **apenas na memória** (estado do React)
- Recarregar a página **reseta os dados** aos valores iniciais
- Para **persistência**, será necessário conectar com um back-end
- Consulte `INTEGRACAO_API.js` para implementar a persistência

---

**Parabéns! Seu CRUD de Trilhas de Aprendizado está funcionando perfeitamente!** 🚀
