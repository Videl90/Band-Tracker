$("#bandSearch").on('click',function(){
    console.log($("#icon_prefix").val());
    if ($("#icon_prefix").val() !== "") {
        var bandName = $("#icon_prefix").val();
        console.log(bandName);
        var apiKEY = "105d4ded77051c3ef0322214703f7bb8";
        var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/?app_id=" + apiKEY;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            if (response.name) {
                $("#container").css('display','block');
                console.log(response.name);
                var artistName = response.name;
                var website = response.facebook_page_url;
                var bandImage = response.image_url;
                console.log(website);
                $("#artistName").append(artistName);
                $("#fblink").attr('href',website);
                $('#bandImage').attr('src',bandImage);
            } else {
                //Error message in case the band is not found
                $("#error-container").css('display','block');
                $("#error-container").text("Sorry, band not found");
            }
        })
    } else {
        //Error message in case the input has no name
        $("#error-container").css('display','block');
        $("#error-container").text("Enter a valid name");
    }
    
})