let input = null;
let statisticsMsg = null;
let buttonSearch = null;

let tabUsers = null;
let tabSummary = null;

let allUsers = [];
let foundUsers = [];

let countMale = 0;
let countFemale = 0;

let totalAges = 0;
let averageAge = 0;

window.addEventListener('load', ()=>{
    fetchUsers();

});


async function fetchUsers(){
    const res = await fetch('http://localhost:3001/users');
    const json = await res.json();
    allUsers = json.map(user=>{
        const {name, picture, dob, gender} = user;
        return{
            name: name.first + ' ' + name.last,
            old : dob.age,
            photo : picture.medium,
            gender,
        };
    });

    render();
}

function render(){
    buttonSearch = document.querySelector('.btn-search');
    input = document.querySelector('#input-search');
    statisticsMsg = document.getElementById('statistics-msg');
    let quantify = document.querySelector('#quantify-users');

    input.addEventListener('keyup', () =>{
        let hasText = !!input.value && input.value.trim() !== '';
        if(hasText){
            buttonSearch.classList.add('enabled');
            return hasText;
        }
            else{
                buttonSearch.classList.remove('enabled');
                clearSearch();
                refreshInner(quantify);
                refreshTabUsers();
            };
    });

    buttonSearch.addEventListener('click', (event)=>{
        event.preventDefault();
        let hasText = !!input.value && input.value.trim() !== '';
        let findName = input.value.toLowerCase();
        if(hasText){
            foundUsers = allUsers.filter(user =>{
                return user.name.toLowerCase().includes(findName);
            });
            updateInner(quantify);
            updateInfoStatistics();
            }
            refreshTabUsers();
        });
}

function clearSearch(){
    foundUsers = [];
}

function updateInner(quantify){
    quantify.innerHTML = `${foundUsers.length} usuários encontrados`
    statisticsMsg.innerHTML = 'Estatísticas';
}

function refreshInner(quantify){
    statisticsMsg.innerHTML = 'Nada a ser exibido aqui';
    quantify.innerHTML = 'Nenhum usuário filtrado';
    updateInfoStatistics()
}

function refreshTabUsers(){
    let users = document.querySelector('#users');
    let favoritesHTML = '<div>'

    foundUsers.forEach(user =>{
        const {photo, name, old} = user;
        const userHTML = `
        <div class="user">
            <div class="img-container">
                <img src="${photo}">
            </div>
            <div class="user-info">
                <span>${name},</span>
                <span>${old} anos</span>
            </div>
        </div>
        `
    ;
    favoritesHTML += userHTML;
    });
    users.innerHTML = favoritesHTML;    

    render();
}

function updateInfoStatistics(){
    calculateAge();
    calculateAverage();
    calculateFemale();
    calculateMale();
    updateInnerStatistics();
}

function updateInnerStatistics(){
    const infoStatistics = document.getElementById('info-statistics');
    if(foundUsers.length>0){
        const span = `
            <span>Sexo Masculino: ${countMale}</span>
            <span>Sexo Feminino: ${countFemale}</span>
            <span>Soma das idades: ${totalAges}</span>
            <span>Média das idades: ${averageAge}</span>
            `
        return infoStatistics.innerHTML = span;
    } else{
        infoStatistics.innerHTML = ''; 
    }

}

function calculateAge(){
    totalAges = 0;
    foundUsers.forEach(user =>{
        totalAges += user.old;
    });
    return totalAges;

}

function calculateAverage(){
    averageAge = 0;
    if(foundUsers.length !== 0){
        totalAges = calculateAge();
        averageAge = totalAges/foundUsers.length;
        return averageAge.toFixed(2)
    }
}

function calculateMale(){
    return countMale = foundUsers.filter(user => user.gender === 'male').length;
}

function calculateFemale(){
    return countFemale = foundUsers.filter(user => user.gender === 'female').length;
}