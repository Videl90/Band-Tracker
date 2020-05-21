var apiKEY = "V2zvogc7ldpxhh86gwTGTXh9AxV9S7LS";
console.log(apiKEY);

  
$(document).ready(function(){

var artistName = localStorage.getItem("bandName");
console.log(artistName);

var queryURL =encodeURI("http://app.ticketmaster.com/discovery/v1/events.json?keyword=" + artistName + "&apikey=" + apiKEY + "&callback=myFunction");
console.log(queryURL);

 $.ajax({
     url: queryURL,
     method: 'GET'
 }).then (function(response){

        console.log(response);
        $(".bandName").text(artistName);
        var venueName = response._embedded.events[0]._embedded.venue[0].name;
        var date = response._embedded.events[0].dates.start.localDate;
        console.log(date);
        var hour = response._embedded.events[0].dates.start.localTime;
        var country= response._embedded.events[0]._embedded.venue[0].country.countryCode;
        var city= response._embedded.events[0]._embedded.venue[0].city.name;
        var ticketLink = response._embedded.events[0].eventUrl;
        console.log(ticketLink);
        console.log(hour);
        console.log(venueName);

        $(".venueName").text(venueName);
        $(".eventDate").text(date);
        $(".eventHour").text(hour);
        $(".cityName").text(city + ", " + country);

        button =  $("<a>").click("click", function(){
            console.log ("hola")
            button.attr("href", ticketLink);
            button.attr("target", "_blank");
        })
        button.addClass("tickets").text("BUY TICKETS");
        $("#buyButton").append(button);

        console.log(country, city);
 
 })

        var apiKEY2 = "105d4ded77051c3ef0322214703f7bb8";
        var queryURL2 = "https://rest.bandsintown.com/artists/" + artistName + "/?app_id=" + apiKEY2;

        $.ajax({
            url: queryURL2,
            method: 'GET'
        }).then(function(image){
            var bandImage = image.image_url;
            $('#bandImage').attr('src',bandImage);
        })



    var count = 0;
    $("#button-add").on("click", function(){
        count++
        console.log(count);
        $("#counterNum").text(count);
        $('.modal').modal();
        $("#ticketNumber").text(count);
    })

    $("#button-rest").on("click", function(){
        count--
        
        if (count == -1){
            count = 0;
        } 

        $("#counterNum").text(count);
        $('.modal').modal();
        $("#ticketNumber").text(count);
    
    })

})