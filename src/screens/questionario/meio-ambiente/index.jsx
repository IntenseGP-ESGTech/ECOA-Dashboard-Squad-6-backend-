import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, HelpCircle } from "lucide-react";
import { useUser } from "../../../context";
import {salvaQuestionario} from "../submit";
import '../questionario.css';

function QuestionarioMeioAmbiente() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const {user}=useUser();

  const questions = [
    {
      id: 1,
      type: "multiple",
      question: "A empresa possui uma política ambiental formalizada e divulgada para todos os stakeholders?",
      options: [
        "SIM",
        "NÃO"
      ]
    },
    {
      id: 2,
      type: "multiple",
      question: "A empresa monitora e reporta suas emissões de gases de efeito estufa (GEE)?",
      options: [
        "SIM",
        "NÃO"
      ]
    },
    {
      id: 3,
      type: "multiple",
      question: "A empresa possui metas de redução de consumo de água e energia?",
      options: [
        "SIM",
        "NÃO"
      ]
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      ['q' + questionId]: answer
    });
  };

  const handleNext = () => {
    if (answers['q' + questions[currentQuestion].id] && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setStatusMessage('');
    } else if (currentQuestion < questions.length - 1) {
      setStatusMessage('Selecione uma opção para prosseguir.');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setStatusMessage('');
    }
  };

  const handleSubmit = () => { 
    if (!answers['q' + questions[currentQuestion].id]) {
        alert('Por favor, selecione uma opção antes de finalizar.');
        return;
    }

    const payload = {
      cnpj: user.cnpj, 
      modulo: "meio_ambiente",
      respostas: answers
    };

    setIsSubmitting(true);

    salvaQuestionario(payload);

    setIsSubmitting(false);

    navigate('/questionario');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="dashboard-background">
      <div className="questionario-container">
        <div className="questionario-header">
          <h1>Meio Ambiente</h1>
          <p>Avaliação de práticas ambientais e sustentabilidade</p>
        </div>
        
        {statusMessage && (
          <div className={`status-message p-3 rounded-lg mb-4 text-white font-semibold 
            ${statusMessage.includes('Sucesso') ? 'bg-green-500' : 
             statusMessage.includes('Erro') ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {statusMessage}
          </div>
        )}

        <div className="questionario-content">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          
          <p className="question-counter">{currentQuestion + 1}/{questions.length}</p>

          <div className="questionario-form">
            <div className="question-card environment-question">
              <h3 className="question-title">{currentQuestionData.question}</h3>
              
              {currentQuestionData.type === "multiple" && (
                <div className="question-options environment-question">
                  {currentQuestionData.options.map((option, index) => (
                    <div className="option-item" key={index}>
                      <input 
                        type="radio" 
                        id={`option-meio-${currentQuestionData.id}-${index}`} 
                        name={`question-${currentQuestionData.id}`}
                        checked={answers['q' + currentQuestionData.id] === option}
                        onChange={() => handleAnswerChange(currentQuestionData.id, option)}
                        disabled={isSubmitting}
                      />
                      <label htmlFor={`option-meio-${currentQuestionData.id}-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="navigation-buttons">
              <button 
                className="nav-button back-button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || isSubmitting}
              >
                <ArrowLeft size={16} /> Anterior
              </button>
              
              {currentQuestion < questions.length - 1 ? (
                <button 
                  className="nav-button next-button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Próxima <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  className="nav-button submit-button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !answers['q' + currentQuestionData.id]}
                >
                  {isSubmitting ? 'Enviando...' : 'Finalizar Questionário'} <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          <Link to="/questionario" className="back-link">
            <ArrowLeft size={16} /> Voltar para o Questionário
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuestionarioMeioAmbiente;
