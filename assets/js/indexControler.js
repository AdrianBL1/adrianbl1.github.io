class indexControler{

    constructor(){
        this.isMaximized = false

        this.obtenerDatosUsuario()
        this.obtenerRepositorios()

    }

    onReadyWebamp(element) {
        const Webamp = window.Webamp;
        const webamp = new Webamp({
            initialTracks: [
                {
                    metaData: {
                        artist: "Adrian BL",
                        title: "HappyHardcore Radio"
                    },
                    // NOTE: Your audio file must be served from the same domain as your HTML
                    // file, or served with permissive CORS HTTP headers:
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
                    url: "https://streams.radiomast.io:443/73055724-1141-41e2-a69b-24a6ca96c8e7",
                    duration: 0.0
                },
                /*
                {
                    metaData: {
                        artist: "Some Artist",
                        title: "Title of Second Track"
                    },
                    url: "https://cdn.jsdelivr.net/gh/captbaritone/webamp@43434d82cfe0e37286dbbe0666072dc3190a83bc/mp3/llama-2.91.mp3",
                    duration: 5.322286
                }
                */
            ],
        });

        // Returns a promise indicating when it's done loading.
        webamp.renderWhenReady(element)
    }

    obtenerDatosUsuario() {
        var request = new XMLHttpRequest();
        var search = "adrianbl1"
        request.open("GET", "https://api.github.com/users/" + search, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                this.content_user(JSON.parse(request.responseText));
            } else {
                console.log("error");
            }
        }
        console.log("consola" + request.responseText);
        request.send();
    }

    obtenerRepositorios() {
        var request = new XMLHttpRequest();
        var search = "adrianbl1"
        request.open("GET", "https://api.github.com/users/" + search + "/repos", true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                this.show_list(JSON.parse(request.responseText));
            } else {
                console.log("error");
            }
        }
        console.log("consola" + request.responseText);
        request.send();
    }

    content_user(user){
        var avatar = document.getElementById("avatar")
        var username = document.getElementById("username")
        var bio = document.getElementById("bio")

        avatar.innerHTML = ` <img src=${user.avatar_url}" alt="avatar"> `;
        username.innerText = user.name;
        bio.innerText = user.bio;
    }

    show_list(user) {
        var userList = document.getElementsByClassName("user-list")[0];
        var userUl = document.createElement("ul");

        for (var i in user) {
            var userLi = document.createElement("li");
            userLi.innerHTML = `
                <a href="${user[i].html_url}">
                    <img src="assets/img/folder.png" width="10px" alt="github">
                    <span>${user[i].name}</span>
                </a>
            `;
            userUl.appendChild(userLi);
        }
        userList.appendChild(userUl);
    }

    // Update clock
    updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var ampm = hours < 12 ? 'AM' : 'PM';

        hours = hours % 12;
        hours = hours ? hours : 12; // handle midnight
        minutes = minutes < 10 ? '0' + minutes : minutes;

        var timeString = hours + ':' + minutes + ' ' + ampm;

        vista.win98_clock.textContent = timeString;
    }

    dragMouseDown(e) {
        console.log(vista.window)
        const windowElement = e.target.closest('.window');
        console.log(vista.window)
        console.log(windowElement)

        if (!windowElement) return;

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        e.preventDefault();
        // Obtiene la posición inicial del cursor
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        function elementDrag(e) {
            e.preventDefault();
            // Calcula la nueva posición del cursor
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Establece la posición de la ventana
            windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
            windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // Detiene el movimiento al soltar el botón del mouse
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    minimizeWindow(windowElement) {
        windowElement.style.display = "none";
    }

    maximizeWindow(windowElement) {
        if (!this.isMaximized) {
            windowElement.style.top = "0";
            windowElement.style.left = "0";
            windowElement.style.width = "100%";
            windowElement.style.height = "calc(100% - 30px)"; // Height of footer
            this.isMaximized = true;
        } else {
            // Restore window to its original size
            windowElement.style.top = "";
            windowElement.style.left = "";
            windowElement.style.width = "";
            windowElement.style.height = "";
            this.isMaximized = false;
        }
    }

}