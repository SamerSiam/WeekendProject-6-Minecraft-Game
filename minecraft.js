const SKY_ELEMENT=0;
const CLOUD_ELEMENT=1;
const TREE_ELEMENT=4;
const TRUNK_ELEMENT=5;
const ROCK_ELEMENT=7;
const GRASS_ELEMENT=8;
const GROUND_ELEMENT=9;
let minedTypes=[];
let selectedTool={};
let tileType='sky';

/** define tool objects, each will have ID, name, elements */
const tools=[
    {
        id:"1",
        name:"axe",
        elements:["tree", "trunk"],
        image:'./images/axe.png'
    },
    {
        id:"2",
        name:"pickaxe",
        elements:["rock"],
        image:'./images/pickaxe.png'
    },

    {
        id:"3",
        name:"shovel",
        elements:["grass","ground"],
        image:'./images/shovel.png'
    },

];
const initialMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1,0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
// const toolPickaxe=document.querySelector('#pickaxe');
const inventory=document.querySelector('.inventory');
inventory.addEventListener('click', inventoryClick);

// populate game board
createGameboard();

// dynamically create tools from the objects above
createTools();



/**************************************FUNCTIONS************************************************** */
function createGameboard()
{

for (let row=0; row< initialMatrix.length; row++){
    for (let col=0; col< initialMatrix.length; col++)
    {
        switch(initialMatrix[row][col])
        {
            case 0: createElement('sky');
            break;
            case 1: createElement('cloud');
            break;
            case 9: createElement('ground');
            break;
            case 8: createElement('grass');
            break;
            case 7: createElement('rock');
            break;
            case 6:
            case 4: 
            createElement('tree');
            break;
            case 5:createElement('trunk');
            break;
        }
    }
}
}

function createElement(type){
    let blockDiv=document.createElement('div');
    blockDiv.classList.add(type);
    blockDiv.addEventListener('click',gridClick);
    game.appendChild(blockDiv); 
}
/************************************************************************************************* */

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
        const typeId=e.target.getAttribute("id");
        selectedTool=tools.find(tool => tool.id===typeId );
        minedTypes=selectedTool.elements;       
}
/************************************************************************************** */
function gridClick(e)
{
    // type='sky';
    const className= e.target.getAttribute('class');
    if (minedTypes.includes(className)){
        e.target.setAttribute('class','');
        e.target.classList.add(tileType);
        inventory.classList.add(className);
    }
    else{
        console.log(selectedTool);
        // let wrongTool=document.getElementById(selectedTool.name);
        // wrongTool.classList.add('wrong-tool');
    }
   
}

/************************************************************************************** */
function inventoryClick(e)
{
    const className= e.target.getAttribute('class');
    tileType=className;

}
// toolPickaxe.addEventListener('click', ()=>{
//     toolPickaxe.classList.remove('wrong-tool');
//     toolPickaxe.classList.add('selected-tool');
//     const typeId=toolPickaxe.getAttribute("data-id");
//     selectedTool=tools.find(tool => tool.id===typeId );
//     minedTypes=selectedTool.elements;
//     // console.log(minedTypes);
//     // console.log(selectedTool);
// });


