export const salvaQuestionario = async(payload) => {
    try {
    const response = await fetch('http://localhost:3001/questionario/salvar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
    alert(`Questionário ${payload.modulo} enviado com sucesso!`);
    } else {
    alert(`Erro ao salvar: ${data.erro || data.message || 'Falha na comunicação com o backend.'}`);
    }
    } catch (error) {
    alert(`Erro de conexão: O servidor (http://localhost:3001) pode estar offline.`)
    }
}