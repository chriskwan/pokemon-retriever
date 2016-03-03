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

    var updatePokemonImage = function (pokemonSpriteUrl) {
        pokemonImageElement.src = pokemonSpriteUrl;

        loadingMessageElement.style.display = "none";
        pokemonNameElement.style.display = "block";
    };

    var getPokemonSprite = function (id, callback) {
        //cwkTODO update this to v2 now that sprites are supported!
        // https://github.com/phalt/pokeapi/issues/80
        var url = pokemonApiBasePath + "/api/v1/pokemon/" + id;
        getUrl(url, function (e) {
            var pokemon = e.currentTarget.response;
            if (pokemon.sprites && pokemon.sprites.length) {
                var spriteUrl = pokemonApiBasePath + pokemon.sprites[0].resource_uri;
                getUrl(spriteUrl, function (e) {
                    var sprite = e.currentTarget.response;

                    if (callback) {
                        callback(pokemonApiBasePath + sprite.image);
                    }
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

    var updatePokemonName = function (pokemon) {
        pokemonNameElement.innerText = capitalize(pokemon.name) + " #" + pokemon.id;
    };

    var getPokemon = function (id, callback, spriteCallback) {
        var url = pokemonApiBasePath + "/api/v2/pokemon/" + id;
        getUrl(url, function (e) {
            var pokemon = e.currentTarget.response;

            if (callback) {
                callback(pokemon);
            }

            getPokemonSprite(id, spriteCallback);
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

    var getPokemonAndUpdateUI = function (number) {
        showLoadingAnimation();
        getPokemon(number, updatePokemonName, updatePokemonImage);
    };

    var setupUI = function () {
        goBtn.onclick = function () {
            getPokemonAndUpdateUI(pokemonNumElement.value);
        };

        randomBtn.onclick = function () {
            //cwkTODO move random code to random-pokemon too
            var num = getRandomPokemonNumber();
            pokemonNumElement.value = num;
            getPokemonAndUpdateUI(num);
        };
    };

    setupUI();

    getPokemonAndUpdateUI(pokemonNumElement.value);
})();
