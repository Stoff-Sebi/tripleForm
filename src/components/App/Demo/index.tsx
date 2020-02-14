import React from "react";
import styles from "./styles.module.css"; //import css module here -> this variable can then be used in classname.

//defined props as Typescript interface
interface props {
  
}

//component declared as of type React Functional component with given generic props type (defined above).
const Demo: React.FC<props> = () => {

  const [counter, setCounter] = React.useState<number>(0);  //React.useState() -> call it this way to be able to make useState()!

  //counter set to one on mount (not necessary just demonstration of a "side effect").
  React.useEffect(()=>{
    setCounter(1);
  }, [])

  return (
    <div className="App" data-test="component-app"> {/** "data-test" attribute is used for testing purposes.  */}
      <header className="App-header">
        <h2>React - Web Komponente Demo</h2>
        <p>Dieser Paragraph wird von React gesteuert</p>
        <p>Und zwar von der Demo Komponente</p>
        <p className={styles.paragraph}>
          Dieser Paragraph wird von einem css Modul gestyled
        </p>
        <p>Momentaner Server als environment variable: {process.env.REACT_APP_AJAX_SERVER}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      <h2 data-test="counter-display">The counter is currently: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)} data-test="increment-button">Increment Counter</button>
      </header>
    </div>
  );
};

export default Demo;
