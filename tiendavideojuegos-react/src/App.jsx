import React from 'react';
import ListaCompras from './components/ListaCompras';
import FormularioCompra from './components/FormularioCompra';

function App() {
    return (
        <div>
            <h1>Tienda de Videojuegos</h1>
            <FormularioCompra />
            <ListaCompras />
        </div>
    );
}

export default App;