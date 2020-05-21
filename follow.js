var apiKEY = "105d4ded77051c3ef0322214703f7bb8";

$(document).ready(function(){
   
      
    //FOLLOWING BANDS FUNCTIONS//  
    var bandName = localStorage.getItem('followBand');
    bandName = bandName.split(",");
    for (var i = 0; i < bandName.length; i++) {
        var queryURL = "https://rest.bandsintown.com/artists/" + bandName[i] + "/?app_id=" + apiKEY;
        console.log(bandName); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            var img = $("<img>");
            var band = $("<p>");
            band.addClass("text");
            var container = $("<div>");
            container.addClass('cardArtist')
            var bandFollowed = band.text(response.name);
            var bandImage = img.attr('src',response.image_url);
            img.addClass("image");
            var eachBand = container.append(bandImage,bandFollowed);
            eachBand.addClass("card-image col lg12 col md6 col s3")
            $("#eachBand").append(eachBand);
        })
    }
})