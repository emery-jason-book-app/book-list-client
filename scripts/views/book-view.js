'use strict';

var app = app || {};

(function(module){ //wrapping all function is IFFE

  const bookView = {};

  function show(section){
    $('section').not(`#${section}`).hide();
    $(`#${section}`).show();
  }

  bookView.initIndexPage = function(ctx) {
    console.log('index');
    $('#items ul').empty();
    show('items');
    // show('add');
    app.Book.all.forEach(book =>
      $('#items ul').append(book.toHtml())
    );
  };

  bookView.initBookPage = function(ctx){

    $('#book').empty();
    show('book');
    // app.Book.all.forEach(book => {
    //   if(parseInt(book.id) === parseInt(ctx.params.id)){
    //     $('#book').append(book.detailToHtml());
    //   }
    // });
    let template = Handlebars.compile($('#book-detail-template').text());
    $('#book').append(template(ctx));
  };

  bookView.initCreateFormPage = function() {
    console.log('I come from the create view');

    $('create-form').empty();
    show('create-view');
    $('create-form').on('submit', function(e){
      e.preventDefault();

      let book = {
        title: e.target.title.value,
        author: e.target.author.value,
        isbn: e.target.isbn.value,
        image_url: e.target.image_url.value,
        description: e.target.description.value,
      };
      module.Book.create(book);
    });
  };


  // $('#add-form').on('submit', createNewBook);
  // function createNewBook(e){
  //   e.preventDefault();

  //   let book = {
  //     title: e.target.title.value,
  //     author: e.target.author.value,
  //     isbn: e.target.isbn.value,
  //     image_url: e.target.image_url.value,
  //     description: e.target.description.value
  //   };

  //   $.post(`${ENV.apiUrl}/api/v1/books`, book)
  //     .then(app.Book.fetchAll(bookView.initIndexPage))
  //     .catch(console.error);
  // }

  module.bookView = bookView;

})(app);