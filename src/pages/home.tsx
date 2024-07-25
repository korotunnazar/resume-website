import React from 'react';
import "./page.scss";
import {Box} from "@mui/material";
import MoviesComponent from "../components/infinite_scroll";

const Home = () => {
    return (
        <div className='maincolumn'>
            <Box className = 'column' marginRight = '1px'>
                HELLO
                <Box>
                    <MoviesComponent />
                </Box>
            </Box>
            <Box className = 'column' marginLeft = '1px' marginRight = '1px'>
                <Box>

                </Box>
            </Box>
            <Box className = 'column' marginLeft = '1px'>
                <Box>

                </Box>
            </Box>
        </div>
    );
};

export default Home;