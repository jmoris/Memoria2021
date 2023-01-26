import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Github Tracker App';

  customIcons = [
    {name: 'edit', url: "../assets/icons/editCRUD.svg"},
    {name: 'delete', url: "../assets/icons/deleteCRUD.svg"},
    {name: 'undo', url: "../assets/icons/undoCRUD.svg"}
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.customIcons.forEach(icon => {
      this.registerCustomIcon(icon.name, icon.url);
    });
  }

  registerCustomIcon(name, relativeUrl) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(relativeUrl)
    );
  }
}
