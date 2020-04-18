function renderMainPage() {
    const container = document.createElement('div');
    const toRecordPage = document.createElement('button');
    const toGame = document.createElement('button');

    toRecordPage.innerText = 'Рекорды';
    toRecordPage.addEventListener('click', () => {
        switchToState({pageName: 'Record'});
    });
    toGame.innerText = 'Играть';
    toGame.addEventListener('click', () => {
        switchToState({pageName: 'Game'});
    });
    container.append(toRecordPage);
    container.append(toGame);

    return container;
}
