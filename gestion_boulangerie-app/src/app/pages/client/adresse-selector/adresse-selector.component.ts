import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Adresse } from '../../../models/adresse';
import { AdresseService } from '../../../services/adresse.service';

declare var bootstrap: any;

@Component({
  selector: 'app-adresse-selector',
  templateUrl: './adresse-selector.component.html',
  styleUrls: ['./adresse-selector.component.css']
})
export class AdresseSelectorComponent {
  adresses: Adresse[] = [];
  selectedAdresseId: number | null = null;

  @Output() adresseSelected = new EventEmitter<Adresse>();

  @ViewChild('adresseModal', { static: true }) modalRef!: ElementRef;

  loading = false;
  error: string | null = null;

  constructor(private adresseService: AdresseService) {}

  // 🟢 Fonction pour ouvrir le popup et charger les adresses
  open() {
    this.loading = true;
    this.error = null;

    this.adresseService.getUserAdresses().subscribe({
      next: (res) => {
        this.adresses = res;
        this.loading = false;

        const modal = new bootstrap.Modal(this.modalRef.nativeElement);
        modal.show();
      },
      error: () => {
        this.error = "Impossible de charger vos adresses.";
        this.loading = false;
      }
    });
  }

  confirmSelection() {
    const selected = this.adresses.find(a => a.id === this.selectedAdresseId);
    if (selected) {
      this.adresseSelected.emit(selected);

      const modal = bootstrap.Modal.getInstance(this.modalRef.nativeElement);
      modal.hide();
    }
  }
}
