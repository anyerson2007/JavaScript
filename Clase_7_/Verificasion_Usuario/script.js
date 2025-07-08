const brnLogin = document.getElementById("btnLogin");
const estado = document.getElementById("estado");
const resultado = document.getElementById("resultado");

//Simulasion base de datos
const baseDeDatos={
    usuario:"admin123",
    email:"admin@ejemplo.com",
    password:"Segura2025!"
};

//Validasion de usuario
function validarUsuario(usuario){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(usuario.length < 4){
                reject("El usuario debe tener almenos 4 caracteres");
            }else if(usuario!== baseDeDatos.usuario){
                reject("Usuario no encontrado");
            }else{
                resolve("Usuario verificado.");
            }
        },1500)
    })
}

function validarEmail(email){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const regex =/[a-zA-Z0-9]+([.][a-zA-Z0-9]+)@[a-zA-Z0-9]+([.][a-zA-Z0-9]+)[.][a-zA-Z]{2,5}/;
            if(!regex.test(email)){
                reject("Formato de correo no valido.");
            }else if (email !== baseDeDatos.email){
                reject("Correo no registrado");
            }else{
                resolve("Correo verificado.");
            }
        },1800);
    })
}

function validarPassword(password){
    return new Promise((resolve,reject)=>{
        const segura = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$&]/.test(password);
        
        if(!segura){
            reject("Contraseña insegura. Debe tener almenos 8 caracteres");
        }else if(password !== baseDeDatos.password){
            reject("Contraseña Incorrecta");
        }else{
            resolve("Contraseña Verificada.");
        }
    });
}

btnLogin.addEventListener("click", ()=>{
    resultado.textContent="";
    resultado.className="";
    estado.textContent="";

    //Obtener los valores del formulario
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    //validar campos llenos
    if(!usuario){
        resultado.className="error";
        resultado.textContent="Todos los campos son obligatorios.";
        estado.textContent="Todos los campos son obligatorios.";
        return;
    }
    estado.textContent= "Verificando credenciales...";

    Promise.all([
        validarUsuario(usuario),
        validarEmail(email),
        validarPassword(password)
    ]).then(([resUsuario,resEmail,resPass])=>{
        resultado.className="success";
        resultado.innerHTML=`✅${resUsuario}<br>✅${resEmail}<br>✅${resPass}`;
    })
    .catch((error)=>{
        resultado.className= "Error";
        resultado.textContent = error;
        estado.textContent = "Error en el inicio de sesion.";

    })
    .finally(()=>{
        console.log("Proceso de autenticasion finalisado")
    }
    )

})
const themeToggle = document.getElementById("themetoggles");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = 
        document.body.classList.contains("dark-mode") 
        ? "MODO CLARO" 
        : "MODO OSCURO";
});
