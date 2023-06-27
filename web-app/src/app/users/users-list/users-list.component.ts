import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, first, Subject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/reusable/confirm-dialog/confirm-dialog.component';
import { UtilitiesService } from 'src/app/utilities.service';
import { UsersList } from 'src/data/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public loading = new Subject<boolean>();
  public displayedColumns = ["firstname","lastname","username","actions"]
  searchField: FormControl = new FormControl();
  public environment = environment;
  constructor(public utils: UtilitiesService, private liveAnnouncer: LiveAnnouncer, private service: DataService, private dialog: MatDialog) { }
  confirmDialog: ConfirmDialogComponent;

  ngOnInit(): void {
    this.fetchData();
  }

  /**
   * Refresh table data source by getting new data from db
   */
  fetchData() {
    this.loading.next(true);
    this.service.getUsers()
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = this.filterPredicate();
      this.searchField.valueChanges.subscribe(value => {
        this.dataSource.filter = value;
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
  /**
   * Filter predicate used by material table data source to filter
   * datasource based on all non-object and non-id fields in the data
   * @returns boolean
   */
  filterPredicate() {
    let filterFunction = (data: any, filter: string): boolean => {
      let match = true;
      if (filter) {
        for (var key of Object.keys(data)) {
          if (key !== 'id' && typeof data[key] !== 'object') {
            match = String(data[key]).toLowerCase().includes(filter);
            if (match) return match;
          }
        }
        return false;
      } else {
        return true;
      }
    }
    return filterFunction
  }

  /**
   * TEST method only: Upload test data to back-end db
   */
  uploadTestData() {
    if (!environment.production) {
      let usersList = UsersList;
      usersList.forEach(item => {
        this.service.addUser(item).subscribe(() => {
          this.fetchData();
        });
      })
    }
  }

  /**
   * Delete agency from the database by id
   * @param id
   */
  deleteUsers(id: string, name: string) {
    let data: DialogData = {
      header: "Delete User",
      messages: [`Are you sure you want to delete ${name} user?`],
      confirm: "Yes",
      reject: "No"
    }
    const confirm = this.dialog.open(ConfirmDialogComponent, { data });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(id).subscribe(() => {
          this.fetchData();
        })
      }
    })
  }
}
