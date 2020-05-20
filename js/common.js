// Main Radio Buttons

$(".radio-btn").change(() => {
    if ($("#radio-button-categories").prop("checked")) {
        $('#category-buttons').delay(200).slideDown(300);
    } else {
        $('#category-buttons').slideUp(200);
    }
    if ($("#radio-button-search").prop("checked")) {
        $('#search-line').delay(200).slideDown(300);
        setTimeout(() => {
            $('#search-line').focus();
        }, 300);
    } else {
        $('#search-line').slideUp(200);
        $('#search-line').val("");
    }
});

// Favorites Toggle

$("#card-board, #favorite-card-board").on("click", ".favorite-icon", function (event) {
    event.preventDefault();
    let id = $(this).data("id");

    if (! $(this).data("favorite")) {
        $(this).data("favorite", true);
        $(this).children("img").attr("src","img/favorite_filled.svg").attr("alt","Remove from Favorite");
        $(this).children(".favorite-tooltip").text("Remove from Favorites");

        let newFavoriteCard = {};
        cardsData.some(item => {
            if (item.id === id) {
                newFavoriteCard = item;
                return true;
            }
        });
        favoriteCardsData.unshift(newFavoriteCard);
        localStorage.setItem("favorites", JSON.stringify(favoriteCardsData));
        createFavoriteCard(newFavoriteCard);

    } else {
        let $removeFavoriteIcon = $(`.favorite-icon[data-id="${id}"]`);
        $removeFavoriteIcon.removeData("favorite", "false");
        $removeFavoriteIcon.children("img").attr("src","img/favorite_outline.svg").attr("alt","Add to Favorite");
        $removeFavoriteIcon.children(".favorite-tooltip").text("Add to Favorites");

        favoriteCardsData = favoriteCardsData.filter(item => item.id !== id);
        localStorage.setItem("favorites", JSON.stringify(favoriteCardsData));
        $(`.favorite-card.${id}`).remove();
    }
});

// Slide Favorite Panel

$(".favorite-open-button").on("click", () => {
    slideOnFavoritePanel()
});

$(".favorite-close-button").on("click", () => {
    slideOffFavoritePanel();
});

function slideOnFavoritePanel() {
    $(".favorite-panel").addClass("favorite-panel-slider");
    $(".blackout").css("display", "block");
    setTimeout(() => {
        $(".favorite-card").css("opacity", "1");
        $(".favorite-close-button").css("opacity", "1");
        $(".blackout").css("opacity", "0.3");
    }, 150);
}

function slideOffFavoritePanel() {
    $(".favorite-card").css("opacity", "0");
    $(".favorite-close-button").css("opacity", "0");
    $(".blackout").css("opacity", "0");
    setTimeout(() => {
        $(".favorite-panel").removeClass("favorite-panel-slider");
        $(".blackout").css("display", "none");
    }, 150);
}

$(window).on("load resize", changeWindowSize);

function changeWindowSize(){
    slideOffFavoritePanel();
    if ($(window).width() >= "992"){
        $(".favorite-card").css("opacity", "1");
    }
}

// Convert Date to Hours Ago

function dateToHoursAgo(date) {
    let updateDateMS = Date.parse(date);
    let currentDateMS = Date.parse(new Date());
    return Math.floor((currentDateMS - updateDateMS)/3600000);
}