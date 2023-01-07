import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  embedCode: any;

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService, private clipboard: Clipboard) {}

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  getCopyUrl(num: any) {
    
    if(this.fileInfos){

    this.fileInfos.forEach((embed) => {

      embed.forEach((embed2: any, index: string) => {

        if(index == num){
          console.log(index + " " + embed2.url)
          this.embedCode = `<img class="img-right" src="${embed2.url}">`
          this.clipboard.copy(this.embedCode)
          alert("copied to clipboard")
        }

      })

    });

  }


}

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }

  fileInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  
  
}