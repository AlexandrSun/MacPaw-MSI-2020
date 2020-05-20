// Submit Button

$("#submit-btn").on("click", () => {
    if ($("#radio-button-random").prop("checked")) {
        $.get('https://api.chucknorris.io/jokes/random')
            .done(data => {
                cardsData = [];
                $("#card-board").empty();
                createCards(data);
            })
            .fail(() => {
            });
    } else if ($("#radio-button-categories").prop("checked")) {
        let category = $("input[name=category]:checked").attr("id");
        $.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
            .done(data => {
                cardsData = [];
                $("#card-board").empty();
                createCards(data);
            })
            .fail(() => {
            });
    } else if ($("#radio-button-search").prop("checked")) {
        submitWordSearch();
    }
});

// Search Input Enter button trigger

$("#search-line").keyup(event => {
    event.preventDefault();
    if(event.key === "Enter"){
        event.preventDefault();
        submitWordSearch();
    }
});

// Submit Word Search

function submitWordSearch() {
    let searchValue = $("#search-line");
    if(searchValue.val().length >= 3 && searchValue.val().length <= 120) {
        $.get(`https://api.chucknorris.io/jokes/search?query=${searchValue.val()}`)
            .done(data => {
                if (data.total === 0) {
                    $("#errorMessage").css({"color": "#333333"}).text("Sorry, nothing found");
                    setTimeout(() => {
                        $("#errorMessage").text("")
                    }, 3000);
                } else {
                    cardsData = [];
                    $("#card-board").empty();
                    data.result.forEach(item => {
                        createCards(item);
                    });
                }
            })
            .fail(() => {
            });
    } else {
        $("#errorMessage").css({"color": "#FF6767"}).text("Enter 3 to 120 characters");
        setTimeout(() => {
            $("#errorMessage").text("")
        }, 3000);
    }
}