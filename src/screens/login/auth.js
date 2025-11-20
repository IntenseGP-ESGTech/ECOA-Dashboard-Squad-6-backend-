export const authenticate = async (email, senha) => {
  try {
    const response = await fetch("http://localhost:3001/user/login", {
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
