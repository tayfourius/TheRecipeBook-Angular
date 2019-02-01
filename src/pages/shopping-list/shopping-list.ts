import { SlOptionspage } from "./sl-options/sl-options";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";
import { PopoverController, LoadingController, AlertController } from "ionic-angular";
import { AuthService } from "../../services/auth";

@Component({
  selector: "page-shopping-list",
  templateUrl: "shopping-list.html"
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    const popover = this.popoverCtrl.create(SlOptionspage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (data.action == "load") {
        loading.present();
        this.authService
          .getActiveUser()
          .getToken()
          .then((token: string) => {
            this.slService.fetchList(token).subscribe(
              (list: Ingredient[]) => {
                loading.dismiss();
                console.log("Success");
                if (list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];
                }
              },
              error => {
                loading.dismiss();
                console.log(error);
                this.handleError(error.json().error);
              }
            );
          });
      } else if (data.action == "store") {
        loading.present();
        this.authService
          .getActiveUser()
          .getToken()
          .then((token: string) => {
            this.slService.storeList(token).subscribe(
              () => {
                loading.dismiss();
                console.log("Success");
              },
              error => {
                loading.dismiss();
                console.log(error);
                this.handleError(error.json().error);
              }
            );
          });
      }
    });
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title:'An error occurred!',
      message:errorMessage,
      buttons:['OK!']
    });
    alert.present();
  }
}
