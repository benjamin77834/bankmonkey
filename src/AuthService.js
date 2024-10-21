export const login = async (mail, password) => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/prod/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail, password }),
    });
  
    console.log(response);    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la autenticación');
    }
  
    const data = await response.json();
    //console.log(data.body.id_vendedor);

    const  id_vendedor  = data.body.id_vendedor;
    const  nombre = data.body.nombre;
//    console.log(id_vendedor);
    // Guardar el token en localStorage o sessionStorage
    localStorage.setItem('id_vendedor',id_vendedor);
    localStorage.setItem('nombre', nombre);
  //  console.log(id_vendedor);
   // console.log(nombre);
    return id_vendedor,nombre;
  };
  
  export const logout = () => {
    localStorage.removeItem('id_vendedor');
    localStorage.removeItem('nombre');
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('id_vendedor') !== null;
    return localStorage.getItem('nombre') !== null;
  
  };
  