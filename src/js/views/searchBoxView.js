class SearchBoxView {
  constructor(searchHandler) {
    this.searchbox = document.querySelector('#searchbox');

    this._bindSearchHandler(searchHandler);
  }

  _bindSearchHandler(handler) {
    this.searchbox.addEventListener('keyup', e => {
      handler(e.target.value);
    });
  }
}

export default SearchBoxView;
