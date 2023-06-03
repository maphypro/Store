import { useForm, SubmitHandler } from "react-hook-form";



type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
};

export default function SignUp() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        reset();
    };

    //console.log(watch("example")) // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input {...register("firstName", { required: 'This field is required' })} />
            {errors?.firstName && ( <div>{errors.firstName.message}</div> )  }

            <input {...register("lastName", { required: 'This field is required' })} />
            {errors?.lastName && ( <div>{errors.lastName.message}</div> )  }

            <input {...register("email", { required: 'This field is required' })} />
            {errors?.email && ( <div>{errors.email.message}</div> )  }

            <input {...register("password", { required: 'This field is required' })} />
            {errors?.password && ( <div>{errors.password.message}</div> )  }

            <input type="submit" value={'Send'} />
        </form>
    );
}