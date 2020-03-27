import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imageName: string;
  selectedFile: File;
  base64Data: any;
  retrieveResponse: any;
  message: string;
  isImageRetrieved: any;

  constructor(private httpClient: HttpClient) {}

  // gets called when the user selects an image
  public onFileChange(event) {
    // selected file
    this.selectedFile = event.target.files[0];
  }

  // Gets called wen the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile + 'is being uploaded');

    // FormData API provides methods and properties to alow us easily prepare form data to be sent with POST HTTP Request
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);


    // Making the call to the Spring Boot Application to save the image
    this.httpClient.post(environment.baseUrl + '/image/upload', uploadImageData, {observe: 'response'})
  .subscribe(response => {
    if (response.status === 200) {
      this.message = 'Image Uploaded Successfully';
    } else {
      this.message = 'Image not uploaded properly';
    }
  });
  }

  // Gets called when the user clicks on retrieve image button to get the image backend
  getImage() {
    // make a call to Spring Boot to get the Image Bytes
    this.httpClient.get(environment.baseUrl + '/image/get/' + this.imageName)
    .subscribe(
      res => {
        this.retrieveResponse = res;
        this.base64Data = this.retrieveResponse.picByte;
        this.isImageRetrieved = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
  }

}
