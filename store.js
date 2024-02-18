class TextBox{
    constructor(){
        this.label = document.createElement("label");
        this.label.textContent = "Word";
        
        this.word_box =  document.createElement("input");
        this.word_box.id = "wordbox";
        this.word_box.type = "text";
        this.word_box.onchange = this.getWord()
        document.body.appendChild(this.label);
        
        document.body.appendChild(this.word_box);
    }

    getWord() {
        this.word_box.value
    }
}

class AreaBox{
    constructor(){
        this.defintion_box = document.createElement("textarea")
        this.defintion_box.id = "defintionarea"
        this.defintion_box.style.backgroundColor = "skyblue"
        document.body.appendChild(this.defintion_box)
    }
}

class submitButton{
    constructor(value){
        this.submitBtn = document.createElement("button");
        this.submitBtn.id = "submit"
        this.submitBtn.textContent = "submit"
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

function sendDefintion(){
    const xhr = new XMLHttpRequest();
    const word = document.getElementById("wordbox").value
    const definition = document.getElementById("defintionarea").value
    console.log("word: " + word);
    console.log("def: " + definition);
    xhr.open("POST", "https://comp-4537-lab4-eight.vercel.app/dictionary/writeWord", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    
    xhr.onreadystatechange = () =>{
        if (xhr.readyState === 4){
            if(xhr.status == 200){
                document.getElementById("defintionarea").value = xhr.responseText
            }
        } else{
            document.getElementById("defintionarea").value = "Error can't find word in dictionary"
        }
    }
    
    xhr.send(JSON.stringify({
      word: word,
      definition: definition
    }))
}

function sendDefintion2(){
    fetch('/dictionary/writeWord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: 'test',
          definition: 'a test of skillls'
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(data); // Process response data here
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
}
let searchTextBox = new TextBox();
let defintionAreaBox = new AreaBox();
let submitBtn = new submitButton();

