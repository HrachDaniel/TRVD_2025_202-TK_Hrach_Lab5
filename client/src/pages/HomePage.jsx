import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookCard = ({ book }) => (
    <Link to={`/book/${book._id}`} className="manga-card">
        <img src={book.image} alt={book.title} />
        <div className="manga-card-info">
            <h4>{book.title}</h4>
            <p>{book.author?.name || book.genre}</p> 
        </div>
    </Link>
);

const ListItem = ({ book }) => (
    <Link to={`/book/${book._id}`} className="list-item">
        <img src={book.image} alt={book.title} />
        <div className="list-item-info">
            <h4>{book.title}</h4>
            <p>{book.genre}</p>
        </div>
    </Link>
);

export default function HomePage() {
    const { user } = useAuth();
    const [data, setData] = useState({
        newUpdates: [],
        beingRead: [],
        trending: [],
        popular: [],
        loading: true, 
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const updatesRes = await api.get('/updates'); 
                const readRes = await api.get('/being-read');
                const trendingRes = await api.get('/trending');
                const popularRes = await api.get('/popular');
                
                setData({
                    newUpdates: updatesRes.data,
                    beingRead: readRes.data,
                    trending: trendingRes.data,
                    popular: popularRes.data,
                    loading: false
                });

            } catch (err) {
                console.error("Помилка завантаження даних:", err);
                setData(d => ({...d, loading: false })); 
            }
        };
        fetchAllData();
    }, [user]); 

    if (data.loading) return <div>Завантаження даних...</div>;

    return (
        <div className="container">
            
            <h2>Оновлення за сьогодні</h2>
            <div className="section-grid top-updates-grid">
                {data.newUpdates.map(book => <BookCard key={book._id} book={book} />)}
            </div>
            
            <div className="index-sections">
                <div className="section-block">
                    <h3>Зараз читають</h3> 
                    {data.beingRead.map(book => <ListItem key={book._id} book={book} />)}
                </div>

                <div className="section-block">
                    <h3>Набирає популярність</h3>
                    {data.trending.map(book => <ListItem key={book._id} book={book} />)}
                </div>
                
                <div className="section-block">
                    <h3>Популярне</h3>
                    {data.popular.map(book => <ListItem key={book._id} book={book} />)}
                </div>
            </div>

        </div>
    );
}