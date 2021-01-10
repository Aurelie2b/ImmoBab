import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import $ from 'jquery';
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
  pictureUploading = false;
  pictureUploaded = false;
  picturesAdded: any [] = [];

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
    this.propertiesService.getProperties();
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
    newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false;
    newProperty.pictures = this.picturesAdded ? this.picturesAdded : [];
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
    this.picturesAdded = [];
  }

  onDeleteProperty(index){
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty(){
    this.properties[this.indexToRemove].pictures?.forEach(
      (picture) => {
        this.propertiesService.removeFile(picture);
      }
    );
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
    this.propertiesForm.get('description')?.setValue(property.description ? property.description : '');
    this.propertiesForm.get('price')?.setValue(property.price);
    this.propertiesForm.get('sold')?.setValue(property.sold);
    this.picturesAdded = property.pictures ? property.pictures : [];
    const index = this.properties.findIndex(
      (propertyEL) => {
        if (propertyEL === property){
          return true;
        }
      }
    );

    this.indexToUpdate = index;
  }

  onUploadFile(event){
    this.pictureUploading = true;

    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: any) => {
        this.picturesAdded.push(url);
        this.pictureUploading = false;
        this.pictureUploaded = true;
        setTimeout(() => {
          this.pictureUploaded = false;
        }, 5000);
      }
    );
  }

  onRemoveAddedPicture(index){
    this.propertiesService.removeFile(this.picturesAdded[index]);
    this.picturesAdded.splice(index, 1);
  }

}
