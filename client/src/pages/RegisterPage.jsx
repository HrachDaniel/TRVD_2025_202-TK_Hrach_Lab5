import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useState } from 'react';

export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (data) => {
        setServerError('');
        setSuccessMessage('');
        try {
            await api.post('/auth/register', data); 
            
            setSuccessMessage("✅ Реєстрація успішна! Тепер ви можете увійти.");
            setTimeout(() => navigate('/login'), 2000); 
        } catch (err) {
            setServerError(err.response?.data?.message || "Помилка реєстрації. Можливо, користувач вже існує.");
        }
    };

    return (
        <div className="registration-box" style={{margin: '50px auto'}}>
            <h2>Реєстрація</h2>
            
            {serverError && <p style={{color: 'red', textAlign: 'center'}}>{serverError}</p>}
            {successMessage && <p style={{color: 'green', textAlign: 'center'}}>{successMessage}</p>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Логін</label>
                    <input {...register("login", { required: "Логін обов'язковий" })} type="text" />
                    {errors.login && <span style={{color:'red'}}>{errors.login.message}</span>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input {...register("email", { required: "Email обов'язковий" })} type="email" />
                    {errors.email && <span style={{color:'red'}}>{errors.email.message}</span>}
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input {...register("password", { required: "Пароль обов'язковий" })} type="password" />
                    {errors.password && <span style={{color:'red'}}>{errors.password.message}</span>}
                </div>
                <div className="form-group">
                    <label>Вік</label>
                    <input {...register("age", { required: "Вік обов'язковий", min: 18 })} type="number" />
                    {errors.age && <span style={{color:'red'}}>{errors.age.message}</span>}
                </div>
                <div className="form-group">
                    <label>Стать</label>
                    <select {...register("gender")} style={{width: 'auto'}}>
                        <option value="Чоловіча">Чоловіча</option>
                        <option value="Жіноча">Жіноча</option>
                    </select>
                </div>

                <button type="submit" className="btn-register-submit" style={{marginTop: '15px'}}>Зареєструватися</button>
            </form>
        </div>
    );
}