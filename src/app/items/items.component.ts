import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: any[] = [];
  itemForm : FormGroup |any;
  isEdit = false;

  constructor(
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadItems();
    this.initForm();
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      number:['', Validators.required],
      email:['', Validators.required],
    });
  }

  loadItems(): void {
    this.items = this.localStorageService.getItems();
  }

  submitForm(): void {
    if (this.itemForm.valid) {
      this.localStorageService.saveItem(this.itemForm.value);
      this.itemForm.reset();
      this.isEdit = false;
      this.loadItems();
    }
  }

  editItem(item: any): void {
    this.itemForm.patchValue(item);
    this.isEdit = true;
  }

  deleteItem(id: number): void {
    this.localStorageService.deleteItem(id);
    this.loadItems();
  }

  cancelEdit(): void {
    this.itemForm.reset();
    this.isEdit = false;
  }

}
