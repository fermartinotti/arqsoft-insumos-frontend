import { Component, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Estado } from 'src/app/modelo/estado';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.css']
})
export class ModalListComponent {
  
  @Input()
  estados:Array<Estado>;

  constructor(public modal: NgbActiveModal) { }

 
}
