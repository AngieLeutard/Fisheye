
  async function getPhotographers() {
        const response = await fetch("photographers.json")
        let photographers = await response.json()
        console.log(photographers)
        return ({
            photographers: [...photographers.photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
