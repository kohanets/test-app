import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books : Book[];
  copybooks : Book[] = [];
  searchResults: Book[] = [];
  showBook : Book;
  tosearch: string;
  searchMsg :string;

  titleSortTriger: boolean ;
  authorSortTriger: boolean;
  statusSortTriger: boolean;
  ratingSortTriger: boolean;

  constructor(private bookService : BooksService) { }

  ngOnInit() {
    this.loadBooks();
  }

  open(book){
    this.showBook = book;
  }

  deleteBook(id : String){
    this.bookService.deleteBook(id)
      .subscribe( responce => {
        this.loadBooks()
      })
  }

  loadBooks(){
    this.bookService.getBooks()
      .subscribe( responce => {
        this.books = responce.json().data;
        this.copybooks = this.books;
      })
  }

  sortByTitle(){
    if (this.titleSortTriger == false){
      this.books.sort(byTitle).reverse();
      this.titleSortTriger = true;
    } else {
      this.books.sort(byTitle);
      this.resetTriger();
      this.titleSortTriger = false;
    }

    function byTitle(a,b){
      if (a.title < b.title)
        return -1;
      if (a.title > b.title)
        return 1;
      return 0;
    }
  }

  sortByAuthor(){
    if (this.authorSortTriger == false){
      this.books.sort(byAuthor).reverse();
      this.authorSortTriger = true;
    } else {
      this.books.sort(byAuthor);
      this.resetTriger();
      this.authorSortTriger = false;
    }

    function byAuthor(a,b){
      if (a.author < b.author)
        return -1;
      if (a.author > b.author)
        return 1;
      return 0;
    }
  }

  sortByStatus(){
    if (this.statusSortTriger == false){
      this.books.sort(byStatus).reverse();
      this.statusSortTriger = true;
    } else {
      this.books.sort(byStatus);
      this.resetTriger();
      this.statusSortTriger = false;
    }

    function byStatus(a,b){
      if (a.status < b.status)
        return -1;
      if (a.status > b.status)
        return 1;
      return 0;
    }
  }

  sortByRating(){
    if (this.ratingSortTriger == false){
      this.books.sort(byRating).reverse();
      this.ratingSortTriger = true;
    } else {
      this.books.sort(byRating);
      this.resetTriger();
      this.ratingSortTriger = false;
    }

    function byRating(a,b){
      if (a.rating < b.rating)
        return -1;
      if (a.rating > b.rating)
        return 1;
      return 0;
    }
  }

  resetTriger(){
    this.titleSortTriger = null;
    this.authorSortTriger = null;
    this.statusSortTriger = null;
    this.ratingSortTriger = null;
  }

  search(){
    this.searchResults = [];
    for(var i=0; i<this.copybooks.length; i++) {
        if(this.copybooks[i].title.toLowerCase().includes(this.tosearch.toLowerCase()) || this.copybooks[i].author.toLowerCase().includes(this.tosearch.toLowerCase())) {
          this.searchResults.push(this.copybooks[i]);
        }
      }
    if (this.searchResults.length == 0){
        this.searchMsg = 'Couldn\'t find any results';
        this.books = this.copybooks;
    } else {
      if (this.tosearch == '') {
        this.searchMsg = '';
        this.books = this.copybooks;
      } else {
        this.searchMsg = 'We found ' + this.searchResults.length + ' results';
        this.books = this.searchResults;
      }
    }
    }

  updateRatingOrStatus(book){
    this.bookService.updateBook(book)
      .subscribe(res => {
        if(res.ok == false){
          alert('something wrong' + res);
        }
      });
  }
}
