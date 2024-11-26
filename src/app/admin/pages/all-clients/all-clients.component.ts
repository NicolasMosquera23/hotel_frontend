import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import { saveAs } from 'file-saver';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit{ 

  clients: any[] = []; 
  
  constructor(private adminService: AdminService, 
    private notification: NzNotificationService,
    private translate: TranslateService
  ){
    this.translate.addLangs(['en', 'es']); 
    this.translate.setDefaultLang('en'); 
  }
    
    ngOnInit() { 
      this.getClients(); 
    } 
    
    getClients() { 
      this.adminService.getAllClients().subscribe(res => { 
        console.log(res); 
        this.clients = res;
      }, error => { 
        this.notification.error('ERROR', 'Failed to load clients', { nzDuration: 5000 }); 
      }); 
    }

    deleteClientById(clientId: number) { 
      this.adminService.deleteClientById(clientId).subscribe(() => { 
        this.notification.success('SUCCESS', 'Client deleted successfully', { nzDuration: 5000 }); 
        this.getClients(); 
      }, error => { 
        this.notification.error('ERROR', 'Failed to delete client', { nzDuration: 5000 }); 
      }); 
    }

    generateReport(reportType: string) { 
      this.adminService.getReport(reportType).subscribe(blob => { 
        const fileName = `${reportType}_report.pdf`; saveAs(blob, fileName); }, error => { 
          this.notification.error('ERROR', 'Failed to generate report', { nzDuration: 5000 }); 
        }); 
      }

      switchLanguage(language: string): void { 
        this.translate.use(language); 
      }

}
