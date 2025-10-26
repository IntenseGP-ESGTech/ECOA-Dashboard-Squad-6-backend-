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


//login (post)
app.post("/login", (req,res)=>{
    const {email, senha} = req.body;

    const usuarios = lerUsers();

    const user = usuarios.find(
        (u) => u.email === email && u.senha === senha
    );

    if(user){
        res.json({
            success : true,
            user: {email: user.email, name: user.name},
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Credenciais inválidas",
        });
    }

});

//TODO loadUser
app.post("/loadUser", (req,res)=>{
    const {email} = req.body;

    const usuarios = lerUsers();

    const user = usuarios.find((u) => u.email === email);

    res.json({
        user: {nome: user.nome, email: user.email, cargo: user.cargo, departamento: user.departamento, telefone: user.telefone}
    });
});

// função de criar(post)
app.post("/users", (req, res)=>{
    const {nome, email, senha, cargo, departamento, telefone} = req.body;

    if(!nome || !email || !cargo || !departamento || !telefone){
        return res.status(400).json({erro: "Todos os campos são obrigatórios."})
    }

    const users = lerUsers();
    const novoUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        nome,
        email,
        senha,
        cargo,
        departamento,
        telefone
    };

    users.push(novoUser);
    salvarUsers(users);

    res.status(201).json(novoUser);
});

//função de read(get)
app.get("/users", (req, res) => {
    const users = lerUsers();
    res.json(users);
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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});