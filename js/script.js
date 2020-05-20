let cardsData = [];
let favoriteCardsData;

$(document).ready(function() {

    // Initialize LocalStorage

    let favoriteFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));
    if (favoriteFromLocalStorage === null) {
        favoriteCardsData = [];
    } else {
        favoriteCardsData = favoriteFromLocalStorage;
        favoriteCardsData.forEach(item => {
            createFavoriteCard(item);
        });
    }

    // Get Categories

    $.get('https://api.chucknorris.io/jokes/categories')
        .done(data => {
            const categories = $("#category-buttons");
            data.forEach(item => {
                categories.append(
                    `<li class=\"category-radio\">
                        <input class=\"category-btn\" type=\"radio\" name=\"category\" id=\"${item}\"/>
                        <label class=\"category-label\" for=\"${item}\">${item}</label>
                    </li>`
                )
            });
            categories.find('input:first').prop("checked", true);
        })
        .fail(() => {
            $("#category-buttons").append("<p class='error'>Sorry, something wrong...</p>")
        });
});










