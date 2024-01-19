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

    const byLikes = document.getElementById("sortByLikes");
    byLikes.addEventListener("click", () => sortByLikes(medias));

    const byDates = document.querySelector("#sortByDates");
    byDates.addEventListener("click", () => sortByDates(medias));

    const byTitles = document.querySelector("#sortByTitles");
    byTitles.addEventListener("click", () => sortByTitles(medias));
}

getData(id).then(
    data => {
        sortGallery(data.medias)
    }
)