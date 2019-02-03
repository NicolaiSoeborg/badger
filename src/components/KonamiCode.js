// From https://gist.github.com/JackNUMBER/0d62c20b34d082063ae2
let user_keys = [];
document.onkeydown = function(e) {
    user_keys.push(e.keyCode);
    if (user_keys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
        
        // Very modified from https://gist.github.com/devn/5007287
        (function () {
            function strobeLight() {
                var e = document.createElement("div");
                e.setAttribute("class", "mw-strobe_light");
                document.body.appendChild(e);
                setTimeout(function () {
                    document.body.removeChild(e);
                }, 100);
            }
            function hasGoodSize(i) {
                var s = { height: i.offsetHeight, width: i.offsetWidth };
                return s.height > e && s.height < n && s.width > t && s.width < r;
            }
            function elmOffset(e) {
                var t = e;
                var n = 0;
                while ( !! t) {
                    n += t.offsetTop;
                    t = t.offsetParent;
                }
                return n;
            }
            function bottomHeight() {
                var e = document.documentElement;
                if ( window.innerWidth) { return window.innerHeight; }
                else if (e && !isNaN(e.clientHeight)) { return e.clientHeight; }
                return 0;
            }
            function isVisible(e) {
                const t = elmOffset(e);
                return t >= window.pageYOffset && t <= bottomHeight() + window.pageYOffset;
            }
            function run() {
                /*var e = document.createElement("audio");
                e.setAttribute("class", "mw_added_css");
                e.src = "https://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";
                e.loop = false;*/
                var e = document.getElementById("harlem");
                e.addEventListener("canplay", function () {
                    setTimeout(function () {
                        startingElm.classList.add("mw-harlem_shake_me", "im_first");
                    }, 500);
                    setTimeout(function () {
                        cleanup();
                        strobeLight();
                        [...document.getElementsByTagName("*")]
                            .filter(elm => hasGoodSize(elm) || Math.random() <= 0.3)
                            .forEach(element => {
                                shakeElm(element);
                            });
                    }, 15500);
                }, true);
                e.addEventListener("ended", function () {
                    cleanup();
                    [...document.body.getElementsByClassName("mw_added_css")].forEach(element => {
                        document.body.removeChild(element);
                    });    
                }, true);
                document.body.appendChild(e);
                e.play();
            }
            function shakeElm(e) {
                const u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
                e.classList.add("mw-harlem_shake_me", u[Math.floor(Math.random() * u.length)]);
            }
            function cleanup() {
                [...document.getElementsByClassName("mw-harlem_shake_me")].forEach(element => {
                    element.classList.remove("mw-harlem_shake_me");
                });
            }
            const e = 20,
                n = 350,
                t = 20,
                r = 350;
            const startingElm = [...document.getElementsByTagName("*")]
                .filter(elm => hasGoodSize(elm) && isVisible(elm))[0];

            run();
        })();

        user_keys = [];
    }
    if (user_keys.length > 1000) user_keys = [];
};
