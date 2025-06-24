let estado = false;

function changestyles(){
    const root = document.documentElement;

    if(!estado){
        root.style.setProperty('--tamanio-caja', '150px')
        root.style.setProperty('--color-caja', '#e74c3c')
    }else{
        root.style.setProperty(' --color-caja','#3498bd')
        root.style.setProperty('--tamanio-caja','100px')
    }
    estado = !estado;
}

const persona = {
    nombre: "Ana",
    altura:55,
    edad: 30,
    saludar: function() {
      console.log("Hola, mi nombre es " + this.nombre + " tengo "+this.edad);
    }
  };
  
console.log(persona.nombre);     // "Ana"
console.log(persona["edad"]);    // 30

console.log(persona.saludar())
console.log(persona.altura)
console.log(persona.edad)
console.log(persona.edad,nombre)
