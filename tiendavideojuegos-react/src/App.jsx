import React from 'react';
import ListaCompras from './components/ListaCompras';
import FormularioCompra from './components/FormularioCompra';
import './App.css'; // Asegúrate de importar el CSS

function App() {
    return (
        <div className="app-container">
            <h1 className="main-title">Tienda de Videojuegos</h1>
            <FormularioCompra />
            <ListaCompras />
        </div>
    );
}

export default App;