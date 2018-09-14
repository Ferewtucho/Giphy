//Initial array of movies   
$(document).ready(function () {
    $("body").hide();
    $("body").show(1500);

    var animatedTelev = ["The Simpsons", "SpongeBob SquarePants", "Family Guy", "South Park", "Futurama", "The Flintstones", "The Jetsons", "King of the Hill", "Rick and Morty", "Dexter's Laboratory", "The Yogi Bear Show", "American Dad!", "Johnny Bravo"];

    //  create topics array buttons
    function renderButtons() {
        $('#buttons-view').empty();

        for (var i = 0; i < animatedTelev.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('anim-tv');
            a.attr('data-name', animatedTelev[i]);
            a.text(animatedTelev[i]);
            $('#buttons-view').append(a);
        }
    }
    renderButtons();

    //on button click
    $(document).on('click', '.anim-tv', function () {

        //new variable will log the text data from each button
        var animTv = $(this).html();
        // console.log(martialArts);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animTv + "&api_key=B16B3UHEjIdWBAh5GZHcisLB7D4HsiQ6";
        // console.log(queryURL);

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;
            console.log(results);
            //empties the div before adding more gifs
            $('.gifcontainer').empty();
            for (var j = 0; j < results.length; j++) {
                var imageDiv = $('<div>');
                var imageView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                // console.log(imageView);  

                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                gifImage.attr('data-state', 'still');
                
                var imageAndrating = $("<div>").addClass('imgAndRating')
                imageAndrating.prepend(gifImage);
                
                gifImage.on('click', playGif);
    

                // Pulling ratings for each movie
                var rating = results[j].rating;

                // console.log(rating);
                var displayRated = $('<p>').text("Rating: " + rating);
                imageAndrating.prepend(displayRated);
                $(".gifcontainer").prepend(imageAndrating);
                $('').prepend(displayRated);
            } // end for loop
           
        }); // done response

        //function to stop and animate gifs
        function playGif() {
            var state = $(this).attr('data-state');
            // console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        } //end of on click function

    }); //end of document on click 

    //adding new button to array
    $(document).on('click', '#add-movie', function () {
        if ($('#movie-input').val().trim() == '') {
            alert('Input can not be left blank');
        }
        else {
            var movies = $('#movie-input').val().trim();
            animatedTelev.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

        }

    });


});