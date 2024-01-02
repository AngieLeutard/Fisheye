function photographerTemplate(data) {
    const { name, portrait, city, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const pageLink = `photographer.html?id=${id}`;

    function getUserCardDOM() {

        const link = document.createElement( 'a' );
        link.setAttribute("href", pageLink);

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
        priceValue.textContent = price + "€ / jour";
        priceValue.classList.add('price_value')

        description.appendChild(cityName);
        description.appendChild(taglineContent);
        description.appendChild(priceValue);

        link.appendChild(article);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(description);
        return (link);
    }
    return { name, picture, city, tagline, price, getUserCardDOM }
}