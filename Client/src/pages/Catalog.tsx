import React from 'react';
import CourseCard from "../components/CourseCard";
import {Container, Paper} from "@mui/material";
import cat from '../images/cat.jpg'
import Grid from '@mui/material/Grid';
const Catalog = () => {

    const arr = [{
        title: 'Title Lorem ipsum dolor sit amet',
        author: 'Author',
        courseTime: 10,
        logo: cat,
        price: 1199,
        rating: 4.6,
        studentsCount: 212
    }, {
        title: 'Title Lorem ipsum dolor sit amet',
        author: 'Author',
        courseTime: 10,
        logo: cat,
        price: 1199,
        rating: 4.6,
        studentsCount: 212
    }, {
        title: 'Title Lorem ipsum dolor sit amet',
        author: 'Author',
        courseTime: 10,
        logo: cat,
        price: 1199,
        rating: 4.6,
        studentsCount: 212
    }, {
        title: 'Title Lorem ipsum dolor sit amet',
        author: 'Author',
        courseTime: 10,
        logo: cat,
        price: 1199,
        rating: 4.6,
        studentsCount: 212
    }, {
        title: 'Title Lorem ipsum dolor sit amet',
        author: 'Author',
        courseTime: 10,
        logo: cat,
        price: 1199,
        rating: 4.6,
        studentsCount: 212
    },
    ];


    return (

        <Container maxWidth={'lg'} sx={{height: '500px'}}>
            <Grid container sx={{border: '1px solid black', pr: 3}} spacing={3}>
                {
                    arr.map((card, index) => {
                        return (
                            <CourseCard title={card.title} author={card.author} logo={card.logo}
                                        courseTime={card.courseTime} studentsCount={card.studentsCount}
                                        rating={card.rating} price={card.price}/>
                        )
                    })
                }
            </Grid>
        </Container>
    );
};

export default Catalog;