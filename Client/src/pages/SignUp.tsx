import { Box, Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import CameraIcon from '@mui/icons-material/Camera';
import { useRegistrationMutation } from "../store/User/userApi";
import { UserReg } from "../types/UserTypes";
import { Navigate } from "react-router-dom";



type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
};

export default function SignUp() {

    const { register, handleSubmit, reset, getValues} = useForm<Inputs>();

    const [trigger, { data, error }] = useRegistrationMutation();


    const onSubmit: SubmitHandler<Inputs> = data => {
        const values: UserReg = getValues();
        trigger(values)
        reset();
    };

    if (data) {
        return <Navigate to={'/catalog'} replace/>   
    }

    if (error && 'status' in error) {
        return <Box>{error.status}</Box>
    }


    return (
        <Container
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            maxWidth='lg'
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <div>{null}</div>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mb: 2, mt: 2 }}>
                <CameraIcon sx={{ display: { xs: 'flex', md: 'flex' }, flexDirection: { xs: 'column', md: 'row' }, mr: 1 }} />
                <Typography
                    variant="h4"
                    noWrap
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Stepik
                </Typography>
            </Box>

            <FormControl sx={{ minWidth: '300px', mb: 3 }}>
                <TextField
                    variant='outlined'
                    label="First name"
                    {...register("firstName", { required: 'This field is required' })}>
                </TextField>
            </FormControl>
            <FormControl sx={{ minWidth: '300px', mb: 3 }}>
                <TextField
                    variant='outlined'
                    label="Last name"
                    {...register("lastName", { required: 'This field is required' })}>
                </TextField>
            </FormControl>


            <FormControl sx={{ minWidth: '300px', mb: 3 }}>
                <TextField
                    variant='outlined'
                    label="Email"
                    {...register("email", { required: 'This field is required' })}>
                </TextField>
            </FormControl>

            <FormControl sx={{ minWidth: '300px', mb: 3 }}>
                <TextField
                    variant='outlined'
                    label="Password"
                    {...register("password", { required: 'This field is required' })}>
                </TextField>
            </FormControl>

            <FormControl sx={{ minWidth: '300px', mb: 3 }}>
                <TextField
                    variant='outlined'
                    label="Confirm password"
                    {...register("confirmPassword", { required: 'This field is required' })}>
                </TextField>
            </FormControl>

            <Button type="submit"
                variant="outlined"
                sx={{
                    display: 'block',
                    color: 'black',
                    padding: '8px 4px',
                    textDecoration: 'none',
                    minWidth: '300px'
                }} >Регистрация</Button>
        </Container>
    );
}