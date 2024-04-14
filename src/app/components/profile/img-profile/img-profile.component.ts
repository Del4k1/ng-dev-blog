import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShowProfileComponent } from '../show-profile/show-profile.component';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-img-profile',
  templateUrl: './img-profile.component.html',
  styleUrls: ['./img-profile.component.scss'],
})
export class ImgProfileComponent {
  selectedFile: File;
  userId: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShowProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    this.userId = this.authService.userId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file.type.startsWith('image')) {
      this.selectedFile = file;
    } else {
      console.error('Invalid file type. Please select an image.');
    }
  }

  uploadAvatar() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.authService.uploadUserImage(this.userId, formData).subscribe(
        (res) => {
          console.log('Uploaded file:', res);
          this.onNoClick();
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
}
