const CONTAINER = document.getElementById("container");
const URL = "https://raw.githubusercontent.com/hookzof/socks5_list/master/tg/mtproto.json"
var proxies = "";
var html = "";


fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },})
   .then(response => response.json())
   .then(response => proxies = response);


setTimeout(()=> {
    proxies = proxies.sort((a, b) => {
        if (a.ping < b.ping) {
          return -1;
        }
      });


    for (let i = 50; i < 120; i++) {
    
        let htmlSegment = `
<div class="card">
<div class="card-info">
    <div class="card-emoji">
        <span id="country-emoji">${getFlagEmoji(proxies[i]['country'])}</span>
    </div>
    <div class="card-desc">
        <div class="country">
            <span>country: </span>
            <span id="country-name">${proxies[i]['country']}</span></div>
        <div class="ping">
            <span>ping: </span>
            <span id="ping-count">${proxies[i]['ping']} ms</span>
        </div>
    </div>
</div>
<div class="card-buttons">
    <a href="https://t.me/proxy?server=${proxies[i]['host']}&port=${proxies[i]['port']}&secret=${proxies[i]['secret']}" class="btn-full"><button class="btn btn-full btn-primary">CONNECT</button></a>
    <button id="btn-${i}" onclick="copyToClipboard('https://t.me/proxy?server=${proxies[i]['host']}&port=${proxies[i]['port']}&secret=${proxies[i]['secret']}', ${i})" class="btn btn-full">Copy to clipboard</button>
</div>
</div>
        `;

        html += htmlSegment;
        CONTAINER.innerHTML = html;
    }
}, 2000);

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function copyToClipboard(text, id) {
    btn = document.getElementById(`btn-${id}`)

    navigator.clipboard.writeText(text).then(() => {
        console.log('Proxy copied to clipboard.');
        /* Resolved - text copied to clipboard successfully */
        btn.innerText = "COPIED!";
      },() => {
        console.error('Failed to cop the proxy.');
        /* Rejected - text failed to copy to the clipboard */
        btn.innerText = "FAILED!";
      });


      setTimeout(()=> {
        btn.innerText = "Copy to clipboard"
      }, 5000)
  }