class indexUI {
    constructor(reset = false) {
        if (reset == true) {
            // Apss
            this.abrir_webamp = document.getElementById("webamp_launcher");

            // Elementos del escritorio
            this.win98_clock = document.getElementById("win98_clock");

            // Ventanas
            this.ventanas = {
                "home": {
                    "ventana": document.getElementById("ventana_home"),
                    "abrir": document.getElementById("home"),
                    "cerrar": document.getElementById("cerrar_ventana_home"),
                    "minimizar": document.getElementById("minimizar_ventana_home"),
                    "maximizar": document.getElementById("maximizar_ventana_home"),
                    "drag": document.getElementById("drag_home")
                },
                "repo": {
                    "ventana": document.getElementById("ventana_repo"),
                    "abrir": document.getElementById("repositorios"),
                    "cerrar": document.getElementById("cerrar_ventana_repo"),
                    "minimizar": document.getElementById("minimizar_ventana_repo"),
                    "maximizar": document.getElementById("maximizar_ventana_repo"),
                    "drag": document.getElementById("drag_repo")
                }
            };

            this.fijarEventos();
        }
    }

    fijarEventos() {
        this.abrir_webamp.addEventListener("click", this.abrir_Webamp.bind(this));

        for (const ventanaKey in this.ventanas) {
            const ventana = this.ventanas[ventanaKey];

            ventana.abrir.addEventListener("click", () => this.abrir_ventana(ventanaKey));
            ventana.cerrar.addEventListener("click", () => this.cerrar_ventana(ventanaKey));
            ventana.minimizar.addEventListener("click", () => this.minimizar_ventana(ventanaKey));
            ventana.maximizar.addEventListener("click", () => this.maximizar_ventana(ventanaKey));
            ventana.drag.onmousedown = (e) => {
                controlador.dragMouseDown(e);
            };
        }
    }

    abrir_Webamp() {
        controlador.onReadyWebamp(document.getElementById("app_webamp"));
    }

    abrir_ventana(ventanaKey) {
        this.ventanas[ventanaKey].ventana.style.display = "block";
    }

    cerrar_ventana(ventanaKey) {
        this.ventanas[ventanaKey].ventana.style.display = "none";
    }

    maximizar_ventana(ventanaKey) {
        controlador.maximizeWindow(this.ventanas[ventanaKey].ventana);
    }

    minimizar_ventana(ventanaKey) {
        controlador.minimizeWindow(this.ventanas[ventanaKey].ventana);
    }
}