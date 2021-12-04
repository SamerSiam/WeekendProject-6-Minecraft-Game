const SKY_ELEMENT=0;
const CLOUD_ELEMENT=1;
const TREE_ELEMENT=4;
const TRUNK_ELEMENT=5;
const ROCK_ELEMENT=7;
const GRASS_ELEMENT=8;
const GROUND_ELEMENT=9;

let minedTypes=[];
let selectedTool={};



/** define tool objects, each will have ID, name, elements */
const tools=[
    {
        id:"1",
        name:"axe",
        elements:[TREE_ELEMENT, TRUNK_ELEMENT],
        image:'./images/axe.png'
    },
    {
        id:"2",
        name:"pickaxe",
        elements:[ROCK_ELEMENT],
        image:'./images/pickaxe.png'
    },

    {
        id:"3",
        name:"shovel",
        elements:[GRASS_ELEMENT,GROUND_ELEMENT],
        image:'./images/shovel.png'
    },

];

// Initial board game matrix
const initialMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1,1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0,1,0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];
const game=document.querySelector('.game-matrix-grid')
const toolContainer= document.querySelector('.side-bar-flexColumn');
let currentMatrix=copyMatrix();
let currentResourceAvailable = SKY_ELEMENT;
let isResourceSelected = false;

// populate game board
createGameboard();

// dynamically create tools from the objects above
createTools();

const inventory=createInventory();
inventory.addEventListener('click', function(){
    let className=inventory.className;
    isResourceSelected = true;
    selectedTool = undefined;
})

const resetButton=createReset();
resetButton.addEventListener('click', resetGame);

function resetGame(){
    currentMatrix =copyMatrix();
    currentResourceAvailable = SKY_ELEMENT;
    isResourceSelected = false;
    selectedTool = undefined;
    game.innerHTML = '';
    createGameboard();
}
      


/**************************************FUNCTIONS************************************************** */
function createGameboard()
{
for (let row=0; row< currentMatrix.length; row++){
    for (let col=0; col< currentMatrix.length; col++)
    {
        switch(currentMatrix[row][col])
        {
            case 0: createBlock('sky', row, col, currentMatrix[row][col]);
            break;
            case 1: createBlock('cloud', row, col, currentMatrix[row][col]);
            break;
            case 9: createBlock('ground', row, col, currentMatrix[row][col]);
            break;
            case 8: createBlock('grass', row, col, currentMatrix[row][col]);
            break;
            case 7: createBlock('rock', row, col, currentMatrix[row][col]);
            break;
            case 6:
            case 4: 
            createBlock('tree', row, col, currentMatrix[row][col]);
            break;
            case 5:createBlock('trunk', row, col, currentMatrix[row][col]);
            break;
        }
    }
}
}

function createBlock(type, x, y, typeId){
    let blockDiv=document.createElement('div');
    blockDiv.classList.add(type);
    blockDiv.dataset.x = x;
    blockDiv.dataset.y = y;
    blockDiv.dataset.type = typeId;
    blockDiv.addEventListener('click',gridClick);
    game.appendChild(blockDiv); 
   
}

function gridClick(e)
{
    const element=e.target;
    if(isResourceSelected){
        element.setAttribute('class','');
        currentMatrix[element.dataset.x][element.dataset.y] =currentResourceAvailable;
        element.classList.add(mapResource(currentResourceAvailable));

    } else if(selectedTool){
        let resource = parseInt(element.dataset.type);
        if(minedTypes.includes(resource)){
            element.setAttribute('class','');
            e.target.classList.add('sky');
            inventory.setAttribute('class','');
            inventory.classList.add('inventory');
            inventory.classList.add(mapResource(resource));
            currentResourceAvailable = resource;
            currentMatrix[element.dataset.x][element.dataset.y] = SKY_ELEMENT;

            //
        } else {
            let wrongTool=document.getElementById(selectedTool.id);
            wrongTool.classList.add('wrong-tool');
        }
    }
   
}
/************************************************************************************************* */
function mapResource(resource)
{
    switch(resource) {
        case 9: 
           return 'ground';
        break;
        case 8: return'grass';
        break;
        case 7: return'rock';
        break;
        case 6:
        case 4: 
        return'tree';
        break;
        case 5:return'trunk';
        break;  
    }
}
function createTools()
{
    tools.forEach((t)=>{
        let tool=document.createElement('div');
        tool.classList.add('tool-box');
        tool.classList.add(t.name);
        tool.setAttribute('id', t.id);
        toolContainer.appendChild(tool);
        tool.addEventListener('click', toolClick);
    }); 

}

function toolClick(e)
{
     e.target.classList.toggle('selected-tool');
     e.target.classList.remove('wrong-tool');
     const typeId=e.target.getAttribute("id");
     selectedTool=tools.find(tool => tool.id===typeId );
     minedTypes=selectedTool.elements;
     isResourceSelected = false;
}
/************************************************************************************** */


/************************************************************************************** */

function createInventory()
{
    let inv=document.createElement('div');
    inv.classList.add('inventory');
    toolContainer.appendChild(inv);
    return inv;
}


function createReset()
{
    let reset=document.createElement('button');
    reset.classList.add('button2');
    reset.innerText= 'Reset Game';
    toolContainer.appendChild(reset);
    return reset;
    
}

function copyMatrix()
{
    return initialMatrix.map((arr) => arr.slice());
}




