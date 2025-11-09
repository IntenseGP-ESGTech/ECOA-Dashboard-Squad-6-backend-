import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data", "users.json");

function lerUsers(){
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function salvarUsers(users){
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

//questionário
const questionarioPath = path.join(__dirname, "data", "questionarios.json");

function lerQuestionarios(){
    // Implementa um try-catch para evitar falha se o arquivo estiver vazio
    try {
        const data = fs.readFileSync(questionarioPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // Retorna array vazio em caso de erro de leitura (arquivo inexistente/vazio)
        return []; 
    }
}

function salvarQuestionarios(questionarios){
    fs.writeFileSync(questionarioPath, JSON.stringify(questionarios, null, 2));
}

//Usuários


//login (post)
app.post("/user/login", (req,res)=>{
    const {email, senha} = req.body;

    const usuarios = lerUsers();

    // Valida email e senha, e se cnpj for fornecido, valida também
    const user = usuarios.find(
        (u) => {
            const emailMatch = u.email === email;
            const senhaMatch = u.senha === senha;
            
            return emailMatch && senhaMatch;
        }
    );

    if(user){
        res.status(200).json({
            success : true,
            user: {email: user.email, nome: user.nome, cargo: user.cargo, departamento: user.departamento, telefone: user.telefone},
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Credenciais inválidas",
        });
    }

});

//loadUser não é mais usada. agora user/login autentica e salva usuario
// app.post("/loadUser", (req,res)=>{
//     const {email} = req.body;

//     const usuarios = lerUsers();

//     const user = usuarios.find((u) => u.email === email);

//     res.json({
//         user: {nome: user.nome, email: user.email, cargo: user.cargo, departamento: user.departamento, telefone: user.telefone}
//     });
// });

// função de criar(post)
app.post("/user/register", (req, res)=>{
    const {cnpj, nome, senha, email} = req.body;

    if(!nome || !email || !cnpj || !senha){
        return res.status(400).json({success: false, erro: "Todos os campos são obrigatórios."})
    }

    const users = lerUsers();
    
    for (let user of users){
        if (user.cnpj == cnpj){
            return res.status(400).json({success: false, erro: "Cnpj já cadastrado."})
        }
    }

    const novoUser = {
        cnpj,
        nome,
        email,
        senha
    };

    users.push(novoUser);
    salvarUsers(users);

    res.status(201).json({success: true, user:novoUser});
});

//função de read(get)
app.get("/user/users", (req, res) => {
    const users = lerUsers();
    if(users.length>0){
        res.status(200).json(users)
    } else {
        res.status(404).json({erro: "Nenhum usuário encontrado"})
    }
    
});

//função get by id(get)
app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const users = lerUsers();
    const index = users.findIndex(f => f.id === id);

    if (index === -1){
        return res.status(404).json({erro: "Usuário não encontrado."});
    }

    const user = users[index];

    res.status(200).json(user);
});


//função de update(put)
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const users = lerUsers();
    const index = users.findIndex(f => f.id === id);

    if (index === -1){
        return res.status(404).json({erro: "Usuário não encontrado."});
    }

    users[index] = {...users[index], ...req.body};
    salvarUsers(users);
    res.json(users[index]);
});


//função de delete(delete)
app.delete('/funcionarios/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    let users = lerUsers();
    
    users = users.filter(f=> f.id !== id);
    salvarUsers(users);
    res.status(204).send();
});

// POST: Salvar a conclusão do questionário
// Endpoint: /questionario/concluir
app.post("/questionario/concluir", (req, res) => {
    const dadosQuestionario = req.body;

    if (!dadosQuestionario || Object.keys(dadosQuestionario).length === 0) {
        // Retorna erro se o corpo da requisição estiver vazio
        return res.status(400).json({ erro: "Dados do questionário estão incompletos ou vazios." });
    }

    const questionarios = lerQuestionarios();

    const novoQuestionario = {
        // Gera um ID sequencial baseado no último ID salvo
        id: questionarios.length ? questionarios[questionarios.length - 1].id + 1 : 1,
        dataConclusao: new Date().toISOString(),
        ...dadosQuestionario 
    };

    questionarios.push(novoQuestionario);
    salvarQuestionarios(questionarios);
    
    res.status(201).json({
        success: true,
        message: "Conclusão do questionário salva com sucesso!",
        registro: novoQuestionario
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});