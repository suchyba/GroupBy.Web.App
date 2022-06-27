import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateDocument } from '../models/document/document-create.model';
import { IDocument } from '../models/document/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocument(documentId: number): Observable<IDocument> {
    return this.http.get<IDocument>(`${environment.apiUrl}/api/documents/${documentId}`)
  }

  createDocument(document: ICreateDocument): Observable<IDocument> {
    return this.http.post<IDocument>(`${environment.apiUrl}/api/document/add`, document)
  }
}
