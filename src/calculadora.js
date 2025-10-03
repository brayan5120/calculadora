import { useState } from "react";

export default function Calculadora() {
  const [pantalla, setPantalla] = useState("0");
  const [primerNum, setPrimerNum] = useState(null);
  const [operador, setOperador] = useState(null);
  const [segundoNum, setSegundoNum] = useState(null);
  const [resultadoMostrado, setResultadoMostrado] = useState(false);

  // Agregar número
  const agregarNumero = (num) => {
    if (resultadoMostrado) {
      // Reiniciar si ya se mostró un resultado
      setPantalla(num);
      setPrimerNum(num);
      setOperador(null);
      setSegundoNum(null);
      setResultadoMostrado(false);
    } else {
      if (operador === null) {
        const nuevo = primerNum === null ? num : primerNum + num;
        setPrimerNum(nuevo);
        setPantalla(nuevo);
      } else {
        const nuevo = segundoNum === null ? num : segundoNum + num;
        setSegundoNum(nuevo);
        setPantalla(`${primerNum} ${operador} ${nuevo}`);
      }
    }
  };

  // Seleccionar operación
  const elegirOperacion = (op) => {
    if (primerNum !== null && operador === null) {
      setOperador(op);
      setPantalla(`${primerNum} ${op}`);
    }
  };

  // Calcular resultado
  const calcular = () => {
    if (primerNum !== null && operador !== null && segundoNum !== null) {
      const n1 = Number(primerNum);
      const n2 = Number(segundoNum);
      let resultado;

      switch (operador) {
        case "+":
          resultado = n1 + n2;
          break;
        case "−":
          resultado = n1 - n2;
          break;
        case "×":
          resultado = n1 * n2;
          break;
        case "÷":
          resultado = n2 !== 0 ? n1 / n2 : "❌";
          break;
        default:
          return;
      }

      setPantalla(resultado.toString());
      setPrimerNum(resultado.toString());
      setOperador(null);
      setSegundoNum(null);
      setResultadoMostrado(true);
    }
  };

  return (
    <div className="calculadora">
      <div className="pantalla">{pantalla}</div>
      <div className="teclado">
        <div className="fila">
          <button onClick={() => agregarNumero("7")}>7</button>
          <button onClick={() => agregarNumero("8")}>8</button>
          <button onClick={() => agregarNumero("9")}>9</button>
          <button onClick={() => elegirOperacion("÷")}>÷</button>
        </div>
        <div className="fila">
          <button onClick={() => agregarNumero("4")}>4</button>
          <button onClick={() => agregarNumero("5")}>5</button>
          <button onClick={() => agregarNumero("6")}>6</button>
          <button onClick={() => elegirOperacion("×")}>×</button>
        </div>
        <div className="fila">
          <button onClick={() => agregarNumero("1")}>1</button>
          <button onClick={() => agregarNumero("2")}>2</button>
          <button onClick={() => agregarNumero("3")}>3</button>
          <button onClick={() => elegirOperacion("−")}>−</button>
        </div>
        <div className="fila">
          <button onClick={() => agregarNumero("0")}>0</button>
          <button className="igual" onClick={calcular}>
            =
          </button>
          <button onClick={() => elegirOperacion("+")}>+</button>
        </div>
      </div>
    </div>
  );
}
