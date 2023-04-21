
/* js per gestire il button dopo checkBox */

/* Creazione variabili per il BUTTON e il CHECKBOX */
var check = document.getElementById('customCheckbox');
var btnPage1 = document.getElementById('buttonWelcomePage');

/*Imponiamo che il check sia defleggato a inizio pagina e che il button sia non cliccato*/
check.checked = false;
btnPage1.disabled = true;

/*Mettiamo in "ascolto" la checkBox e se risulta "checked" allora abilitiamo il BUTTON e gli diamo le proprietà volute, 
altrimenti gliele rimoviamo*/
check.addEventListener('click', function(){
    if(this.checked){
        btnPage1.classList.add('customActive');
        btnPage1.disabled = false;
    } else{
        btnPage1.disabled = true;   
        btnPage1.classList.remove('customActive');
        }
});