import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {User} from "../objects/user";
import {Invoice} from "../objects/invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authService: AuthService) { }

  addInvoiceListToUser(user: User){
    let uid = this.afs.createId();
    const invoiceRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}/invoiceLists/${uid}`
    )
    const invoiceList = {
      uid: uid,
      name: "New list"
    }
    return invoiceRef.set(invoiceList, {
      merge: true
    })

  }

  addInvoiceToInvoiceList(user: User, invoiceListUid: string, invoice: Invoice){
    let uid = this.afs.createId();
    const invoiceRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}/invoiceLists/${invoiceListUid}/invoices/${uid}`
    )
    invoice["uid"] = uid;
    return invoiceRef.set(invoice, {
      merge: true
    })

  }
  getAllInvoiceListsByUser(user: User) {
    return this.afs.collection(`users/${user.uid}/invoiceLists`).valueChanges();
  }

  getAllInvoices(user: User, invoiceUID: string) {
    return this.afs.collection(`users/${user.uid}/invoiceLists/${invoiceUID}/invoices`).valueChanges();
  }

  deleteInvoiceList(user: User, uid: string) {
    return this.afs.collection(`users`).doc(user.uid).collection("invoiceLists").doc(uid).delete();
  }

  deleteInvoice(user: User, uid: string, invoiceUid: string) {
    return this.afs.collection(`users`).doc(user.uid).collection("invoiceLists").doc(uid).collection("invoices").doc(invoiceUid).delete();
  }

  updateInvoiceListName(user: User, uid: string, text: string) {
    const invoiceRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}/invoiceLists/${uid}`
    )
    const invoiceList = {
      name: text
    }
    return invoiceRef.set(invoiceList, {
      merge: true
    })
  }
}
