import { Box, Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import CameraIcon from '@mui/icons-material/Camera';
import { UserAuthType } from "../types/UserTypes";
import { useLoginMutation } from "../store/User/userApi";
import { Navigate } from "react-router-dom";


type Inputs = {
    email: string,
    password: string,
};

export default function SignIn() {
    const { register, handleSubmit, reset, getValues } = useForm<Inputs>();

    const [trigger, { data, error }] = useLoginMutation();

    

    const onSubmit: SubmitHandler<Inputs> = data => {
        const values: UserAuthType = getValues();
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

            <Button type="submit"
                variant="outlined"
                sx={{
                    display: 'block',
                    color: 'black',
                    padding: '8px 4px',
                    textDecoration: 'none',
                    minWidth: '300px'
                }} >Войти</Button>
        </Container>
    );
}
