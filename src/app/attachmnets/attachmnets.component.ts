import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-attachmnets',
  templateUrl: './attachmnets.component.html',
  styleUrls: ['./attachmnets.component.scss']
})
export class AttachmnetsComponent implements OnInit {

  isCreate = false;
  // @Input() CandidateId: any;
  @Input() set CandidateId(value: any) {
    if (value) {
      console.log('CandidateId', this.CandidateId);
      this.attachmentDetails = value;
      this.isCreate = true;
    }
  }
  attachmentDetails: any;

  constructor(private registrationService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {

  }


  downloadAttachment(id: number) {
    return this.http.get('https://localhost:44340/api/FileAttachment/data?id=' + id, { responseType: 'blob' })
      .subscribe((result) => {
        console.log(result)
        const fileName = result.type;
        const blob = new Blob([fileName], { type: "application/octet-stream" })
        console.log(blob)
        const url = window.URL.createObjectURL(blob)
        FileSaver.saveAs(url, fileName);
        console.log('success')
      })
  }

}
