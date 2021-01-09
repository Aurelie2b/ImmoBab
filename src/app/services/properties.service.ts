import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  createProperty(property: Property) {
    this.properties.push(property);
  }

  deleteProperty(index){
     this.properties.splice(index, 1);
     this.emitProperties();
  }

  updateProperty(property: Property, index){
     this.properties[index] = property;
     this.emitProperties();
  }
}
