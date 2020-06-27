import { Component, Input} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent {

  @Input()
  title: string;

  @Input()
  description: string;

  constructor(public modal: NgbActiveModal) { }

}
