var NumberValue = document.querySelectorAll(".numbers");
var InneringObject = document.getElementById("innering");
var PossibleAnwer = document.querySelector(".Promt");
const Container = document.getElementById("Container");

var StartIndex = 0;

var ColculatingArray = [];

var LastValueOfResult;
var countofWrongs = 0;


const LighMode = {
    DisplayColor: 'red',
    BagroundColor: "Orange",
    ContainerColor: "White"
}

for (let index = 0; index < NumberValue.length; index++) {
        NumberValue[index].addEventListener('click' , function(){

        NumberValue[index].classList.add("Down");
        setTimeout(function(){
        NumberValue[index].classList.remove("Down")
        },200)

        var numberText = NumberValue[index].querySelector('p').innerHTML;

        if (Number.isInteger(parseInt(numberText)) 
        || numberText === " + " 
        || numberText === " - " 
        || numberText === " * " 
        || numberText === " / "
        || numberText === "."
        )
        {
            InneringObject.innerHTML += numberText
        }


        if (StartIndex == 0){
            Clear();     
            if (Number.isInteger(parseInt(numberText)) && numberText != "0"){
                InneringObject.innerHTML += numberText
                StartIndex++;
            }
        }
        
        KButton(numberText , "K");
        KKButton(numberText , "KK");
        XButton(numberText , " X ");

        if (InneringObject.innerHTML.includes(" ")){
        try {
            let defining = InneringObject.innerHTML;
            let Result = eval(defining);
            if (Result != undefined){
                PossibleAnwer.classList.add("Appear");
                PossibleAnwer.innerHTML = Result;
            }else{
                PossibleAnwer.classList.remove("Appear");
                PossibleAnwer.innerHTML = "";
            }
            countofWrongs = 0;
        }catch{
            countofWrongs++;
            if (countofWrongs > 1){
                PossibleAnwer.innerHTML = "!!!"
            }
            if (countofWrongs > 3){
                PossibleAnwer.innerHTML = "!!!!!!!!!!!!!"
            }
        }
        }

        if (numberText == " = "){
            try{
            let defining = InneringObject.innerHTML;
            let Result = eval(defining);
            InneringObject.innerHTML += " = " + Result;
            LastValueOfResult = Result;
            StartIndex = 0;
            countofWrongs = 0;
            
            PossibleAnwer.classList.remove("Appear");
            PossibleAnwer.classList.add("Hide");
            setTimeout(function(){
                PossibleAnwer.classList.remove("Hide");
                PossibleAnwer.innerHTML = "";
            },1000)

            if (Result === undefined){
                Clear();
            } 
        }catch{
            Clear();
            InneringObject.innerHTML = "Wrong Value"
            setTimeout(function(){
                InneringObject.innerHTML = ""
            },2000)
        };
        }

        if (numberText == " C "){
            Clear();
        }
    })

}



function Clear(){
    InneringObject.innerHTML = ""; 
    StartIndex = 0;
    PossibleAnwer.innerHTML = "";
    PossibleAnwer.classList.remove("Appear");
    countofWrongs = 0;

    // if (LastValueOfResult != undefined){
    //     InneringObject.innerHTML = LastValueOfResult;
    // } 
}


function XButton(numberText , letter){
    if (numberText == letter){
    InneringObject.innerHTML = InneringObject.innerHTML.substring(0,InneringObject.innerHTML.length - 1);
    }
}
function KKButton(numberText , letter){
    if (numberText == letter){
    
        if (InneringObject.innerHTML != ""){
        let parse = parseInt(InneringObject.innerHTML);
        InneringObject.innerHTML = Math.sqrt(parse);
        }
    }
}
function KButton(numberText , letter){
    if (numberText == letter){   
        if (InneringObject.innerHTML != ""){
        let parse = parseInt(InneringObject.innerHTML);
        InneringObject.innerHTML = Math.pow(parse , 2);
        }
    }
}

// Container.style.backgroundColor = LighMode.ContainerColor;
// var numbersElements = Container.querySelectorAll(".numbers");
// numbersElements.forEach(element => {
//     element.style.backgroundColor = '#415858'
// });

