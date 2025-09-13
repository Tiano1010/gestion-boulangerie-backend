import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { AuthGuard } from './guards/auth.guard';
import { ClientDashboardComponent } from './pages/client/dashboard/dashboard.component';
import { PanierComponent } from './pages/client/panier/panier.component';
import { DetailsProduitComponent } from './pages/client/details-produit/details-produit.component';
import { CommandeComponent } from './pages/client/commande/commande.component';
import { AdresseComponent } from './pages/client/adresse/adresse.component';
import { MonCompteComponent } from './pages/client/mon-compte/mon-compte.component';
import { AdminCommandeComponent } from './pages/admin/commandes/commandes.component';
import { PaymentComponent } from './pages/client/payment/payment.component';
import { RedirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🟢 Dashboard - Admin & Employé
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },

  // 🟢 Produits - Admin & Employé
  { path: 'admin/produit', component: ProduitComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: 'addProduits', component: AddProduitComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: 'updateProduit/:id', component: AddProduitComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },

  // 🟢 Catégories - Admin & Employé
  { path: 'admin/categorie', component: CategorieComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: 'addCategorie', component: AddCategorieComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: 'updateCategorie/:id', component: AddCategorieComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },

  // 🟢 Promotions - Admin & Employé
  { path: 'admin/promotion', component: PromotionComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: 'addPromotion', component: AddPromotionComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: 'updatePromotion/:id', component: AddPromotionComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },

  // 🔴 Utilisateurs - Seulement Admin
  { path: 'admin/utilisateur', component: UtilisateurComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'addUtilisateur', component: AddUtilisateurComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'updateUtilisateur/:id', component: AddUtilisateurComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  
  
  {path: 'admin/commande', component:AdminCommandeComponent,canActivate:[AuthGuard], data:{roles:['ADMIN', 'EMPLOYEE']}},

  // Page d'accès refusé (optionnelle)
  

                            ///Partie Client///


  {path: 'client/dashboard',component:ClientDashboardComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT'] }},
  {path: 'client/detailsProduit/:id', component: DetailsProduitComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT'] }},
  {path: 'client/panier', component: PanierComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT'] }},
  {path: 'client/commande',component:CommandeComponent, canActivate:[AuthGuard], data: {roles:['CLIENT']}},
  {path: 'client/mon-compte', component: MonCompteComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT'] }},
  {path: 'client/adresses', component: AdresseComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT'] }},
  {path: 'payment/:id', component: PaymentComponent },
  
  // Page 404 - redirection vers login au lieu du dashboard
    //{ path: 'access-denied', component: LoginComponent }, 

{ path: '**', canActivate: [RedirectGuard], component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }