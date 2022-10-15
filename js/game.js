const score = document.getElementById('score');
const button = document.getElementById('button');
const lost = document.getElementById('lost');
let kostka = document.querySelectorAll(".cube");
const round = document.getElementById('round');
const hide = document.querySelectorAll(".kostky");

let hody = [1, 2, 3, 4, 5, 6];
let minus, pocetkostek = 6, gamemode = 'nic';
let vyber = [];
let selected = 0; let soucet = 0; let skore = 0; let  pomSoucet = soucet; let add = 0;
let array = [];
let clicked = [false, false, false, false, false, false];






function compare(array, comparable) {
    let pocet = 0;
    for (let i = 0; i < 6; i++) {
        if (array[i] == comparable[i]) pocet++;
    }
    if (pocet == 6) return true;
    else return false;
}



function arrays() {
    let postupka = [true, true, true, true, true, true] // 1500
    let petak = [true, true, true, true, true, false] //500
    let dosesti = [false, true, true, true, true, true] // 750


    for (let i = 0; i < 6; i++) {
        if (vyber.includes(i + 1)) array[i] = true;
        else array[i] = false;
    }

    if (compare(array, postupka)) gamemode = 'postupka';
    else if (compare(array, petak)) gamemode = 'petak';
    else if (compare(array, dosesti)) gamemode = 'dosesti';
    else gamemode = 'nic';


}




function points() {

    arrays();


switch(gamemode) {
    case 'postupka':
if (add == 500)     soucet += 1500 - 500;
else if (add == 750)     soucet += 1500 - 500;
 else   soucet += 1500;
add = 1500;
break;
case 'petak':
    if (add == 1500)     soucet += 500 - 1500;
    else if (add == 750)     soucet += 500 - 750;
     else   soucet += 500;
    add = 500;

break;
case 'dosesti':
    if (add == 1500)     soucet += 750 - 1500;
    else if (add == 500)     soucet += 750 - 500;
     else   soucet += 750;
    add = 750;
   
break;
default:
    soucet = pomSoucet;
    add = 0;
break;
}



}



function kostky() {
    for (let j = 0; j <= 5; j++) {
        hody[j] = Math.ceil(Math.random() * 6);
    }
    for (let i = 0; i < kostka.length; i++) {
        kostka[i].src = './img/0kostka' + hody[i] + '.png';
        kostka[i].style.border = "black solid 2px";
        kostka[i].style.boxShadow = " 4px 3px black";
        button.style.display = "none";
        round.style.display = "none";
        clicked[i] = false;
    }
}

function Vypis() {
    score.innerHTML = `<p>Score v tomto kole: ${soucet}</p>`;
    score.innerHTML += `<hr>`;
    score.innerHTML += `<p>Celkové score: ${skore}/3000</p>`;
    score.innerHTML += `<hr>`;
}


function selection() {
    if (selected > 0 && pocetkostek >= 1) {
        let minus = 5;
        minus -= selected;
        for (let i = 5; i > minus; i--) {
            hody.pop();
            clicked.pop();
            kostka[i].style.visibility = "hidden";
        }
    }
    if (pocetkostek < 1 || selected < 0) {
        for (let i = 0; i < 6; i++) {
            kostka[i].style.visibility = "visible";
        }
        pocetkostek = 6;
        selected = 0;
    }
}

button.addEventListener('click', () => {
    kostky();
    selection();
    hide[0].style.display = "contents";
    hide[1].style.display = "contents";
    console.log(hody);
    lost.innerHTML = `<h2 class="text-center" ></h2>`;
    button.innerText = "Hraj";

});


//hraj 

for (let i = 0; i <= 5; i++) {
    kostka[i].addEventListener('click', function () {
        if (clicked[i] == false) {
            kostka[i].style.border = " yellow solid 10px";
            kostka[i].style.boxShadow = " 0px 0px black";
            selected++;
            pocetkostek--;
            vyber[i] = hody[i];
            clicked[i] = true;
            button.style.display = "initial";
            round.style.display = "initial";
            points();

            if (hody[i] == 1) pomSoucet += 100;
            if (hody[i] == 5) pomSoucet += 50;
if (gamemode == 'petak' || gamemode == 'postupka') pomSoucet -= 150; 
if (gamemode == 'dosesti') pomSoucet -= 50;

            console.log(`selected: ${vyber}`);
            console.log(`skore: ${pomSoucet}`);



        }
        else {
          vyber[i] = '';
            //  vyber.splice(hodnota(hody[i]), 1);
            points();
            kostka[i].style.border = "black solid 2px";
            kostka[i].style.boxShadow = " 4px 3px black";
            selected--;
            pocetkostek++;
            clicked[i] = false;
            if (hody[i] == 1) pomSoucet -= 100;
            if (hody[i] == 5) pomSoucet -= 50;
            if (gamemode == 'petak' || gamemode == 'postupka') pomSoucet -= 150; 
if (gamemode == 'dosesti') pomSoucet -= 50;


            console.log(`selected: ${vyber}`);
            console.log(`skore: ${pomSoucet}`);


        }
        Vypis();
    });
}


round.addEventListener('click', () => {
    pocetkostek = 6;
    selected = 0;
    skore += soucet;
    soucet = 0;
    pomSoucet = soucet;
    Vypis();
    kostky();
    selection();
    if (skore >= 3000) {
        lost.innerHTML = `<h2 class="text-center" >Vyhráváš ! </h2>`;
    }
});





