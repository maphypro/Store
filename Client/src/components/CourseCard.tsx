import React from 'react';
import {Box, Card, Container, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type CourseCardProps = {
    title: string,
    author: string,
    logo: any,
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
    logo: any
}

const Info = ({rating, studentsCount, courseTime}:InfoProps) => {

    const style = {
        display: 'flex',
        m: 2
    }

    return (
        <Box sx={ {display: 'flex', flexDirection: 'row', border: '1px solid black'} }>
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

const Header = ({title, logo}: HeaderProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <Typography variant={'h6'} sx={ { wordWrap: 'break-word' } } maxWidth={.5}>
                {title}
            </Typography>
            <img src={logo} alt="курс"/>
        </Box>
    )
}

const CourseCard = ({title, author, logo, price, rating, studentsCount, courseTime}: CourseCardProps) => {
    return (
        <Container>
            <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: '300px',  maxWidth: .3 ,p:2 }}>
                <Header title={title} logo={logo}/>
                <Typography variant={'body1'} sx={ {border: '1px solid black', textAlign:'start'} }>
                    {author}
                </Typography>
                <Info rating={rating} studentsCount={studentsCount} courseTime={courseTime}/>
                <Typography variant={'body1'} sx={ {border: '1px solid black', textAlign:'start'} }>
                    {price}
                </Typography>
            </Card>
        </Container>
    );
};

export default CourseCard;