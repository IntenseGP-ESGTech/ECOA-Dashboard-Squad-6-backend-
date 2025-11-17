export const register = async (cnpj, email, nome, senha)=>{
    try{
        const response = await fetch("http://localhost:3001/user/register", {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email, cnpj, nome, senha}),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao registrar: ", error);
        return {success: false, message:"Erro ao registrar"};
    }
}