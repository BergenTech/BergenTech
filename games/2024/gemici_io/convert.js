import fs from 'fs';
import mime from 'mime-types';

var a = `this.gameImage = loadImage('assets/css/style.css');`;

a = a.replace(/load(?:Image|Font|Sound)\(\'(.*?)\'\)/g, (match, path) => {
    var file = fs.readFileSync(path);
    return match.replace(path, `data:${mime.lookup(path)};base64,` + Buffer.from(file).toString('base64'));
});

fs.writeFileSync('./converted.js', a)