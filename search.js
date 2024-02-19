

class TextBox{
    constructor(){
        this.label = document.createElement("label");
        this.label.textContent = searchLabel;
        this.break = document.createElement("br")
        this.text_box =  document.createElement("input");
        this.text_box.id = "wordbox";
        this.text_box.type = "text";

        document.body.appendChild(this.label);
        
        document.body.appendChild(this.text_box);
        document.body.appendChild(this.break);
    }
}

class defAreaBox{
    constructor(){
        this.defintion_box = document.createElement("textarea")
        this.defintion_box.id = "defintion-box"
        this.defintion_box.style.width = 15 + "em"
        this.defintion_box.style.height = 5 + "em"
        this.defintion_box.disabled = true

        this.defintion_box.style.backgroundColor = "skyblue"
        document.body.appendChild(this.defintion_box)
    }

    getvalue(){
        return this.defintion_box.value
    }

    setValue(value){
        this.defintion_box.value = value;
    }
}


function requestDefintion(){
    const xhr = new XMLHttpRequest();
    // let para = document.createElement("p");
    // para.textContent =""
    // document.body.appendChild(para)
    const endpointURL= "https://comp-4537-lab0.vercel.app/dictionary"

    //funciton gotten from ChatGPT to help validate numbers in between the letters
    function containsNumbers(inputString) {
        // Regular expression to match any digit character
        const regex = /\d/;
        // Use the test method of the regular expression to check if the string contains any digit character
        return regex.test(inputString);
    }

    const word = document.getElementById("wordbox").value
 
        // para.textContent =""
        
        //gotten from GPT isNan function checks to see if string can be converted to number && !isNaN(word)
  
        if(word != "" && isNaN(word) && !containsNumbers(word)){
            console.log("seraching for: " + word);
            xhr.open("GET", "https://comp-4537-lab4-eight.vercel.app/dictionary?word=" + word, true)
            xhr.send()
            xhr.onreadystatechange = () =>{
                if (xhr.readyState === 4){
                    if(xhr.status == 200){
                        const JSONObj = JSON.parse(xhr.response)
                        console.log(JSONObj)
                        console.log("s: " + JSONObj["success"])
                        console.log("def: " + JSONObj["definition"])
                        let defintion = JSONObj["definition"]
                        let customized_defintion = requestNum + JSONObj["numRequests"] +  definition + defintion.replace("Word", word);
                        document.getElementById("defintion-box").value = customized_defintion
                    }
                } else{
                    document.getElementById("defintion-box").value = serverErrorMessage + xhr.status;
                }
            }
        }else{
            if(word == ""){
                document.getElementById("defintion-box").value = emptyStringErrorMessage
            }else{
                document.getElementById("defintion-box").value = numberErrorMessage
            }
            
        }
}

class searchButton{
    constructor(value){
        this.submitBtn = document.createElement("button");
        this.submitBtn.id = "search"
        this.submitBtn.textContent = searchButtonDesc
        this.submitBtn.value = value
        this.submitBtn.style.color = "white"
        this.submitBtn.style.backgroundColor = "brown"
        this.submitBtn.style.width = 4  + "em"
        this.submitBtn.style.height = 2 + "em"
        this.submitBtn.style.left = 50 + "vw"
        this.submitBtn.style.top = 50  + "vh"
        this.submitBtn.onclick = () => requestDefintion()
        document.body.appendChild(this.submitBtn);
    }
}


let searchTextBox = new TextBox();

let defintionBox = new defAreaBox();
let br = document.createElement("br")
document.body.appendChild(br)
let searchBtn = new searchButton();