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

                const preview = document.getElementById("preview_modal");
                preview.style.display = "flex";

                let previewPicture = document.getElementById("preview_picture");
                previewPicture.style.display = "flex";
                previewPicture.setAttribute("src", item_imgSrc);

                const previewTitle = document.querySelector(".preview_title");
                previewTitle.innerHTML = media.title;

                let previewVideo = document.getElementById("preview_video");
                previewVideo.style.display = "none";

                // Find Key value

                const previewPictureArray = Array.from(medias, (media) => media.image);
                const previewTitleArray = Array.from(medias, (media) => media.title);

                let currentPictureKey = media.image;
                let currentTitleKey = media.title;

                console.log(previewTitleArray)

                function getKeyByValue(object, value) {
                    return Object.keys(object).find(key =>
                        object[key] === value);
                }
                 
                pictureKey = getKeyByValue(previewPictureArray, currentPictureKey);
                titleKey = getKeyByValue(previewTitleArray, currentTitleKey);

                // Change preview src

                let arrowLeft = document.querySelector(".arrow_left");
                let arrowRight = document.querySelector(".arrow_right");

                i = pictureKey;
                y = titleKey;
                
                arrowLeft.addEventListener('click', function() { 
                    i --;
                    y --;

                    if (i < 0, y < 0) {
                        i = previewPictureArray.length - 1;
                        y = previewTitleArray.length - 1;
                    }

                    previewPicture.setAttribute("src", `assets/images/Sample Photos/${media.photographerId}/${previewPictureArray[i]}`);

                    previewTitle.innerHTML = `${previewTitleArray[y]}`;
                });

                arrowRight.addEventListener('click', function() { 
                    i ++;
                    y ++;

                    if (i > previewPictureArray.length - 1, y > previewTitleArray.length - 1) {
                        i = 0;
                        y = 0
                    }

                    previewPicture.setAttribute("src", `assets/images/Sample Photos/${media.photographerId}/${previewPictureArray[i]}`);

                    previewTitle.innerHTML = `${previewTitleArray[y]}`;
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
}

// Display Preview Gallery

function closePreview() {
    const preview = document.getElementById("preview_modal");
    preview.style.display = "none";
}

getData(id).then(
    data => {
        displayGallery(data.medias)
    }
)


