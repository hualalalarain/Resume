// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Timeline toggle (click + keyboard)
const items = Array.from(document.querySelectorAll('.timeline-item'));
items.forEach(item => {
  const toggle = () => {
    const expanded = item.getAttribute('aria-expanded') === 'true';
    // collapse others for a cleaner UX
    items.forEach(i => i.setAttribute('aria-expanded', 'false'));
    item.setAttribute('aria-expanded', String(!expanded));
    // ensure item in view when opened
    if (!expanded) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  item.addEventListener('click', e => {
    // avoid toggling when clicking inside links in details
    if (!(e.target instanceof HTMLAnchorElement)) toggle();
  });

  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
    // Up/Down arrow navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items[items.indexOf(item) + 1];
      if (next) next.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = items[items.indexOf(item) - 1];
      if (prev) prev.focus();
    }
  });
});

// Year range filtering
const fromEl = document.getElementById('from-year');
const toEl = document.getElementById('to-year');
const applyBtn = document.getElementById('apply-filter');
const clearBtn = document.getElementById('clear-filter');

function applyFilter(){
  const from = parseInt(fromEl.value, 10);
  const to = parseInt(toEl.value, 10);
  items.forEach(li => {
    const year = parseInt(li.dataset.year, 10);
    const show =
      (!Number.isFinite(from) || year >= from) &&
      (!Number.isFinite(to) || year <= to);
    li.style.display = show ? '' : 'none';
  });
}

function clearFilter(){
  fromEl.value = '';
  toEl.value = '';
  items.forEach(li => li.style.display = '');
}

applyBtn.addEventListener('click', applyFilter);
clearBtn.addEventListener('click', clearFilter);

// Optional: initialize first item expanded for better affordance
if (items[0]) items[0].setAttribute('aria-expanded', 'true');