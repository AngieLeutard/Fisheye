// Récupération id

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Récupération data

async function getData(id) {
    
    const response = await fetch("photographers.json");
    let photographers = await response.json();

    return { 
        photographer: photographers.photographers.find(photographer => photographer.id == id),
        medias: photographers.media.filter(media => media.photographerId == id) 
    }
}

// Fonction Gallery

function displayGallery(medias) {
    const main = document.querySelector(".photograph_description");

    const gallery = document.createElement("div");
    gallery.classList.add('gallery');

    medias.map((media) => {
        
        const item = document.createElement("a");
        item.classList.add('item');

        function keyBoardPreview(e) {
            if (e.keyCode == '13') {
                openPreview(media, medias);
            }
        }

        if(media.image) {
            const item_img = document.createElement("img");
            const item_imgSrc = `assets/images/Sample Photos/${media.photographerId}/${media.image}`;

            item_img.setAttribute("src", item_imgSrc);
            item_img.classList.add('item_img');
            item.appendChild(item_img);
            item_img.setAttribute("alt", media.title);
            item_img.setAttribute("tabindex", "0")

            // Display Preview
            item_img.addEventListener("click", () => {
                openPreview(media, medias);
            })

            item_img.onkeydown = keyBoardPreview;

        } else if(media.video) {

            const item_video = document.createElement("video");
            item_video.classList.add('item_img');

            const item_vidSrc = document.createElement("source");
            const vidSrc = `assets/images/Sample Photos/${media.photographerId}/${media.video}`;
            item_vidSrc.setAttribute("src", vidSrc);
            item_vidSrc.classList.add('video_src');

            item_video.appendChild(item_vidSrc);
            item.appendChild(item_video);
            item_video.setAttribute("tabindex", "0")

            // Display Preview
            item_video.addEventListener("click", () => {
                openPreview(media, medias);
            });

            item_video.onkeydown = keyBoardPreview;
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
        item_like_icon.setAttribute("tabindex", "0");
        item_like_icon.addEventListener("click", (e) => like());
        item_like_icon.onkeydown = like;

        item_like_wrapper.appendChild(item_like_count);
        item_like_wrapper.appendChild(item_like_icon);

        item_description.appendChild(item_title);
        item_description.appendChild(item_like_wrapper);

        item.appendChild(item_description);
    
        gallery.appendChild(item);
    
        main.appendChild(gallery);
    })
}

// Display Preview Gallery

function closePreview() {
    const preview = document.getElementById("preview_modal");
    preview.style.display = "none";
}

function openPreview(media, medias) {
    const preview = document.getElementById("preview_modal");
    preview.style.display = "flex";
    const previewWrapper = document.querySelector(".preview_picture_wrapper");
    previewWrapper.setAttribute("tabindex", "0");

    // Title
    const previewTitle = document.querySelector(".preview_title");
    previewTitle.innerHTML = media.title;

    let previewPicture = document.getElementById("preview_picture");
    let previewVideo = document.getElementById("preview_video");


    if(media.image) {
        // Pictures
        const item_imgSrc = `assets/images/Sample Photos/${media.photographerId}/${media.image}`;
        previewPicture.setAttribute("src", item_imgSrc);
        previewPicture.setAttribute("alt", media.title);
        previewPicture.style.display = "flex";
        previewVideo.style.display = "none";
    } else if(media.video) {
         // Videos
        const vidSrc = `./assets/images/Sample%20Photos/${media.photographerId}/${media.video}`;
        let previewVideoSrc = document.createElement("source");
        previewVideoSrc.setAttribute("src", vidSrc);

        const vid = document.getElementById("preview_video");
        vid.appendChild(previewVideoSrc);

        previewVideo.style.display = "flex";
        previewPicture.style.display = "none";
    }

    let videoPlaying = false;

    function playVideo() {
        previewVideo.play()
        videoPlaying = true;
    }
    
    function pauseVideo() {
        previewVideo.pause()
        videoPlaying = false;
    }
    
    // Arrows 
    const arrowLeft = document.createElement("button");
    arrowLeft.classList.add("chevron_wrapper", "arrow_left");
    arrowLeft.innerHTML = `<span class="fa-solid fa-chevron-left chevron"></span>`;
    arrowLeft.setAttribute('aria-pressed', false);

    const arrowRight = document.createElement("button");
    arrowRight.classList.add("chevron_wrapper", "arrow_right");
    arrowRight.innerHTML = `<span class="fa-solid fa-chevron-right chevron"></span>`;
    arrowRight.setAttribute('aria-pressed', false)

    // Add elements
    previewWrapper.appendChild(arrowLeft);
    previewWrapper.appendChild(arrowRight);

    // Arrow
    const index = medias.findIndex((element) => element.id === media.id);

    let previousMedia = medias[index - 1];
    let nextMedia = medias[index + 1];

    if (index == 0) {
        previousMedia = medias[medias.length - 1];
        nextMedia = medias[index + 1];
    } else if(index == medias.length -1) {
        nextMedia = medias[0];
        previousMedia = medias[index - 1];
    }
    
    arrowLeft.addEventListener('click', () => {
        openPreview(previousMedia, medias);
    });

    arrowRight.addEventListener('click', function() { 
        openPreview(nextMedia, medias);
    });

    document.onkeydown = checkKey;

    function checkKey(e) {
        if (e.keyCode == '37') {
            openPreview(previousMedia, medias);
        } else if (e.keyCode == '39') {
            openPreview(nextMedia, medias);
        } else if (e.keyCode == '27') {
            closePreview();
        } else if (e.keyCode == '32') {
            if (videoPlaying == false) {
                playVideo();
            } else if (videoPlaying == true) {
                pauseVideo();
            }
        }
    }
};

getData(id).then(
    data => {
        displayGallery(data.medias)
    }
)


