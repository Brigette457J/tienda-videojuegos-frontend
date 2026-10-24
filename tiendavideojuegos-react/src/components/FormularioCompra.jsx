import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioCompra() {
    const [formData, setFormData] = useState({
        cliente_id: '',
        videojuego_id: '',
        cantidad: '',
        fecha: ''
    });
    const [clientes, setClientes] = useState([]);
    const [videojuegos, setVideojuegos] = useState([]);

    // Cargar listas de clientes y videojuegos al iniciar
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
        api.post('/compras', formData)
            .then(res => {
                alert(res.data.message);
                setFormData({ cliente_id: '', videojuego_id: '', cantidad: '', fecha: '' });
            })
            .catch(err => console.error('Error al registrar compra:', err));
    };

    return (
        <div>
            <h2>Registrar Nueva Compra</h2>
            <form onSubmit={handleSubmit}>
                <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
                    <option value="">Seleccione un Cliente</option>
                    {clientes.map(cl => (
                        <option key={cl.id} value={cl.id}>{cl.nombre} - {cl.correo}</option>
                    ))}
                </select>
                <select name="videojuego_id" value={formData.videojuego_id} onChange={handleChange} required>
                    <option value="">Seleccione un Videojuego</option>
                    {videojuegos.map(v => (
                        <option key={v.id} value={v.id}>{v.titulo} - ${v.precio}</option>
                    ))}
                </select>
                <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required />
                <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
                <button type="submit">Registrar Compra</button>
            </form>
        </div>
    );
}

export default FormularioCompra;