class TextBox{
    constructor(){
        this.label = document.createElement("label");
        this.label.textContent = "Search for a Word";
        
        this.text_box =  document.createElement("input");
        this.text_box.id = "wordbox";
        this.text_box.type = "text";
        this.text_box.onchange = () => requestDefintion();
        document.body.appendChild(this.label);
        
        document.body.appendChild(this.text_box);
    }
}

class defAreaBox{
    constructor(){
        this.defintion_box = document.createElement("textarea")
        this.defintion_box.id = "defintion-box"
        this.defintion_box.disabled = true
        this.defintion_box.oninput = () => getvalue()
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

   
    const word = document.getElementById("wordbox").value
 
        // para.textContent =""
        
        //gotten from GPT isNan checks tos ee if string can be converted to number && !isNaN(word)
  
        if(word != "" && isNaN(word)){
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
                        let customized_defintion = defintion.replace("Word", word);
                        document.getElementById("defintion-box").value = customized_defintion
                    }
                } else{
                    document.getElementById("defintion-box").value = "Error can't find word in dictionary"
                }
            }
        }else{
            document.getElementById("defintion-box").value = ""
        }
        

    

    
}

let searchTextBox = new TextBox();

let defintionBox = new defAreaBox();
