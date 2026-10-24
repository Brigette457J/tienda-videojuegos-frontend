import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarCompra({ compra, onUpdate }) {
    const [formData, setFormData] = useState({
        cliente_id: compra.cliente_id,
        videojuego_id: compra.videojuego_id,
        cantidad: compra.cantidad,
        fecha: compra.fecha
    });
    const [clientes, setClientes] = useState([]);
    const [videojuegos, setVideojuegos] = useState([]);

    // Cargar las listas para los selectores
    useEffect(() => {
        api.get('/clientes')
            .then(res => setClientes(res.data))
            .catch(err => console.error(err));
            
        api.get('/videojuegos')
            .then(res => setVideojuegos(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/compras/${compra.id}`, formData)
            .then(res => {
                alert(res.data.message);
                onUpdate(); // Refresca la lista de compras en el componente padre
            })
            .catch(err => console.error('Error al actualizar compra', err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
                {clientes.map(cl => (
                    <option key={cl.id} value={cl.id}>{cl.nombre} - {cl.correo}</option>
                ))}
            </select>
            <select name="videojuego_id" value={formData.videojuego_id} onChange={handleChange} required>
                {videojuegos.map(v => (
                    <option key={v.id} value={v.id}>{v.titulo} - ${v.precio}</option>
                ))}
            </select>
            <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
            <button type="submit">Actualizar Compra</button>
        </form>
    );
}

export default EditarCompra;