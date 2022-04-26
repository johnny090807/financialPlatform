import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {User} from "../objects/user";
import {Invoice} from "../objects/invoice";
import {InvoiceLists} from "../objects/invoiceLists";
import {doc, getDoc, getFirestore, onSnapshot} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  db = getFirestore()

    constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authService: AuthService) {
  }

  addInvoiceListToUser(user: User, list: InvoiceLists){
    let uid = this.afs.createId();
    const invoiceRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}/invoiceLists/${uid}`
    )
    let invoiceList : InvoiceLists = {
      uid: uid,
      name: list.name,
      name_lowercase: list.name.toLowerCase(),
      balance: list.balance,
      startDate: list.startDate,
      endDate: list.endDate

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
  getAllInvoiceListsByUser(user: User, search: string) {
    return this.afs.collection(`users/${user.uid}/invoiceLists`).ref
      .where('name_lowercase', '>=', search.toLowerCase()).where('name_lowercase', '<=', search.toLowerCase() + '~')
      .orderBy("name_lowercase")
      .get()
  }

  getSingleInvoiceList(user: User, invoiceListId: string) {
    return this.afs.collection(`users`).doc(user.uid).collection('invoiceLists').doc(invoiceListId).get()
  }

  getAllInvoices(user: User, invoiceUID: string) {
    return this.afs.collection(`users/${user.uid}/invoiceLists/${invoiceUID}/invoices`).ref.orderBy("date")
  }

  deleteInvoiceList(user: User, uid: string) {
    return this.afs.collection(`users`).doc(user.uid).collection("invoiceLists").doc(uid).delete();
  }

  deleteInvoice(user: User, uid: string, invoiceUid: string) {
    return this.afs.collection(`users`).doc(user.uid).collection("invoiceLists").doc(uid).collection("invoices").doc(invoiceUid).delete();
  }

  updateInvoiceOnInvoiceList(user: User, uid: string, invoice: any) {
    const invoiceRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}/invoiceLists/${uid}/invoices/${invoice.uid}`
    )
    return invoiceRef.set(invoice, {
      merge: true
    })
  }

  updateInvoiceList(user: any, list: any) {
    const invoiceRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}/invoiceLists/${list.uid}`
    )
    return invoiceRef.set(list, {
      merge: true
    })

  }
}
