import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Users, Leaf, Building } from "lucide-react";
import { useUser } from "../../context";
import {getAnswers} from "./getAnswers";
import './questionario.css';

function Questionario() {
  const {user} = useUser();
  const navigate = useNavigate();

  const isAnswered = async() => {
    const resp = await getAnswers(user.cnpj);
    
    return resp.success;
  } 

  const handleAnswered = async() => {
    const answered = await isAnswered();

    if(answered){
      navigate("/questionario/resultado");
    } else {
      alert("Por favor, responda ao questionário");
    }
  }

  return (
    <div className="dashboard-background">
      <div className="questionario-container">
        <div className="questionario-header">
          <h1>QUESTIONÁRIO</h1>
        </div>

        <div className="questionario-content">
          <div className="questionario-categories">
            <Link to="/questionario/social" className="category-button">
              <div className="category-icon social-icon">
                <Users size={40} />
              </div>
              <span className="category-text">Social</span>
            </Link>
            
            <Link to="/questionario/meio-ambiente" className="category-button">
              <div className="category-icon environment-icon">
                <Leaf size={40} />
              </div>
              <span className="category-text">Meio Ambiente</span>
            </Link>
            
            <Link to="/questionario/governanca" className="category-button">
              <div className="category-icon governance-icon">
                <Building size={40} />
              </div>
              <span className="category-text">Governança</span>
            </Link>
          </div>

          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={16} /> Voltar para o Dashboard
          </Link>

          <button className="front-link link-button" onClick={handleAnswered}>
            <ArrowRight size={16} /> Ver Resultado
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questionario;
