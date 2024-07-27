import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSpring, animated } from 'react-spring';
import '../../App.css'
import {Topbar} from "../topbar";
import {Box} from "@mui/material";

interface CMProps {
    type: string;
    genre?: number;
}

const AnimatedItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500 }
    });

    return <animated.div style={props}>{children}</animated.div>;
};

const CollectMovies = ( {genre, type} : CMProps ) => {
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
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`, options)
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

    const cutText = (type : string) => {
        let arr = [];
        let sub = type.substring(0, 24);
        arr = sub.split(' ');
        if (type.length > 30) {
            arr.pop();
        }
        let result = arr.join(' ');
        result = result.replace(/[:;,-]+|,+$/g, '');
        return result + ((type.length > 30) ? '...' : '');
    }

    return (
        <div>
            <Box className = 'topbar'>
                <Topbar type={type}/>
            </Box>
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
                                <Box className = 'movie-item-text'>
                                    <h3>{cutText(movie.title)}</h3>
                                </Box>
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default CollectMovies;
