var bandName = "";
var bandsArray = [];
var allVenues = [];
var buttonTickets;

//Conditon to get the empty array or the array with the current
//artists.
if(localStorage.getItem('followBand') === null) {
    bandsArray = [];
} else {
    bandsArray = localStorage.getItem('followBand');
}
console.log(localStorage.getItem('followBand'));

//API to append the image, and band name
$("#bandSearch").on('click',function(){
    $("tbody").empty();
    $("#artistName").empty();
    $("#fblink").empty();
    $('#bandImage').empty();
    $("#error-container").css('display','none');
    console.log($("#icon_prefix").val());
    if ($("#icon_prefix").val() !== "") {
        bandName = $("#icon_prefix").val();
        console.log(bandName);
        localStorage.setItem("bandName", bandName);
        var apiKEY = "105d4ded77051c3ef0322214703f7bb8";
        var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/?app_id=" + apiKEY;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            if (response.name) {
                $("#container").css('display','block');
                artistName = response.name;
                var website = response.facebook_page_url;
                var bandImage = response.image_url;
                $("#artistName").append(artistName);
                $("#fblink").attr('href',website);
                $('#bandImage').attr('src',bandImage);
            } else {
                //Error message in case the band is not found
                $("#container").css('display','none');
                $("#error-container").css('display','block');
                $("#error-container").text("Sorry, band not found");
            }
        })
    } else {
        //Error message in case the input has no name
        $("#container").css('display','none');
        $("#error-container").css('display','block');
        $("#error-container").text("Enter a valid name");
    }
    //API to get the upcoming events
    var queryURL2 = "https://rest.bandsintown.com/artists/" + bandName + "/events/?app_id=" + apiKEY;
    console.log(queryURL2);
    allVenues = [];
    $.ajax({
        url: queryURL2,
        method: 'GET'
    }).then(function(events){
        console.log(events);
        for (var i = 0; i < 5; i++) {
            var eventDate = events[i].datetime;
            var eventVenue = events[i].venue.name;
            var location = events[i].venue.city;
            var eventCountry = events[i].venue.country;

            allVenues.push(eventVenue);
            console.log(allVenues);
            var row = $("<tr>")
            var date = $("<td>").text(eventDate);
            var venue = $("<td>").text(eventVenue);
            var city = $("<td>").text(location);
            var country = $("<td>").text(eventCountry);
            row.append(date,venue,city,country);
            $("tbody").append(row);
        }
        //API to get similar artists, listeners and playcount
        console.log(bandName);
        var apiKEY2 = "bed52730fbe111f6add92609042505dc";
        var queryURL3 = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + bandName + "&api_key=" + apiKEY2 + "&format=json";
        console.log(queryURL3);
        $("#eachBand").empty();
        $.ajax({
            url: queryURL3,
            method: 'GET'
        }).then(function(information) {
            console.log(information);
            $("#listeners").text(information.artist.stats.listeners);
            $("#playcount").text(information.artist.stats.playcount);
            for (var j = 0; j < 4; j++){
                //var img = $("<img>");
                var similarArtist = $("<p>");
                similarArtist.addClass("text");
                var container = $("<div>");
                var artists = similarArtist.text(information.artist.similar.artist[j].name);
                //var bandImage = img.attr('src', information.artist.similar.artist[j].image[1]["#text"]);
                //img.addClass("image");
                var eachBand = container.append(artists);
                eachBand.addClass("card-image col lg12 col md6 col s3")
                $("#eachBand").append(eachBand);
            }

            button =  $("<a>").click(function(){
                button.attr("href", "buytickets.html");
            })
            button.addClass("tickets").text("NEXT EVENT");
            $("#nextEvent").append(button);
        })
    })
})


//Button to follow an artist
$("#follow").on('click',function(){
    console.log(typeof(bandsArray));
    if (typeof bandsArray === "string") {
        bandsArray = bandsArray.split(",");
    }       
        if (bandsArray.includes(bandName)) {            
            alert("Band already followed");        
        } else {
            bandsArray.push(bandName);
        }
   localStorage.setItem("followBand",bandsArray);
})

