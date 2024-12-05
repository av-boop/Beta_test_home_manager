import React from "react";
import Header from "./Component/Common/Header/Header";
import Layout from "./Component/Layout";


/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <>
      <Header />
      <div className="container">
        <main className="row">
          <div className="col">
            <Layout />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
