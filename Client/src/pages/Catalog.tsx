import {Container} from "@mui/material";
import cat from '../images/cat.jpg'
import Grid from '@mui/material/Grid';
import Header from '../components/Header';
import { useLoadCardsQuery } from "../store/Course/courseApi";
import CourseCard from "../components/CourseCard";
import React from "react";


const Catalog = () => {


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