const score = document.getElementById('score');
const button = document.getElementById('button');
const lost = document.getElementById('lost');
let kostka = document.querySelectorAll(".cube");
const round = document.getElementById('round');

let hody = [];
let minus,pocetkostek = 6;
let selected = 0;
let soucet = 0;
let skore = 0;
let clicked = [];


function kostky() {

    for (let j = 0; j <= 5; j++) {
        hody[j] = Math.ceil(Math.random() * 1);

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

if (selected > 0 && pocetkostek >= 1 ) {
 
  let  minus = 5;
minus -= selected;

for (let i = 5; i > minus;i-- ) {
 hody.pop();
 clicked.pop();
kostka[i].style.visibility= "hidden";
}
}


if (pocetkostek < 1 || selected < 0) {
    for (let i = 0; i < 6;i++) {    
        kostka[i].style.visibility= "visible";   
        
    }
    }


}



button.addEventListener('click', () => {
    
    kostky();
    selection();

    if (hody.includes(1, 0) || hody.includes(5, 0)) {
        lost.innerHTML = `<h2 class="text-center" ></h2>`;
        button.innerText = "Hraj";
    }

    else {



        lost.innerHTML = `<h2 class="text-center" >Ztrácíš body !</h2>`;
        selected = 0;
        soucet = 0;
        Vypis();
    button.innerText = "Další kolo";
    button.style.display = "initial";
    

}


});




//hraj 
for (let f = 0; f <= 5; f++) {

    kostka[f].addEventListener('click', function () {
        console.log(pocetkostek);
        console.log(hody);


        if (clicked[f] == false) {

            if (hody[f] == 1 || hody[f] == 5) {
                kostka[f].style.border = " yellow solid 10px";
                kostka[f].style.boxShadow = " 0px 0px black";
                selected++;
                pocetkostek--;

               
                if (hody[f] == 1) {
                    soucet += 100;
                
                }

                if (hody[f] == 5) {
                    soucet += 50;

                }

            
                clicked[f] = true;

                button.style.display = "initial";
                round.style.display = "initial";
            
            
            }
            
        }
        else {

            if (hody[f] == 1 || hody[f] == 5) {
                kostka[f].style.border = "black solid 2px";
                kostka[f].style.boxShadow = " 4px 3px black";
               selected--;
               pocetkostek++;

              
                if (hody[f] == 1) {

                    soucet -= 100;


                }

                if (hody[f] == 5) {

                    soucet -= 50;

                }
                clicked[f] = false;
            }

         

        }
        
        Vypis();
      
    
    });

}


round.addEventListener('click', () => {

    selected = 0;

  

    skore += soucet;

    soucet = 0;
    Vypis();
   

    kostky();


  selection();





    if (skore >= 3000) {
        lost.innerHTML = `<h2 class="text-center" >Vyhráváš ! </h2>`;
        }
});

