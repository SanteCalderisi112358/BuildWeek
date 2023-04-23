
/* js per gestire il feedbackPage rating */

const container = document.querySelector('.rating');
const items = container.querySelectorAll('.rating-item')
container.onclick = e => {
    const elClass = e.target.classList;
    /* cambia il rating se l'utente seleziona una stella differente */
    if (!elClass.contains('active')) {
        items.forEach( /* reset classe attiva su stella */
            item => item.classList.remove('active')
        );
        elClass.add('active'); /* aggiunge classe attiva su stella selezionata */
    }
};