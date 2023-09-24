import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ICreateInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item-create.model';
import { IInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item.model';
import { InventoryItemService } from 'src/app/shared/services/inventory-item.service';

@Component({
  selector: 'app-inventory-item-add-modal',
  templateUrl: './inventory-item-add-modal.component.html',
  styleUrls: ['./inventory-item-add-modal.component.css']
})
export class InventoryItemAddModalComponent implements OnInit {
  @Input() itemToCreate: ICreateInventoryItem | undefined

  public itemAddForm: UntypedFormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  @Output() createdItem: IInventoryItem | undefined

  get fields() { return this.itemAddForm.controls }

  constructor(
    private modalRef: BsModalRef,
    private toastrService: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private inventoryItemService: InventoryItemService
  ) {
    this.itemAddForm = formBuilder.group({})
  }

  ngOnInit(): void {
    this.modalRef.setClass('modal-lg')

    this.itemAddForm = this.formBuilder.group({
      symbol: [this.itemToCreate?.symbol, Validators.required],
      name: [this.itemToCreate?.name, Validators.required],
      value: [this.itemToCreate?.value, Validators.required],
      description: [this.itemToCreate?.description, Validators.required]
    })
  }

  onCancel(): void {
    this.modalRef.hide()
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.itemAddForm.invalid) {
      return;
    }

    this.loading = true;

    this.inventoryItemService.createInventoryItem({
      name: this.itemAddForm.controls['name'].value,
      description: this.itemAddForm.controls['description'].value,
      symbol: this.itemAddForm.controls['symbol'].value,
      value: this.itemAddForm.controls['value'].value
    }).subscribe({
      complete: () => {
        this.toastrService.success(`Successfully created inventory item: ${this.itemAddForm.controls['name'].value}`)
        this.modalRef.hide()
      },
      next: (finalItem) => {
        this.createdItem = finalItem
      },
      error: (error) => {
        this.error = error;
        if (error?.id)
          this.errorMessage = error.message
        this.loading = false;
      }
    })
  }

}
