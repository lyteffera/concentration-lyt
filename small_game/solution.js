var firstOrSecondClick = 1; 
var firstClickID = "";
var numTries=0; 
var numMatches=0; 
//invoking shuffleImages();
shuffleImages();
/**
 * Changes the "src" attribute of the image associated with the id from a blank image 
 * to the actual image. 
 * @param {String} id 
 */
function showImage(id){
    $("#"+id).attr("src", getImage(id));
}
/**
 * Changes the "src" attribute of the image associated with the id to a blank image. 
 * @param {String} id 
 */
function hideImage(id){
    $("#"+id).attr("src","images/blank.jpg");
}
/**
 * Processes the game player's first and second clicks on the images. 
 * @param {*} id 
 */

function processClick(id){
    if (firstOrSecondClick == 1){
        showImage(id); 
        firstClickID = id;
        firstOrSecondClick++;
    }
    else if(id===firstClickID){
        console.log("clicked twice, no change"); 
    }
    else {
        showImage(id); 
        firstImgSRC = getImage(firstClickID);
        idSRC = getImage(id);
        if (firstImgSRC === idSRC){
            if ((numMatches+1)==8){
                numMatches++; 
                $("#matches").text(numMatches);
                $("#msg").text("Congrats, you win!");    
            } else {
                numTries++; 
                firstOrSecondClick--;
                $("#msg").text("Images match!"); 
                $("#tries").text(numTries);
                numMatches++; 
                $("#matches").text(numMatches);
                setTimeout(function(){$("#msg").text(" ")}, 1000);
            }
        }
        else {
        firstOrSecondClick--;
        numTries++; 
        $("#tries").text(numTries);
        setTimeout(function(){hideImage(firstClickID)}, 1000);
        setTimeout(function(){hideImage(id)}, 1000); 
        }
        

    } 
}
/**
 * Returns an array of images from the DOM
 */
function getImgArray(){
    var nList = document.querySelectorAll("img");
    return [].slice.call(nList);
}

/**
 * Adds an event listener to an image so that if it's clicked
 * processClick() will be called. 
 * @param {*} img 
 */

function addConcentrationHandler(img){
    var ID = img.getAttribute("id");
    img.addEventListener('click', function (){
        processClick(ID); 
        //console.log("hello " + ID);
        })

}

/**
 * calls addConcentrationHandler on each image element 
 */
function initializeEvents(){
    var images = getImgArray(); 
    images.forEach(addConcentrationHandler);
}

//calls initializeEvents() when the page is fully loaded
$(window).on('load', function(){initializeEvents();})

/**
 * Resets the page when called
 */
function startNewGame(){
    shuffleImages(); 
    firstOrSecondClick = 1; 
    firstClickID = 0;
    numTries=0; 
    numMatches=0; 
    $("#matches").text(0);
    $("#tries").text(0);
    $("#msg").text(" ");
    var images = getImgArray(); 
    images.forEach(function(img){
        var ID = img.getAttribute("id");
        hideImage(ID);
    });
}
//startNewGame() is attached to the button on the html page
$("#startNewGameButton").click(function(){startNewGame()}); 