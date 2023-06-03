const CONTAINER = document.getElementById("container-light");
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


      counter = 0;

    for (let i = 100; i < proxies.length / 4.5; i++) {
    
        let htmlSegment = `
        <a class="light-item" href="https://t.me/proxy?server=${proxies[i]['host']}&port=${proxies[i]['port']}&secret=${proxies[i]['secret']}"> ${getFlagEmoji(proxies[i]['country'])} https://t.me/proxy?server=${proxies[i]['host']}&port=${proxies[i]['port']}&secret=${proxies[i]['secret']}</a>
        <br>
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


function copyAll() {
  let btn = document.getElementById("copy-all-btn")
  let text = CONTAINER.innerText;

  if (text.length > 0) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Proxy copied to clipboard.');
      /* Resolved - text copied to clipboard successfully */
      btn.innerText = "COPIED!";
    },() => {
      console.error('Failed to cop the proxy.');
      /* Rejected - text failed to copy to the clipboard */
      btn.innerText = "FAILED!";
    });
  } else {
    btn.innerText = "Nothing to copy!";
  }


    setTimeout(()=> {
      btn.innerText = "Copy to clipboard"
    }, 5000)
}


function selectAll() {
  var range = document.createRange();
  range.selectNode(CONTAINER);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
}