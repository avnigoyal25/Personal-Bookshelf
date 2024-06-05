import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import '../css/bookSearch.css';

export default function BookSearch() {
    const [bookName, setBookName] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addedBooks, setAddedBooks] = useState([]);

    const handleInputChange = (e) => {
        setBookName(e.target.value);
    };

    const fetchResults = async (query) => {
        if (query.trim() === '') {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
            const data = await response.json();
            setResults(data.docs || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

    const handleSearchClick = () => {
        debouncedFetchResults(bookName);
    };

    const addToBookshelf = (book) => {
        const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        if (!bookshelf.some((b) => b.key === book.key)) {
            bookshelf.push(book);
            localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
            setAddedBooks([...addedBooks, book.key]);
        }
    };

    return (
        <div>
            <h1>Search your book!</h1>
            <Link to="/bookshelf">
                <button className='button-3'>Go to My Bookshelf</button>
            </Link>
            <input
                type="text"
                value={bookName}
                onChange={handleInputChange}
                placeholder="Enter book name"
            />
            <button className='button-1' onClick={handleSearchClick}>Search</button>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="results">
                    {results.map((book) => (
                        <div key={book.key} className="book-card">
                            <h3 style={{color:"brown"}}>{book.title}</h3>
                            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                            <p style={{marginTop:"10px",fontStyle:"italic",color:"blue"}}>{book.first_publish_year ? book.first_publish_year : 'Unknown Year'}</p>
                            <button
                              className='button-18'
                                onClick={() => addToBookshelf(book)}
                                disabled={addedBooks.includes(book.key)}
                            >
                                {addedBooks.includes(book.key) ? 'Added' : 'Add to Bookshelf'}
                            </button>
                        </div>
                    ))}
                </div>
            )} 

        </div>
    );
}
