function conversion(){
    const value= parseFloat(document.getElementById("inputtemp").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const resultArea = document.getElementById("resulArea");

    if (isNaN(value)){
        resultArea.textContent=("Por favor, ingrese una temperatura valida.");
        return;
    }

    let temp;

    switch(from){
        case"celsius": temp=value; break;
        case"fahrenheit": temp = (value-32)*5/9;break;
        case"kevin": temp = value - 273.15;break;
    }

    let finalValue;
    switch(to){
      
    }



}