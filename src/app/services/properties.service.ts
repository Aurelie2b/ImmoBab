import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title : 'Ma super maison',
      category : 'Maison',
      sold : true
    },
    {
      title : 'Petit appartement',
      category : 'Appartement',
      sold : false
    },
    {
      title : 'Belle vila',
      category : 'Maison',
      sold : true
    }
  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  createProperty(property) {
    this.properties.push(property);
  }

  deleteProperty(index){
     this.properties.splice(index, 1);
     this.emitProperties();
  }

  updateProperty(property, index){
     this.properties[index] = property;
     this.emitProperties();
  }
}
