import React, {useCallback, useState} from 'react'
import {auth} from '../firebase'

const Login = () => {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState(null)
    const[esRegistro, SetEsRegistro] = useState(true)

    const procesarDatos = (e) => {
        e.preventDefault()

        // Validacion de entrada email
        if(!email.trim()) {
            setError('Ingrese Email')
            return
        }

        // Validacion de entrada password
        if(!password.trim()) {
            setError('Ingrese Password')
            return
        }

        // Validacion minima de caracteres
        if(password.length < 6) {
            setError('Password debe contener minimo 6 caracteres')
            return
        }
        setError(null)

        if(esRegistro) {
            registrar()
        }
    }

    const registrar = useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setError('Email no valido')
            }
            if (error.code === "auth/email-already-in-use") {
                setError('E-mail creado anteriormente, intente con otro e-mail')
            }
        }

    }, [email, password])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ): null
                        }
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese su email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese su contraseña"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit">
                            {
                                esRegistro ? "Registrarse" : "Acceder"
                            }
                        </button>
                        <button
                            className="btn btn-info btn-sm btn-block"
                            type="button"
                            onClick={() => SetEsRegistro(!esRegistro)}
                        >
                            {
                                esRegistro ? 'Ya estas registrado?' : 'No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
