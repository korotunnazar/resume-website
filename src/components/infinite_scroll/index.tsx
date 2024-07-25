// src/MoviesComponent.tsx
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSpring, animated } from 'react-spring';
import tmdbService from '../fetcher/index';
import '../../App.css'

const AnimatedItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500 }
    });

    return <animated.div style={props}>{children}</animated.div>;
};

const MoviesComponent: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, [page]);

    const fetchMovies = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzNhOGY0YjJiOWFlM2FkMmJiODA2YjMwNTAwYzBlNCIsIm5iZiI6MTcyMTg0MzA5My43NTMxNTIsInN1YiI6IjY2YTEzYzc0YzRlNjNiZGI3NGUwZDhhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-gi8IYHYWQDUzqmIQ7cjYjNPuiTRsqt1Aqg5y2OjJnQ'
                }
            };
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16', options)
                .then(response => response.json())
                .then(response => {
                    setMovies((prevMovies) => [...prevMovies, ...response.results]);
                    if (response.page >= response.total_pages) {
                        setHasMore(false);
                    }
                })
                .catch(err => console.error(err));


        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div>
            <h1>Popular Movies</h1>
            <InfiniteScroll
                dataLength={movies.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="movies-list">
                    {movies.map((movie) => (
                        <AnimatedItem key={movie.id}>
                            <div className="movie-item">
                                <h3>{movie.title}</h3>
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default MoviesComponent;
