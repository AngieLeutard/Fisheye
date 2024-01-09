// Récupération id

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Récupération data

async function getData(id) {
    
    const response = await fetch("photographers.json")
    let photographers = await response.json()
    console.log(photographers)

    return ({ 
        photographer: photographers.photographers.find(photographer => photographer.id == id),
        medias: photographers.media.filter(media => media.photographerId == id) 
    })
}

getData(id).then(
    data => {
        console.log(data)
        displayHeader(data.photographer)
        displayGallery(data.medias)
        generateSlideShow(data.medias)
    }
)

function displayHeader(photographer) {
    console.log(photographer)
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

    return(informations);
}

function displayGallery(medias) {
    console.log(medias)
    const main = document.querySelector(".photograph_description");

    const gallery = document.createElement("div");
    gallery.classList.add('gallery');

    medias.map((media) => {
        
        const item = document.createElement("a");
        item.classList.add('item');

        if(media.image) {
            const item_img = document.createElement("img");
            const item_imgSrc = `assets/images/Sample Photos/${media.photographerId}/${media.image}`;
            item_img.setAttribute("src", item_imgSrc);
            item_img.classList.add('item_img');
            item.appendChild(item_img);
        } else if(media.video) {
            const item_video = document.createElement("video");
            const item_vidSrc = document.createElement("source");
            const vidSrc = `assets/images/Sample Photos/${media.photographerId}/${media.video}`;
            item_vidSrc.setAttribute("src", vidSrc);
            item_video.classList.add('item_img');
            item_video.appendChild(item_vidSrc);
            item.appendChild(item_video);
        }

        const item_description = document.createElement("div");
        item_description.classList.add('item_description');

        const item_title = document.createElement("span");
        item_title.classList.add('item_title');
        item_title.textContent = media.title;

        const item_like_wrapper = document.createElement("div");
        item_like_wrapper.classList.add('item_likeWrapper');

        const item_like_count = document.createElement("span");
        item_like_count.classList.add("item_likeCount");
        let clicks = 0;
        item_like_count.innerHTML = clicks;

        function like() {
            item_like_count.innerHTML = clicks += 1;
        };

        const item_like_icon = document.createElement("a");
        item_like_icon.innerHTML = '<i class="fa-solid fa-heart"></i>';
        item_like_icon.addEventListener("click", like);

        item_like_wrapper.appendChild(item_like_count);
        item_like_wrapper.appendChild(item_like_icon);

        item_description.appendChild(item_title);
        item_description.appendChild(item_like_wrapper);

        item.appendChild(item_description);
    
        gallery.appendChild(item);
    
        main.appendChild(gallery);
    })

    return(main);
}


