import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await api.get('/books');
                setBooks(res.data);
            } catch (err) {
                console.error("Помилка завантаження книг");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) return <div>Завантаження...</div>;

    return (
        <div className="container">
            <h2>Каталог книг</h2>
            <div className="section-grid catalog-grid-page">
                {books.map(book => (
                    <Link to={`/book/${book._id}`} key={book._id} className="manga-card">
                        <img src={book.image} alt={book.title} />
                        <div className="manga-card-info">
                            <h4>{book.title}</h4>
                            <p>{book.author?.name || 'Невідомий автор'}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}