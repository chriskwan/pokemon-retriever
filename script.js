(function () {
    var pokemonNumElement = document.getElementById("pokemon-number");
    var goBtn = document.getElementById("go-btn");
    var randomBtn = document.getElementById("random-btn");

    var loadingMessageElement = document.getElementById("loading-message");
    var pokemonImageElement = document.getElementById("pokemon-image");
    var pokemonNameElement = document.getElementById("pokemon-name");

    var updatePokemonImage = function (pokemonSpriteUrl) {
        pokemonImageElement.src = pokemonSpriteUrl;

        loadingMessageElement.style.display = "none";
        pokemonNameElement.style.display = "block";
    };

    var capitalize = function (word) {
        if (!word || !word.length) {
            return "";
        }
        return word[0].toUpperCase() + word.slice(1);
    };

    var showPokeballAnimation = function () {
        // Source: http://orig09.deviantart.net/cd96/f/2014/102/8/c/pokeball_wub_by_rockehjamaa-d7e6km8.gif
        pokemonImageElement.src = "http://orig09.deviantart.net/cd96/f/2014/102/8/c/pokeball_wub_by_rockehjamaa-d7e6km8.gif";
    };

    var showLoadingTitle = function () {
        loadingMessageElement.style.display = "block";
        pokemonNameElement.style.display = "none";
    };

    var showLoadingAnimation = function () {
        showLoadingTitle();
        showPokeballAnimation();
    };

    var updatePokemonName = function (pokemon) {
        pokemonNameElement.innerText = capitalize(pokemon.name) + " #" + pokemon.id;
    };

    var getPokemonAndUpdateUI = function (number) {
        showLoadingAnimation();
        randomPokemon.getPokemon(number, updatePokemonName, updatePokemonImage);
    };

    var setupUI = function () {
        goBtn.onclick = function () {
            getPokemonAndUpdateUI(pokemonNumElement.value);
        };

        randomBtn.onclick = function () {
            var num = randomPokemon.getRandomPokemonNumber();
            pokemonNumElement.value = num;
            getPokemonAndUpdateUI(num);
        };
    };

    setupUI();

    getPokemonAndUpdateUI(pokemonNumElement.value);
})();
