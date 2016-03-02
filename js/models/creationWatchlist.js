/**
 * Created by Vincent on 16-03-02.
 */

//Il faut ajouter la nouvelle watchlist a la collection pour
//un utilisateur donne.



function createWatchlist(name){
    alert("je passe ici");
    encodeURI(name);
    alert("passe dans la fonction");
    //creating the watchlist appending to collection for the user

};

//jQuery for the action of clicking the button
$(document).ready(function(){
    alert("ready!");

    $("#watchlistCreationButton").onclick=function(){
        var name = $(".newWatchlistNameInput").getText();
        alert(name);
        createWatchlist(name);
        alert("watchlist added to watchlist list.");
    };



});