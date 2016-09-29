$app = $('#app');

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Handlebars template loader
 * - - - - - - - - - - - - - - - - - - - - - - - - - - */
Handlebars.getTemplate = function(name, callback) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.get('views/' + name + '.hbs')
            .done(function(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
                callback(Handlebars.templates[name]);
            })
            .fail(function() {
                callback(Handlebars.compile('<h1>Error</h1>'));
            });
    } else {
        callback(Handlebars.templates[name]);
    }
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Router configuration
 * - - - - - - - - - - - - - - - - - - - - - - - - - - */
var r = Rlite();
r.add('', function () {
    setAppTitle('Home')
    renderTemplate('home');
});
r.add(':realm/:guild', function (r) {
    setAppTitle(r.params.guild + " - " + r.params.realm);
    renderTemplate('guildoverview', { guild: r.params.guild, realm: r.params.realm });
});

function processHash() {
    var hash = location.hash || '#';
    r.run(hash.slice(1));
}

window.addEventListener('hashchange', processHash);
processHash();

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Helper functions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setAppTitle(siteTitle) {
    var appTitle = "Guild GearScore";
    if (!isNullOrEmpty(siteTitle)) {
        document.title = siteTitle + " - "+ appTitle;
    } else {
        document.title = appTitle;
    }
}

function isNullOrEmpty(input) {
    if (typeof input === "string" && input.trim().length > 0) {
        return false;
    }
    return true;
}

function renderTemplate(template, context) {
    Handlebars.getTemplate(template, function(compiledTemplate) {
        $app.html(compiledTemplate(context));
    });
}