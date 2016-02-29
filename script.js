(function () {
    var pokemonApiBasePath = "http://pokeapi.co";

    var getUrl = function (url, callback) {
        var request = new XMLHttpRequest();
        request.onload = callback;
        request.open("GET", url);
        request.responseType = "json";
        request.send();
    }

    var getPokemonSprite = function (id) {
        // sprites are not in pokemon api v2 yet:
        // https://github.com/phalt/pokeapi/issues/80
        var url = pokemonApiBasePath + "/api/v1/pokemon/" + id;
        getUrl(url, function (e) {
            var pokemon = e.currentTarget.response;
            if (pokemon.sprites && pokemon.sprites.length) {
                var spriteUrl = pokemonApiBasePath + pokemon.sprites[0].resource_uri;
                getUrl(spriteUrl, function (e) {
                    var sprite = e.currentTarget.response;
                    var pokemonImageElement = document.getElementById("pokemon-image");
                    pokemonImageElement.src = pokemonApiBasePath + sprite.image;
                });
            }
        });
    };

    var capitalize = function (word) {
        if (!word || !word.length) {
            return "";
        }
        return word[0].toUpperCase() + word.slice(1);
    }

    var getPokemon = function (id) {
        var url = pokemonApiBasePath + "/api/v2/pokemon/" + id;
        getUrl(url, function (e) {
            var pokemon = e.currentTarget.response;
            var pokemonNameElement = document.getElementById("pokemon-name");
            pokemonNameElement.innerText = capitalize(pokemon.name) + " #" + pokemon.id;

            getPokemonSprite(id);
        });
    };

    var setupUI = function () {
        var pokemonNumElement = document.getElementById("pokemon-number");
        var goBtn = document.getElementById("go-btn");

        goBtn.onclick = function () {
            getPokemon(pokemonNumElement.value);
        };
    };

    setupUI();
})();
