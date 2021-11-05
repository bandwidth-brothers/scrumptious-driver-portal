import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  openSnack(msg: string){
    console.log("notification called");
    this.snackBar.open(msg, '', {
      duration: 5000
    })
  }
}
