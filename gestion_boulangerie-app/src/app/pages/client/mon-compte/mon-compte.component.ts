import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from '../../../models/utilisateur';
import { Adresse } from '../../../models/adresse';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { AdresseService } from '../../../services/adresse.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  utilisateur: Utilisateur | null = null;
  addresses: Adresse[] = [];
  addressForm!: FormGroup;
  editForm!: FormGroup;
  editingId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private adresseService: AdresseService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadUser();
    this.loadAddresses();
  }

  initForms() {
    this.addressForm = this.fb.group({
      label: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['Sénégal']
    });

    this.editForm = this.fb.group({
      label: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['Sénégal']
    });
  }

  loadUser() {
    this.utilisateurService.getCurrentUser().subscribe({
      next: (data) => this.utilisateur = data,
      error: () => this.error = "Impossible de charger l'utilisateur"
    });
  }

  loadAddresses() {
    this.adresseService.getUserAdresses().subscribe({
      next: (data) => {
        this.addresses = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger les adresses";
        this.loading = false;
      }
    });
  }

  addAddress() {
    if (this.addressForm.invalid) return;

    this.adresseService.addAdresse(this.addressForm.value).subscribe({
      next: (addr) => {
        this.addresses.push(addr);
        this.addressForm.reset({ country: 'Sénégal' });
      },
      error: () => alert("Erreur lors de l'ajout")
    });
  }

  startEdit(addr: Adresse) {
    this.editingId = addr.id;
    this.editForm.patchValue(addr);
  }

  updateAddress() {
    if (!this.editingId || this.editForm.invalid) return;

    this.adresseService.updateAddress(this.editingId, this.editForm.value).subscribe({
      next: (updated) => {
        const index = this.addresses.findIndex(a => a.id === updated.id);
        if (index !== -1) this.addresses[index] = updated;
        this.editingId = null;
      },
      error: () => alert("Erreur lors de la modification")
    });
  }

  cancelEdit() {
    this.editingId = null;
  }

  deleteAddress(id: number) {
    if (confirm("Supprimer cette adresse ?")) {
      this.adresseService.deleteAdresse(id).subscribe({
        next: () => this.addresses = this.addresses.filter(a => a.id !== id),
        error: () => alert("Erreur lors de la suppression")
      });
    }
  }
}
