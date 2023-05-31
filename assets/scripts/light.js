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
