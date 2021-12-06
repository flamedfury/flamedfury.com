function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


// yesterwebring
const DATA_FOR_WEBRING = `https://miau.sadgrl.online/yesterweb-ring/webring.json`;

const yesterwebTemplate = document.createElement("template");
yesterwebTemplate.innerHTML = `
<style>
.webring {
  font-weight: bold;
  font-size: 1rem;
  text-decoration:(--link-decoration);
  font-family:var(--link-family);
  color:var(--f-text-primary);
}

#copy a {
color:var(--c-link-primary);
font-size: 1rem;
text-decoration:var(--link-decoration);
font-family:var(--f-serif);
}

#copy a:hover {
  color:var(--c-link-secondary);
}
</style>

<div class="webring">
  <div class="icon"></div>
  <div id="copy">

  </div>
  <div class="icon"></div>
</div>`;

class WebRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(yesterwebTemplate.content.cloneNode(true));

    // e.g. https://css-tricks.com
    const thisSite = this.getAttribute("site");

    fetch(DATA_FOR_WEBRING)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.url === thisSite
        );

        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length - 1) nextSiteIndex = 0;

        //console.log("sites[0].url is " + sites[0].url);
        //console.log("matchedSite.url is " + matchedSite.url);
        //console.log("matchedSite.name is " + matchedSite.name);
        //console.log(sites[0].url);

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `<p class="nav">

            <a href="${sites[prevSiteIndex].url}">&lt;&lt;</a>
            <a href="https://yesterweb.neocities.org/webring/">Yesterweb</a>:<a href="${sites[randomSiteIndex].url}">?</a>
            <a href="${sites[nextSiteIndex].url}">&gt;&gt;</a>
          </p>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("webring-css", WebRing);

        // Get HTML head element
        var head = document.getElementsByTagName('HEAD')[0];

        // Create new link Element
        var link = document.createElement('link');

        // set the attributes for link element
        link.rel = 'stylesheet';

        link.type = 'text/css';

        link.href = 'https://yesterwebring.neocities.org/yesterweb.css';

        // Append link element to HTML head
        head.appendChild(link);