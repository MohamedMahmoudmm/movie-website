import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {
  private accountService = inject(AccountService)

  // User profile
  username: string = 'Montaser';
  fullName: string = '';
  profileImage: string | null = null;

  // image
  savedProfileImage: string | null = null; // current saved image
  tempProfileImage: string | null = null; // image being edited

  // Edit toggles
  isEditingImage: boolean = false;
  isEditingInfo: boolean = false;
  isImageSelected: boolean = false;

  // Image editing (drag & scale)
  scaleValue: number = 1;
  dragX: number = 0;
  dragY: number = 0;
  // dragging helpers
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private initialDragX = 0;
  private initialDragY = 0;

  // store originals to allow cancel
  private originalUsername = '';
  private originalFullName = '';

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.accountService.getAccountDetails().subscribe({
      next: (user: UserModel) => {
        this.username = user?.username
        this.fullName = user?.name
        this.profileImage = this.accountService.getProfileImage(user);
      },
      error: (err) => {
        console.error('Failed to load user details',err)
      }
    })
  }
  // computed transform string: keeps the image centered and applies drag offsets + scale
  get imageTransform(): string {
    // translate(-50%,-50%) keeps the image centered inside the wrapper,
    // then we offset by dragX/dragY and scale.
    return `translate(calc(-50% + ${this.dragX}px), calc(-50% + ${this.dragY}px)) scale(${this.scaleValue})`;
  }

  // open image editor (store existing image into temp)
  openImageEditor(): void {
    this.tempProfileImage = this.savedProfileImage;
    this.isEditingImage = true;
    this.isImageSelected = !!this.tempProfileImage;
    this.scaleValue = 1;
    this.dragX = 0;
    this.dragY = 0;
  }
  // called when file input changes
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.tempProfileImage = reader.result as string;
      this.isImageSelected = true;
      // reset transform so the new image appears centered
      this.scaleValue = 1;
      this.dragX = 0;
      this.dragY = 0;
    };
    reader.readAsDataURL(file);
  }
  /** Start dragging image */
  // start dragging the image
  startDrag(event: MouseEvent): void {
    if (!this.isImageSelected) return;
    event.preventDefault();

    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.initialDragX = this.dragX;
    this.initialDragY = this.dragY;

    const moveHandler = (e: MouseEvent) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      this.dragX = this.initialDragX + dx;
      this.dragY = this.initialDragY + dy;
    };

    const upHandler = () => {
      this.isDragging = false;
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  }
  // Save the edited image (commit temp -> saved)
  saveImage(): void {
    this.savedProfileImage = this.tempProfileImage;
    this.isEditingImage = false;
    this.isImageSelected = false;
    this.scaleValue = 1;
    this.dragX = 0;
    this.dragY = 0;
    console.log(
      'Image saved (base64 string length):',
      this.savedProfileImage ? this.savedProfileImage.length : 0
    );
  }

  // Cancel editing image and revert to saved image
  cancelImageEdit(): void {
    this.tempProfileImage = this.savedProfileImage;
    this.isEditingImage = false;
    this.isImageSelected = false;
    this.scaleValue = 1;
    this.dragX = 0;
    this.dragY = 0;
  }

  // Remove temporary image selection (like "remove selected file")
  deleteTempImage(): void {
    this.tempProfileImage = null;
    this.isImageSelected = false;
    this.scaleValue = 1;
    this.dragX = 0;
    this.dragY = 0;
  }

  /* ---------- Profile info editors ---------- */

  // Toggle edit state for info. When entering store originals so cancel restores them.
  toggleInfoEdit(): void {
    if (!this.isEditingInfo) {
      // enter edit mode
      this.originalUsername = this.username;
      this.originalFullName = this.fullName;
      this.isEditingInfo = true;
    } else {
      // cancel edit and revert
      this.username = this.originalUsername;
      this.fullName = this.originalFullName;
      this.isEditingInfo = false;
    }
  }

  // Save info and leave edit mode
  saveInfo(): void {
    // Here you'd call an API to persist username / fullName
    this.originalUsername = this.username;
    this.originalFullName = this.fullName;
    this.isEditingInfo = false;
    console.log('Saved info:', { username: this.username, fullName: this.fullName });
  }
}
