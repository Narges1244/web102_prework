/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(GAMES_JSON) {
 //const gameListElements = document.getElementById("game-container");
 // Clear the games list before adding new games
 gamesContainer.innerHTML = "";
    // loop over each item in the data
    for(let i=0;i<GAMES_JSON.length;i++){
        const game = GAMES_JSON[i];

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card"); 

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
      <img class="game-img" src="${game.img}" alt="${game.name}">
      <h2>${game.name}</h2>
      <p>Description: ${game.description}</p>
      <p>Pledged: ${game.pledged}</p>
      <p>Goal: ${game.goal}</p>
      <p>Backers: ${game.backers}</p>

      `;




        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalIndividualContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = ` ${totalIndividualContributions}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaisedCard = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML= ` $${totalRaisedCard}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGameCard = GAMES_JSON.reduce((total, game)=> total+1, 0);
gamesCard.innerHTML = ` ${totalGameCard}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
const unfundedGame = games.filter((game)=> {
    return game.pledged < game.goal;

});

    // use the function we previously created to add the unfunded games to the DOM
    
    addGamesToPage(unfundedGame);
}


// show only games that are fully funded
function filterFundedOnly(games) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
const foundedGame = games.filter((game)=> {
    return game.pledged>= game.goal;
});

    // use the function we previously created to add unfunded games to the DOM
 addGamesToPage(foundedGame);
}


// show all games
function showAllGames(games) {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
addGamesToPage(games);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", function () {
    filterUnfundedOnly(GAMES_JSON); 
});
fundedBtn.addEventListener("click",function(){
    filterFundedOnly(GAMES_JSON);
});
allBtn.addEventListener("click",function () {
    showAllGames(GAMES_JSON);
    
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.reduce((count,game)=> {
    if (game.pledged < game.goal) {
        return count + 1;
      }
      return count;
    }, 0);
    console.log("number of unfunded game:", numberOfUnfundedGames);

const numberOfFundedGames = GAMES_JSON.reduce((count,game)=>{
    if(game.pledged >= game.goal){
        return count+1;
      }
      return count;
    },0);
console.log("number of funded Game:",numberOfFundedGames);    

// create a string that explains the number of unfunded games using the ternary operator
const formattedTotalRaisedCard = totalRaisedCard.toLocaleString();
const displayStr = `A total of ${formattedTotalRaisedCard} has been raised for ${numberOfFundedGames}
games. Currently, ${numberOfUnfundedGames === 1 ? '1 game remains' : `${numberOfUnfundedGames} games remain`} unfunded.
 We need your help to fund these amazing games!`; 


// create a new DOM element containing the template string and append it to the description container
const displayParagraph = document.createElement('p');
displayParagraph.textContent = displayStr;


descriptionContainer.appendChild(displayParagraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const firstGame = sortedGames[0].name;
const secondGame = sortedGames[1].name;
const firstElement = document.createElement('p');
firstElement.textContent = ` ${firstGame}`;
firstGameContainer.appendChild(firstElement);



// create a new element to hold the name of the top pledge game, then append it to the correct element
const secondElement = document.createElement('p');
secondElement.textContent = ` ${secondGame}`;
secondGameContainer.appendChild(secondElement);
// do the same for the runner up item

//add search buttom
function handleSearchInput(event) {
    event.preventDefault(); // Prevent form submission
  
    const searchQuery = searchInput.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchQuery));
  
    displaySearchResults(filteredGames, searchResultsContainer);
  }
  
  // Function to display search results or a message when no games are found
  function displaySearchResults(games, container) {
    // Clear previous search results and messages
    container.innerHTML = '';
  
    if (games.length === 0) {
      // No games found, display a message
      const messageElement = document.createElement('p');
      messageElement.textContent = "We couldn't find any games matching your search.";
      container.appendChild(messageElement);
    } else {
      // Display each game in the container
      games.forEach(game => {
        const gameElement = document.createElement('p');
        gameElement.textContent = `🎉You can find ${game.name} in our game section`;
        container.appendChild(gameElement);
      });
    }
  }
  
  // Get the search input, search results container, and search button
  const searchInput = document.getElementById('searchInput');
  const searchResultsContainer = document.getElementById('searchResults');
  const searchButton = document.querySelector('.search-container button'); // Get the search button element
  
  // Add event listener to the search button
  searchButton.addEventListener('click', handleSearchInput);
  
  // Optionally, add event listener to the search input for real-time search as the user types
  //searchInput.addEventListener('input', handleSearchInput);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  