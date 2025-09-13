import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdresseService } from '../../../services/adresse.service';
import { Adresse } from '../../../models/adresse';

@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.css']
})
export class AdresseComponent implements OnInit {

  adresses: Adresse[] = [];
  addressForm!: FormGroup;
  loading = true;
  error: string | null = null;

  constructor(
    private adresseService: AdresseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAddresses();
  }

  initForm() {
    this.addressForm = this.fb.group({
      label: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['Sénégal', Validators.required]
    });
  }

  loadAddresses() {
    this.loading = true;
    this.error = null;

    this.adresseService.getUserAdresses().subscribe({
      next: (res) => {
        this.adresses = res;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger vos adresses.";
        this.loading = false;
      }
    });
  }

  addAddress() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.adresseService.addAdresse(this.addressForm.value).subscribe({
      next: (addr) => {
        this.adresses.push(addr);
        this.addressForm.reset({ country: 'Sénégal' }); // reset avec valeur par défaut
      },
      error: () => alert("Erreur lors de l'ajout de l'adresse")
    });
  }

  deleteAddress(id: number) {
    if (confirm("Supprimer cette adresse ?")) {
      this.adresseService.deleteAdresse(id).subscribe({
        next: () => {
          this.adresses = this.adresses.filter(a => a.id !== id);
        },
        error: () => alert("Erreur lors de la suppression")
      });
    }
  }
}
