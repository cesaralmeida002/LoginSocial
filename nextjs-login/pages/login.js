/*imports */
import LoginCard from '../src/components/loginCard/loginCard.js'
import Input from '../src/components/input/input'
import Button from '../src/components/button/button.js'
import { useState } from "react";
import {setCookie} from 'cookies-next'
import {useRouter} from 'next/router'

/*import link-next*/
import Link from 'next/link'

/*Imports styles */
import styles from '../styles/Login.module.css'


export default function LoginPage(){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const [error, setError] = useState("");
      const router = useRouter()

      const handleFormEdit = (event, name) => {
        setFormData({
          ...formData,
          [name]: event.target.value,
        });
      };

      const handleForm = async (event) => {
        try {
          event.preventDefault();
          const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify(formData),
          });
    
          const json = await response.json();
          if (response.status !== 200) throw new Error(json);
          setCookie('authorization', json)
          router.push('/')
        } catch (err) {
          setError(err.message);
        }
      };

    return(
        <div className={styles.background}>
            <LoginCard title="Entre em sua conta.">
                <form className={styles.form} onSubmit={handleForm}>
                <Input type="email" placeholder="Digite seu e-mail" value={formData.email} required onChange={(e) => {handleFormEdit(e, "email")}}/>
                <Input type="password" placeholder="Digite sua senha" value={formData.password} required onChange={(e) => {handleFormEdit(e, "password")}}/>
                <Button>Entrar</Button>

                {error && <p className={styles.error}>{error}</p>}        

                {/* Link com atualização do dom, ao invés do navegador */}
                <Link href="/cadastro">Ainda não possui conta?</Link>
                </form>
                
            </LoginCard>
        </div>
    )
}