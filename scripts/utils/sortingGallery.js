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
}

function sortGallery(medias) { 

    function keyBoardSBL(e) {
        if (e.keyCode == '13') {
            sortByLikes(medias);
        }
    }
    
    function keyBoardSBD(e) {
        if (e.keyCode == '13') {
            sortByDates(medias);
        }
    }
    
    function keyBoardSBT(e) {
        if (e.keyCode == '13') {
            sortByTitles(medias);
        }
    }

    const byLikes = document.getElementById("sortByLikes");
    byLikes.addEventListener("click", () => sortByLikes(medias));
    byLikes.onkeydown = keyBoardSBL;

    const byDates = document.querySelector("#sortByDates");
    byDates.addEventListener("click", () => sortByDates(medias));
    byDates.onkeydown = keyBoardSBD;

    const byTitles = document.querySelector("#sortByTitles");
    byTitles.addEventListener("click", () => sortByTitles(medias));
    byTitles.onkeydown = keyBoardSBT;
}

getData(id).then(
    data => {
        sortGallery(data.medias)
    }
)