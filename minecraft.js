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
        elements:["tree", "trunk"]
    },
    {
        id:"2",
        name:"pickaxe",
        elements:["rock"]
    },

    {
        id:"3",
        name:"shovel",
        elements:["grass","ground"]
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
const toolPickaxe=document.querySelector('#pickaxe');
console.log(toolPickaxe.getAttribute("data-id"));

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
function createElement(type){
    let blockDiv=document.createElement('div');
    blockDiv.classList.add(type);
    blockDiv.addEventListener('click',gridClick);
    game.appendChild(blockDiv); 
}

function gridClick(e)
{
    type='sky';
    const className= e.target.getAttribute('class');
    console.log(className);
    if (minedTypes.includes(className)){
        e.target.setAttribute('class','');
        e.target.classList.add(type);
    }
    else{
        console.log(selectedTool);
        // selectedTool.classList.add('wrong-tool');
    }
   
}


toolPickaxe.addEventListener('click', ()=>{
    toolPickaxe.classList.add('selected-tool');
    const typeId=toolPickaxe.getAttribute("data-id");
    selectedTool=tools.find(tool => tool.id===typeId );
    minedTypes=selectedTool.elements;
    // gridMine(minedTypes);
    console.log(minedTypes);
    console.log(selectedTool);
});


