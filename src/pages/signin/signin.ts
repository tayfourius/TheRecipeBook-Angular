import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { AuthService } from "../../services/auth";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signin",
  templateUrl: "signin.html"
})
export class SigninPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authSerive: AuthService,
    private loadingCtrl: LoadingController,
    private alrtCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SigninPage");
  }

  onSignin(page: NgForm) {
    console.log(page);
    const loading = this.loadingCtrl.create({
      content: "signing you in .."
    });
    loading.present();
    this.authSerive
      .signin(page.value.email, page.value.password)
      .then(data => {
        loading.dismiss();
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        loading.dismiss();
        const alert = this.alrtCtrl.create({
          title: "Sigin Failed!",
          message: err.message,
          buttons: ["Ok!"]
        });
      });
  }
}
