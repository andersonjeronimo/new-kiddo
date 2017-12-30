import { AlertService } from './../_services/alert.service';
import { FirebaseService } from './../_services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerList: any[] = [];
  private reference = 'customer';
  private customerDatabaseRef: any = null;
  loading = false;
  filter: string;

  // paginação
  numOfPages: number[] = [];
  currentPage = 1;
  pageSize = 5; // hardcoded...modificar
  private firstItemKey: string;
  private lastItemKey: string;
  childKey = 'kidName'; // orderByChild('childKey') hardcoded...modificar
  // END_OF paginação

  constructor(
    private firebase: FirebaseService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService
  ) { }

  private getFirebaseReferences(reference: string) {
    this.customerDatabaseRef = this.firebase.getDatabaseRef(reference);
  }

  ngOnInit() {
    this.getFirebaseReferences(this.reference);
    this.createRange();
    this.listFirstPage();
  }

  // funções de paginação
  private createRange() {
    let numChildren: number;
    let pages: number;
    let hasLastPage = false;
    this.numOfPages = [];
    this.customerDatabaseRef.once('value').then(snapshot => {
      numChildren = snapshot.numChildren();
      pages = numChildren / this.pageSize;
      hasLastPage = numChildren % this.pageSize === 0 ? false : true;
      pages += hasLastPage ? 1 : 0;
      for (let i = 1; i <= pages; i++) {
        this.numOfPages.push(i);
      }
    });
  }

  goToPage(targetPage: number) {
    if (targetPage !== this.currentPage) {
      if (targetPage < this.currentPage) {
        this.listPreviousPage();
      } else {
        this.listNextPage();
      }
      this.currentPage = targetPage;
    }
  }

  previousPage() {
    let targetPage: number;
    if (this.currentPage > 1) {
      targetPage = this.currentPage - 1;
      this.goToPage(targetPage);
    }
  }

  nextPage() {
    let targetPage: number;
    if (this.currentPage < this.numOfPages.length) {
      targetPage = this.currentPage + 1;
      this.goToPage(targetPage);
    }
  }

  listPreviousPage() {
    this.loading = true;
    this.customerDatabaseRef
      .orderByChild(this.childKey)
      .endAt(this.firstItemKey)
      .limitToLast(this.pageSize + 1)
      .once('value')
      .then(snapshot => {
        this.customerList = [];
        snapshot.forEach(childSnapshot => {
          this.customerList.push(childSnapshot.val());
        });
        this.loading = false;
        this.customerList.pop(); // não há mais necessidade da referência
        this.firstItemKey = this.customerList[0][this.childKey];
        this.lastItemKey = this.customerList[this.customerList.length - 1][
          this.childKey
        ];
      });
  }

  listNextPage() {
    this.loading = true;
    this.customerDatabaseRef
      .orderByChild(this.childKey)
      .startAt(this.lastItemKey)
      .limitToFirst(this.pageSize + 1)
      .once('value')
      .then(snapshot => {
        this.customerList = [];
        snapshot.forEach(childSnapshot => {
          this.customerList.push(childSnapshot.val());
        });
        this.loading = false;
        this.customerList.shift(); // não há mais necessidade da referência
        this.firstItemKey = this.customerList[0][this.childKey];
        this.lastItemKey = this.customerList[this.customerList.length - 1][
          this.childKey
        ];
      });
  }

  listFirstPage() {
    this.loading = true;
    this.customerDatabaseRef
      .orderByChild(this.childKey)
      .limitToFirst(this.pageSize)
      .once('value')
      .then(snapshot => {
        this.customerList = [];
        snapshot.forEach(childSnapshot => {
          this.customerList.push(childSnapshot.val());
        });
        this.loading = false;
        this.firstItemKey = this.customerList[0][this.childKey];
        this.lastItemKey = this.customerList[this.customerList.length - 1][
          this.childKey
        ];
        this.currentPage = 1;
      });
  }

  listFiles() {
    this.loading = true;
    this.customerDatabaseRef.once('value').then(snapshot => {
      this.customerList = [];
      snapshot.forEach(childSnapshot => {
        this.customerList.push(childSnapshot.val());
      });
      this.loading = false;
    });
    console.log(this.customerList);
  }

  filterCustomerList() {
    if (
      this.customerList.length === 0 ||
      this.filter === undefined ||
      this.filter.trim() === ''
    ) {
      return this.customerList;
    }
    return this.customerList.filter(customer => {
      if (customer.kidName.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }

}
