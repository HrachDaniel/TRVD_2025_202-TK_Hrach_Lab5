import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/');
        } catch (err) {
            setServerError(err);
        }
    };

    return (
        <div className="registration-box" style={{margin: '50px auto'}}>
            <h2>Вхід</h2>
            {serverError && <p style={{color: 'red', textAlign: 'center'}}>{serverError}</p>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        {...register("email", { required: "Email обов'язковий" })} 
                        type="email" 
                    />
                    {errors.email && <span style={{color:'red'}}>{errors.email.message}</span>}
                </div>
                
                <div className="form-group">
                    <label>Пароль</label>
                    <input 
                        {...register("password", { required: "Введіть пароль" })} 
                        type="password" 
                    />
                    {errors.password && <span style={{color:'red'}}>{errors.password.message}</span>}
                </div>

                <button type="submit" className="btn-register-submit" style={{marginTop: '10px'}}>Увійти</button>
            </form>
        </div>
    );
}