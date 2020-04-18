"use strict";

window.onhashchange = switchToStateFromURLHash;

let SPAState = {};

function switchToStateFromURLHash() {
    let URLHash = window.location.hash;

    let stateJSON = decodeURIComponent(URLHash.substr(1));

    if (stateJSON !== "") {
        SPAState = JSON.parse(stateJSON);
    } else {
        SPAState = { pageName: 'Login' };
    }

    const pageName = SPAState.pageName;

    const app = document.getElementById('root');
    let pageHTML = "";
    let component;
    switch (SPAState.pageName) {
        case 'Login':
            component = renderLoginPage();
            break;
        case 'Main':
            component = renderMainPage();
            break;
        case 'Record':
            component = renderRecordsPage();
            break;
        case 'Game':
            pageHTML += '<div class="wrapper"><canvas class="canvas" id="canvas"></canvas></div>';
            break;
    }

    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }
    if (pageHTML) {
        app.innerHTML = pageHTML;
    }

    if (component) {
        app.append(component);
    }

    if (pageName === 'Game') {
        startGame();
    } else {
    }

}

function switchToState(newState) {
    location.hash = encodeURIComponent(JSON.stringify(newState));
}

function switchToMainPage() {
    switchToState({pageName: 'Main'});
}

function switchToRecordPage() {
    switchToState({pageName: 'Record'});
}

function switchToAboutPage() {
    switchToState({pageName: 'About'});
}


// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();
