$(document).ready(function() {
    const userInput = $('#user-name');
    const currentPlayer = localStorage.getItem('currentPlayer');
    if (currentPlayer){
        userInput.val(currentPlayer);
    }

    $('form').submit((e) => {
        e.preventDefault();
          
        const name = userInput.val();
        if (!name) return;
        localStorage.setItem('currentPlayer', name);

        if (localStorage.getItem(name) == null){
            localStorage.setItem(name, 0);
        }

        window.location.assign('question.html');
    });
});
