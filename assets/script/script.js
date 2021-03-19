window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start (){
    inputName = document.querySelector('#input-name');
    activateFocus();
    preventFormSubmit();
    render(); 
}

function preventFormSubmit(){
    function handleFormSubmit(event){
        event.preventDefault();
    }
    var form = document.querySelector('form')
    form.addEventListener('submit',handleFormSubmit);
}

function activateFocus(){
    function insertName(newName){
        if (isEditing){

        }
        else{
            globalNames.push(newName);
            render();
        }
    }

    function updateName(newName){
        globalNames[currentIndex] = newName;
        render();
    }

    function handleTyping(){
        if (event.key === 'Enter' && event.target.value.trim() != ''){
            if(isEditing){
                updateName(event.target.value)
            }
            else{
                insertName(event.target.value);
            }
            isEditing = false;
            clearInput();
        }
    }
    inputName.addEventListener('keyup', handleTyping)
    inputName.focus();
}

function render(){
    function createDeleteButton(index){
        function deleteButton(){
            globalNames.splice(index, 1);
            render();
        }
        var button = document.createElement('button');
        button.textContent = 'x';
        button.addEventListener('click',deleteButton)
        return button;
    }

    function createSpan(currentName, index){
        function editItem(){
            isEditing = true;
            inputName.value = currentName
            inputName.focus();
            currentIndex = index;
        }
        var span = document.createElement('span');
        span.textContent = currentName;
        span.addEventListener('click',editItem);
        return span
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = "";

    var ul = document.createElement('ul');

    for (var index = 0; index<globalNames.length; index++){
        var currentName = globalNames[index]

        var li = document.createElement('li');
        var button = createDeleteButton(index);
        var span = createSpan(currentName, index)

        li.appendChild(button);
        li.appendChild(span);

        ul.appendChild(li);
    }
    divNames.appendChild(ul);
    clearInput();
}

function clearInput(){
    inputName.value = '';
}