import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';   

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProduitComponent } from './pages/admin/produit/produit.component';
import { AddProduitComponent } from './pages/admin/produit/addProduit.component';
import { CategorieComponent } from './pages/admin/categorie/categorie.component';
import { AddCategorieComponent } from './pages/admin/categorie/addCategorie.component';
import { PromotionComponent } from './pages/admin/promotion/promotion.component';
import { AddPromotionComponent } from './pages/admin/promotion/addPromotion.component';
import { UtilisateurComponent } from './pages/admin/utilisateur/utilisateur.component';
import { AddUtilisateurComponent } from './pages/admin/utilisateur/addUtilisateur.component';
import { ClientDashboardComponent } from './pages/client/dashboard/dashboard.component';
import { PanierComponent } from './pages/client/panier/panier.component';
import { DetailsProduitComponent } from './pages/client/details-produit/details-produit.component';
import { CommandeComponent } from './pages/client/commande/commande.component';
import { AdresseComponent } from './pages/client/adresse/adresse.component';
import { MonCompteComponent } from './pages/client/mon-compte/mon-compte.component';
import { AdresseSelectorComponent } from './pages/client/adresse-selector/adresse-selector.component';
import { AdminCommandeComponent } from './pages/admin/commandes/commandes.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PaymentComponent } from './pages/client/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProduitComponent,
    AddProduitComponent,
    CategorieComponent,
    AddCategorieComponent,
    PromotionComponent,
    AddPromotionComponent,
    UtilisateurComponent,
    AddUtilisateurComponent,
    ClientDashboardComponent,
    PanierComponent,
    DetailsProduitComponent,
    CommandeComponent,
    AdresseComponent,
    MonCompteComponent,
    AdresseSelectorComponent,
    AdminCommandeComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,   
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
