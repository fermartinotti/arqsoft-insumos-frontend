import { Component, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-close',
  templateUrl: './modal-close.layout.html',
  styleUrls: ['./modal-close.layout.css']
})
export class ModalCloseComponent {

  @Input()
  title: string;

  @Input()
  description: string;

  constructor(public modal: NgbActiveModal) { }


}
