function photographerTemplate(data) {
    const { name, portrait, city, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const description = document.createElement( 'div' );
        description.classList.add('description_wrapper');

        const cityName = document.createElement( 'span' );
        cityName.textContent = city;
        cityName.classList.add('city_name')

        const taglineContent = document.createElement( 'span' );
        taglineContent.textContent = tagline;
        taglineContent.classList.add('tagline_content')

        const priceValue = document.createElement( 'span' );
        priceValue.textContent = price + "€/jour";
        priceValue.classList.add('price_value')

        description.appendChild(cityName);
        description.appendChild(taglineContent);
        description.appendChild(priceValue);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(description);
        return (article);
    }
    return { name, picture, city, tagline, price, getUserCardDOM }
}