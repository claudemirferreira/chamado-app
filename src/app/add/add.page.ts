import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss']
})
export class AddPage {

  productForm: FormGroup;
  nome:string='';
  descricao:string='';
  valor:number=null;

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'nome' : [null, Validators.required],
      'descricao' : [null, Validators.required],
      'valor' : [null, Validators.required]
    });
  }

  async onFormSubmit(form:NgForm) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.addProduct(form)
      .subscribe(res => {
          let id = res['id'];
          loading.dismiss();
          console.log(this.router);
          this.router.navigate([ { outlets: { details: id } } ], { relativeTo: this.route.parent });
        }, (err) => {
          console.log(err);
          loading.dismiss();
        });
  }

}
