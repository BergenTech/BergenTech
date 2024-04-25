export default new Promise((resolve, reject) => {
    let loaded = 0;

    for (var src of [
        'p5/p5.min.js',
        'p5/addons/p5.sound.min.js'
    ]) {
        document.head.appendChild(Object.assign(document.createElement("script"), {
            src,
            async: false,
            onload: () => {
                loaded ++;

                if (loaded === 2) {
                    resolve();
                }
            }
        }));
    }
})