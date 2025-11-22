export const getAnswers = async(cnpj) =>{
    try {
        const response = await fetch(`http://localhost:3001/questionario/${cnpj}`)
        
        if(!response.ok){
            throw new Error("Erro ao buscar questionário");
        }

        const data = await response.json();

        return {success: true, data};
    } catch (error) {
        console.error("Erro na requisição GET:", error);
        return { success: false, erro: error.message };
    }
}
