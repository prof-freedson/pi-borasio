import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditarMotorista() {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cnh: '',
        telefone: '',
        endereco: '',
        veiculoMarca: '',
        veiculoModelo: '',
        veiculoPlaca: '',
        veiculoCor: '',
        veiculoCombustivel: '',
        veiculoAssentos: 4,
        veiculoArCondicionado: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchDriver();
        }
    }, [id]);

    const fetchDriver = async () => {
        try {
            const response = await fetch(`http://localhost:3001/admin/users/${id}`);
            const data = await response.json();
            if (data) {
                setFormData({
                    nome: data.nome,
                    email: data.email,
                    cnh: data.motoristas?.cnh || '',
                    telefone: data.motoristas?.telefone || '',
                    endereco: data.motoristas?.endereco || '',
                    veiculoMarca: data.motoristas?.marca || '',
                    veiculoModelo: data.motoristas?.modelo || '',
                    veiculoPlaca: data.motoristas?.placa || '',
                    veiculoCor: data.motoristas?.cor || '',
                    veiculoCombustivel: data.motoristas?.combustivel || '',
                    veiculoAssentos: data.motoristas?.assentos || 4,
                    veiculoArCondicionado: data.motoristas?.ar_condicionado || false
                });
            }
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar motorista:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/admin/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Motorista atualizado com sucesso!');
                router.push('/Motoristas');
            } else {
                alert('Erro ao atualizar motorista');
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Erro ao atualizar');
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Editar Motorista</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', gap: '10px' }}>
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>CNH:</label>
                <input type="text" name="cnh" value={formData.cnh} onChange={handleChange} />

                <label>Telefone:</label>
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />

                <label>Endereço:</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />

                <h3>Dados do Veículo</h3>
                <label>Marca:</label>
                <input type="text" name="veiculoMarca" value={formData.veiculoMarca} onChange={handleChange} />

                <label>Modelo:</label>
                <input type="text" name="veiculoModelo" value={formData.veiculoModelo} onChange={handleChange} />

                <label>Placa:</label>
                <input type="text" name="veiculoPlaca" value={formData.veiculoPlaca} onChange={handleChange} />

                <label>Cor:</label>
                <input type="text" name="veiculoCor" value={formData.veiculoCor} onChange={handleChange} />

                <label>Combustível:</label>
                <select name="veiculoCombustivel" value={formData.veiculoCombustivel} onChange={handleChange}>
                    <option value="">Selecione</option>
                    <option value="gasolina">Gasolina</option>
                    <option value="etanol">Etanol</option>
                    <option value="diesel">Diesel</option>
                    <option value="flex">Flex</option>
                </select>

                <label>Assentos:</label>
                <input type="number" name="veiculoAssentos" value={formData.veiculoAssentos} onChange={handleChange} />

                <label>
                    <input type="checkbox" name="veiculoArCondicionado" checked={formData.veiculoArCondicionado} onChange={handleChange} />
                    Possui Ar Condicionado?
                </label>

                <button type="submit" style={{ marginTop: '20px', padding: '10px' }}>Salvar Alterações</button>
            </form>
            <button onClick={() => router.push('/Motoristas')} style={{ marginTop: '10px' }}>Voltar</button>
        </div>
    );
}
