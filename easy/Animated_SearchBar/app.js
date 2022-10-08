const search = document.getElementById('search-icon');
const input = document.getElementById('input');

search.addEventListener('click', () => {
    input.style.width = '85%';
    input.style.paddingLeft = '60px';
    input.focus()
    input.style.cursor = 'text'
    input.setAttribute('placeholder', 'Start your search')
})
