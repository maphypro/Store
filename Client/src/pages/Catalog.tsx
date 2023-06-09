import {Container} from "@mui/material";
import cat from '../images/cat.jpg'
import Grid from '@mui/material/Grid';
import Header from '../components/Header';
import { useLoadCardsQuery } from "../store/CourseCard/courseCardApi";
import CourseCard from "../components/CourseCard";
import React from "react";


const Catalog = () => {

    /*
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
    */


    const {data, isFetching, isLoading} = useLoadCardsQuery();

   

    return (
        <React.Fragment> 
        <Header />
        <Container maxWidth={'lg'} sx={{mt:3}}>
            <Grid container  spacing={3}>
                {
                    data && data.map((card, index) => {
                        return (
                            <CourseCard key={index} title={card.title} author={card.author} image={card.image}
                                        courseTime={card.courseTime} studentsCount={card.studentsCount}
                                        rating={card.rating} price={card.price}/>
                        )
                    })
                }
            </Grid>
        </Container>
        </React.Fragment>
    );
};

export default Catalog;