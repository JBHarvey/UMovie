/**
 * Created by Vincent on 16-03-02.
 */

//Il faut ajouter la nouvelle watchlist a la collection pour
//un utilisateur donne.



function createWatchlist(name){
    console.log("je passe ici");
    encodeURI(name);
    console.log("passe dans la fonction");
    //creating the watchlist appending to collection for the user

};

//jQuery for the action of clicking the button
$(document).ready(function(){
    console.log("ready!");

    $("#watchlistCreationButton").onclick=function(){
        var name = $(".newWatchlistNameInput").getText();
        console.log(name);
        createWatchlist(name);
        console.log("watchlist added to watchlist list.");
    };



});