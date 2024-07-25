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
            const response = await tmdbService.fetchMovies(page);
            setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
            if (response.data.page >= response.data.total_pages) {
                setHasMore(false);
            }
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
