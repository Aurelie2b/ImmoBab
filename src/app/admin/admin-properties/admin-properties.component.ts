import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import * as $ from 'jquery';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm!: FormGroup;
  propertiesSubscription!: Subscription;
  properties: Property[] = [];
  indexToRemove;
  indexToUpdate;
  editModel = false;

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties();
  }

  initPropertiesForm(){
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: ''
    });
  }

  onSubmitPropertiesForm(){
    const newProperty: Property = this.propertiesForm.value;
    if (this.editModel){
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    }else{
      this.propertiesService.createProperty(newProperty);
    }
    $('#propertiesFormModal').modal('hide');
  }

  resetForm(){
    this.propertiesForm.reset();
    this.editModel = false;
  }

  onDeleteProperty(index){
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty(){
    this.propertiesService.deleteProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }

  onEditProperty(property: Property){
    this.editModel = true;
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title')?.setValue(property.title);
    this.propertiesForm.get('category')?.setValue(property.category);
    this.propertiesForm.get('surface')?.setValue(property.surface);
    this.propertiesForm.get('rooms')?.setValue(property.rooms);
    this.propertiesForm.get('description')?.setValue(property.description);
    this.propertiesForm.get('price')?.setValue(property.price);
    this.propertiesForm.get('sold')?.setValue(property.sold);
    const index = this.properties.findIndex(
      (propertyEL) => {
        if (propertyEL === property){
          return true;
        }
      }
    );

    this.indexToUpdate = index;
  }
}
