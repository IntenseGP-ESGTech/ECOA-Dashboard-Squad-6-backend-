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

//Configuração Users
const usersFilePath = path.join(__dirname, "data", "users.json");

function lerUsers(){
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
}

function salvarUsers(users){
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

const questionariosCompletosPath = path.join(__dirname, "data", "questionarios_completos.json");

function lerQuestionariosCompletos() {
    try {
        const data = fs.readFileSync(questionariosCompletosPath, "utf-8");
        if (data.trim().length > 0) {
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        return [];
    }
}

function salvarQuestionariosCompletos(data) {
    fs.writeFileSync(questionariosCompletosPath, JSON.stringify(data, null, 2));
}

//conversão para booleano
function converterParaBooleano(respostas) {
    const respostasBooleanas = {};
    for (const key in respostas) {
        respostasBooleanas[key] = respostas[key].toUpperCase() === "SIM";
    }
    return respostasBooleanas;
}

//loadUser não é mais usada. agora user/login autentica e salva usuario
// app.post("/loadUser", (req,res)=>{
//     const {email} = req.body;

//     const usuarios = lerUsers();

//     const user = usuarios.find((u) => u.email === email);

//     res.json({
//         user: {nome: user.nome, email: user.email, cargo: user.cargo, departamento: user.departamento, telefone: user.telefone}
//     });
// });

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
            user: {email: user.email, nome: user.nome, cnpj: user.cnpj}
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Credenciais inválidas",
        });
    }
});

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

function salvarModulo(req, res, modulo) {
    const { cnpj, respostas } = req.body;

    if (!cnpj || !respostas || Object.keys(respostas).length === 0) {
        return res.status(400).json({ erro: `CNPJ e respostas são obrigatórios para salvar ${modulo}.` });
    }

    const questionarios = lerQuestionariosCompletos();
    
    const respostasBooleanas = converterParaBooleano(respostas);
    
    const novoRegistro = {
        dataConclusao: new Date().toISOString(),
        respostas: respostasBooleanas
    };

    let empresa = questionarios.find(item => item.cnpj === cnpj);

    if (!empresa) {
        empresa = { cnpj: cnpj };
        questionarios.push(empresa);
    }
    
    if (!empresa[modulo]) {
        empresa[modulo] = [];
    }
    empresa[modulo].push(novoRegistro);

    salvarQuestionariosCompletos(questionarios);

    res.status(201).json({
        success: true,
        message: `Questionário de ${modulo} salvo no objeto centralizado!`,
        cnpj: cnpj
    });
}

app.post("/governanca/concluir", (req, res) => {
    salvarModulo(req, res, "governanca");
});

app.post("/social/concluir", (req, res) => {
    salvarModulo(req, res, "social");
});

app.post("/meio_ambiente/concluir", (req, res) => {
    salvarModulo(req, res, "meio-ambiente");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});