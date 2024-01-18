// Récupération id

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Récupération data

async function getData(id) {
    
    const response = await fetch("photographers.json")
    let photographers = await response.json()

    return ({ 
        photographer: photographers.photographers.find(photographer => photographer.id == id),
        medias: photographers.media.filter(media => media.photographerId == id) 
    })
}

// Fonction name dans form

function displayFormName(photographer) {
   
    const formName = document.querySelector("#formName");
    formName.classList.add('modal_form_title');
    formName.textContent = photographer.name;

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

// Fonction Sort

function sortByLikes(medias) {

    const gallery = document.querySelector(".gallery");
    gallery.remove();   

    let sortedMedias = medias.sort((a, b) => (a.likes < b.likes) ? 1 : (a.likes > b.likes) ? -1 : 0);
  
    displayGallery(sortedMedias);

    const title = document.querySelector(".sort_title");
    title.innerHTML = "Popularité";

    const filterBox = document.querySelector(".textBox_wrapper");
    filterBox.removeAttribute("open");

     // const galleryPicture = document.querySelectorAll('.item_img, .video_src');
    // console.log(galleryPicture)
    // console.log(galleryPicture[galleryPicture.length - 1].getAttribute('src'));
}

function sortByDates(medias) {

    const gallery = document.querySelector(".gallery");
    gallery.remove();   
    
    let sortedDates = medias.sort((a, b) => (a.date > b.date) ? 1 : (a.date < b.date) ? -1 : 0);

    displayGallery(sortedDates);

    const title = document.querySelector(".sort_title");
    title.innerHTML = "Date";

    const filterBox = document.querySelector(".textBox_wrapper");
    filterBox.removeAttribute("open");

    // const galleryPicture = document.querySelectorAll('.item_img, .video_src');
    // console.log(galleryPicture)
    // console.log(galleryPicture[galleryPicture.length - 1].getAttribute('src'));
}

function sortByTitles(medias) {

    const gallery = document.querySelector(".gallery");
    gallery.remove();   

    let sortedTitles = medias.sort((a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0);

    displayGallery(sortedTitles);

    const title = document.querySelector(".sort_title");
    title.innerHTML = "Titre";

    const filterBox = document.querySelector(".textBox_wrapper");
    filterBox.removeAttribute("open");

    // const galleryPicture = document.querySelectorAll('.item_img, .video_src');
    // console.log(galleryPicture)
    // console.log(galleryPicture[galleryPicture.length - 1].getAttribute('src'));
}

function sortGallery(medias) { 

    const byLikes = document.getElementById("sortByLikes");
    byLikes.addEventListener("click", () => sortByLikes(medias));

    const byDates = document.querySelector("#sortByDates");
    byDates.addEventListener("click", () => sortByDates(medias));

    const byTitles = document.querySelector("#sortByTitles");
    byTitles.addEventListener("click", () => sortByTitles(medias));
}

// Fonction Gallery

function displayGallery(medias) {
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

            // Display Preview
            item_img.addEventListener("click", () => {
                item_img.classList.add("-current");

                const preview = document.getElementById("preview_modal");
                preview.style.display = "flex";

                let previewPicture = document.getElementById("preview_picture");
                previewPicture.style.display = "flex";
                previewPicture.setAttribute("src", item_imgSrc);

                let previewVideo = document.getElementById("preview_video");
                previewVideo.style.display = "none";

                // Change preview src
                const previewArray = Array.from(medias, (media) => media.image);
                // console.log(previewArray)

                let arrowLeft = document.querySelector(".arrow_left");
                let arrowRight = document.querySelector(".arrow_right");

                let clickedPicture = document.querySelector(".-current");
                // console.log(clickedPicture)

                i = 0;
                console.log("num i" + i)

                arrowLeft.addEventListener('click', function() { 
                    i --;
                    if (i < 0) {
                        i = previewArray.length - 1;
                        console.log("inf à 0")
                    }
                    previewPicture.setAttribute("src", `assets/images/Sample Photos/${media.photographerId}/${previewArray[i]}`);
                });

                arrowRight.addEventListener('click', function() { 
                    i ++;
                    if (i > previewArray.length - 1) {
                        i = 0;
                        console.log("sup à 0")
                    }
                    previewPicture.setAttribute("src", `assets/images/Sample Photos/${media.photographerId}/${previewArray[i]}`);
                });
            });

        } else if(media.video) {

            const item_video = document.createElement("video");
            item_video.classList.add('item_img');

            const item_vidSrc = document.createElement("source");
            const vidSrc = `assets/images/Sample Photos/${media.photographerId}/${media.video}`;
            item_vidSrc.setAttribute("src", vidSrc);
            item_vidSrc.classList.add('video_src');

            
            item_video.appendChild(item_vidSrc);
            item.appendChild(item_video);

            // Display Preview
            item_video.addEventListener("click", () => {
                const preview = document.getElementById("preview_modal");
                preview.style.display = "flex";

                let previewVideo = document.getElementById("preview_video");
                previewVideo.style.display = "flex";

                let previewVideoSrc = document.getElementById("preview_video_src");
                previewVideoSrc.setAttribute("src", vidSrc);

                let previewPicture = document.getElementById("preview_picture");
                previewPicture.style.display = "none";               
            });

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
        let clicks = media.likes;
        item_like_count.textContent = clicks;

        function like() {
            const item_likes = clicks += 1;
            item_like_count.textContent = item_likes;
            const photograph_total_likes = document.querySelector(".photograph_total_likes");
            photograph_total_likes.textContent = parseInt(photograph_total_likes.textContent) + 1;
        };

        const item_like_icon = document.createElement("a");
        item_like_icon.innerHTML = '<i class="fa-solid fa-heart like_icon"></i>';
        item_like_icon.addEventListener("click", (e) => like());

        item_like_wrapper.appendChild(item_like_count);
        item_like_wrapper.appendChild(item_like_icon);

        item_description.appendChild(item_title);
        item_description.appendChild(item_like_wrapper);

        item.appendChild(item_description);
    
        gallery.appendChild(item);
    
        main.appendChild(gallery);
    })

    // const galleryPicture = document.querySelectorAll('.item_img, .video_src');
    // console.log(galleryPicture);
    // console.log(galleryPicture.getAttribute('src'));
}

// Display Preview Gallery

function displayPreview(src) {
    
}

function closePreview() {
    const preview = document.getElementById("preview_modal");
    preview.style.display = "none";
    i = 0;
}

// Fonction Preview

function getPreviewPicture() {
    
    // const targetPicture_src = document.querySelectorAll('.item_img, .video_src').forEach(e => console.log(e.getAttribute('src')));

    // const galleryPicture = document.querySelectorAll('.item_img, .video_src');
    // console.log(galleryPicture)
    // console.log(galleryPicture[galleryPicture.length - 1].getAttribute('src'));
}



getData(id).then(
    data => {
        displayHeader(data.photographer)
        displayFormName(data.photographer)
        displayInfos(data.photographer, data.medias)
        displayGallery(data.medias)
        sortGallery(data.medias)
        getPreviewPicture()
    }
)


