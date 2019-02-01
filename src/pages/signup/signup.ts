import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  onSignup(page: NgForm) {
    console.log(page);
    const loading = this.loadingCtrl.create({
      content: "Signing you up..."
    });
    loading.present();
    this.authService
      .singup(page.value.email, page.value.password)
      .then(data => {
        console.log(data);
        loading.dismiss();
      })
      .catch(err => {
        console.log(err);
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "Signup Failed!",
          message: err.message,
          buttons: ["OK!"]
        });
        alert.present();
      });
  }
}
