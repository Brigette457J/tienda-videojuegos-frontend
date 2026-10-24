import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarCompra from './EditarCompra';

function ListaCompras() {
    const [compras, setCompras] = useState([]);
    const [compraSeleccionada, setCompraSeleccionada] = useState(null);

    const cargarCompras = () => {
        api.get('/compras')
            .then(res => setCompras(res.data))
            .catch(err => console.error('Error al obtener compras:', err));
    };

    useEffect(() => {
        cargarCompras();
    }, []);

    const eliminarCompra = (id) => {
        if (window.confirm('¿Seguro que deseas eliminar esta compra?')) {
            api.delete(`/compras/${id}`)
                .then(res => {
                    alert(res.data.message);
                    cargarCompras();
                })
                .catch(err => console.error('Error al eliminar compra:', err));
        }
    };

    return (
        <div className="section-container">
            <h2 className="section-title">Historial de Compras</h2>
            <div className="table-container">
                <table className="gamer-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Videojuego</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map(c => (
                            <tr key={c.id}>
                                <td>{c.cliente}</td>
                                <td>{c.videojuego}</td>
                                <td>{c.cantidad}</td>
                                <td>${c.precio}</td>
                                <td>${c.total}</td>
                                <td>{c.fecha}</td>
                                <td>
                                    <button onClick={() => setCompraSeleccionada(c)} className="btn btn-edit">Editar</button>
                                    <button onClick={() => eliminarCompra(c.id)} className="btn btn-delete">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {compraSeleccionada && (
                <EditarCompra 
                    compra={compraSeleccionada} 
                    onUpdate={() => { 
                        setCompraSeleccionada(null);
                        cargarCompras(); 
                    }} 
                />
            )}
        </div>
    );
}

export default ListaCompras;