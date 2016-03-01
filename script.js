(function () {
    var pokemonApiBasePath = "http://pokeapi.co";

    var pokemonNumElement = document.getElementById("pokemon-number");
    var goBtn = document.getElementById("go-btn");
    var randomBtn = document.getElementById("random-btn");

    var loadingMessageElement = document.getElementById("loading-message");
    var pokemonImageElement = document.getElementById("pokemon-image");
    var pokemonNameElement = document.getElementById("pokemon-name");

    var getUrl = function (url, callback) {
        var request = new XMLHttpRequest();
        request.onload = callback;
        request.open("GET", url);
        request.responseType = "json";
        request.send();
    }

    var getPokemonSprite = function (id) {
        //cwkTODO this might not support all pokemon that v2 api supports

        // sprites are not in pokemon api v2 yet:
        // https://github.com/phalt/pokeapi/issues/80
        var url = pokemonApiBasePath + "/api/v1/pokemon/" + id;
        getUrl(url, function (e) {
            var pokemon = e.currentTarget.response;
            if (pokemon.sprites && pokemon.sprites.length) {
                var spriteUrl = pokemonApiBasePath + pokemon.sprites[0].resource_uri;
                getUrl(spriteUrl, function (e) {
                    var sprite = e.currentTarget.response;
                    pokemonImageElement.src = pokemonApiBasePath + sprite.image;

                    loadingMessageElement.style.display = "none";
                    pokemonNameElement.style.display = "block";
                });
            }
        });
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

    var getPokemon = function (id) {
        showLoadingAnimation();

        var url = pokemonApiBasePath + "/api/v2/pokemon/" + id;
        getUrl(url, function (e) {
            var pokemon = e.currentTarget.response;
            pokemonNameElement.innerText = capitalize(pokemon.name) + " #" + pokemon.id;

            getPokemonSprite(id);
        });
    };

    var getRandomNumberInRangeInclusive = function (min, max) {
        // Ref: http://stackoverflow.com/a/7228322
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var getRandomPokemonNumber = function () {
        // Pokemon API goes from 1 - 721 (Volcanion)
        //cwkTODO get this programmatically
        return getRandomNumberInRangeInclusive(1, 721);
    };

    var setupUI = function () {
        goBtn.onclick = function () {
            getPokemon(pokemonNumElement.value);
        };

        randomBtn.onclick = function () {
            var num = getRandomPokemonNumber();
            pokemonNumElement.value = num;
            getPokemon(num);
        };
    };

    setupUI();
    getPokemon(pokemonNumElement.value);
})();
