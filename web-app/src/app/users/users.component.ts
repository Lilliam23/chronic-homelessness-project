import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';
import { Users } from 'src/data/models';
import { DataService } from '../data.service';
import { ConfirmDialogComponent, DialogData } from '../reusable/confirm-dialog/confirm-dialog.component';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public username = new FormControl();
  public isNew: boolean = true;

  public usersForm: FormGroup = new FormGroup({
    id: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    username: this.username,
    password: new FormControl(),
    
  
  });

  public users: Users;
  public id: string;
  public loading = new Subject<boolean>();
  password: string = '';
  firstname: string;
  lastname: string;
  dialogData: DialogData;

  constructor(private fb: FormBuilder,
    private utils: UtilitiesService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: DataService,
    public dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef) {
    // check if id is present in query params to determine
    // if this is an edit form or add new form
    this.id;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.isNew = false;
        this.fetchData();
      }
    });
    
  // generate a new id if this is an add new form
  if (this.isNew) {
    this.formId = utils.generateUUID();
  } else {
    // otherwise set id to query param id
    this.formId = this.id;
  }
}



/**
 * Refresh table data source by getting agency data by id from db
 */
fetchData() {
  this.loading.next(true);
  this.service.getUserById(this.id).subscribe(data => {
    this.users = data;
    this.parseData(this.users);
  })
}

  /**
 * Submit form data
 */
  saveData() {
    
    let data: Users = this.usersForm.value;
    if (this.isNew) {
      data.dateCreated = new Date();
      data.dateUpdated = new Date();
      return this.service.addUser(data);
    } else {
      data.dateUpdated = new Date();
      return this.service.updateUsers(data);
    }
  }
  /**
   * Validate form data to make sure all required fields are populated
   * @param formData
   */
  validateForm() {
    this.dialogData = {
      header: "",
      success: this.usersForm.valid,
      messages: [],
      confirm: "Okay"
    }
    if (!this.dialogData.success) {
      this.getErrors();
      this.dialogData.header = "There are errors in the form. Please correct and try again";
      this.openDialog(this.dialogData);
    } else {
      this.saveData()
        .pipe(catchError(err => {
          if (err.status) {
            console.log(err);
            this.dialogData.header = err.error.error;
            this.dialogData.messages.push(err.message);
            this.dialogData.success = false;
            this.openDialog(this.dialogData);
          }
          return of(this.onError(err))
        }))
        .subscribe(res => {
          this.dialogData.header = "User Created successfully";
          this.dialogData.messages = [];
          this.dialogData.messages.push('Succcess');
          this.openDialog(this.dialogData);
        });
    }
  }
  /**
   * Open dialog to show success or failure message
   * @param data
   */
  openDialog(data: DialogData) {
    this.dialog.open(ConfirmDialogComponent, { data });
  }

  /**
   * Get all error messages for current form fields
   */
  getErrors() {
    this.dialogData.messages = [];
    Object.keys(this.usersForm.controls).forEach((key) => {
      const controlErrors: any = this.usersForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          this.dialogData.messages.push(
            'Field name: ' +
            key +
            ', Error Reason: ' +
            keyError
          );
        });
      }
    });
  }
  /**
   * Log error in console
   * @param err
   * @returns
   */
  onError(err: any) {
    console.log(err);
    return false;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
      
  
    //# "Form Setters"

    /**
     * Set the value of id form field in the usersForm
     * @param value id value
     */
    set formId(value: string) {
        this.usersForm.controls['id'].setValue(value);
    }

    parseData(users: Users) {
        if (this.users) {
          this.usersForm.patchValue({
            id: this.users.id,
            firstname: this.users.firstname,
            lastname: this.users.lastname,
            username: this.users.username,
            password: this.users.password,
         
            })
      }
      }

}
