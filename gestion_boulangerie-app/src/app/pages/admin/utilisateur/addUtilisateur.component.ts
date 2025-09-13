import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';
import { ActivatedRoute } from '@angular/router';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './addUtilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class AddUtilisateurComponent implements OnInit {

  id!: number;
  utilisateurs: Utilisateur[] = [];
  constructor(private utilisateurService: UtilisateurService,private aroute: ActivatedRoute) { }
  ngOnInit(): void {
    if(this.aroute.snapshot.params['id']){
      this.id = this.aroute.snapshot.params['id'];
      this.utilisateurService.getUtilisateurById(this.id).subscribe(
        (data:Utilisateur)=>{
          this.utilisateurForm.patchValue(
            {
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role,
              password: data.password,
              phone: data.phone,
            }
          );
          console.log(data);
        },
        (error)=>{
          console.error('Erreur lors de la récupération de l\'utilisateur', error);
        }
      )
    }
          
         
  }
  utilisateurForm:FormGroup=new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    email: new FormControl(''),  
    role: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),    
      
    } );
    onSubmit(){
      if(this.id){
        this.utilisateurService.updateUtilisateur(this.id,this.utilisateurForm.value).subscribe(  
          (data)=>{
            console.log('Utilisateur mis à jour avec succès',data);
          },
          (error)=>{
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
          }
        )
      }else{
        this.utilisateurService.addUtilisateur(this.utilisateurForm.value).subscribe(
          ()=>{
            console.log('Utilisateur ajouté avec succès');
            this.utilisateurForm.reset();
          },
          (error)=>{
            console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
          }
        )
}
}
  
  
}
