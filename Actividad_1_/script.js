document.getElementById("rollBtn").addEventListener("click", () => {
    lanzarDados()
        .then(([jugador, maquina]) => {
            mostrarResultado(jugador, maquina);
        })
        .catch(error => {
            console.error("Error al lanzar los dados:", error);
        });
});

function lanzarDados() {
    return new Promise((resolve, reject) => {
        // Simula una pequeña espera (puede omitirse si no se desea)
        setTimeout(() => {
            try {
                const jugador = [rollDie(), rollDie()];
                const maquina = [rollDie(), rollDie()];
                resolve([jugador, maquina]);
            } catch (e) {
                reject(e);
            }
        }, 500); // 0.5 segundos de espera para efecto visual
    });
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function getDieEmoji(value) {
    const diceEmojis = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return diceEmojis[value];
}

function mostrarResultado(jugador, maquina) {
    const jugadorTotal = jugador[0] + jugador[1];
    const maquinaTotal = maquina[0] + maquina[1];

    document.getElementById("playerDice").textContent = `${getDieEmoji(jugador[0])} ${getDieEmoji(jugador[1])} = ${jugadorTotal}`;
    document.getElementById("machineDice").textContent = `${getDieEmoji(maquina[0])} ${getDieEmoji(maquina[1])} = ${maquinaTotal}`;

    const result = document.getElementById("result");
    if (jugadorTotal > maquinaTotal) {
        result.textContent = "🎉 ¡Ganaste!";
        result.style.color = "green";
    } else if (jugadorTotal < maquinaTotal) {
        result.textContent = "💀 La máquina gana...";
        result.style.color = "red";
    } else {
        result.textContent = "🤝 ¡Empate!";
        result.style.color = "orange";
    }
}
