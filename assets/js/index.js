window.onload = () => {
    window.vista = new indexUI(true)
    window.controlador = new indexControler()

    // Update clock every second
    setInterval(controlador.updateClock, 1000)

    // Initial call to set the clock immediately
    controlador.updateClock()
}