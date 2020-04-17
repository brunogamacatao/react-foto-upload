import React from 'react';
import { Link } from "react-router-dom";


function Cabecalho() {
  return (
    <>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-12 text-center">
            <a className="blog-header-logo text-dark" href="#">
              Exemplo de Upload com React, Node e Express
            </a>
          </div>
        </div>
      </header>

      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link className="p-2 text-muted" to="/">Upload Simples</Link>
          <Link className="p-2 text-muted" to="/drop">Upload Com Drop Zone</Link>
        </nav>
      </div>
    </>
  );
}

export default Cabecalho;