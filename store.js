class TextBox{
    constructor(){
        this.label = document.createElement("label");
        this.label.textContent = addLabel;
        this.break = document.createElement("br")
        this.word_box =  document.createElement("input");
        this.word_box.id = "wordbox";
        this.word_box.type = "text";
        this.word_box.onchange = this.getWord()
        document.body.appendChild(this.label);
        document.body.appendChild(this.word_box);
        document.body.appendChild(this.break);
    }

    getWord() {
        this.word_box.value
    }
}

class AreaBox{
    constructor(){
        this.defintion_box = document.createElement("textarea")
        this.defintion_box.id = "defintionarea"
        this.defintion_box.placeholder = definitionpalceholder
        this.defintion_box.style.backgroundColor = "skyblue"
        this.defintion_box.style.width = 15 + "em"
        this.defintion_box.style.height = 5 + "em"
        document.body.appendChild(this.defintion_box)
    }
}

class submitButton{
    constructor(value){
        this.submitBtn = document.createElement("button");
        this.submitBtn.id = "submit"
        this.submitBtn.textContent = submitButtonDesc
        this.submitBtn.value = value
        this.submitBtn.style.color = "black"
        this.submitBtn.style.backgroundColor = "yellow"
        this.submitBtn.style.width = 4  + "em"
        this.submitBtn.style.height = 2 + "em"
        this.submitBtn.style.left = 50 + "vw"
        this.submitBtn.style.top = 50  + "vh"
        this.submitBtn.onclick = () => sendDefintion()
        document.body.appendChild(this.submitBtn);
    }
}

  //funciton gotten from ChatGPT to help validate numbers in between the letters
  function containsNumbers(inputString) {
    // Regular expression to match any digit character
    const regex = /\d/;
    // Use the test method of the regular expression to check if the string contains any digit character
    return regex.test(inputString);
}

class errorMessageParagraph{
  constructor(){
    this.para = document.createElement("p");
    this.para.id = "error"
    this.para.textContent = ""
    document.body.appendChild(this.para);
}
}

function sendDefintion(){
    const xhr = new XMLHttpRequest();
    const word = document.getElementById("wordbox").value
    const definition = document.getElementById("defintionarea").value
    console.log("word: " + word);
    console.log("def: " + definition);
    if(word != "" && isNaN(word) && !containsNumbers(word) && definition != "" && isNaN(definition) && !containsNumbers(definition)){
      console.log("sending: " + word + " " + definition);
      document.getElementById("error").textContent = ""
      xhr.open("POST", "https://comp-4537-lab4-eight.vercel.app/dictionary/writeWord", true)
      xhr.setRequestHeader("Content-Type", "application/json")
      
      xhr.onreadystatechange = () =>{
          if (xhr.readyState === 4){
              if(xhr.status == 200){
                const JSONObj = JSON.parse(xhr.response)
                console.log(JSONObj)
                let custom_response = requestNum + JSONObj["numRequests"] + space + JSONObj["message"].replace("Word", word);
                  document.getElementById("defintionarea").value = JSONObj["message"].replace("Word", word)
                  document.getElementById("error").textContent = custom_response 
              }
          } else{
              document.getElementById("defintionarea").value = "Error can't find word in dictionary"
          }
      }
      
      xhr.send(JSON.stringify({
        word: word,
        definition: definition
      }))
    }else{
      if(word == "" || definition == ""){
        document.getElementById("error").textContent = emptyStringErrorMessage
      }else{
          document.getElementById("error").textContent = numberErrorMessage
      }
    }
    
}


let br = document.createElement("br")
let searchTextBox = new TextBox();

let defintionAreaBox = new AreaBox();
document.body.appendChild(br)
let submitBtn = new submitButton();

let error_message = new errorMessageParagraph();

