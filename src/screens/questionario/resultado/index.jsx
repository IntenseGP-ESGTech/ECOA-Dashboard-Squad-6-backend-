import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Users, Leaf, Building } from "lucide-react";
import { useUser } from "../../../context";
import { getAnswers } from "../getAnswers";
import '../questionario.css';

function Questionario() {
  const{user} = useUser();
  const [resultadoSocial, setResultadoSocial] = useState(null);
  const [resultadoGovernanca, setResultadoGovernanca] = useState(null);
  const [resultadoMeioAmbiente, setResultadoMeioAmbiente] = useState(null);
  const [aptidao, setAptidao] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await getAnswers(user.cnpj);

      const social = data.data.social;

      const rSocial =
        social.q1 && social.q2 && social.q3
          ? { texto: "apto", color: "green" }
          : { texto: "inapto", color: "red" };

      const governanca = data.data.governanca;

      const rGovernanca =
        governanca.q1 && governanca.q2 && governanca.q3
          ? { texto: "apto", color: "green" }
          : { texto: "inapto", color: "red" };

      
      const meioAmbiente = data.data.meio_ambiente;

      const rMeioAmbiente =
        meioAmbiente.q1 && meioAmbiente.q2 && meioAmbiente.q3
          ? { texto: "apto", color: "green" }
          : { texto: "inapto", color: "red" };

      const bSocial = (social.q1 && social.q2 && social.q3)
      const bGovernanca = (governanca.q1 && governanca.q2 && governanca.q3);
      const bMeioAmbiente = (meioAmbiente.q1 && meioAmbiente.q2 && meioAmbiente.q3)
      
      const aptidao = 
        bSocial && bGovernanca && bMeioAmbiente
          ? { texto: "Está apto a receber certificado ESG", color: "green" }
          : { texto: "Está inapto a receber certificado ESG", color: "red" };
      
      setResultadoSocial(rSocial);
      setResultadoGovernanca(rGovernanca);
      setResultadoMeioAmbiente(rMeioAmbiente);
      setAptidao(aptidao);
    };

    loadData();
  }, [user.cnpj]);


  return (
    <div className="dashboard-background">
      <div className="questionario-container">
        <div className="questionario-header">
          <h1>Resultado</h1>
        </div>

        <div className="questionario-content">
          <div className="resultado-content">
            
            <h2 className="centraliza-questionario">{user.nome}</h2>
            {resultadoSocial ? (
              <p className="centraliza-questionario">
                Social: <span style={{ color: resultadoSocial.color }}>
                  {resultadoSocial.texto}
                </span>
              </p>
            ) : (
              <p className="centraliza-questionario">Carregando...</p>
            )}
            
            
            
            {resultadoMeioAmbiente ? (
              <p className="centraliza-questionario">
                Meio Ambiente: <span style={{ color: resultadoMeioAmbiente.color }}>
                  {resultadoMeioAmbiente.texto}
                </span>
              </p>
            ) : (
              <p className="centraliza-questionario">Carregando...</p>
            )}

            {resultadoGovernanca ? (
              <p className="centraliza-questionario">
                Governança: <span style={{ color: resultadoGovernanca.color }}>
                  {resultadoGovernanca.texto}
                </span>
              </p>
            ) : (
              <p className="centraliza-questionario">Carregando...</p>
            )}

            {aptidao ? (
              <h3 className="centraliza-questionario">
                <span style={{ color: aptidao.color }}>
                  {aptidao.texto}
                </span>
              </h3>
            ) : (
              <p className="centraliza-questionario">Carregando...</p>
            )}
          </div>

            <Link to="/questionario" className="back-link">
                <ArrowLeft size={16} /> Voltar para o Questionário
            </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Questionario;