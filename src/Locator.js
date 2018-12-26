'use strict';

const request = async url => new Promise((resolve, reject) => {
    require('https')
        .get(url, response => {
            let body = '';
            response.on('data', (d) => body += d);
            response.on('end', () => resolve(body));
        })
        .on('error', (error) => {
            resolve = () => {};
            reject(error);
        });
});

const search = async term => {
    let html = await request('https://plugins.jetbrains.com/search?correctionAllowed=true&pr=&search=' + encodeURIComponent(term));
    if (!html) return [];
    
    let results = [];
    
    for (let a of html.split(/<a\s+href\s*=\s*["']\s*\/plugin\//).slice(1)) {
        let m = a.match(/^\d+-[^"']+/);
        if (!m) continue;
        results.push(m[0]);
    }
    
    return results;
}

const locate = async plugin => {
    let html = await request('https://plugins.jetbrains.com/plugin/' + plugin);
    if (!html || html.match(/<title\s*>[^<]*404[^<]*not\s*found[^<]*<\/title\s*>/i)) throw new Error('Plugin main URL not found: ' + 'https://plugins.jetbrains.com/plugin/' + plugin);
    
    let m = html.match(/\/plugin\/download\?updateId=(\d+)[^"']*&pluginId=(\d+)/);
    if (!m) throw new Error('Plugin download URL not found.');
    
    let meta = {key: plugin, url: 'https://plugins.jetbrains.com/plugin/' + plugin, update: parseInt(m[1])};
    let url = 'https://plugins.jetbrains.com/plugin/' + plugin + '/update/' + meta.update;
    
    html = await request(url);
    if (!html || html.match(/<title\s*>[^<]*404[^<]*not\s*found[^<]*<\/title\s*>/i)) throw new Error('Plugin update URL not found: ' + url);
    
    html = (html.split(/js-tooltip-xml-id/i)[1] || '').split(/<\/aside\s*>/i)[0] || '';
    if (!html) throw new Error('Plugin XML info not found: ' + url);
    
    m = html.match(/data-target\s*=\s*["']([^"']+)["']/i);
    if (!m) throw new Error('Cannot parse plugin meta info (id): ' + url);
    meta.id = m[1];
    
    m = html.match(/data-test\s*=\s*["']update-version["'][^>]*>([^<]+)<\//i);
    if (!m) throw new Error('Cannot parse plugin meta info (version): ' + url);
    meta.version = m[1];
    
    m = html.match(/data-test\s*=\s*["']since-build["'][^>]*>[\s\S]*?(\d+\.\d+)/i);
    if (!m) throw new Error('Cannot parse plugin meta info (since): ' + url);
    meta.since = m[1];
    
    m = html.match(/data-test\s*=\s*["']until-build["'][^>]*>[\s\S]*?(\d+\.\d+)/i);
    if (!m) throw new Error('Cannot parse plugin meta info (until): ' + url);
    meta.until = m[1];
    
    m = html.match(/size:[^<]*[\s\S]*?([\d,]+)\s+bytes/i);
    if (!m) throw new Error('Cannot parse plugin meta info (size): ' + url);
    meta.size = parseInt(m[1].replace(/[^\d]/g, ''));
    
    m = html.match(/date:[^<]*[\s\S]*?([A-Z][a-z]+ \d+,\s+\d+)[^\d]/i);
    if (!m) throw new Error('Cannot parse plugin meta info (date): ' + url);
    meta.date = m[1];
    
    m = html.match(/href\s*=\s*"\/author\/([^"']+)["'][^>]*>([^<]+)<\//i);
    if (!m) throw new Error('Cannot parse plugin meta info (author): ' + url);
    meta.author = {name: m[2], key: m[1]};
    
    return meta;
}

const searchLocate = async (term, count = 1) => {
    let results = await search(term);
    
    let final = [];
    for (let i = 0; i < count && results.length; i ++) {
        final.push(await locate(results.shift()))
    }
    
    return final;
}


module.exports.search = search;
module.exports.locate = locate;
module.exports.searchLocate = searchLocate;
