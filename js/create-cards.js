// Create New Card

function createCards(data) {
    cardsData.push({
        id: data.id,
        icon: data.icon_url,
        url: data.url,
        value: data.value,
        date: data.updated_at,
        category: data.categories[0]
    });
    let hoursAgo = dateToHoursAgo(data.updated_at);

    $("#card-board").prepend(
        `<div class="card">
        <div class="favorite-icon-wrapper">
            <div class="favorite-icon" data-id="${data.id}">
                <img src="img/favorite_outline.svg" alt="Add to Favorite">
                <span class="favorite-tooltip">Add to Favorites</span>
            </div>
        </div>
        <div class="card__wrapper">
            <div class="card__icon">
                <img src="${data.icon_url}" alt="Icon">
            </div>
            <div class="card__content">
                <div class="card__header">
                    <span class="id-title">id:</span>
                    <a href="${data.url}" target="_blank" class="id">
                        <span class="id-text">${data.id}</span>
                        <img src="img/link.svg">
                    </a>
                </div>
                <div class="card__body">
                    <p>${data.value}</p>
                </div>
                <div class="card__footer">
                    <div class="last-update">
                        <span>Last update: </span>
                        <span>${hoursAgo} hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    );

    if (data.categories.length !== 0) {
        $(".card:first .card__footer").append(
            `<div class="current-category">
                <span>${data.categories[0]}</span>
            </div>`
        )
    }

    favoriteCardsData.forEach(item => {
        if (item.id === data.id){
            let $fillFavoriteIcon = $(`.favorite-icon[data-id="${item.id}"]`);
            $fillFavoriteIcon.data("favorite", true);
            $fillFavoriteIcon.children("img").attr("src","img/favorite_filled.svg").attr("alt","Remove from Favorite");
            $fillFavoriteIcon.children(".favorite-tooltip").text("Remove from Favorites");
        }
    });
}

// Create Favorite Card

function createFavoriteCard(data) {
    let hoursAgo = dateToHoursAgo(data.date);

    $("#favorite-card-board").prepend(
        `<div class="favorite-card ${data.id}">
            <div class="favorite-icon-wrapper">
                <div class="favorite-icon" data-id="${data.id}" data-favorite="true">
                    <img src="img/favorite_filled.svg" alt="Remove from Favorite">
                    <span class="favorite-tooltip">Remove from Favorites</span>
                </div>
            </div>
            <div class="card__wrapper">
                <div class="card__icon">
                    <img src="${data.icon}" alt="Icon">
                </div>
                <div class="card__content">
                    <div class="card__header">
                        <span class="id-title">id:</span>
                        <a href="${data.url}" target="_blank" class="id">
                            <span class="id-text">${data.id}</span>
                            <img src="img/link.svg">
                        </a>
                    </div>
                    <div class="card__body card__body__favorite">
                        <p>${data.value}</p>
                    </div>
                    <div class="last-update">
                        <span>Last update: </span>
                        <span>${hoursAgo} hours ago</span>
                    </div>
                </div>
            </div>
        </div>`
    );
}