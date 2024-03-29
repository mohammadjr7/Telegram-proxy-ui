const CONTAINER = document.getElementById("container");
const URL = "https://raw.githubusercontent.com/hookzof/socks5_list/master/tg/mtproto.json"

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>`;
const sunIcon = `<!-- https://feathericons.dev/?search=sun&iconset=feather -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
  <circle cx="12" cy="12" r="5" />
  <line x1="12" x2="12" y1="1" y2="3" />
  <line x1="12" x2="12" y1="21" y2="23" />
  <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
  <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
  <line x1="1" x2="3" y1="12" y2="12" />
  <line x1="21" x2="23" y1="12" y2="12" />
  <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
  <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
</svg>`;

var proxies = "";
var html = "";
var theme = "light";


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
<div class="card" id="card">
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
    <button id="btn-${i}"  onclick="copyToClipboard('https://t.me/proxy?server=${proxies[i]['host']}&port=${proxies[i]['port']}&secret=${proxies[i]['secret']}', ${i})" class="btn btn-full">Copy to clipboard</button>
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

function changeTheme() {
    if (theme == "light") {

        body = document.getElementById("body");
        body.classList.add("body-dark");
        
        header = document.getElementById("header");
        header.classList.add("header-dark");

        notification = document.getElementById("notification");
        notification.classList.add("notification-dark");

        footer = document.getElementById("footer");
        footer.classList.add("footer-dark");

        cards = document.querySelectorAll("#card")
        cards.forEach(element => {
            element.classList.add("card-dark")
        });

        
        btns = document.querySelectorAll(".btn")
        btns.forEach(element => {
            if (!element.classList.contains("btn-primary")) {
                element.classList.add("btn-dark")
            }
        });

        changeThemeBtn = document.getElementById("changeThemeBtn");
        changeThemeBtn.innerHTML = sunIcon;

        theme = "dark";
    } else {
        body = document.getElementById("body");
        body.classList.remove("body-dark");

        header = document.getElementById("header");
        header.classList.remove("header-dark");
        
        notification = document.getElementById("notification");
        notification.classList.remove("notification-dark");
        
        footer = document.getElementById("footer");
        footer.classList.remove("footer-dark");

        
        cards = document.querySelectorAll("#card")
        cards.forEach(element => {
            element.classList.remove("card-dark")
        });

        btns = document.querySelectorAll(".btn")
        btns.forEach(element => {
            if (!element.classList.contains("btn-primary")) {
                element.classList.remove("btn-dark")
            }
        });

        changeThemeBtn = document.getElementById("changeThemeBtn");
        changeThemeBtn.innerHTML = moonIcon;

        theme = "light";
    }
}