// Fonction header

function displayHeader(photographer) {
    const informations = document.querySelector(".photograph-header")

    const informations_wrapper = document.createElement("div");
    informations_wrapper.classList.add('infos_wrapper')

    const title = document.createElement( 'h2' );
    title.textContent = photographer.name;
    title.classList.add('title');

    const city = document.createElement( 'span' );
    city.textContent = photographer.city + ", " + photographer.country;
    city.classList.add('city');

    const citation = document.createElement( 'span' ); 
    citation.textContent = photographer.tagline;
    citation.classList.add('citation');

    const picture = document.createElement( 'img' );
    const pictureSrc = `assets/photographers/${photographer.portrait}`;
    picture.setAttribute("src", pictureSrc);
    picture.classList.add('picture')

    informations.appendChild(informations_wrapper)
    informations.appendChild(picture);

    informations_wrapper.appendChild(title);
    informations_wrapper.appendChild(city);
    informations_wrapper.appendChild(citation);

    const price = photographer.price;

    return(informations, price);
}

// Fonction infos encadrées

function displayInfos(photographer, medias) {
    const photograph_price = document.querySelector(".photograph_price");
    photograph_price.textContent = photographer.price + "€ / jour";

    const totalLikes = getTotalLikes(medias)
    const photograph_total_likes = document.querySelector(".photograph_total_likes");
    photograph_total_likes.textContent = totalLikes;
}

function getTotalLikes(medias) {
    return medias.reduce((result, media) => result + media.likes, 0);
}

getData(id).then(
    data => {
        displayHeader(data.photographer)
        displayInfos(data.photographer, data.medias)
    }
)