/* tag dom id */
const searchbtn = document.getElementById('search-button')
const searchFiled = document.getElementById('search-field');
const bookContainer = document.getElementById('book-container');
const searchDataCount = document.getElementById('data-count');
const searchError = document.getElementById('sesrch-error');

/* Add event handeler */
searchbtn.addEventListener('click', function () {
    const search = searchFiled.value;

    /* search value clear */
    searchFiled.value = '';

    /* search books data fetch */
    const url = `http://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayShow(data.docs))
});

/* Display show books data */
const displayShow = books => {

    /* Result Error Handling */
    if (books.length === 0) {
        searchError.innerHTML = `<h2 class= "fw-bold text-center text-danger my-5">Not Result Found</h2>`;
        searchDataCount.innerHTML = '';
    }
    else {
        searchError.innerHTML = '';
    };
    /* data dom clear */
    bookContainer.textContent = '';

    /* Loop run to get data */
    books.forEach(book => {
        console.log(book);

        /* data result count */
        searchDataCount.innerHTML = `
        <h5 class="fw-bold">Search Books Found: ${books.length}</h5>`;

        /* data is added to the container */
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img class: "img-fluid" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid"">
            <div class="card-body">
                <h5 class="card-title fw-bold">Name: ${book.title}</h5>
                <p>Publisher: ${book.publisher ? book.publisher: 'Not found'}</p>
                <p>Author Name: ${book.author_name ? book.author_name: 'Not found'}</p>
                <p>First publish year: ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
    })

};