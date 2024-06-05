import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../css/bookShelf.css';

export default function BookShelf() {
    const [bookshelf, setBookshelf] = useState([]);
    useEffect(() => {
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
    }, []);
    return (
        <div>
            <h1>My Bookshelf</h1>
            <Link to="/">
                <button className='button-3'>Back to Search</button>
            </Link>
            <div className="results">
                {bookshelf.map((book) => (
                    <div key={book.key} className="book-card">
                        <h3 style={{color:"brown"}}>{book.title}</h3>
                        <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                        <p style={{marginTop:"10px",fontStyle:"italic",color:"blue"}}>{book.first_publish_year ? book.first_publish_year : 'Unknown Year'}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
