import { Component, OnInit} from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {

  constructor(private appComponent: AppComponent) { 

  }

  ngOnInit() {

  }
  save(event) {
    localStorage.clear();
    let permissionsArr= [];
    for (let i = 0; i < this.appComponent.sectionsArr.length; i++) {
      let permissionsObj = {};
      for (let j = 0; j < this.appComponent.actionsArr.length; j++) {
        if (this.appComponent.triggers.sections[this.appComponent.sectionsArr[i]] > j) {
          permissionsObj[`${this.appComponent.actionsArr[j]}`] = true;
        } else {
          permissionsObj[`${this.appComponent.actionsArr[j]}`] = false;
        }
      }
      permissionsArr.push({section: this.appComponent.sectionsArr[i], permission: permissionsObj});
    }
    localStorage.setItem(`storage`, `${JSON.stringify(permissionsArr)}`);
  }
}
