//cwkTODO move this code to random-pokemon package
(function () {
    var pokemonApiBasePath = "http://pokeapi.co";

    var getUrl = function (url, callback) {
            var request = new XMLHttpRequest();
            request.onload = callback;
            request.open("GET", url);
            request.responseType = "json";
            request.send();
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

    var getRandomNumberInRangeInclusive = function (min, max) {
        // Ref: http://stackoverflow.com/a/7228322
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var randomPokemon = {
        getPokemon: function (id, callback, spriteCallback) {
            var url = pokemonApiBasePath + "/api/v2/pokemon/" + id;
            getUrl(url, function (e) {
                var pokemon = e.currentTarget.response;

                if (callback) {
                    callback(pokemon);
                }

                getPokemonSprite(id, spriteCallback);
            });
        },

        getRandomPokemonNumber: function () {
            // Pokemon API goes from 1 - 721 (Volcanion)
            //cwkTODO get this programmatically
            return getRandomNumberInRangeInclusive(1, 721);
        }
    };

    window.randomPokemon = randomPokemon;
})();
