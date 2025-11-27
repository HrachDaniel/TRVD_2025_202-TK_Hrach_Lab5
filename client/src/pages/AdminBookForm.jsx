import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

export default function AdminBookForm() {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (isEditMode) {
            api.get(`/books/${id}`).then(res => {
                const book = res.data;
                setValue('title', book.title);
                setValue('genre', book.genre);
                setValue('image', book.image);
                setValue('author', book.author?._id || book.author); 
            });
        }
    }, [id, isEditMode, setValue]);

    const onSubmit = async (data) => {
        try {
            if (isEditMode) {
                await api.put(`/books/${id}`, data);
                alert('Книгу оновлено!');
            } else {
                await api.post('/books', data);
                alert('Книгу створено!');
            }
            navigate('/');
        } catch (err) {
            alert('Помилка: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Видалити книгу?')) {
            await api.delete(`/books/${id}`);
            navigate('/');
        }
    };

    return (
        <div className="admin-form-container">
            <h2>{isEditMode ? 'Редагувати книгу' : 'Додати книгу'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form-group">
                    <label>Назва</label>
                    <input {...register('title', { required: true, minLength: 3 })} />
                    {errors.title && <span className="error">Мінімум 3 символи</span>}
                </div>

                <div className="form-group">
                    <label>ID Автора (ObjectId)</label>
                    <input {...register('author', { required: true })} placeholder="65a..." />
                </div>

                <div className="form-group">
                    <label>URL Зображення</label>
                    <input {...register('image', { required: true })} />
                </div>

                <div className="form-group">
                    <label>Жанр</label>
                    <input {...register('genre')} />
                </div>

                <button type="submit" className="btn-submit-book">
                    {isEditMode ? 'Зберегти зміни' : 'Створити'}
                </button>

                {isEditMode && (
                    <button type="button" onClick={handleDelete} className="btn-delete" style={{backgroundColor: 'red', marginTop: '10px', width: '100%', color:'white', padding: '10px'}}>
                        Видалити книгу
                    </button>
                )}
            </form>
        </div>
    );
}