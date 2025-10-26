// export const authenticate = async (email, password) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (email === "user@email.com" && password === "123456") {
//         resolve({
//           success: true,
//           user: {
//             email: "user@email.com",
//             name: "Usuário Teste",
//           },
//         });
//       } else {
//         resolve({
//           success: false,
//           message: "Credenciais inválidas",
//         });
//       }
//     }, 1000);
//   });
// };

export const authenticate = async (email, senha) => {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, senha}),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return {success: false, message: "Erro de conexão com o servidor"};
  }
};

export const loadUser = async (email) => {
  const response = await fetch("http://localhost:3001/loadUser", {
    method: "POST",
    headers : {"Content-Type": "application/json"},
    body: JSON.stringify({email})
  });

  const data = await response.json();
  return data;
}