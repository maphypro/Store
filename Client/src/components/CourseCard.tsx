import React from 'react';
import {Box, Card, Container, Paper, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Grid from '@mui/material/Grid';

type CourseCardProps = {
    title: string,
    author: string,
    image: any,
    price: number | string,
    rating: number,
    studentsCount: number,
    courseTime: number

}

type InfoProps = {
    rating: number,
    studentsCount: number,
    courseTime: number

}

type HeaderProps = {
    title: string,
    image: any
}

const Info = ({rating, studentsCount, courseTime}:InfoProps) => {

    const style = {
        display: 'flex',
        m: 2
    }

    return (
        <Box sx={ {display: 'flex', flexDirection: 'row', border: '1px solid black', minWidth: '200px'} }>
            <Box sx={style}>
                <StarIcon/>
                <Typography>
                    {rating}
                </Typography>
            </Box>
            <Box sx={style}>
                <PersonIcon/>
                <Typography>
                    {studentsCount}
                </Typography>
            </Box>
            <Box sx={style}>
                <AccessTimeIcon/>
                <Typography >
                    {courseTime}
                </Typography>
            </Box>
        </Box>
    );
};

const Header = ({title, image}: HeaderProps) => {
    console.log(image)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <Typography variant={'h6'} sx={ { wordWrap: 'break-word' } } maxWidth={.5}>
                {title}
            </Typography>
            <img src={`http://localhost:5002/${image}`} alt="курс" style={{width:'100px', height: "auto"}}/>
        </Box>
    )
}

const CourseCard = ({title, author, image, price, rating, studentsCount, courseTime}: CourseCardProps) => {
    return (
        <Grid item xs={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', minWidth:'200px' }}>
                <Header title={title} image={image}/>
                <Typography variant={'body1'} sx={ {border: '1px solid black', textAlign:'start'} }>
                    {author}
                </Typography>
                <Info rating={rating} studentsCount={studentsCount} courseTime={courseTime}/>
                <Typography variant={'body1'} sx={ {border: '1px solid black', textAlign:'start'} }>
                    {price}
                </Typography>
            </Card>
        </Grid>
    );
};

export default CourseCard;