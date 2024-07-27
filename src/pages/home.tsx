import React from 'react';
import "./page.scss";
import {Box} from "@mui/material";
import CollectMovies from "../components/infinite_scroll";

const Home = () => {
    return (
        <>
            <div className='maincolumn'>
                <Box className='column' >
                    <CollectMovies type="Animations" genre={16}/>
                </Box>
                <Box className='column' >
                    <CollectMovies type="Movies" genre={18}/>
                </Box>
                <Box className='column'>
                    <CollectMovies type="TV" genre={53}/>
                </Box>
            </div>
        </>

    );
};

export default Home;