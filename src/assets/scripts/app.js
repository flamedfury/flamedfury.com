// ------------------- cards redundant click, accessible whole card clickable solution by Heydon Pickering

// const cards = [...document.querySelectorAll('.card')];
// cards.forEach(card => {
//   card.style.cursor = 'pointer';
//   let down,
//     up,
//     link = card.querySelector('a');
//   card.onmousedown = () => (down = +new Date());
//   card.onmouseup = () => {
//     up = +new Date();
//     if (up - down < 200) {
//       link.click();
//     }
//   };
// });

const cards = document.querySelectorAll('.card');
Array.prototype.forEach.call(cards, card => {
  let down,
    up,
    link = card.querySelector(':is(h1, h2, h3, h4, h5, h6) a');
  card.style.cursor = 'pointer';
  card.onmousedown = () => (down = +new Date());
  card.onmouseup = () => {
    up = +new Date();
    if (up - down < 200) {
      link.click();
    }
  };
});

// ------------------- responsive accessible nav

const nav = document.querySelector('nav');
const list = nav.querySelector('ul');
const burgerClone = document.querySelector('#burger-template').content.cloneNode(true);
const svg = nav.querySelector('svg');

const button = burgerClone.querySelector('button');
button.addEventListener('click', e => {
  const isOpen = button.getAttribute('aria-expanded') === 'false';
  button.setAttribute('aria-expanded', isOpen);
});

// avoid DRY: disabling menu
const disableMenu = () => {
  button.setAttribute('aria-expanded', false);
  button.focus();
};

//  close on escape
nav.addEventListener('keyup', e => {
  if (e.code === 'Escape') {
    disableMenu();
  }
});

// close if clicked outside of event target
document.addEventListener('click', e => {
  const isClickInsideElement = nav.contains(e.target);
  if (!isClickInsideElement) {
    disableMenu();
  }
});

nav.insertBefore(burgerClone, list);

// ----- masonry fallback if CSS masonry not supported, solution by Ana Tudor: https://codepen.io/thebabydino/pen/yLYppjK
// ----- jacked from https://github.com/madrilene/lenesaile.com/blob/fe1bd383eeb3f1377ac621b1c743581a2bcda71a/src/assets/scripts/app.js#L20-L76
// ----- enable the layout.css.grid-template-masonry-value.enabled flag in about:config

const supportMasonry = CSS.supports('grid-template-rows', 'masonry');

if (!supportMasonry) {
  let grids = [...document.querySelectorAll('.grid[data-rows="masonry"]')];

  if (grids.length && getComputedStyle(grids[0]).gridTemplateRows !== 'masonry') {
    grids = grids.map(grid => ({
      _el: grid,
      gap: parseFloat(getComputedStyle(grid).gridRowGap),
      items: [...grid.childNodes]
        .filter(c => c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1)
        .map(c => ({_el: c})),
      ncol: 0
    }));

    function layout() {
      grids.forEach(grid => {
        /* get the post relayout number of columns */
        let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;

        /* if the number of columns has changed */
        if (grid.ncol !== ncol) {
          /* update number of columns */
          grid.ncol = ncol;

          /* revert to initial positioning, no margin */
          grid.items.forEach(c => c._el.style.removeProperty('margin-top'));

          /* if we have more than one column */
          if (grid.ncol > 1) {
            grid.items.slice(ncol).forEach((c, i) => {
              let prev_fin =
                  grid.items[i]._el.getBoundingClientRect()
                    .bottom /* bottom edge of item above */,
                curr_ini =
                  c._el.getBoundingClientRect().top; /* top edge of current item */

              c._el.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
            });
          }
        }
      });
    }

    addEventListener(
      'load',
      e => {
        layout(); /* initial load */
        addEventListener('resize', layout, false); /* on resize */
      },
      false
    );
  }
}
