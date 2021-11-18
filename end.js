$(document).ready(() => {
    let currentScore = localStorage.getItem('currentScore');
    let currentPlayer = localStorage.getItem('currentPlayer');
    let lastScore = localStorage.getItem(currentPlayer);

    let highestScore = (currentScore > lastScore) ? currentScore : lastScore;
    localStorage.setItem(currentPlayer, highestScore);

    $('#user-name').text(currentPlayer);
    $('#new-score').text(currentScore);
    $('#high-score').text(highestScore);

    $('#go-home').click(() => {
        window.location.assign('/index.html');
    });
});
