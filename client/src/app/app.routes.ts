import {Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {AuthtentificateComponent} from "./authtentificate/authtentificate.component";
import {BooksListComponent} from "./mainpage/books-list/books-list.component";
import {AddbookComponent} from "./mainpage/addbook/addbook.component";
import {EditbookComponent} from "./mainpage/editbook/editbook.component";

export const routes : Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthtentificateComponent
  },
  {
    path: 'home',
    component : MainpageComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'bookslist', component: BooksListComponent },
      { path: 'addbook', component: AddbookComponent},
      { path: 'edit/:id', component: EditbookComponent}
    ]
  }
];
