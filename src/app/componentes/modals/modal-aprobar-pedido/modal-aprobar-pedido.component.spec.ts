import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobarPedidoComponent } from './modal-aprobar-pedido.component';

describe('ModalAprobarPedidoComponent', () => {
  let component: ModalAprobarPedidoComponent;
  let fixture: ComponentFixture<ModalAprobarPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAprobarPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAprobarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
