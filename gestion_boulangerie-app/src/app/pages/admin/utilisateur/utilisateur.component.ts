import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  constructor(private utilisateurService: UtilisateurService) { }
  ngOnInit(): void {
this.getUtilisateurs();  }
  getUtilisateurs(){
    this.utilisateurService.getUtilisateurs().subscribe(
      (data:Utilisateur[])=>{
        this.utilisateurs=data;
        console.log(this.utilisateurs);
      },
      (error)=>{
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    )
  }

  deleteUtilisateur(id: number) {
    this.utilisateurService.deleteUtilisateur(id).subscribe(
      () => {
        console.log('Utilisateur supprimé avec succès');
        this.getUtilisateurs(); // Rafraîchir la liste des utilisateurs
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }

}
