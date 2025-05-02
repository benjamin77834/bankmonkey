import React, { useState } from 'react';

const FormularioActivacion = () => {
    // Manejo de estado para los formularios
    const [imei, setImei] = useState('');
    const [icc, setIcc] = useState('');
    const [loading, setLoading] = useState(false);

    // Validación simple del IMEI
    const validateIMEI = () => {
        if (imei.length !== 15) {
            alert("IMEI inválido");
        }
    };

    const handleSubmitIMEI = (e) => {
        e.preventDefault();
        setLoading(true);
        // Lógica de validación o envío aquí
        setTimeout(() => {
            setLoading(false);
            alert('IMEI validado');
        }, 1000);
    };

    const handleSubmitICC = (e) => {
        e.preventDefault();
        // Lógica de validación o envío aquí
        alert('ICC validado');
    };

    return (
        <div className="pt-5 pb-4">
            <p className="p-3 pb-0 mb-3">Datos de la línea nueva</p>
            <p className="small-p p-3 pb-0 pt-0 mb-1 rel_pos">
                Validar Equipo*
                <img className="mini_icon" onClick={() => alert("Marca a *#06# desde el celular")} src="img/icon-question.svg" alt="Ayuda" />
            </p>
            <form onSubmit={handleSubmitIMEI} autoComplete="off">
                <div className="general__container-inputs p-3 pt-0 mt-0 algn_left">
                    <input
                        id="ingresaIMEI"
                        name="ingresaIMEI"
                        className="saldo_amount"
                        type="number"
                        value={imei}
                        onChange={(e) => setImei(e.target.value)}
                        placeholder="Ingresar IMEI"
                        maxLength="15"
                    />
                    <p className="hide_txt text-warning" id="noCarga"></p>
                </div>
                <div className="w-100 p-3 pt-0 pb-0 mt-0">
                    <button type="submit" className={`my_btn w-100 ${loading ? 'btn_disable' : ''}`} disabled={loading}>
                        {loading ? (
                            <span>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Procesando...
                            </span>
                        ) : (
                            'Validar'
                        )}
                    </button>
                </div>
            </form>

            {/* Formulario para ICC */}
            <form onSubmit={handleSubmitICC} autoComplete="off">
                <div className="general__container-inputs p-3 pt-0 mt-0 algn_left">
                    <input
                        id="ingresaICC"
                        name="ingresaICC"
                        className="saldo_amount"
                        type="text"
                        value={icc}
                        onChange={(e) => setIcc(e.target.value)}
                        placeholder="Ingresar ICC"
                        maxLength="20"
                    />
                    <p className="hide_txt text-warning" id="simInvalida"></p>
                </div>
                <div className="w-100 p-3 pt-0 pb-0 mt-0">
                    <button type="submit" className="my_btn w-100">Validar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioActivacion;
