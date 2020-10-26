import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  addImages(images) {
    const formData = new FormData()
    
    let lengthOfFiles = images.files.length;

    for(let i = 0; i < lengthOfFiles; i++) {
      formData.append('files', images.files[i]);
    }
    
    formData.append('jsonImageDTOs', JSON.stringify(images.imageDTOs))

    return this.http.post<any>(this.urlConfig.urlImage, formData, {
      headers: {
        enctype: 'multipart/form-data'
      }
    });
  }

  deleteImage(image) {
    return this.http.delete<any>(this.urlConfig.urlImage, { params: 
      { imageId:image.imageId, imageName: image.imageName } 
    })
  }

}
