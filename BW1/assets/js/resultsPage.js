/*****Dichiarazioni variabili:*****/

/*Risposte che derivano dalla Question Page e prese dal localStorage*/

var match = parseInt(localStorage.getItem('match'));
var unmatch = parseInt(localStorage.getItem('unmatch'));

/*Creazione Oggetto "answer" vuoto contenente risposte esatte "match" e quelle sbagliate "unmatch"*/
var answer = {

    match: 0,
    unmatch:0 ,
};
/*Riempimento di answer con le risposte "match" e "unmatch"*/
answer.match = match;
answer.unmatch = unmatch;


/*Creazione array "results" per la classe 'resultsItem' per gestire i tre div centrali*/
var results = document.getElementsByClassName('resultsItem');

/*Variabili per i risultati in percentuale e arrotondate alla prima cifra decimale*/
var totale = answer.match + answer.unmatch;
var correttePercentuale = parseInt(((answer.match) / (totale) * 100).toFixed(1));
var sbagliatePercentuale = parseInt(((answer.unmatch) / (totale) * 100).toFixed(1));


/*Creazione dei paragrafi titoli, percentuale domande, e numero di risposte su 10 per i CORRECT e loro style*/
var parCorrectTitle = document.createElement('p');
parCorrectTitle.innerText = 'Correct';
parCorrectTitle.style.fontSize = '3em';
parCorrectTitle.style.margin = '0';
parCorrectTitle.style.lineHeight = '1em';


var parCorrectPer = document.createElement('p');
parCorrectPer.innerText = correttePercentuale + '%';
parCorrectPer.style.fontSize = '3em';
parCorrectPer.style.margin = '0';
parCorrectPer.style.fontWeight = 'bold';


var parCorrectQue = document.createElement('p');
parCorrectQue.innerText = answer.match + '/' + totale + ' questions';
parCorrectQue.style.margin = '0';
parCorrectQue.style.paddingBottom = '100px';






/*Creazione dei paragrafi titoli, percentuale domande, e numero di risposte su 10 per i WRONG e loro style*/
var parWrongTitle = document.createElement('p');
parWrongTitle.innerText = 'Wrong';
parWrongTitle.style.fontSize = '3em';
parWrongTitle.style.margin = '0';
parWrongTitle.style.lineHeight = '1em';



var parWrongPer = document.createElement('p');
parWrongPer.innerText = sbagliatePercentuale + '%';
parWrongPer.style.fontSize = '3em';
parWrongPer.style.margin = '0';
parWrongPer.style.fontWeight = 'bold';


var parWrongQue = document.createElement('p');
parWrongQue.innerText = answer.unmatch + '/' + totale + ' questions';
parWrongQue.style.margin = '0';
parWrongQue.style.paddingBottom = '100px';


/*Variabili appoggio per fare alzare i testi al centro ciambella*/
var correctEmpty = document.createElement('p');
correctEmpty.innerText = "\n";

var wrongEmpty = document.createElement('p');
wrongEmpty.innerText = "\n";

/*"Appendiamo" tutto ciò che riguarda le risposte CORRECT al proprio div*/
results[0].appendChild(parCorrectTitle);
results[0].appendChild(parCorrectPer);
results[0].appendChild(parCorrectQue);
results[0].appendChild(correctEmpty);
results[0].style.textAlign = 'left';

/*"Appendiamo" tutto ciò che riguarda le risposte WRONG al proprio div*/
results[2].appendChild(parWrongTitle);
results[2].appendChild(parWrongPer);
results[2].appendChild(parWrongQue);
results[2].appendChild(wrongEmpty);
results[2].style.textAlign = 'right';





/*****Creazione grafico a Ciambella tramite libreria ChartJS*****/


if (sbagliatePercentuale < 50) {
    document.getElementById('right').style.opacity = '0.8';
    var myCanvas = document.getElementById('myCanvas').getContext('2d');
    var config = new Chart(myCanvas, {
        type: 'doughnut',
        
        data: {
            datasets: [
                {
                    label: 'Resul',
                    data: [sbagliatePercentuale, correttePercentuale],
                    backgroundColor: ['#D20094', '#00FFFF'],
                    cutout: '70%',
                    hoverOffset: 1,
                    borderColor: 'transparent',
                }]
        },
        options: {
            borderAlign: 'inner',
        },
        plugins: [{
            
            id: 'text',
            afterDraw: function (chart, a, b) {
                let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
                ctx.restore();
                let fontSize = (height / 280).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                let text0 = 'Congratulations!',
                textX0 = Math.round((width - ctx.measureText(text0).width) / 2),
                textY0 = height / 2.9;
                ctx.fillStyle = 'white',
                ctx.fillText(text0, textX0, textY0);

                let text1 = `You passed the exam`,
                textX1 = Math.round((width - ctx.measureText(text1).width) / 2),
                textY1 = height / 2.4;
                ctx.fillStyle = 'aqua',
                ctx.fillText(text1, textX1, textY1);

                ctx.restore();
                let fontSize1 = (height / 400).toFixed(2);
                ctx.font = fontSize1 + "em sans-serif";
                ctx.textBaseline = "middle";
                
                let text2 = `We'll send you the certificate in`,
                textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
                textY2 = height / 1.8;
                ctx.fillStyle = 'white',
                ctx.fillText(text2, textX2, textY2);
                
                let text3 = 'in few minutes.',
                textX3 = Math.round((width - ctx.measureText(text3).width) / 2),
                textY3 = height / 1.65;
                ctx.fillStyle = 'white',
                ctx.fillText(text3, textX3, textY3);
                ctx.save();

                let text4 = 'Check your email (including',
                textX4 = Math.round((width - ctx.measureText(text4).width) / 2),
                textY4 = height / 1.55;
                ctx.fillStyle = 'white',
                ctx.fillText(text4, textX4, textY4);
                ctx.save();

                let text5 = 'promotions/spam folder)',
                textX5 = Math.round((width - ctx.measureText(text5).width) / 2),
                textY5 = height / 1.45;
                ctx.fillStyle = 'white',
                ctx.fillText(text5, textX5, textY5);
                ctx.save();
            },
        }], 
    });
}

else {
    document.getElementById('left').style.opacity = '0.8';
    var myCanvas = document.getElementById('myCanvas').getContext('2d');
    var config = new Chart(myCanvas, {
        type: 'doughnut',
        backgroundShadowColor: 'black',
        shadowBlur: 3,
        shadowOffsetX: 3,
        shadowOffsetY: 10,
        data: {
            datasets: [
                {
                    label: 'Result',
                    data: [sbagliatePercentuale, correttePercentuale],
                    backgroundColor: ['#D20094', '#00FFFF'],
                    cutout: '70%',
                    hoverOffset: 1,
                    borderColor: 'transparent',
                    
                }]
        },
            options: {
                    borderAlign: 'inner',
                    plugins: {

                            }

                    },
            plugins: [{
                    title: {
                        display: true,
                        text: 'Sorry!',
                        color: 'white',
                        font: {
                            size: 15,
                        }
            },
            id: 'text',
            afterDraw: function (chart, a, b) {
                let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

                ctx.restore();
                let fontSize = (height / 280).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                let text0 = 'Sorry!',
                textX0 = Math.round((width - ctx.measureText(text0).width) / 2),
                textY0 = height / 2.5;
                ctx.fillStyle = 'white',
                ctx.fillText(text0, textX0, textY0);

                let text1 = `You didn't pass the exam`,
                textX1 = Math.round((width - ctx.measureText(text1).width) / 2),
                textY1 = height / 2;
                ctx.fillStyle = 'red',
                ctx.fillText(text1, textX1, textY1);

                ctx.restore();
                let fontSize1 = (height / 400).toFixed(2);
                ctx.font = fontSize1 + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.save();
            },
        }],  
    });
}