import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AgencyList } from 'src/data/agency';
import { Agency } from 'src/data/models';
import { UtilitiesService } from 'src/app/utilities.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataService } from '../../../app/data.service';
import { finalize, Observable, Subject } from 'rxjs';
import { ConfirmDialogComponent, DialogData } from '../../../app/reusable/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public loading = new Subject<boolean>();
  public displayedColumns = ["selectedAgency", "name", "contactPhone", "cityContactEmail", "dateUpdated", "dateLastEmailed", "actions"]
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
    this.service.getAgencies()
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
      let agencyList = AgencyList;
      agencyList.forEach(item => {
        this.service.addAgency(item).subscribe(() => {
          this.fetchData();
        });
      })
    }
  }

  /**
   * Delete agency from the database by id
   * @param id
   */
  deleteAgency(id: string, name: string) {
    let data: DialogData = {
      header: "Delete Agency",
      messages: [`Are you sure you want to delete ${name} agency?`],
      confirm: "Yes",
      reject: "No"
    }
    const confirm = this.dialog.open(ConfirmDialogComponent, { data });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteAgency(id).subscribe(() => {
          this.fetchData();
        })
      }
    })
  }


  /**
   * Denotes if agency is selected
   * @param element
   * @param checked
   */
  selectSingleAgency(element: any, checked: boolean) {
    element.selected = checked;
    console.log(this.dataSource.data);
  }


  /**
   * Denotes if all agencies are selected
   * @param checked
   */
  selectAllAgencies(checked: boolean) {
    this.dataSource.data.forEach(obj => {
        obj.selected = checked;
    });
  }


  /**
   * Send email reminder to single agency
   * @param id
   */
  requestUpdateSingle(id: string) {
    let agency_ids_array: string[] = [];
    agency_ids_array.push(id);
    this.requestUpdateSelectedPost(agency_ids_array);
  }


  /**
   * Send email reminder to selected agencies
   */
  requestUpdateSelected() {
    let agency_ids_array: string[] = [];
    this.dataSource.data.forEach(obj => {
        if (obj.selected == true){
            agency_ids_array.push(obj.id);
        }
    });
    
    this.requestUpdateSelectedPost(agency_ids_array);
  }


  /**
   * Send an email requesting agency update
   */
  requestUpdateSelectedPost(agency_ids_array: string[]) {
    let lenght_agency_array = agency_ids_array.length;

    let data: DialogData = {
        header: "Request Update Agency",
        messages: [`Are you sure you want to request update of ${lenght_agency_array} agencies?`],
        confirm: "Yes",
        reject: "No"
      }
      const confirm = this.dialog.open(ConfirmDialogComponent, { data });
      confirm.afterClosed().subscribe(result => {
        if (result) {
          this.service.requestUpdateAgency(agency_ids_array).subscribe(() => {
            this.fetchData();
          })
        }
      })
    
  }


}
