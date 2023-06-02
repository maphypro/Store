import React from 'react';
import CourseCard from "../components/CourseCard";

const Catalog = () => {
    return (

        <div>
            <CourseCard title={'Title Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, expedita?'}
                        author={'Author'}
                        courseTime={10}
                        logo={'sd'}
                        price={1199}
                        rating={4.6}
                        studentsCount={212}
            />
        </div>
    );
};

export default Catalog;