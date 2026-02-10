import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditarPassageiro() {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        endereco: '',
        preferencias: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchPassenger();
        }
    }, [id]);

    const fetchPassenger = async () => {
        try {
            const response = await fetch(`http://localhost:3001/admin/users/${id}`);
            const data = await response.json();
            if (data) {
                setFormData({
                    nome: data.nome,
                    email: data.email,
                    cpf: data.passageiros?.cpf || '',
                    telefone: data.passageiros?.telefone || '',
                    endereco: data.passageiros?.endereco || '',
                    preferencias: data.passageiros?.preferencias || ''
                });
            }
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar passageiro:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                alert('Passageiro atualizado com sucesso!');
                router.push('/Passageiros');
            } else {
                alert('Erro ao atualizar passageiro');
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Erro ao atualizar');
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Editar Passageiro</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', gap: '10px' }}>
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>CPF:</label>
                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />

                <label>Telefone:</label>
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />

                <label>Endereço:</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />

                <label>Preferências:</label>
                <textarea name="preferencias" value={formData.preferencias} onChange={handleChange} />

                <button type="submit" style={{ marginTop: '20px', padding: '10px' }}>Salvar Alterações</button>
            </form>
            <button onClick={() => router.push('/Passageiros')} style={{ marginTop: '10px' }}>Voltar</button>
        </div>
    );
}
